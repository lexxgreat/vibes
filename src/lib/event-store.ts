import { kv } from "@vercel/kv";

/**
 * Event storage backed by Vercel KV.
 *
 * Two storage strategies:
 *   1. Append raw events to a Redis list for the "recent" feed.
 *   2. Increment counters for aggregates (total / byType / byChannel / byContext / byDay).
 *
 * If KV is not configured (kv is null), all methods are no-ops.
 */

const RECENT_KEY = "vibes:events:recent";
const RECENT_MAX = 100;

const COUNTER_TOTAL = "vibes:stats:total";
const COUNTER_TYPE = "vibes:stats:type";   // hash: type -> count
const COUNTER_CHANNEL = "vibes:stats:channel";  // hash: channel -> count
const COUNTER_CONTEXT = "vibes:stats:context";  // hash: context -> count
const COUNTER_DAY = "vibes:stats:day";  // hash: YYYY-MM-DD -> count

export interface StoredEvent {
  type: "button_click" | "widget_click";
  channel?: string;
  context?: string;
  device?: string;
  time: string;
}

export async function recordEvent(event: StoredEvent): Promise<void> {
  if (!kv) return;
  try {
    // 1. Append to recent list (capped)
    await kv.lpush(RECENT_KEY, JSON.stringify(event));
    await kv.ltrim(RECENT_KEY, 0, RECENT_MAX - 1);

    // 2. Increment counters
    await kv.incr(COUNTER_TOTAL);
    await kv.hincrby(COUNTER_TYPE, event.type, 1);
    if (event.channel) {
      await kv.hincrby(COUNTER_CHANNEL, event.channel, 1);
    }
    if (event.context) {
      await kv.hincrby(COUNTER_CONTEXT, event.context, 1);
    }
    // Day bucket from time string "07.10.2026, 06:54"
    const m = event.time.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (m) {
      const day = `${m[3]}-${m[2]}-${m[1]}`;
      await kv.hincrby(COUNTER_DAY, day, 1);
    }
  } catch (e) {
    console.warn("[kv] recordEvent failed", e);
  }
}

export interface Stats {
  total: number;
  byType: Record<string, number>;
  byChannel: Record<string, number>;
  byContext: Record<string, number>;
  byDay: Record<string, number>;
  recent: StoredEvent[];
  kvConfigured: boolean;
}

export async function getStats(): Promise<Stats> {
  if (!kv) {
    return {
      total: 0,
      byType: {},
      byChannel: {},
      byContext: {},
      byDay: {},
      recent: [],
      kvConfigured: false,
    };
  }
  try {
    const [total, byType, byChannel, byContext, byDay, recentRaw] = await Promise.all([
      kv.get<number>(COUNTER_TOTAL),
      kv.hgetall<Record<string, number>>(COUNTER_TYPE),
      kv.hgetall<Record<string, number>>(COUNTER_CHANNEL),
      kv.hgetall<Record<string, number>>(COUNTER_CONTEXT),
      kv.hgetall<Record<string, number>>(COUNTER_DAY),
      kv.lrange<string>(RECENT_KEY, 0, RECENT_MAX - 1),
    ]);

    const recent: StoredEvent[] = [];
    for (const item of recentRaw ?? []) {
      try {
        recent.push(JSON.parse(item));
      } catch {
        // skip corrupt entries
      }
    }

    return {
      total: total ?? 0,
      byType: byType ?? {},
      byChannel: byChannel ?? {},
      byContext: byContext ?? {},
      byDay: byDay ?? {},
      recent,
      kvConfigured: true,
    };
  } catch (e) {
    console.warn("[kv] getStats failed", e);
    return {
      total: 0,
      byType: {},
      byChannel: {},
      byContext: {},
      byDay: {},
      recent: [],
      kvConfigured: true,
    };
  }
}
