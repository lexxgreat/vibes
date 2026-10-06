"use client";

import { useEffect, useState } from "react";
import { useContactStore } from "./use-contact";
import { trackWidgetClick } from "@/lib/analytics";
import { VkIcon, WhatsappIcon, PhoneIcon, CloseIcon } from "./icons";

type Channel = "vk" | "whatsapp" | "phone";

const CHANNELS: { id: Channel; label: string; color: string }[] = [
  { id: "vk", label: "ВКонтакте", color: "#0077FF" },
  { id: "whatsapp", label: "WhatsApp", color: "#25D366" },
  { id: "phone", label: "Позвонить", color: "#e91e8c" },
];

/**
 * Floating contact widget — bottom-right.
 *
 * Behaviour:
 * - Idle: a circular button that cycles VK → WhatsApp → Phone icons
 *   every ~2.2s. Data-track="vid" for analytics.
 * - On click: expands into a small radial menu of channels + fires
 *   `widget_click` Yandex.Metrika goal (shared event).
 * - Each channel click opens the URL with ?ref=vid appended (see lib/contacts).
 */
export function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Channel>("vk");
  const openContact = useContactStore((s) => s.openContact);

  // Cycle the idle icon
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

  // (auto-open hint disabled — it was pushing the FAB off-screen on mobile)

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // The very act of opening the widget already counts as a conversion event
      trackWidgetClick("open");
    }
  };

  const handleChannel = (id: Channel) => {
    trackWidgetClick(id);
    openContact("vid", "Связаться через виджет");
    setOpen(false);
  };

  return (
    <div
      className="
        fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2
        sm:bottom-6 sm:right-6 sm:gap-3
      "
      data-track-container="vid"
    >
      {/* Channel chips (above the main button) */}
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
            onClick={() => handleChannel(c.id)}
            data-track="vid"
            data-channel={c.id}
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
              {c.id === "whatsapp" && <WhatsappIcon className="h-5 w-5" />}
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
          {current === "whatsapp" && <WhatsappIcon className="h-7 w-7" />}
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
