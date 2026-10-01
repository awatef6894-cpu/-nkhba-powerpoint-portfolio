import React from "react";
import { Composition } from "remotion";
import { QuickPause, QuickPauseProps } from "./QuickPause";
import { VIDEO } from "./brand";

// ٠–٢ ثانية: «وقفة سريعة قبل ما نكمل.»
const PAUSE_DURATION = 2 * VIDEO.fps;

export const RemotionRoot: React.FC = () => (
  <>
    {/* فوق الوجه — شفاف (ProRes 4444) */}
    <Composition
      id="QuickPauseOverlay"
      component={QuickPause}
      durationInFrames={PAUSE_DURATION}
      {...VIDEO}
      defaultProps={{ transparent: true, withSound: true } satisfies QuickPauseProps}
    />
    {/* نسخة MP4 — ضع فيديوك في public/ ومرّر backgroundVideo لتجميده، وإلا خلفية الهوية */}
    <Composition
      id="QuickPause"
      component={QuickPause}
      durationInFrames={PAUSE_DURATION}
      {...VIDEO}
      defaultProps={{ transparent: false, withSound: true } satisfies QuickPauseProps}
    />
  </>
);
