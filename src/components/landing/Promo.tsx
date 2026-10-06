"use client";

import { useState } from "react";
import { STUDIO } from "@/lib/contacts";
import { ContactButton } from "./ContactButton";
import { CopyIcon, CheckIcon, SparkleIcon } from "./icons";

interface Offer {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const OFFERS: Offer[] = [
  {
    id: "trial",
    badge: "Точка входа",
    title: "Пробное занятие — бесплатно",
    description:
      "Приходи на одно занятие и попробуй направление бесплатно. Без обязательств. Просто чтобы понять, твоё ли это.",
    highlight: true,
  },
  {
    id: "promo",
    badge: "Промокод",
    title: "ТАНЦЫ — 2 занятия бесплатно",
    description:
      "Назови промокод «ТАНЦЫ» при записи — получишь 2 занятия бесплатно сверх программы. Действует до конца октября.",
  },
  {
    id: "bundle",
    badge: "Абонемент",
    title: "+4 занятия в подарок",
    description:
      "Купи абонемент на 8 занятий в день открытых дверей — получишь ещё 4 в подарок. Хватит на полноценный месяц прокачки.",
  },
];

export function Promo() {
  const [copied, setCopied] = useState(false);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — clipboard may be unavailable in some browsers
      setCopied(false);
    }
  };

  return (
    <section id="promo" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e91e8c]/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-[#e91e8c]">
            Акции
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl">
            Забирай выгоды
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
            Собрали три предложения, чтобы начать было максимально просто и приятно.
            Все акции действуют в день открытых дверей.
          </p>
        </div>

        {/* Promo code banner — prominent */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#e91e8c]/40 bg-gradient-to-r from-[#e91e8c]/[0.08] via-[#e91e8c]/[0.04] to-transparent p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e91e8c]/20 text-[#e91e8c]">
                <SparkleIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-[#e91e8c]">
                  Промокод
                </p>
                <p className="mt-1 font-display text-4xl uppercase tracking-[0.3em] text-white">
                  {STUDIO.promoCode}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  2 занятия бесплатно при записи
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={copyPromo}
              className="
                inline-flex items-center gap-2 rounded-full border border-[#e91e8c]/50
                px-5 py-3 font-display text-sm uppercase tracking-[0.15em] text-white
                transition-all hover:bg-[#e91e8c]/15
              "
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-[#e91e8c]" />
                  Скопировано
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4" />
                  Скопировать
                </>
              )}
            </button>
          </div>
        </div>

        {/* Three offers */}
        <div className="grid gap-4 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <article
              key={offer.id}
              className={`
                relative overflow-hidden rounded-2xl border p-6 transition-all
                ${offer.highlight
                  ? "border-[#e91e8c]/40 bg-[#e91e8c]/[0.06]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"}
              `}
            >
              {offer.highlight && (
                <div className="absolute right-0 top-0 h-24 w-24 bg-[#e91e8c]/20 blur-2xl" />
              )}
              <p
                className={`
                  relative inline-block font-display text-xs uppercase tracking-[0.25em]
                  ${offer.highlight ? "text-[#e91e8c]" : "text-white/40"}
                `}
              >
                {offer.badge}
              </p>
              <h3 className="relative mt-3 font-display text-2xl uppercase leading-tight tracking-wide text-white">
                {offer.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/70">
                {offer.description}
              </p>
            </article>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            Записывайся — места ограничены
          </p>
          <ContactButton size="lg" context="promo" modalTitle="Записаться и применить промокод">
            Записаться
          </ContactButton>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Промокод «{STUDIO.promoCode}» можешь назвать сразу при записи
          </p>
        </div>
      </div>
    </section>
  );
}
