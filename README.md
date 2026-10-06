# VIBES Dance — лендинг

Лендинг школы танцев VIBES (Пермь) для дня открытых дверей 10–11 октября.

Сайт: https://vibes-perm.vercel.app/

## Технологии
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui (минимальный набор)
- Zustand (state модалки)
- Яндекс.Метрика (счётчик `113476860`)

## Локальный запуск
```bash
npm install
npm run dev
# http://localhost:3000
```

## Деплой на Vercel
1. Подключите репозиторий к https://vercel.com
2. Framework Preset: Next.js (определится автоматически)
3. Environment Variables:
   - `NEXT_PUBLIC_YM_ID` = `113476860`
4. Deploy → получите `vibes-perm.vercel.app`

## Цели Яндекс.Метрики

В настройках счётчика создайте 2 цели типа «JavaScript-событие»:

| Идентификатор | Описание |
|---------------|----------|
| `button_click` | Клик по любой CTA-кнопке «Записаться» |
| `widget_click` | Клик по плавающему виджету связи (справа снизу) |

## Трекинг источников

В ссылки мессенджеров автоматически добавляется `?ref=button` или `?ref=vid`:
- `?ref=button` — заявка через кнопку на лендинге
- `?ref=vid` — заявка через плавающий виджет

## Структура

```
src/
├── app/
│   ├── layout.tsx          # Шрифты, метаданные, Метрика
│   ├── page.tsx            # Сборка лендинга
│   └── globals.css         # Брендовые цвета, шрифты, утилиты
├── components/
│   └── landing/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── AboutSection.tsx
│       ├── DanceStyles.tsx
│       ├── Schedule.tsx
│       ├── Promo.tsx
│       ├── FinalCTA.tsx
│       ├── Footer.tsx
│       ├── ContactButton.tsx     # Универсальная CTA-кнопка
│       ├── ContactModal.tsx      # Модалка выбора канала
│       ├── ContactModalHost.tsx  # Хост модалки (mounted once)
│       ├── FloatingWidget.tsx    # Кружок справа снизу
│       ├── YandexMetrika.tsx     # Сниппет Метрики
│       ├── icons.tsx             # SVG-иконки
│       └── use-contact.ts        # Zustand store
└── lib/
    ├── contacts.ts          # Все контакты студии
    └── analytics.ts          # reachGoal helpers
```

## Контакты студии
- ВКонтакте: https://vk.ru/vbsdanceperm
- WhatsApp: +7 (912) 487-01-70
- Телефон: +7 (912) 487-01-70
- Адрес: Пермь, Седова 22

© VIBES Dance
