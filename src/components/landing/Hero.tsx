import { STUDIO } from "@/lib/contacts";
import { ContactButton } from "./ContactButton";
import { SparkleIcon, CalendarIcon, MapPinIcon, ClockIcon } from "./icons";

/**
 * Hero — full-viewport background image (the studio's VK cover) with a
 * legibility gradient on the left side. The photo is fully visible on the
 * right half, text lives on the darkened left.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-stretch overflow-hidden"
    >
      {/* Background photo — sits as the base layer */}
      <div className="absolute inset-0">
        <img
          src="/images/cover-vk.jpg"
          alt="Танцоры студии VIBES на сцене"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Left-to-right gradient: opaque black on the left (for text legibility),
            fading to transparent on the right (so the photo stays visible). */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        {/* Bottom gradient for the address / brand strip */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        {/* Subtle red neon underlight — matches the photo's red spotlight */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#8B0000]/40 via-[#8B0000]/10 to-transparent" />
      </div>

      {/* Content sits above the background */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-32 sm:px-8 sm:py-36">
        {/* ── LEFT: copy + CTA ─────────────────────────────────── */}
        <div className="max-w-2xl">
          {/* Date badge */}
          <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#e91e8c]/40 bg-black/40 px-4 py-1.5 backdrop-blur-sm">
            <CalendarIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
            <span className="font-display text-xs uppercase tracking-[0.25em] text-white">
              {STUDIO.dodDate}
            </span>
          </div>

          {/* Big headline */}
          <h1
            className="fade-up font-display text-6xl leading-[0.88] uppercase tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-7xl lg:text-8xl"
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
            className="fade-up mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-sm uppercase tracking-[0.25em] text-white/70"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="inline-flex items-baseline gap-1">
              <span className="font-logo text-base italic text-[#b8a9c9]">the</span>
              <span className="font-logo text-lg italic text-white">vibes</span>
            </span>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
              {STUDIO.city}, {STUDIO.address}
            </span>
          </p>

          {/* Key facts — quick scan */}
          <div
            className="fade-up mt-8 grid max-w-md grid-cols-3 gap-3 border-y border-white/15 py-6 backdrop-blur-[2px] sm:gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <div>
              <div className="font-display text-3xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl">
                15
              </div>
              <div className="mt-1 font-display text-[10px] uppercase tracking-[0.18em] text-white/70">
                часов танцев
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl">
                590₽
              </div>
              <div className="mt-1 font-display text-[10px] uppercase tracking-[0.18em] text-white/70">
                за весь день
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-[#e91e8c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl">
                6
              </div>
              <div className="mt-1 font-display text-[10px] uppercase tracking-[0.18em] text-white/70">
                направлений
              </div>
            </div>
          </div>

          {/* Short pitch */}
          <p
            className="fade-up mt-6 max-w-lg text-base leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{ animationDelay: "0.4s" }}
          >
            Самые модные танцевальные направления — группы для взрослых и детей.
            Подберём направление и группу под твой уровень.
          </p>

          {/* CTAs */}
          <div
            className="fade-up mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <ContactButton size="lg" modalTitle="Записаться на день открытых дверей">
              Записаться
            </ContactButton>
            <a
              href="#schedule"
              className="
                inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30
                px-6 py-4 font-display text-sm uppercase tracking-[0.15em] text-white/85 backdrop-blur-sm
                transition-colors hover:border-[#e91e8c]/50 hover:text-white
              "
            >
              <ClockIcon className="h-4 w-4" />
              Программа
            </a>
          </div>

          {/* Promo chip */}
          <div
            className="fade-up mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{ animationDelay: "0.6s" }}
          >
            <SparkleIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
            Промокод
            <span className="rounded border border-[#e91e8c]/60 bg-black/30 px-2 py-0.5 font-display tracking-[0.25em] text-[#e91e8c]">
              {STUDIO.promoCode}
            </span>
            — 2 занятия бесплатно
          </div>
        </div>
      </div>
    </section>
  );
}
