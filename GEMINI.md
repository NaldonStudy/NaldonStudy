# 답변 형식
* 모든 답변은 특별한 지시사항이 없다면 모두 **한국어**로 답변

# 프로젝트 규칙 탐색 및 적용
* **작업 시작 시 확인**: 현재 작업 디렉토리에 .agent/rules/ 디렉토리가 존재하는지 확인하십시오.
* **규칙 우선 순위**: 해당 디렉토리가 존재한다면, 그 안에 있는 파일들을 읽고 해당 프로젝트의 작업 규 칙(Rule)으로 최 우선하여 준수하십시오.
* Github Pages를 이용한 **정적 배포**가 목적이며, 이에따라 프론트엔드만 구현하십시오.

# 기술스택
*   **Framework:** Next.js 16 (App Router) / React 19
*   **Language:** TypeScript 5
*   **Styling:** Tailwind CSS 4
*   **UI Components:** shadcn/ui
*   **State Management:** Zustand


# 코드 및 개발 규칙
*   **정적 배포 제약 준수**: Github Pages 정적 배포(`output: 'export'`)를 목표로 하므로, Server Actions, Route Handlers (API), 동적 SSR 렌더링 등 서버 측 기능은 절대 사용하지 마십시오.
*   **엄격한 타입 안전성**: TypeScript 코드 작성 시 `any` 타입 사용을 절대 금지하며, 항상 적절한 Interface나 Type을 정의하십시오.
*   **의존성**: 프로젝트에 이미 설치된 shadcn/ui 컴포넌트(`components/ui` 폴더)를 최대한 활용하여 UI를 구성하십시오.
# 에셋 사용 우선순위
*   아이콘이나 이미지 등이 필요한 경우, 프로젝트에 직접 추가된 커스텀 로컬 에셋(`public/` 또는 `assets/` 등)의 존재 여부를 먼저 확인하고 최우선으로 사용하십시오. 해당 에셋이 없을 경우에만 `lucide-react` 등 외부 라이브러리를 사용하십시오.
*   **컴포넌트 폴더 구조 (Atomic Design)**: 커스텀 컴포넌트를 생성할 때는 Atomic Design 패턴(atoms, molecules, organisms, templates)을 준수하여 `components/` 폴더 하위에 구성하십시오. 단, `shadcn/ui`가 설치되는 `components/ui/` 디렉토리는 `atoms` 계층으로 취급하며, `pages` 계층은 Next.js의 `app/` 디렉토리 라우팅으로 대체합니다.

# 작업 마무리 및 에러 검증 규칙
* **모든 Directive 작업 완료 전 필수 수행**: `.gemini/skills/quality-guard/scripts/validate.cjs` 스크립트를 실행하여 프로젝트의 무결성을 검증하십시오.
* **검증 항목**:
  1. 타입 체크 (`tsc --noEmit`)
  2. 린트 체크 (`eslint`)
  3. 빌드 체크 (`next build`)
* **결과 보고**: 검증 결과를 사용자에게 명확히 보고하고, 모든 항목이 통과된 경우에만 작업을 종료하십시오.
* **ESLint 설정**: ESLint 10+ 버전과 Next.js 16의 호환성을 위해 `eslint.config.mjs` (Flat Config)를 사용합니다. 필요 시 프로젝트에 맞게 규칙을 커스터마이징 하십시오.

# 페르소나 및 응답 규칙
*   답변 시 팩트와 의견을 명확히 구분하십시오. 팩트는 있는 그대로 전달하고, AI의 주관적 의견이나 분석, 제언이 포함될 경우 문장 앞에 반드시 `[AI의견]` 태그를 붙이십시오.
*   사용자의 이름은 '김도훈'이며, 영문 이름은 'Dohun'입니다.