import { ContactButton } from "./ContactButton";
import { CalendarIcon, ClockIcon } from "./icons";

interface ScheduleSlot {
  time: string;
  style: string;
  level: string;
  teacher: string;
}

interface ScheduleDay {
  day: string;
  date: string;
  dateFull: string;
  slots: ScheduleSlot[];
}

const SCHEDULE: ScheduleDay[] = [
  {
    day: "День 1",
    date: "10.10",
    dateFull: "Суббота, 10 октября",
    slots: [
      { time: "12:00", style: "Contemporary", level: "all levels", teacher: "Алиса" },
      { time: "13:00", style: "High heels", level: "new", teacher: "Полина" },
      { time: "14:00", style: "Hip hop", level: "12+", teacher: "Ариша" },
      { time: "15:00", style: "Hip hop", level: "new", teacher: "Маша" },
      { time: "16:00", style: "High heels", level: "new / middle", teacher: "Авома" },
      { time: "17:00", style: "High heels", level: "new / middle", teacher: "Ариша" },
      { time: "18:00", style: "Hip hop", level: "middle", teacher: "Юля" },
    ],
  },
  {
    day: "День 2",
    date: "11.10",
    dateFull: "Воскресенье, 11 октября",
    slots: [
      { time: "11:00", style: "Choreo", level: "new", teacher: "Лера" },
      { time: "12:00", style: "Girly hip hop", level: "new", teacher: "Алиса" },
      { time: "13:00", style: "Choreo", level: "new", teacher: "Полина" },
      { time: "14:00", style: "Пластика", level: "all levels", teacher: "Лера" },
      { time: "15:00", style: "Jazz funk", level: "all levels", teacher: "Софа" },
      { time: "16:00", style: "High heels", level: "middle / pro", teacher: "Саша" },
      { time: "17:00", style: "High heels", level: "new", teacher: "Маша" },
    ],
  },
];

export function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Subtle schedule photo background — heavily masked */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]">
        { }
        <img
          src="/images/dod-announce.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-[#e91e8c]">
            Программа
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl">
            15 часов танцев
            <br />
            <span className="text-[#e91e8c]">за 590 ₽</span>
          </h2>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-[#e91e8c]" />
              10–11 октября
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-[#e91e8c]" />
              11:00 — 18:00
            </span>
          </div>
        </div>

        {/* Schedule grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {SCHEDULE.map((day) => (
            <div
              key={day.date}
              className="
                overflow-hidden rounded-2xl border border-white/10
                bg-gradient-to-b from-white/[0.04] to-transparent
              "
            >
              {/* Day header */}
              <div className="border-b border-white/10 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-[#e91e8c]">
                      {day.day}
                    </p>
                    <h3 className="mt-1 font-display text-3xl uppercase tracking-wide text-white">
                      {day.dateFull}
                    </h3>
                  </div>
                  <span className="font-display text-5xl text-white/15 sm:text-6xl">
                    {day.date}
                  </span>
                </div>
              </div>

              {/* Slots */}
              <ul className="divide-y divide-white/5">
                {day.slots.map((slot, i) => (
                  <li
                    key={i}
                    className="
                      group flex items-baseline gap-4 px-6 py-4 transition-colors
                      hover:bg-[#e91e8c]/[0.04]
                    "
                  >
                    {/* Time */}
                    <span className="font-display text-2xl tabular-nums text-[#e91e8c]">
                      {slot.time}
                    </span>
                    {/* Divider */}
                    <span aria-hidden="true" className="text-white/20">—</span>
                    {/* Content */}
                    <span className="flex flex-1 flex-col">
                      <span className="font-display text-lg uppercase tracking-wide text-white">
                        {slot.style}
                        <span className="ml-2 align-middle text-[10px] font-normal lowercase tracking-[0.1em] text-white/45">
                          · {slot.level}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm text-white/60">{slot.teacher}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm text-white/60">
            Можно прийти на одно занятие или на все. Билет на день открытых
            дверей действует на всю программу — 590 ₽ за 15 часов.
          </p>
          <ContactButton size="lg" modalTitle="Записаться на день открытых дверей">
            Записаться
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
