"use client";

import { STUDIO } from "@/lib/contacts";
import { trackButtonClick } from "@/lib/analytics";
import { VkIcon, TelegramIcon, PhoneIcon, MapPinIcon } from "./icons";

/**
 * Sticky footer — pinned to bottom of the page.
 * Contains brand, contacts, copyright. Mobile-safe.
 *
 * All contact links fire the shared `button_click` Yandex.Metrika goal
 * so the studio can see which footer channel gets used.
 */
export function Footer() {
  const trackChannel = (id: string) => trackButtonClick(id, "footer");

  return (
    <footer
      className="
        mt-auto border-t border-white/10 bg-[#070707]
      "
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-baseline gap-1.5">
              <span className="font-logo text-sm italic text-[#b8a9c9]">the</span>
              <span className="font-logo text-2xl italic tracking-wide text-white">
                vibes
              </span>
              <span className="ml-2 font-display text-[10px] uppercase tracking-[0.4em] text-white/60">
                Dance
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-white/55">
              Школа танцев в Перми. Больше, чем просто танцы. Группы для взрослых и детей.
            </p>
            <p className="mt-4 flex flex-col gap-1 text-xs uppercase tracking-[0.2em] text-white/50">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon className="h-3.5 w-3.5 text-[#e91e8c]" />
                <a
                  href={STUDIO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e91e8c]"
                >
                  {STUDIO.city}, {STUDIO.address}
                </a>
              </span>
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-white/40">
              Навигация
            </p>
            <a href="#about" className="text-sm text-white/70 transition-colors hover:text-[#e91e8c]">О студии</a>
            <a href="#styles" className="text-sm text-white/70 transition-colors hover:text-[#e91e8c]">Направления</a>
            <a href="#schedule" className="text-sm text-white/70 transition-colors hover:text-[#e91e8c]">Программа ДОД</a>
            <a href="#promo" className="text-sm text-white/70 transition-colors hover:text-[#e91e8c]">Акции</a>
          </nav>

          {/* Contacts — tracked as button_click */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-white/40">
              Контакты
            </p>
            <a
              href={STUDIO.vkGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="button"
              onClick={() => trackChannel("vk")}
              className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-[#e91e8c]"
            >
              <VkIcon className="h-5 w-5" />
              ВКонтакте
            </a>
            <a
              href={STUDIO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="button"
              onClick={() => trackChannel("telegram")}
              className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-[#e91e8c]"
            >
              <TelegramIcon className="h-5 w-5" />
              Telegram
            </a>
            <a
              href={`tel:${STUDIO.phoneTel}`}
              data-track="button"
              onClick={() => trackChannel("phone")}
              className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-[#e91e8c]"
            >
              <PhoneIcon className="h-5 w-5" />
              {STUDIO.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {STUDIO.fullName}. Все права защищены.</p>
          <p className="font-display uppercase tracking-[0.2em]">
            Сделано с любовью к танцу
          </p>
        </div>
      </div>
    </footer>
  );
}
