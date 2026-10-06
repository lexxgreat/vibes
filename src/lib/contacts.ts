/**
 * Central place for all contact info and tracking links.
 * If anything changes (new messenger, new number) — edit here only.
 */

export const STUDIO = {
  name: "VIBES",
  fullName: "VIBES Dance",
  city: "Пермь",
  address: "Седова, 22",
  addressFull: "г. Пермь, ул. Седова, 22",
  mapsUrl: "https://yandex.ru/maps/?text=Пермь,Седова 22",
  vkGroupUrl: "https://vk.ru/vbsdanceperm",
  telegramHandle: "borisenkosanya",
  telegramUrl: "https://t.me/borisenkosanya",
  dodDate: "10–11 октября",
  dodPrice: "590 ₽",
  dodHours: "15 часов танцев",
  promoCode: "ТАНЦЫ",
  phoneDisplay: "+7 (912) 487-01-70",
  phoneRaw: "+79124870170",
  phoneTel: "+79124870170",
  whatsappNumber: "79124870170",
};

export type ContactChannel = {
  id: "vk" | "telegram" | "phone";
  label: string;
  description: string;
  href: string;
  icon: "vk" | "telegram" | "phone";
};

/**
 * Build a tracked URL — appends `?ref=<source>` so the studio can see
 * in VK/WhatsApp which link the lead clicked.
 */
function withRef(baseUrl: string, ref: "button" | "vid"): string {
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}ref=${ref}`;
}

export const getChannels = (ref: "button" | "vid"): ContactChannel[] => [
  {
    id: "vk",
    label: "ВКонтакте",
    description: "Написать в сообщения группы",
    href: withRef("https://vk.me/vbsdanceperm", ref),
    icon: "vk",
  },
  {
    id: "telegram",
    label: "Telegram",
    description: `@${STUDIO.telegramHandle}`,
    href: withRef(STUDIO.telegramUrl, ref),
    icon: "telegram",
  },
  {
    id: "phone",
    label: "Телефон",
    description: STUDIO.phoneDisplay,
    href: `tel:${STUDIO.phoneTel}`,
    icon: "phone",
  },
];
