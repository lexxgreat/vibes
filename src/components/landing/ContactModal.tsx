"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getChannels, STUDIO } from "@/lib/contacts";
import { trackButtonClick, trackWidgetClick } from "@/lib/analytics";
import { VkIcon, TelegramIcon, PhoneIcon, CloseIcon } from "./icons";

type Source = "button" | "vid";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: Source;
  title?: string;
}

/**
 * Modal that lists all available contact channels.
 * Tracking is fired on mount (when the modal opens) — that already counts as
 * the user showing intent via either `button_click` or `widget_click`.
 */
export function ContactModal({
  open,
  onOpenChange,
  source,
  title = "Записаться на день открытых дверей",
}: ContactModalProps) {
  const channels = getChannels(source);

  const handleClick = useCallback(
    (channelId: string) => {
      if (source === "button") {
        trackButtonClick(channelId, `modal_${channelId}`);
      } else {
        trackWidgetClick(channelId);
      }
      // Close after click so navigation feels natural
      onOpenChange(false);
    },
    [source, onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md border-white/10 bg-[#141414] p-0 overflow-hidden
          data-[state=open]:fade-up
        "
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => onOpenChange(false)}
          className="
            absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center
            rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white
            transition-colors
          "
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative px-6 pt-8 pb-3">
          {/* Neon top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e91e8c] to-transparent" />
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display text-3xl uppercase tracking-wide text-white">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-white/60">
              10–11 октября · {STUDIO.dodPrice} · {STUDIO.dodHours}.<br />
              Выбери удобный способ — отвечаем быстро.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-2 p-4">
          {channels.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target={c.id === "phone" ? undefined : "_blank"}
              rel={c.id === "phone" ? undefined : "noopener noreferrer"}
              onClick={() => handleClick(c.id)}
              className="
                group flex items-center gap-4 rounded-xl border border-white/10
                bg-white/[0.03] p-4 transition-all
                hover:border-[#e91e8c]/60 hover:bg-[#e91e8c]/[0.08]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e91e8c]
              "
            >
              <span
                className="
                  grid h-12 w-12 shrink-0 place-items-center rounded-full
                  bg-white/5 text-white/80 transition-all
                  group-hover:bg-[#e91e8c] group-hover:text-white
                "
              >
                {c.icon === "vk" && <VkIcon className="h-6 w-6" />}
                {c.icon === "telegram" && <TelegramIcon className="h-6 w-6" />}
                {c.icon === "phone" && <PhoneIcon className="h-5 w-5" />}
              </span>
              <span className="flex flex-col">
                <span className="font-display text-xl uppercase tracking-wide text-white">
                  {c.label}
                </span>
                <span className="text-xs text-white/55">{c.description}</span>
              </span>
              <span
                aria-hidden="true"
                className="ml-auto text-[#e91e8c] opacity-0 transition-opacity group-hover:opacity-100"
              >
                →
              </span>
            </a>
          ))}
        </div>

        <div className="border-t border-white/5 px-6 py-4 text-center text-[11px] uppercase tracking-[0.18em] text-white/40">
          Промокод «{STUDIO.promoCode}» — 2 занятия бесплатно
        </div>
      </DialogContent>
    </Dialog>
  );
}
