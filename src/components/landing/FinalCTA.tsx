import { STUDIO } from "@/lib/contacts";
import { ContactButton } from "./ContactButton";
import { SocialLinks } from "./SocialLinks";
import { CalendarIcon, SparkleIcon, MapPinIcon } from "./icons";

/**
 * Final CTA — big, loud, conversion-focused.
 */
export function FinalCTA() {
  return (
    <section
      id="join"
      className="
        relative overflow-hidden border-y border-white/10
        bg-gradient-to-b from-[#0a0a0a] via-[#110008] to-[#0a0a0a]
      "
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10 opacity-30">
        { }
        <img
          src="/images/dod-announce.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40" />
      </div>

      {/* Neon glows */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#e91e8c]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#8B0000]/30 blur-[100px]" />

      <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e91e8c]/40 bg-[#e91e8c]/10 px-4 py-1.5">
          <SparkleIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
          <span className="font-display text-xs uppercase tracking-[0.25em] text-white">
            {STUDIO.dodDate} · {STUDIO.city}
          </span>
        </div>

        <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-wide text-white sm:text-7xl">
          Твой выход.
          <br />
          <span className="text-[#e91e8c]">10–11 октября</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg">
          {STUDIO.dodHours} за <span className="font-semibold text-white">{STUDIO.dodPrice}</span>.
          Промокод <span className="font-display tracking-[0.2em] text-[#e91e8c]">«{STUDIO.promoCode}»</span> —
          ещё 2 занятия бесплатно. Запишись через любой удобный мессенджер.
        </p>

        {/* Address line */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
          <MapPinIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
          <a
            href={STUDIO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#e91e8c]"
          >
            {STUDIO.city}, {STUDIO.address}
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <ContactButton size="lg" modalTitle="Записаться на день открытых дверей">
            Записаться на день открытых дверей
          </ContactButton>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
            <CalendarIcon className="h-3.5 w-3.5" />
            Ответим в течение нескольких минут
          </div>

          {/* Direct messenger quick-links */}
          <div className="mt-2 flex flex-col items-center gap-3">
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-white/40">
              или напиши сразу
            </span>
            <SocialLinks context="finalcta" />
          </div>
        </div>
      </div>
    </section>
  );
}
