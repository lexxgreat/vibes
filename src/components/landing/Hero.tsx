import { STUDIO } from "@/lib/contacts";
import { ContactButton } from "./ContactButton";
import { SocialLinks } from "./SocialLinks";
import { SparkleIcon, CalendarIcon, MapPinIcon, ClockIcon } from "./icons";

const DIRECTIONS = [
  "Hip hop",
  "High heels",
  "Choreo",
  "Jazz funk",
  "Girly hip hop",
  "Contemporary",
];

/**
 * Hero — full-viewport background image (the studio's VK cover).
 *
 * Layout:
 * - Desktop: 2-column grid. Left = headline + facts + CTA + promo.
 *   Right = a glass card listing the 6 dance directions (fills the empty area).
 * - Mobile: single column, reduced top padding so CTA fits in the first viewport.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-stretch overflow-hidden"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/images/cover-vk.jpg"
          alt="Танцоры студии VIBES на сцене"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Left-to-right gradient: opaque black on the left, transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        {/* Red neon underlight */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#8B0000]/40 via-[#8B0000]/10 to-transparent" />
      </div>

      {/* Content — sits above the background */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-20 lg:min-h-[100svh]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* ── LEFT: copy + CTA ─────────────────────────────────── */}
          <div className="max-w-2xl">
            {/* Date badge */}
            <div className="fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-[#e91e8c]/40 bg-black/40 px-3.5 py-1.5 backdrop-blur-sm sm:mb-5">
              <CalendarIcon className="h-3 w-3 text-[#e91e8c] sm:h-3.5 sm:w-3.5" />
              <span className="font-display text-[11px] uppercase tracking-[0.2em] text-white sm:text-xs">
                {STUDIO.dodDate}
              </span>
            </div>

            {/* Big headline */}
            <h1
              className="fade-up font-display text-4xl leading-[0.88] uppercase tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] xs:text-5xl sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.1s" }}
            >
              День
              <br />
              открытых
              <br />
              <span className="text-[#e91e8c]">дверей</span>
            </h1>

            {/* Studio subline */}
            <p
              className="fade-up mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[11px] uppercase tracking-[0.2em] text-white/70 sm:mt-5 sm:text-sm sm:tracking-[0.25em]"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="inline-flex items-baseline gap-1">
                <span className="font-logo text-sm italic text-[#b8a9c9] sm:text-base">the</span>
                <span className="font-logo text-base italic text-white sm:text-lg">vibes</span>
              </span>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="h-3 w-3 text-[#e91e8c] sm:h-3.5 sm:w-3.5" />
                {STUDIO.city}, {STUDIO.address}
              </span>
            </p>

            {/* Key facts */}
            <div
              className="fade-up mt-4 grid max-w-md grid-cols-3 gap-2 border-y border-white/15 py-3 backdrop-blur-[2px] sm:mt-6 sm:gap-4 sm:py-5"
              style={{ animationDelay: "0.3s" }}
            >
              <div>
                <div className="font-display text-xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl">
                  15
                </div>
                <div className="mt-0.5 font-display text-[9px] uppercase tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.18em]">
                  часов танцев
                </div>
              </div>
              <div>
                <div className="font-display text-xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl">
                  590₽
                </div>
                <div className="mt-0.5 font-display text-[9px] uppercase tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.18em]">
                  за весь день
                </div>
              </div>
              <div>
                <div className="font-display text-xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl">
                  6
                </div>
                <div className="mt-0.5 font-display text-[9px] uppercase tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.18em]">
                  направлений
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div
              className="fade-up mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3"
              style={{ animationDelay: "0.4s" }}
            >
              <ContactButton size="lg" modalTitle="Записаться на день открытых дверей">
                Записаться
              </ContactButton>
              <a
                href="#schedule"
                className="
                  inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30
                  px-4 py-3 font-display text-[11px] uppercase tracking-[0.15em] text-white/85
                  backdrop-blur-sm transition-colors hover:border-[#e91e8c]/50 hover:text-white
                  sm:px-6 sm:py-4 sm:text-sm
                "
              >
                <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Программа
              </a>
            </div>

            {/* Social messengers — direct links (tracked as button) */}
            <div
              className="fade-up mt-3 flex flex-wrap items-center gap-2 sm:mt-5"
              style={{ animationDelay: "0.45s" }}
            >
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                Напиши нам:
              </span>
              <SocialLinks context="hero" compact />
            </div>

            {/* Promo chip */}
            <div
              className="fade-up mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:mt-5 sm:text-xs"
              style={{ animationDelay: "0.5s" }}
            >
              <SparkleIcon className="h-3 w-3 text-[#e91e8c] sm:h-3.5 sm:w-3.5" />
              Промокод
              <span className="rounded border border-[#e91e8c]/60 bg-black/30 px-2 py-0.5 font-display tracking-[0.25em] text-[#e91e8c]">
                {STUDIO.promoCode}
              </span>
              — 2 занятия бесплатно
            </div>
          </div>

          {/* ── RIGHT: directions glass card (desktop only) ──────── */}
          <div
            className="fade-up hidden lg:block"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#e91e8c]">
                <SparkleIcon className="h-4 w-4" />
                <span className="font-display text-sm uppercase tracking-[0.25em]">
                  Направления
                </span>
              </div>
              <div className="my-4 h-px bg-white/10" />
              <ul className="space-y-3 font-display text-lg uppercase tracking-wide text-white/85">
                {DIRECTIONS.map((d) => (
                  <li key={d} className="flex items-center justify-between gap-3">
                    <span>{d}</span>
                    <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-white/10" />
              <p className="font-display text-xs uppercase tracking-[0.25em] text-white/55">
                Группы для взрослых и детей
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
