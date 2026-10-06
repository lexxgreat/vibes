import { ContactButton } from "./ContactButton";

/**
 * About section — short, punchy.
 * Uses the studio banner photo as a visual anchor.
 */
export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Subtle red glow background */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#e91e8c]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#8B0000]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-center">
        {/* Photo */}
        <div className="relative order-2 md:order-1">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            { }
            <img
              src="/images/studio-banner.jpg"
              alt="Студия танцев VIBES — команда преподавателей и танцоров"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            {/* Floating badge */}
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 backdrop-blur-md">
              <span className="font-logo text-sm italic text-[#b8a9c9]">the</span>
              <span className="font-logo text-base italic text-white">vibes</span>
              <span className="ml-1 font-display text-[10px] uppercase tracking-[0.3em] text-white/70">
                Dance
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-[#e91e8c]">
            О студии
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-5xl">
            Больше,
            <br />
            чем просто
            <br />
            танцы
          </h2>

          <div className="mt-6 space-y-4 text-white/75">
            <p>
              <span className="font-logo text-lg italic text-white">VIBES</span> —
              это танцевальная школа в Перми, где каждый находит своё направление.
              Мы собрали команду преподавателей, которые любят танец и умеют
              зажигать им других.
            </p>
            <p>
              Группы для взрослых и для детей, разные уровни подготовки —
              от первых шагов до уверенных профи. Приходи попробовать, первое
              занятие бесплатно.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <div className="font-display text-3xl text-[#e91e8c]">6</div>
              <div className="mt-1 font-display text-[11px] uppercase tracking-[0.2em] text-white/50">
                направлений
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-[#e91e8c]">15+</div>
              <div className="mt-1 font-display text-[11px] uppercase tracking-[0.2em] text-white/50">
                часов на ДОД
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-[#e91e8c]">590₽</div>
              <div className="mt-1 font-display text-[11px] uppercase tracking-[0.2em] text-white/50">
                за весь день
              </div>
            </div>
          </div>

          <div className="mt-8">
            <ContactButton size="md" modalTitle="Записаться на пробное">
              Хочу на пробное
            </ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
}
