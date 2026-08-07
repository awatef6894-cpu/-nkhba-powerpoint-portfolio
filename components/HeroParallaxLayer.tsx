"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

export type LayerConfig = {
  className: string;
  scrollSpeed: number;
  depth: number;
  rotate: number;
  src: string;
  alt: string;
  priority?: boolean;
};

type HeroParallaxLayerProps = {
  layer: LayerConfig;
  scrollProgress: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  enableInteractive: boolean;
};

export function HeroParallaxLayer({
  layer,
  scrollProgress,
  springX,
  springY,
  enableInteractive,
}: HeroParallaxLayerProps) {
  const scrollY = useTransform(scrollProgress, [0, 1], [0, layer.scrollSpeed]);
  const mouseOffsetX = useTransform(springX, [-0.5, 0.5], [-layer.depth, layer.depth]);
  const mouseOffsetY = useTransform(springY, [-0.5, 0.5], [-layer.depth * 0.6, layer.depth * 0.6]);

  const combinedY = useTransform([scrollY, mouseOffsetY], ([sy, my]: number[]) =>
    enableInteractive ? sy + my : sy
  );
  const combinedX = useTransform(mouseOffsetX, (mx) => (enableInteractive ? mx : 0));

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden rounded-2xl shadow-soft will-change-transform ${layer.className}`}
      style={{
        y: combinedY,
        x: combinedX,
        rotate: layer.rotate,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <Image
        src={layer.src}
        alt={layer.alt}
        fill
        sizes="(min-width: 1024px) 24vw, 40vw"
        className="object-cover"
        priority={layer.priority}
      />
    </motion.div>
  );
}
