/**
 * Yandex.Metrika event helpers + Telegram notification dispatch.
 *
 * Two conversion events are tracked on the landing (per client spec):
 *   1. `button_click` — fired on every CTA button ("Записаться")
 *   2. `widget_click`  — fired on the floating contact widget (right-bottom)
 *
 * Each event is:
 *   - Sent to Yandex.Metrika via reachGoal
 *   - Sent to our /api/notify endpoint which forwards a Telegram message
 *     to the studio so they get a real-time lead notification.
 */

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID || "";

interface ConversionPayload {
  /** Event type, matches the Yandex.Metrika goal name. */
  event: "button_click" | "widget_click";
  /** Channel id (vk | telegram | phone) or label string. */
  channel?: string;
  /** Where on the page the click happened (e.g. "hero", "footer"). */
  context?: string;
}

/**
 * Fire a Yandex.Metrika goal. Safe to call on client only.
 */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!YM_COUNTER_ID) return;
  if (typeof window.ym !== "function") return;
  try {
    window.ym(Number(YM_COUNTER_ID), "reachGoal", goal, params);
  } catch (err) {
    // Never break UX because of analytics.
    console.warn("[ym] reachGoal failed", err);
  }
}

/**
 * Send a Telegram notification through our /api/notify endpoint.
 * Fire-and-forget — never blocks user navigation.
 */
async function notifyTelegram(payload: ConversionPayload): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const screen =
      typeof window !== "undefined"
        ? `${window.innerWidth}x${window.innerHeight}`
        : "";
    const url = `/api/notify${screen ? `?screen=${encodeURIComponent(screen)}` : ""}`;
    // keepalive: true so the request survives page navigation (e.g. tel: link).
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (e) {
    // Silent — notifications must never break UX.
    console.warn("[notify] failed", e);
  }
}

/**
 * Track a CTA button click:
 *  - reachGoal("button_click")
 *  - send Telegram notification with channel/context
 */
export function trackButtonClick(label?: string, context?: string) {
  const channel = inferChannel(label, context);
  reachGoal("button_click", label ? { label } : undefined);
  void notifyTelegram({ event: "button_click", channel, context });
}

/**
 * Track the floating widget interaction:
 *  - reachGoal("widget_click")
 *  - send Telegram notification
 */
export function trackWidgetClick(label?: string) {
  const channel = label && label !== "open" ? label : undefined;
  reachGoal("widget_click", label ? { label } : undefined);
  void notifyTelegram({ event: "widget_click", channel });
}

/**
 * Map common labels back to a channel id for nicer Telegram messages.
 */
function inferChannel(label?: string, context?: string): string | undefined {
  if (!label) return undefined;
  const l = label.toLowerCase();
  if (l.includes("vk")) return "vk";
  if (l.includes("telegram") || l.includes("tg")) return "telegram";
  if (l.includes("phone") || l.includes("tel")) return "phone";
  if (l.includes("wa") || l.includes("whatsapp")) return "whatsapp";
  return label;
}
