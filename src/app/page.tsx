import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { DanceStyles } from "@/components/landing/DanceStyles";
import { Schedule } from "@/components/landing/Schedule";
import { Promo } from "@/components/landing/Promo";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingWidget } from "@/components/landing/FloatingWidget";
import { ContactModalHost } from "@/components/landing/ContactModalHost";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <DanceStyles />
        <Schedule />
        <Promo />
        <FinalCTA />
      </main>

      <Footer />

      {/* Floating contact widget — bottom-right, always visible */}
      <FloatingWidget />

      {/* Single shared contact modal — opened by any CTA / widget */}
      <ContactModalHost />
    </div>
  );
}
