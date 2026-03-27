import { PROCESS_FLOW_CENTER, PROCESS_FLOW_LOOP_RADIUS } from './constants'

const motionPath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;

/** Glowing dots that travel along the main loop path. */
export function DataFlowDots() {
  const { x: cx, y: cy } = PROCESS_FLOW_CENTER;
  const r = PROCESS_FLOW_LOOP_RADIUS;
  const path = motionPath(cx, cy, r);

  return (
    <g filter="url(#strongGlow)">
      <circle r="12" fill="url(#dotGradPremium)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
          calcMode="spline"
          path={path}
        />
        <animate attributeName="r" values="12;14;12" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle r="10" fill="url(#dotGradPremium)" opacity="0.9">
        <animateMotion
          dur="4s"
          begin="1.3s"
          repeatCount="indefinite"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
          calcMode="spline"
          path={path}
        />
        <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle r="8" fill="url(#dotGradPremium)" opacity="0.8">
        <animateMotion
          dur="4s"
          begin="2.6s"
          repeatCount="indefinite"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
          calcMode="spline"
          path={path}
        />
        <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}
