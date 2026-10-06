import { NextResponse } from "next/server";

/**
 * Telegram notification endpoint.
 *
 * Called from the client whenever a conversion event fires:
 *   - button_click  — any CTA "Записаться" or social link
 *   - widget_click  — the floating contact widget
 *
 * Sends a message to the studio's Telegram chat via the bot.
 *
 * Env vars (must be set in Vercel Project Settings → Environment Variables):
 *   - TELEGRAM_BOT_TOKEN  — token from @BotFather
 *   - TELEGRAM_CHAT_ID    — numeric chat id of the recipient
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface NotifyBody {
  /** Event type, matches Yandex.Metrika goal name. */
  event: "button_click" | "widget_click";
  /** Channel id (vk | telegram | phone) or label. */
  channel?: string;
  /** Where on the page the click happened (e.g. "hero", "footer"). */
  context?: string;
  /** Source descriptor for the URL (?ref=...). */
  source?: string;
}

function escapeMarkdown(text: string): string {
  // Telegram MarkdownV1 doesn't need escaping; we keep messages plain.
  return text;
}

function buildMessage(body: NotifyBody, meta: Record<string, string>): string {
  const time = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const eventLabel =
    body.event === "widget_click" ? "🔴 Виджет связи" : "🎯 Кнопка «Записаться»";

  const channelLabels: Record<string, string> = {
    vk: "ВКонтакте",
    telegram: "Telegram",
    phone: "Телефон",
    whatsapp: "WhatsApp",
  };
  const channelText = body.channel
    ? channelLabels[body.channel] ?? body.channel
    : "—";

  // Plain text — no Markdown formatting.
  // Telegram Markdown breaks on user-supplied values containing _ or *.
  const lines = [
    `💃 VIBES — новая конверсия!`,
    ``,
    `Тип: ${eventLabel}`,
    `Канал: ${channelText}`,
  ];
  if (body.context) {
    lines.push(`Блок: ${body.context}`);
  }
  lines.push(`Время: ${time}`);
  if (meta.device) lines.push(`Устройство: ${meta.device}`);
  if (meta.screen) lines.push(`Экран: ${meta.screen}`);

  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  if (!BOT_TOKEN || !CHAT_ID) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set" };
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          // No parse_mode — text is plain, avoids Telegram's Markdown parser
          // choking on user-supplied values containing _ or *.
          disable_web_page_preview: true,
        }),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Telegram API ${res.status}: ${errText}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function POST(req: Request) {
  let body: NotifyBody;
  try {
    body = (await req.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Light metadata derived from request headers (no personal data).
  const ua = req.headers.get("user-agent") || "";
  const device = /android|iphone|ipad|mobile/i.test(ua)
    ? /iphone|ipad/i.test(ua)
      ? "📱 iPhone"
      : "📱 Android"
    : "💻 Десктоп";

  // Client can hint its screen via query (?screen=390x844) but we don't rely on it.
  const screen = new URL(req.url).searchParams.get("screen") || "";

  const text = buildMessage(body, { device, screen });
  const result = await sendTelegram(text);

  if (!result.ok) {
    // Don't fail loudly — log but respond 200 so the client doesn't retry.
    console.warn("[notify] telegram send failed:", result.error);
    return NextResponse.json({ ok: false, error: result.error }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}

/**
 * Simple GET — used by the developer to test that env vars are wired.
 * Safe: returns only whether they're set, never the token itself.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: Boolean(BOT_TOKEN && CHAT_ID),
  });
}
