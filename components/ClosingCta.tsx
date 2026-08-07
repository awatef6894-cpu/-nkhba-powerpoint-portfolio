import { WHATSAPP_LINK, CLOSING_CONTENT } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-gold-500/[0.06] to-teal-600/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-teal-600/[0.06] to-gold-500/[0.06] blur-3xl"
      />

      <div className="section-container relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              {CLOSING_CONTENT.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">{CLOSING_CONTENT.text}</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-glow-brand transition-all duration-200 hover:brightness-105 active:brightness-95"
            >
              {CLOSING_CONTENT.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
