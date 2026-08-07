import { INTRO_CONTENT } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";

export function IntroSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="section-container flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
            {INTRO_CONTENT.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-700">{INTRO_CONTENT.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
