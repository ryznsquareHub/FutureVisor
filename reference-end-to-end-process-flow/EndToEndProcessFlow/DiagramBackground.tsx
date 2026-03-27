import React from "react";
import { PROCESS_FLOW_CENTER } from "./constants";

/** Grid fill and faint concentric guide circles behind the loop. */
export function DiagramBackground() {
  const { x: cx, y: cy } = PROCESS_FLOW_CENTER;
  return (
    <>
      <rect width="520" height="520" fill="url(#gridPattern)" opacity="0.4" />
      <circle cx={cx} cy={cy} r="220" stroke="rgba(0,64,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r="200" stroke="rgba(23,135,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r="180" stroke="rgba(0,64,255,0.06)" strokeWidth="1" fill="none" />
    </>
  );
}
