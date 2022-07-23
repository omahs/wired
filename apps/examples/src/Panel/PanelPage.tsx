import { useState } from "react";
import { AnimationAction } from "three";

import { RenderInfo } from "../ExampleCanvas";
import AnimationsPage from "./AnimationsPage";
import PanelTab from "./PanelTab";
import StatsPage from "./StatsPage";

interface Props {
  animations?: AnimationAction[];
  info?: RenderInfo;
}

export default function PanelPage({ animations, info }: Props) {
  const [selected, setSelected] = useState("Stats");

  const hasAnimations = animations && animations.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {hasAnimations && (
          <PanelTab title="Animations" selected={selected} setSelected={setSelected} />
        )}
        <PanelTab title="Stats" selected={selected} setSelected={setSelected} />
      </div>

      <div>
        {selected === "Animations" && hasAnimations && <AnimationsPage animations={animations} />}
        {selected === "Stats" && info && <StatsPage info={info} />}
      </div>
    </div>
  );
}
