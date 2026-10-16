"use client";

import { useEffect, useState } from "react";
import { getChannels } from "@/lib/contacts";
import { trackWidgetClick } from "@/lib/analytics";
import { VkIcon, TelegramIcon, PhoneIcon, CloseIcon } from "./icons";

type Channel = "vk" | "telegram" | "phone";

const CHANNELS: { id: Channel; label: string; color: string }[] = [
  { id: "vk", label: "ВКонтакте", color: "#0077FF" },
  { id: "telegram", label: "Telegram", color: "#229ED9" },
  { id: "phone", label: "Позвонить", color: "#e91e8c" },
];

/**
 * Floating contact widget — bottom-right.
 *
 * Behaviour:
 * - Idle: a circular button that cycles VK → Telegram → Phone icons
 *   every ~2.2s. data-track="vid".
 * - Click on FAB: expands into a list of direct channel buttons.
 *   This counts as a `widget_click` conversion (user showed intent).
 * - Click on a channel: opens the messenger DIRECTLY (VK / Telegram / Phone).
 *   No extra modal — channels ARE the choice.
 *   Fires `widget_click` again with the channel id for analytics.
 */
export function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Channel>("vk");

  // Resolve channel URLs once (with ?ref=vid appended).
  const channelUrls: Record<Channel, string> = CHANNELS.reduce(
    (acc, c) => {
      const found = getChannels("vid").find((ch) => ch.id === c.id);
      acc[c.id] = found?.href ?? "#";
      return acc;
    },
    {} as Record<Channel, string>
  );

  // Cycle the idle icon.
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const idx = CHANNELS.findIndex((c) => c.id === prev);
        return CHANNELS[(idx + 1) % CHANNELS.length].id;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [open]);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // The very act of opening the widget already counts as a conversion event.
      trackWidgetClick("open");
    }
  };

  /**
   * Open the channel directly — no extra modal.
   * Each channel in the widget IS the final choice.
   */
  const openChannel = (id: Channel) => {
    const url = channelUrls[id];
    // Fire conversion event (channel-specific).
    trackWidgetClick(id);
    // Close the widget first so the user sees where they landed.
    setOpen(false);
    // Open the messenger (new tab for VK/TG, same tab for tel: link).
    if (typeof window !== "undefined") {
      window.open(url, id === "phone" ? "_self" : "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="
        fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-2
        sm:bottom-6 sm:right-6 sm:gap-3
      "
      data-track-container="vid"
    >
      {/* Channel buttons (above the main FAB) */}
      <div
        className={`
          flex flex-col items-end gap-2 transition-all duration-300
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"}
        `}
      >
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => openChannel(c.id)}
            data-track="vid"
            data-channel={c.id}
            aria-label={c.label}
            className="
              group flex items-center gap-3 rounded-full border border-white/10
              bg-[#141414]/95 backdrop-blur-sm pr-5 pl-2 py-2 shadow-lg
              transition-all hover:scale-105 hover:border-[#e91e8c]/60
            "
            style={{ boxShadow: `0 8px 30px -10px ${c.color}55` }}
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-white"
              style={{ backgroundColor: c.color }}
            >
              {c.id === "vk" && <VkIcon className="h-5 w-5" />}
              {c.id === "telegram" && <TelegramIcon className="h-5 w-5" />}
              {c.id === "phone" && <PhoneIcon className="h-4 w-4" />}
            </span>
            <span className="font-display text-sm uppercase tracking-[0.15em] text-white">
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        type="button"
        onClick={toggleOpen}
        data-track="vid"
        aria-label="Связаться со студией"
        aria-expanded={open}
        className="
          relative grid h-16 w-16 place-items-center rounded-full
          bg-[#e91e8c] text-white shadow-[0_10px_40px_-8px_rgba(233,30,140,0.7)]
          transition-all hover:scale-105 active:scale-95
          sm:h-18 sm:w-18
        "
      >
        {/* Pulsing ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#e91e8c] opacity-40 animate-ping"
          style={{ animationDuration: "2.5s" }}
        />
        {/* Cycling icon */}
        <span className="relative grid place-items-center transition-all">
          {current === "vk" && <VkIcon className="h-7 w-7" />}
          {current === "telegram" && <TelegramIcon className="h-7 w-7" />}
          {current === "phone" && <PhoneIcon className="h-6 w-6" />}
        </span>
        {/* Close X overlay when open */}
        {open && (
          <span className="absolute inset-0 grid place-items-center rounded-full bg-[#e91e8c]">
            <CloseIcon className="h-6 w-6" />
          </span>
        )}
      </button>
    </div>
  );
}
