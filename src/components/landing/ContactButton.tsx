"use client";

import { cn } from "@/lib/utils";
import { trackButtonClick } from "@/lib/analytics";
import { useContactStore } from "./use-contact";
import type { ButtonHTMLAttributes } from "react";

export interface ContactButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant.
   * - primary: solid pink, big CTAs
   * - outline: bordered, secondary CTAs
   * - ghost: text only, in nav/footer
   */
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Override modal title (e.g. "Записаться на пробное") */
  modalTitle?: string;
  /**
   * Where the button lives — used as context in the Telegram notification.
   * Examples: "hero", "navbar", "schedule".
   */
  context?: string;
}

/**
 * Universal CTA button. Opens the contact modal and fires the shared
 * `button_click` Yandex.Metrika goal.
 *
 * The `data-track="button"` attribute is also set so any external script
 * (or Yandex tag manager) can read it for additional analytics.
 */
export function ContactButton({
  variant = "primary",
  size = "md",
  modalTitle,
  context = "cta",
  className,
  children,
  onClick,
  ...rest
}: ContactButtonProps) {
  const openContact = useContactStore((s) => s.openContact);

  const variants: Record<NonNullable<ContactButtonProps["variant"]>, string> = {
    primary:
      "bg-[#e91e8c] text-white hover:bg-[#ff1493] shadow-[0_8px_30px_-8px_rgba(233,30,140,0.6)] hover:shadow-[0_10px_40px_-8px_rgba(233,30,140,0.8)]",
    outline:
      "border border-[#e91e8c]/60 text-white hover:bg-[#e91e8c]/10 hover:border-[#e91e8c]",
    ghost: "text-white/80 hover:text-white",
  };

  const sizes: Record<NonNullable<ContactButtonProps["size"]>, string> = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type="button"
      data-track="button"
      data-context={context}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          // Fire Yandex.Metrika + Telegram notification with context.
          trackButtonClick(context, context);
          openContact("button", modalTitle);
        }
      }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-display uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e91e8c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
