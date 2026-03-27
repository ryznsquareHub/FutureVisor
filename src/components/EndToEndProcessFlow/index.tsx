import { PROCESS_FLOW_VIEW_BOX } from './constants'
import { CenterHub } from './CenterHub'
import { DataFlowDots } from './DataFlowDots'
import { DiagramBackground } from './DiagramBackground'
import { getPentagonStepPositions } from './geometry'
import { LoopPathAndGuides } from './LoopPathAndGuides'
import { PROCESS_STEPS } from './processData'
import { ProcessFlowLegend } from './ProcessFlowLegend'
import { ProcessFlowSvgDefs } from './ProcessFlowSvgDefs'
import { ProcessNode } from './ProcessNode'

/**
 * FutureVisor End-to-End Process Flow — circular pentagon diagram with animated data flow.
 * Composition: defs → translated diagram group → fixed legend.
 */
export default function EndToEndProcessFlow() {
  const positions = getPentagonStepPositions(PROCESS_STEPS.length);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-full p-8">
        <div className="w-full h-full relative">
          <svg
            viewBox={PROCESS_FLOW_VIEW_BOX}
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="FutureVisor End-to-End 프로세스 플로우 다이어그램"
          >
            <ProcessFlowSvgDefs />
            <g transform="translate(0, -30)">
              <DiagramBackground />
              <LoopPathAndGuides />
              <DataFlowDots />
              <CenterHub />
              {PROCESS_STEPS.map((step, i) => (
                <ProcessNode
                  key={step.idx}
                  x={positions[i].x}
                  y={positions[i].y}
                  index={step.idx}
                  titleKo={step.ko}
                  titleEn={step.en}
                />
              ))}
            </g>
            <ProcessFlowLegend />
          </svg>
        </div>
      </div>
    </div>
  );
}
