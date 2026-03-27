/** Bottom key: Data flow, Process steps, Continuous loop. */
export function ProcessFlowLegend() {
  return (
    <g opacity="0.95">
      <rect
        x="36"
        y="502"
        width="448"
        height="44"
        rx="8"
        fill="rgba(255,255,255,0.95)"
        stroke="rgba(0,102,255,0.25)"
        strokeWidth="2"
      />
      <circle cx="62" cy="524" r="6" fill="url(#dotGradPremium)" filter="url(#softGlowPremium)">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text
        x="78"
        y="528"
        fontSize="11"
        fill="rgba(15,23,42,0.9)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="600"
      >
        Data flow
      </text>
      <circle cx="200" cy="524" r="6" fill="rgba(191,219,254,0.65)" stroke="rgba(0,102,255,0.6)" strokeWidth="1.5" />
      <text
        x="216"
        y="528"
        fontSize="11"
        fill="rgba(15,23,42,0.9)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="600"
      >
        Process Steps
      </text>
      <g transform="translate(360, 524)">
        <path
          d="M -6 0 C -6 -3 -4 -4 -2 -4 C 0 -4 1 -2 2 0 C 3 2 4 4 6 4 C 8 4 10 3 10 0 C 10 -3 8 -4 6 -4 C 4 -4 3 -2 2 0 C 1 2 0 4 -2 4 C -4 4 -6 3 -6 0 Z"
          stroke="url(#loopGradPremium)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="376"
        y="528"
        fontSize="11"
        fill="rgba(15,23,42,0.9)"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="600"
      >
        Continuous Loop
      </text>
    </g>
  );
}
