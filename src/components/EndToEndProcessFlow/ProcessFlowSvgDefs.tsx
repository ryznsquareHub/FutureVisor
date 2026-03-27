/** Shared filters, gradients, and patterns referenced by id across subcomponents. */
export function ProcessFlowSvgDefs() {
  return (
    <defs>
      <filter id="softGlowPremium" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur1" />
        <feGaussianBlur stdDeviation="4" result="blur2" />
        <feColorMatrix
          in="blur1"
          type="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 0.5 0"
          result="glow1"
        />
        <feColorMatrix
          in="blur2"
          type="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 0.3 0"
          result="glow2"
        />
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="glow2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 0.8 0"
          result="glow"
        />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <marker id="arrowPremium" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M0,0 L12,6 L0,12 L3,6 Z" fill="url(#arrowGrad)" />
      </marker>

      <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(0,64,255,0.85)" />
        <stop offset="100%" stopColor="rgba(23,135,255,0.85)" />
      </linearGradient>

      <linearGradient id="loopGradPremium" x1="0" y1="0" x2="520" y2="520">
        <stop offset="0%" stopColor="rgba(0,64,255,0.35)">
          <animate
            attributeName="stop-color"
            values="rgba(0,64,255,0.35);rgba(23,135,255,0.35);rgba(0,64,255,0.35)"
            dur="18s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="50%" stopColor="rgba(23,135,255,0.65)">
          <animate
            attributeName="stop-color"
            values="rgba(23,135,255,0.65);rgba(0,64,255,0.65);rgba(23,135,255,0.65)"
            dur="18s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="rgba(0,64,255,0.35)">
          <animate
            attributeName="stop-color"
            values="rgba(0,64,255,0.35);rgba(23,135,255,0.35);rgba(0,64,255,0.35)"
            dur="18s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>

      <radialGradient id="dotGradPremium" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,1)" />
        <stop offset="20%" stopColor="rgba(0,64,255,0.95)" />
        <stop offset="50%" stopColor="rgba(23,135,255,0.75)" />
        <stop offset="100%" stopColor="rgba(23,135,255,0.0)" />
      </radialGradient>

      <linearGradient id="coreGradPremium" x1="200" y1="200" x2="320" y2="320">
        <stop offset="0%" stopColor="#0040FF" />
        <stop offset="50%" stopColor="#0035DD" />
        <stop offset="100%" stopColor="#0028BB" />
      </linearGradient>

      <radialGradient id="coreOuterGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,64,255,0.0)" />
        <stop offset="50%" stopColor="rgba(23,135,255,0.12)" />
        <stop offset="80%" stopColor="rgba(147,197,253,0.20)" />
        <stop offset="100%" stopColor="rgba(191,219,254,0.15)" />
      </radialGradient>

      <pattern id="gridPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="1" fill="rgba(148,163,184,0.15)" />
      </pattern>

      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          from="-1 0"
          to="1 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
  );
}
