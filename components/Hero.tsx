"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { HERO_CONTENT, HERO_LAYER_IMAGES } from "@/lib/constants";
import { usePrefersReducedMotion, useIsTouchOrNarrow } from "@/lib/hooks";
import { HeroParallaxLayer, type LayerConfig } from "@/components/HeroParallaxLayer";

const LAYER_LAYOUT: Omit<LayerConfig, "src" | "alt">[] = [
  { className: "left-[2%] top-[10%] w-[30vw] max-w-[280px] aspect-[4/3]", scrollSpeed: -70, depth: 34, rotate: -6 },
  { className: "right-[3%] top-[6%] w-[24vw] max-w-[240px] aspect-video", scrollSpeed: 50, depth: -22, rotate: 5 },
  {
    className: "left-[9%] bottom-[8%] hidden w-[22vw] max-w-[220px] aspect-video sm:block",
    scrollSpeed: 90,
    depth: 26,
    rotate: 4,
  },
  {
    className: "right-[8%] bottom-[12%] hidden w-[26vw] max-w-[260px] aspect-[4/3] sm:block",
    scrollSpeed: -45,
    depth: -16,
    rotate: -4,
  },
  {
    className: "left-[40%] top-[3%] hidden w-[18vw] max-w-[200px] aspect-video lg:block",
    scrollSpeed: 110,
    depth: 40,
    rotate: 3,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchOrNarrow = useIsTouchOrNarrow();
  const enableInteractive = !prefersReducedMotion && !isTouchOrNarrow;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!enableInteractive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-surface"
      style={{ perspective: enableInteractive ? 1400 : undefined }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          rotateX: enableInteractive ? rotateX : 0,
          rotateY: enableInteractive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {LAYER_LAYOUT.map((layout, index) => (
          <HeroParallaxLayer
            key={HERO_LAYER_IMAGES[index].src}
            layer={{ ...layout, ...HERO_LAYER_IMAGES[index], priority: index < 3 }}
            scrollProgress={scrollYProgress}
            springX={springX}
            springY={springY}
            enableInteractive={enableInteractive}
          />
        ))}
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/10 via-surface/60 to-surface"
      />

      <div className="section-container relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.2] text-ink-900 sm:text-5xl lg:text-6xl"
        >
          {HERO_CONTENT.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-xl text-lg leading-relaxed text-ink-700"
        >
          {HERO_CONTENT.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-sm text-ink-700/70"
        >
          {HERO_CONTENT.tagline}
        </motion.p>
      </div>
    </section>
  );
}
