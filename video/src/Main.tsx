import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Face } from "./Face";
import { Sfx } from "./Sfx";
import { SCENES, SceneId } from "./timeline";
import {
  BatchScene,
  CalmScene,
  CounterScene,
  CtaScene,
  FeaturesScene,
  FontScene,
  IntroScene,
  OutroScene,
  PauseScene,
  ReviewsScene,
  StrikeScene,
  SystemScene,
} from "./scenes";

const COMPONENTS: Record<SceneId, React.FC> = {
  pause: PauseScene,
  intro: IntroScene,
  counter: CounterScene,
  font: FontScene,
  system: SystemScene,
  strike: StrikeScene,
  reviews: ReviewsScene,
  batch: BatchScene,
  features: FeaturesScene,
  cta: CtaScene,
  calm: CalmScene,
  outro: OutroScene,
};

export type MainProps = {
  /** "overlay" = خلفية شفافة (ProRes 4444) فوق تسجيل الوجه، "full" = MP4 كامل */
  mode: "overlay" | "full";
  /** مسار تسجيل الوجه داخل public/ (لنسخة full) */
  faceVideo?: string;
};

export const Main: React.FC<MainProps> = ({ mode, faceVideo }) => (
  <AbsoluteFill style={{ backgroundColor: mode === "overlay" ? "transparent" : "#000" }}>
    {mode === "full" && <Face faceVideo={faceVideo} />}
    {SCENES.map((sc) => {
      const C = COMPONENTS[sc.id];
      return (
        <Sequence key={sc.id} name={sc.id} from={sc.from * 30} durationInFrames={(sc.to - sc.from) * 30}>
          <C />
        </Sequence>
      );
    })}
    <Sfx />
  </AbsoluteFill>
);
