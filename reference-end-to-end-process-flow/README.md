# End-to-End Process Flow (참고용 번들)

FutureVisor 랜딩의 **원형 5단계 프로세스 다이어그램** 소스 전체입니다. 다른 프로젝트에 그대로 옮겨 쓰거나, Cursor에 이 폴더를 첨부해 수정·통합하세요.

## 포함 내용

- `EndToEndProcessFlow/` — 컴포넌트 모듈 전부 (`index.tsx`가 기본 export)

## 다른 프로젝트에 넣는 방법

1. `EndToEndProcessFlow` 폴더를 대상 프로젝트의 `src/components/`(또는 동일 역할 경로)에 복사합니다.
2. 페이지에서 import:
   ```tsx
   import EndToEndProcessFlow from "./components/EndToEndProcessFlow";
   // 또는 별칭: @/components/EndToEndProcessFlow
   ```
3. JSX: `<EndToEndProcessFlow />`

## 의존성

- **React** 18+ (`react`, `react-dom`)
- 바깥 래퍼에 **Tailwind CSS** 유틸 클래스 사용 (`w-full`, `h-full`, `flex`, `p-8` 등). Tailwind가 없으면 해당 `className`을 일반 CSS로 바꿔도 됩니다.
- SVG만으로 그려지므로 별도 이미지 에셋은 없습니다.

## 커스터마이즈 포인트

| 파일 | 용도 |
|------|------|
| `processData.ts` | 단계별 한/영 문구 |
| `constants.ts` | viewBox, 중심 좌표, 반지름 |
| `geometry.ts` | 노드 배치(정오각형) |

원본 레포: FutureVisor Landing Page (Vite + React).
