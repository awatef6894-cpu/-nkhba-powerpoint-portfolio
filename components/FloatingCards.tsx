"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FLOATING_CARDS } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";

const TILT_DIRECTIONS = [
  { rotateX: -8, rotateY: 8 },
  { rotateX: 8, rotateY: -8 },
  { rotateX: -6, rotateY: -8 },
  { rotateX: 8, rotateY: 6 },
  { rotateX: -8, rotateY: -6 },
  { rotateX: 6, rotateY: 8 },
];

export function FloatingCards() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="section-container flex flex-col gap-14">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            لمحاتٌ من أعمال أخرى
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6" style={{ perspective: 1000 }}>
          {FLOATING_CARDS.map((card, index) => {
            const tilt = TILT_DIRECTIONS[index % TILT_DIRECTIONS.length];
            return (
              <motion.div
                key={`${card.src}-${index}`}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, scale: 1.05 }}
              >
                <motion.div
                  className="h-full w-full animate-bob"
                  style={{ animationDelay: `${(index % 6) * 0.5}s` }}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, 40vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
