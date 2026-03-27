import { PROCESS_FLOW_CENTER, PROCESS_FLOW_INNER_DASHED_RADIUS, PROCESS_FLOW_LOOP_RADIUS } from './constants'

/** Main gradient loop, direction cue, shimmer overlay, rotating dashed inner ring. */
export function LoopPathAndGuides() {
  const { x: cx, y: cy } = PROCESS_FLOW_CENTER;
  const r = PROCESS_FLOW_LOOP_RADIUS;
  const innerR = PROCESS_FLOW_INNER_DASHED_RADIUS;

  return (
    <>
      <circle
        id="loopPathPremium"
        cx={cx}
        cy={cy}
        r={r}
        stroke="url(#loopGradPremium)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="1"
        filter="url(#softGlowPremium)"
        transform={`rotate(-18 ${cx} ${cy})`}
      />
      <path
        d="M 260 92 L 268 88 L 260 84 L 263 88 Z"
        fill="url(#arrowGrad)"
        filter="url(#softGlowPremium)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="url(#shimmer)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
        transform={`rotate(-18 ${cx} ${cy})`}
      />
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        stroke="rgba(0,64,255,0.25)"
        strokeWidth="2"
        strokeDasharray="8 12"
        opacity="0.8"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="60s"
          repeatCount="indefinite"
        />
      </circle>
    </>
  );
}
