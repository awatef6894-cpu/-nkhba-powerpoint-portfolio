import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { ClientStories } from "@/components/ClientStories";
import { FloatingCards } from "@/components/FloatingCards";
import { ClosingCta } from "@/components/ClosingCta";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <IntroSection />
        <ClientStories />
        <FloatingCards />
        <ClosingCta />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
