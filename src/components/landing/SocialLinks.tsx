"use client";

import { STUDIO } from "@/lib/contacts";
import { trackButtonClick } from "@/lib/analytics";
import { VkIcon, TelegramIcon } from "./icons";

interface SocialLinksProps {
  /** Optional context label for analytics (e.g. "hero", "footer"). */
  context?: string;
  /** Compact mode = icon-only buttons; default = icon + label. */
  compact?: boolean;
  className?: string;
}

/**
 * Direct social messenger links with conversion tracking.
 *
 * Every click fires the shared `button_click` Yandex.Metrika goal
 * (with the channel id in params), so the studio sees which
 * messenger gets used most.
 */
export function SocialLinks({
  context = "social",
  compact = false,
  className = "",
}: SocialLinksProps) {
  const channels = [
    {
      id: "vk",
      label: "ВКонтакте",
      href: STUDIO.vkGroupUrl,
      icon: <VkIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />,
      hoverBorder: "hover:border-[#0077FF]/60",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: STUDIO.telegramUrl,
      icon: <TelegramIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />,
      hoverBorder: "hover:border-[#229ED9]/60",
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {channels.map((c) => (
        <a
          key={c.id}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={c.label}
          data-track="button"
          data-channel={c.id}
          data-context={context}
          onClick={() => trackButtonClick(`${context}_${c.id}`)}
          className={`
            grid place-items-center rounded-full border border-white/15 bg-black/30
            text-white/80 backdrop-blur-sm transition-all
            hover:scale-105 ${c.hoverBorder} hover:text-white
            ${compact ? "h-9 w-9" : "h-11 w-11"}
          `}
        >
          {c.icon}
        </a>
      ))}
    </div>
  );
}
