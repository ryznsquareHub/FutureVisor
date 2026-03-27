export type ProcessStep = {
  ko: string;
  en: string;
  idx: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  { ko: "업무 진단", en: "Process Diagnosis", idx: "01" },
  { ko: "구조 설계", en: "System Design", idx: "02" },
  { ko: "UI/UX 설계", en: "UI / UX Design", idx: "03" },
  { ko: "개발 & QA", en: "Development & QA", idx: "04" },
  { ko: "운영 & 확장", en: "Operation & Scaling", idx: "05" },
];
