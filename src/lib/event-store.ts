import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Event storage backed by Supabase (PostgreSQL).
 *
 * Reads /api/notify inserts each conversion event here.
 * /api/stats reads aggregates (counts by type/channel/context/day + recent feed).
 *
 * Required env vars:
 *   - NEXT_PUBLIC_SUPABASE_URL  — Project URL from Supabase dashboard
 *   - SUPABASE_SERVICE_ROLE_KEY — service role key (server-side only, never
 *                                 exposed to client). Used for both write
 *                                 and read; safe because /api/notify and
 *                                 /api/stats are protected server endpoints.
 *
 * If env vars are missing, all methods return safe defaults (no-op).
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client: SupabaseClient | null = null;
function getClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export interface StoredEvent {
  type: "button_click" | "widget_click";
  channel?: string;
  context?: string;
  device?: string;
  time: string;
}

export async function recordEvent(event: StoredEvent): Promise<void> {
  const sb = getClient();
  if (!sb) return;
  try {
    const { error } = await sb.from("conversion_events").insert({
      type: event.type,
      channel: event.channel ?? null,
      context: event.context ?? null,
      device: event.device ?? null,
      client_time: event.time,
    });
    if (error) console.warn("[supabase] insert failed", error.message);
  } catch (e) {
    console.warn("[supabase] recordEvent error", e);
  }
}

export interface Stats {
  total: number;
  byType: Record<string, number>;
  byChannel: Record<string, number>;
  byContext: Record<string, number>;
  byDay: Record<string, number>;
  recent: StoredEvent[];
  kvConfigured: boolean; // kept for backwards compat with the UI; means "supabase configured"
}

interface DbRow {
  id: number;
  type: string;
  channel: string | null;
  context: string | null;
  device: string | null;
  client_time: string;
  created_at: string;
}

export async function getStats(): Promise<Stats> {
  const sb = getClient();
  if (!sb) {
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
    // Run all aggregations in parallel.
    const [totalRes, typeRes, channelRes, contextRes, dayRes, recentRes] =
      await Promise.all([
        sb.from("conversion_events").select("*", { count: "exact", head: true }),
        sb.from("conversion_events").select("type"),
        sb.from("conversion_events").select("channel"),
        sb.from("conversion_events").select("context"),
        sb.from("conversion_events").select("created_at"),
        sb
          .from("conversion_events")
          .select("*")
          .order("id", { ascending: false })
          .limit(30),
      ]);

    const countRows = <T extends { [k: string]: any }>(
      rows: T[] | null,
      key: keyof T
    ): Record<string, number> => {
      const out: Record<string, number> = {};
      for (const r of rows ?? []) {
        const v = r[key];
        if (!v) continue;
        out[v] = (out[v] ?? 0) + 1;
      }
      return out;
    };

    const byType = countRows(typeRes.data ?? [], "type");
    const byChannel = countRows(channelRes.data ?? [], "channel");
    const byContext = countRows(contextRes.data ?? [], "context");

    // Build "byDay" — parse day from created_at (ISO timestamp).
    const byDay: Record<string, number> = {};
    for (const r of (dayRes.data as { created_at?: string }[]) ?? []) {
      if (!r.created_at) continue;
      const day = r.created_at.slice(0, 10); // YYYY-MM-DD
      byDay[day] = (byDay[day] ?? 0) + 1;
    }

    const recent: StoredEvent[] = ((recentRes.data as DbRow[]) ?? []).map((r) => ({
      type: r.type as "button_click" | "widget_click",
      channel: r.channel ?? undefined,
      context: r.context ?? undefined,
      device: r.device ?? undefined,
      time: r.client_time,
    }));

    return {
      total: totalRes.count ?? 0,
      byType,
      byChannel,
      byContext,
      byDay,
      recent,
      kvConfigured: true,
    };
  } catch (e) {
    console.warn("[supabase] getStats error", e);
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
