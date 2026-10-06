"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { STUDIO } from "@/lib/contacts";
import { ContactButton } from "./ContactButton";
import { PhoneIcon, MapPinIcon } from "./icons";

const NAV_LINKS = [
  { href: "#about", label: "Студия" },
  { href: "#styles", label: "Направления" },
  { href: "#schedule", label: "Программа" },
  { href: "#promo", label: "Акции" },
];

/**
 * Sticky top nav.
 *
 * Mobile layout (single row):
 *   [logo] ............ [phone · address] ............ [burger]
 *   Contacts sit in the centre, between the logo and the burger button,
 *   so the bar height stays the same — no extra strip.
 *
 * Desktop layout:
 *   [logo]  ...  [nav links]  ...  [Записаться]
 *   No contact info — it lives in the footer / final CTA on desktop.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl"
          : "bg-[#0a0a0a]/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:px-8 sm:h-16">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-baseline gap-1.5">
          <span className="font-logo text-sm italic text-[#b8a9c9]">the</span>
          <span className="font-logo text-xl italic tracking-wide text-white sm:text-2xl">
            vibes
          </span>
          <span className="ml-2 hidden font-display text-[10px] uppercase tracking-[0.4em] text-white/60 sm:inline">
            Dance
          </span>
        </a>

        {/* ── Mobile: centered contact chips ─────────────────────── */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 md:hidden">
          <a
            href={`tel:${STUDIO.phoneTel}`}
            className="
              group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10
              bg-black/30 px-2.5 py-1 backdrop-blur-sm
              font-display text-[11px] uppercase tracking-[0.12em] text-white/75
              transition-colors hover:text-[#e91e8c] hover:border-[#e91e8c]/40
            "
          >
            <PhoneIcon className="h-3 w-3 text-[#e91e8c]" />
            <span className="whitespace-nowrap">{STUDIO.phoneDisplay}</span>
          </a>
          <a
            href={STUDIO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10
              bg-black/30 px-2.5 py-1 backdrop-blur-sm
              font-display text-[11px] uppercase tracking-[0.12em] text-white/75
              transition-colors hover:text-[#e91e8c] hover:border-[#e91e8c]/40
            "
          >
            <MapPinIcon className="h-3 w-3 text-[#e91e8c]" />
            <span className="whitespace-nowrap">{STUDIO.address}</span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="
                font-display text-sm uppercase tracking-[0.15em] text-white/70
                transition-colors hover:text-[#e91e8c]
              "
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 md:block">
          <ContactButton size="sm" modalTitle="Записаться на день открытых дверей">
            Записаться
          </ContactButton>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Меню"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white md:hidden"
        >
          <span className="sr-only">Открыть меню</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="
                rounded-lg px-3 py-3 font-display text-lg uppercase tracking-[0.15em]
                text-white/80 transition-colors hover:bg-white/5 hover:text-[#e91e8c]
              "
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 px-3 pb-2">
            <ContactButton size="md" className="w-full">
              Записаться
            </ContactButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
