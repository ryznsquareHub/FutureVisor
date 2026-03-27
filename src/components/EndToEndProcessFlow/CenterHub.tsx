import { PROCESS_FLOW_CENTER } from './constants'

/** Central gradient disc with FutureVisor / End-to-End / Process Flow copy. */
export function CenterHub() {
  const { x: cx, y: cy } = PROCESS_FLOW_CENTER;

  return (
    <g filter="url(#softGlowPremium)">
      <circle cx={cx} cy={cy} r="90" fill="url(#coreOuterGlow)" opacity="0.6">
        <animate attributeName="r" values="90;95;90" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="68" fill="url(#coreGradPremium)" stroke="rgba(0,102,255,0.6)" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="62" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="78" stroke="rgba(23,135,255,0.4)" strokeWidth="2" fill="none">
        <animate attributeName="r" values="78;85;78" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fontSize="16"
        fill="rgba(255,255,255,0.98)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        FutureVisor
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fontSize="12"
        fill="rgba(255,255,255,0.92)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="600"
        letterSpacing="0.5"
      >
        End-to-End
      </text>
      <text
        x={cx}
        y={cy + 27}
        textAnchor="middle"
        fontSize="10"
        fill="rgba(255,255,255,0.85)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="500"
        letterSpacing="-0.2"
      >
        Process Flow
      </text>
    </g>
  );
}
