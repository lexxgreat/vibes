import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { YandexMetrika } from "@/components/landing/YandexMetrika";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibes-perm.vercel.app"),
  title: "VIBES Dance — Школа танцев в Перми | Дни открытых дверей 10–11 октября",
  description:
    "Школа танцев VIBES в Перми. Дни открытых дверей 10–11 октября: 15 часов танцев за 590₽. Hip hop, high heels, choreo, jazz funk, girly hip hop, contemporary. Группы для взрослых и детей. Запишись через ВК, WhatsApp или по телефону.",
  keywords: [
    "танцы Пермь",
    "школа танцев",
    "VIBES",
    "vibes dance",
    "день открытых дверей",
    "hip hop Пермь",
    "high heels",
    "choreo",
    "jazz funk",
    "contemporary",
    "танцы для взрослых",
    "танцы для детей",
  ],
  authors: [{ name: "VIBES Dance" }],
  openGraph: {
    title: "VIBES Dance — Дни открытых дверей 10–11 октября",
    description:
      "15 часов танцев за 590₽. Hip hop, high heels, choreo, jazz funk, girly hip hop, contemporary. Пермь.",
    type: "website",
    locale: "ru_RU",
    images: ["/images/cover-vk.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBES Dance — Дни открытых дверей 10–11 октября",
    description:
      "15 часов танцев за 590₽. Hip hop, high heels, choreo, jazz funk, girly hip hop, contemporary. Пермь.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Required for safe-area-inset to work on mobile browsers
  // (so the floating widget sits above the Android nav bar).
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <YandexMetrika />
      </body>
    </html>
  );
}
