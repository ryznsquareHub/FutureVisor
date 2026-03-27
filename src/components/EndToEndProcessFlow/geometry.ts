import { PROCESS_FLOW_CENTER, PROCESS_FLOW_LOOP_RADIUS } from "./constants";

export type StepPosition = {
  x: number;
  y: number;
  angle: number;
};

/** Pentagon vertex positions on the loop circle (-90° = top). */
export function getPentagonStepPositions(count = 5): StepPosition[] {
  return Array.from({ length: count }, (_, i) => {
    const angleDeg = i * 72 - 90;
    const angle = angleDeg * (Math.PI / 180);
    return {
      x: PROCESS_FLOW_CENTER.x + PROCESS_FLOW_LOOP_RADIUS * Math.cos(angle),
      y: PROCESS_FLOW_CENTER.y + PROCESS_FLOW_LOOP_RADIUS * Math.sin(angle),
      angle: angleDeg,
    };
  });
}
