"use client";

import { useEffect, useState, useCallback } from "react";
import { STUDIO } from "@/lib/contacts";

/**
 * Admin dashboard — conversion analytics.
 *
 * URL: /admin?token=<ADMIN_TOKEN>
 *
 * Shows:
 *  - Total conversions + breakdown by type (button vs widget)
 *  - Top channels (vk / telegram / phone)
 *  - Top contexts (hero / navbar / schedule / ...)
 *  - Last 7 days bar chart
 *  - Recent events feed
 *
 * If KV is not configured, shows a setup hint instead.
 */

interface StoredEvent {
  type: "button_click" | "widget_click";
  channel?: string;
  context?: string;
  device?: string;
  time: string;
}

interface Stats {
  total: number;
  byType: Record<string, number>;
  byChannel: Record<string, number>;
  byContext: Record<string, number>;
  byDay: Record<string, number>;
  recent: StoredEvent[];
  kvConfigured: boolean;
}

const CHANNEL_LABELS: Record<string, string> = {
  vk: "ВКонтакте",
  telegram: "Telegram",
  phone: "Телефон",
  whatsapp: "WhatsApp",
  "—": "Без канала",
};

const CONTEXT_LABELS: Record<string, string> = {
  hero: "Главный экран",
  navbar: "Шапка",
  about: "О студии",
  styles: "Направления",
  schedule: "Программа",
  promo: "Акции",
  finalcta: "Финальный CTA",
  footer: "Подвал",
  mobile_menu: "Моб. меню",
  modal_vk: "Модалка → ВК",
  modal_telegram: "Модалка → Telegram",
  modal_phone: "Модалка → Телефон",
  "Виджет раскрыт": "Виджет раскрыт",
  "Виджет — выбор канала": "Виджет → канал",
  cta: "CTA",
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    // Read token from URL query (?token=...) OR localStorage (set on login form).
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      try { localStorage.setItem("admin_token", urlToken); } catch {}
    } else {
      try {
        const stored = localStorage.getItem("admin_token");
        setToken(stored ?? "");
      } catch {
        setToken("");
      }
    }
  }, []);

  const fetchStats = useCallback(async () => {
    if (token === null) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (token) params.set("token", token);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const url = `/api/stats${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? `HTTP ${res.status}`);
      } else {
        setStats(data);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token, from, to]);

  const handleReset = async () => {
    if (!token) return;
    const confirmed = window.confirm(
      "Удалить ВСЮ статистику конверсий? Это действие необратимо."
    );
    if (!confirmed) return;
    setResetting(true);
    try {
      const params = new URLSearchParams();
      if (token) params.set("token", token);
      const res = await fetch(`/api/stats?${params.toString()}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(`Ошибка: ${data.error ?? res.status}`);
      } else {
        await fetchStats();
      }
    } catch (e) {
      alert(`Ошибка: ${(e as Error).message}`);
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token, fetchStats]);

  // ─── Render helpers ────────────────────────────────────────────────

  const sortDesc = (obj: Record<string, number>): [string, number][] =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]);

  const maxDay = Math.max(1, ...Object.values(stats?.byDay ?? {}));

  // Last 7 days, oldest first.
  const last7Days = (() => {
    const days: { date: string; label: string; count: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = d.toLocaleDateString("ru-RU", {
        weekday: "short",
        day: "numeric",
        month: "numeric",
      });
      days.push({ date: key, label, count: stats?.byDay[key] ?? 0 });
    }
    return days;
  })();

  // ─── Loading state ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center">
        <div className="font-display text-2xl uppercase tracking-wide animate-pulse">
          Загрузка статистики…
        </div>
      </div>
    );
  }

  // ─── Error / unauthorised ─────────────────────────────────────────

  if (error === "Unauthorized") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.currentTarget.elements.namedItem(
              "t"
            ) as HTMLInputElement)?.value;
            if (input) {
              window.location.search = `?token=${encodeURIComponent(input)}`;
            }
          }}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="font-display text-3xl uppercase text-center">
            🔒 Вход в админку
          </h1>
          <p className="text-sm text-white/60 text-center">
            Введите токен доступа
          </p>
          <input
            name="t"
            type="password"
            autoFocus
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#e91e8c]"
            placeholder="ADMIN_TOKEN"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#e91e8c] py-3 font-display uppercase tracking-wide text-white hover:bg-[#ff1493]"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center p-6">
        <div className="text-center">
          <h1 className="font-display text-3xl uppercase text-[#e91e8c]">
            Ошибка
          </h1>
          <p className="mt-2 text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  // ─── KV not configured ────────────────────────────────────────────

  if (stats && !stats.kvConfigured) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <header>
            <h1 className="font-display text-4xl uppercase">
              VIBES — админка
            </h1>
            <p className="text-white/60">
              Дашборд конверсий лендинга
            </p>
          </header>

          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h2 className="font-display text-xl uppercase text-yellow-300">
              ⚠️ Supabase не подключён
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Чтобы видеть статистику на этой странице, нужно подключить
              бесплатную базу данных Supabase.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-white/80 list-decimal pl-5">
              <li>Создай проект на <a className="text-[#e91e8c] underline" href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">supabase.com</a> (бесплатно, регион Frankfurt)</li>
              <li>В Supabase открой <b>SQL Editor</b> → вставь содержимое файла <code className="bg-black/40 px-1 rounded">supabase-schema.sql</code> из репо → <b>Run</b></li>
              <li>Также выполни в SQL Editor:
                  <pre className="bg-black/40 p-2 rounded mt-1 text-xs">CREATE POLICY "anon can insert" ON public.conversion_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon can select" ON public.conversion_events FOR SELECT TO anon USING (true);</pre>
              </li>
              <li>Открой <b>Settings → API</b>, скопируй:
                <ul className="mt-1 ml-4 list-disc">
                  <li><b>Project URL</b></li>
                  <li><b>anon publishable</b> ключ</li>
                </ul>
              </li>
              <li>В Vercel: <b>Settings → Environment Variables</b>, добавь:
                <ul className="mt-1 ml-4 list-disc">
                  <li><code className="bg-black/40 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> = Project URL</li>
                  <li><code className="bg-black/40 px-1 rounded">SUPABASE_KEY</code> = anon publishable ключ</li>
                  <li><code className="bg-black/40 px-1 rounded">ADMIN_TOKEN</code> = любой сложный пароль</li>
                </ul>
              </li>
              <li>Vercel → <b>Deployments</b> → Redeploy (без build cache)</li>
              <li>Открой <code className="bg-black/40 px-1 rounded">/admin?token=твой_пароль</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main dashboard ────────────────────────────────────────────────

  const buttonClicks = stats?.byType.button_click ?? 0;
  const widgetClicks = stats?.byType.widget_click ?? 0;
  const topChannels = sortDesc(stats?.byChannel ?? {});
  const topContexts = sortDesc(stats?.byContext ?? {});

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <h1 className="font-display text-4xl uppercase sm:text-5xl">
              VIBES — аналитика
            </h1>
            <p className="text-white/60 mt-1">
              Конверсии лендинга · обновлено{" "}
              {new Date().toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleReset}
              disabled={resetting}
              className="rounded-full border border-red-500/30 px-4 py-2 font-display text-xs uppercase tracking-wide text-red-300 hover:border-red-500/60 hover:text-red-200 disabled:opacity-50"
              title="Удалить ВСЮ статистику"
            >
              {resetting ? "Очистка..." : "✕ Сбросить"}
            </button>
            <button
              onClick={fetchStats}
              className="rounded-full border border-white/20 px-5 py-2.5 font-display text-sm uppercase tracking-wide hover:border-[#e91e8c]/60 hover:text-[#e91e8c]"
            >
              ↻ Обновить
            </button>
          </div>
        </header>

        {/* Date range filter */}
        <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <label className="flex flex-col gap-1">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
              С даты
            </span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#e91e8c] [color-scheme:dark]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
              По дату
            </span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#e91e8c] [color-scheme:dark]"
            />
          </label>
          <button
            onClick={() => { setFrom(""); setTo(""); }}
            className="h-[38px] rounded-lg border border-white/15 px-3 font-display text-xs uppercase tracking-wide text-white/70 hover:border-[#e91e8c]/60 hover:text-white"
            title="Сбросить фильтр дат"
          >
            Всё время
          </button>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                const d = new Date();
                setTo(d.toISOString().slice(0, 10));
                d.setDate(d.getDate() - 6);
                setFrom(d.toISOString().slice(0, 10));
              }}
              className="h-[38px] rounded-lg border border-white/15 px-3 font-display text-xs uppercase tracking-wide text-white/70 hover:border-[#e91e8c]/60 hover:text-white"
            >
              7 дней
            </button>
            <button
              onClick={() => {
                const d = new Date();
                setTo(d.toISOString().slice(0, 10));
                d.setDate(d.getDate() - 29);
                setFrom(d.toISOString().slice(0, 10));
              }}
              className="h-[38px] rounded-lg border border-white/15 px-3 font-display text-xs uppercase tracking-wide text-white/70 hover:border-[#e91e8c]/60 hover:text-white"
            >
              30 дней
            </button>
          </div>
        </div>

        {(from || to) && (
          <p className="mb-4 text-xs text-white/50">
            Фильтр:{" "}
            {from || "всё время"} — {to || "сегодня"}
          </p>
        )}

        {/* Top stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <StatCard
            label="Всего конверсий"
            value={stats?.total ?? 0}
            color="#e91e8c"
          />
          <StatCard
            label="🎯 Кнопка «Записаться»"
            value={buttonClicks}
            color="#229ED9"
          />
          <StatCard
            label="🔴 Виджет связи"
            value={widgetClicks}
            color="#0077FF"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Channels */}
          <Card title="Каналы связи">
            {topChannels.length === 0 ? (
              <Empty />
            ) : (
              <ul className="space-y-2">
                {topChannels.map(([ch, count]) => (
                  <BarRow
                    key={ch}
                    label={CHANNEL_LABELS[ch] ?? ch}
                    value={count}
                    max={topChannels[0][1]}
                  />
                ))}
              </ul>
            )}
          </Card>

          {/* Contexts */}
          <Card title="Где кликали">
            {topContexts.length === 0 ? (
              <Empty />
            ) : (
              <ul className="space-y-2">
                {topContexts.map(([ctx, count]) => (
                  <BarRow
                    key={ctx}
                    label={CONTEXT_LABELS[ctx] ?? ctx}
                    value={count}
                    max={topContexts[0][1]}
                  />
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Last 7 days chart */}
        <Card title="Последние 7 дней" className="mt-6">
          <div className="flex items-end justify-between gap-2 h-32">
            {last7Days.map((d) => (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#e91e8c] to-[#ff1493] transition-all"
                  style={{
                    height: `${(d.count / maxDay) * 100}%`,
                    minHeight: d.count > 0 ? "4px" : "2px",
                    opacity: d.count > 0 ? 1 : 0.2,
                  }}
                  title={`${d.label}: ${d.count}`}
                />
                <span className="text-[10px] text-white/60">{d.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent events */}
        <Card title="Последние события" className="mt-6">
          {stats?.recent.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y divide-white/5">
              {stats?.recent.map((ev, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <span className="text-lg">
                    {ev.type === "widget_click" ? "🔴" : "🎯"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white">
                      <span className="font-display uppercase tracking-wide">
                        {CHANNEL_LABELS[ev.channel ?? "—"] ?? ev.channel ?? "—"}
                      </span>
                      {ev.context && (
                        <span className="text-white/40">
                          {" · "}
                          {CONTEXT_LABELS[ev.context] ?? ev.context}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      {ev.device && <span>{ev.device} · </span>}
                      {ev.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {STUDIO.fullName} · дашборд конверсий
        </footer>
      </div>
    </div>
  );
}

// ─── Small UI helpers ────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="font-display text-4xl sm:text-5xl" style={{ color }}>
        {value}
      </div>
      <div className="mt-2 font-display text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}
    >
      <h2 className="font-display text-sm uppercase tracking-[0.25em] text-[#e91e8c] mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BarRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-sm text-white/80 truncate">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#e91e8c] to-[#ff1493]"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="font-display text-base w-8 text-right">{value}</span>
    </li>
  );
}

function Empty() {
  return (
    <p className="text-sm text-white/40 italic">
      Пока нет данных. Как только посетители начнут кликать — статистика появится здесь.
    </p>
  );
}
