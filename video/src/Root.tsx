import React from "react";
import { Composition } from "remotion";
import { Main, MainProps } from "./Main";
import { Batch7 } from "./dub/Batch7";
import { VIDEO } from "./brand";
import { TOTAL_SECONDS } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    {/* الدفعة 7 بأسلوب Dub — حسب البريف المعتمد */}
    <Composition id="Batch7" component={Batch7} durationInFrames={48 * VIDEO.fps} {...VIDEO} />
    {/* MP4 كامل — مع تسجيل الوجه أو صورة مكانه */}
    <Composition id="Montage" component={Main} durationInFrames={TOTAL_SECONDS * VIDEO.fps} {...VIDEO} defaultProps={{ mode: "full" } satisfies MainProps} />
    {/* طبقة شفافة فوق الوجه — ProRes 4444 */}
    <Composition id="MontageOverlay" component={Main} durationInFrames={TOTAL_SECONDS * VIDEO.fps} {...VIDEO} defaultProps={{ mode: "overlay" } satisfies MainProps} />
  </>
);
