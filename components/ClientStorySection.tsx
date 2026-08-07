"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ClientSection } from "@/lib/constants";

type ClientStorySectionProps = {
  client: ClientSection;
  index: number;
  reversed: boolean;
};

export function ClientStorySection({ client, index, reversed }: ClientStorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const primaryScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.06]);
  const primaryY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const secondaryOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const [primary, secondary] = client.images;
  const orderNumber = String(index + 1).padStart(2, "0");

  return (
    <section
      ref={ref}
      id={client.id}
      className="relative flex min-h-screen items-center overflow-hidden bg-surface py-20"
    >
      <div className="section-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          style={{ y: textY }}
          className={`flex flex-col items-start gap-5 text-start ${reversed ? "lg:order-2" : "lg:order-1"}`}
        >
          <span className="flex items-center gap-3 text-sm font-medium text-ink-700">
            <span className="font-display text-2xl font-bold text-gradient-brand">{orderNumber}</span>
            {client.name}
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            {client.title}
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-ink-700 sm:text-lg">{client.text}</p>
        </motion.div>

        <div
          className={`relative h-[60vh] min-h-[380px] w-full ${reversed ? "lg:order-1" : "lg:order-2"}`}
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{ y: primaryY, scale: primaryScale }}
            className="absolute inset-x-0 top-0 aspect-video w-[85%] overflow-hidden rounded-3xl shadow-soft will-change-transform"
          >
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 85vw"
              className="object-cover"
            />
          </motion.div>

          {secondary ? (
            <motion.div
              style={{ y: secondaryY, opacity: secondaryOpacity }}
              className="absolute bottom-0 end-0 aspect-video w-[55%] overflow-hidden rounded-2xl border-4 border-surface shadow-soft will-change-transform"
            >
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
