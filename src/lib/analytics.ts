/**
 * Yandex.Metrika event helpers.
 *
 * Two conversion events are tracked on the landing (per client spec):
 *   1. `button_click` — fired on every CTA button ("Записаться")
 *   2. `widget_click`  — fired on the floating contact widget (right-bottom)
 *
 * The numeric counter ID is supplied via NEXT_PUBLIC_YM_ID.
 * Until the counter is created, calls are no-ops (guarded by typeof window.ym).
 */

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID || "";

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
 * Track a CTA button click (single shared event across all buttons).
 */
export function trackButtonClick(label?: string) {
  reachGoal("button_click", label ? { label } : undefined);
}

/**
 * Track the floating widget interaction (single shared event).
 */
export function trackWidgetClick(label?: string) {
  reachGoal("widget_click", label ? { label } : undefined);
}
