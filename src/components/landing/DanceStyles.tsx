import { ContactButton } from "./ContactButton";

interface DanceStyle {
  name: string;
  tagline: string;
  description: string;
  audience: "Взрослые" | "Дети" | "Все";
}

const STYLES: DanceStyle[] = [
  {
    name: "Hip hop",
    tagline: "База, грув, характер",
    description:
      "Классика уличного танца. Учишься чувствовать ритм, владеть телом и качать под любой бит.",
    audience: "Все",
  },
  {
    name: "High heels",
    tagline: "Сила, грация, каблук",
    description:
      "Танец на каблуках — про уверенность и женственность. Для тех, кто хочет чувствовать себя королевой.",
    audience: "Взрослые",
  },
  {
    name: "Choreo",
    tagline: "Хореография и эмоции",
    description:
      "Авторская хореография, где движение рождается из смысла. Прокачиваешь технику и подачу.",
    audience: "Все",
  },
  {
    name: "Jazz funk",
    tagline: "Дерзость и стиль",
    description:
      "Микс джаза, хип-хопа и уличных стилей. Дерзкий, яркий, на грани — для тех, кто не боится.",
    audience: "Взрослые",
  },
  {
    name: "Girly hip hop",
    tagline: "Женственный хип-хоп",
    description:
      "Хип-хоп с женской подачей. Мягче, плавнее, но всё ещё с характером. Для девушек любого уровня.",
    audience: "Взрослые",
  },
  {
    name: "Contemporary",
    tagline: "Свобода и пластика",
    description:
      "Современный танец без рамок. Работаем с дыханием, весом, эмоцией. Идеален для самовыражения.",
    audience: "Все",
  },
];

export function DanceStyles() {
  return (
    <section id="styles" className="bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-[#e91e8c]">
              Направления
            </p>
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-5xl">
              Выбери свой
              <br />
              вайб
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            На дне открытых дверей 10–11 октября попробуешь любое направление.
            Не знаешь, с чего начать — поможем выбрать.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STYLES.map((style, idx) => (
            <article
              key={style.name}
              className="
                group relative overflow-hidden rounded-2xl border border-white/10
                bg-gradient-to-b from-white/[0.04] to-transparent p-6
                transition-all duration-300 hover:border-[#e91e8c]/40
                hover:bg-[#e91e8c]/[0.04]
              "
            >
              {/* Big index number watermark */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none absolute -right-4 -top-8 font-display text-[8rem]
                  leading-none text-white/[0.04] transition-colors group-hover:text-[#e91e8c]/[0.08]
                "
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                    {style.name}
                  </h3>
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/50">
                    {style.audience}
                  </span>
                </div>
                <p className="font-display text-sm uppercase tracking-[0.15em] text-[#e91e8c]">
                  {style.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {style.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-[#e91e8c]/20 bg-[#e91e8c]/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg uppercase tracking-wide text-white">
              Не уверен, какое твоё?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Напиши нам — поможем подобрать направление и группу под твой уровень.
            </p>
          </div>
          <ContactButton size="md" context="styles" modalTitle="Помогите выбрать направление">
            Подобрать направление
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
