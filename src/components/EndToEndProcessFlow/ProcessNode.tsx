export type ProcessNodeProps = {
  x: number;
  y: number;
  index: string;
  titleKo: string;
  titleEn: string;
};

/** Numbered step on the pentagon + bilingual label card below the node. */
export function ProcessNode({ x, y, index, titleKo, titleEn }: ProcessNodeProps) {
  const label = { tx: 0, ty: 36 };
  const labelRect = { x: -64, y: 0 };

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g filter="url(#softGlowPremium)">
        <circle cx="0" cy="0" r="32" fill="rgba(0,64,255,0.08)" opacity="0.6">
          <animate attributeName="r" values="32;36;32" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle
          cx="0"
          cy="0"
          r="26"
          fill="rgba(255,255,255,0.98)"
          stroke="rgba(0,102,255,0.4)"
          strokeWidth="2.5"
        />
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="rgba(191,219,254,0.35)"
          stroke="rgba(0,102,255,0.7)"
          strokeWidth="2"
        >
          <animate attributeName="r" values="18;19.5;18" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.85;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontSize="13"
          fill="rgba(30,64,175,0.95)"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="800"
          letterSpacing="-0.5"
        >
          {index}
        </text>
      </g>
      <g transform={`translate(${label.tx}, ${label.ty})`}>
        <rect
          x={labelRect.x}
          y={labelRect.y}
          width="128"
          height="42"
          rx="8"
          fill="rgba(51,65,85,0.95)"
          stroke="rgba(0,102,255,0.35)"
          strokeWidth="1"
        />
        <rect
          x={labelRect.x + 2}
          y={labelRect.y + 2}
          width="124"
          height="38"
          rx="6"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
        <text
          x={labelRect.x + 64}
          y={labelRect.y + 18}
          textAnchor="middle"
          fontSize="13"
          fill="rgba(255,255,255,0.98)"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="700"
          letterSpacing="-0.3"
        >
          {titleKo}
        </text>
        <text
          x={labelRect.x + 64}
          y={labelRect.y + 33}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(203,213,225,0.9)"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="600"
          letterSpacing="0.3"
        >
          {titleEn}
        </text>
      </g>
    </g>
  );
}
