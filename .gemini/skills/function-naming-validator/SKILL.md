---
name: function-naming-validator
description: 함수 및 컴포넌트 명명 규칙이 파일명과 일치하는지, 그리고 프로젝트 컨벤션을 준수하는지 검사합니다.
---

# Function Naming Validator

이 스킬은 프로젝트의 함수 및 컴포넌트 명명 규칙을 검증합니다.

## 주요 규칙

1.  **UI 컴포넌트 (PascalCase)**:
    *   `components/` 하위의 모든 컴포넌트는 PascalCase를 사용해야 합니다.
    *   메인 컴포넌트 이름은 파일명(kebab-case)의 PascalCase 변환과 일치해야 합니다.
    *   예: `hero-section.tsx` -> `export function HeroSection()`
2.  **커스텀 훅 (camelCase with 'use' prefix)**:
    *   `hooks/` 하위의 파일은 `use`로 시작하는 camelCase 이름을 가져야 합니다.
    *   예: `use-mobile.ts` -> `export function useMobile()`
3.  **일반 유틸리티 (camelCase)**:
    *   일반적인 로직 함수는 camelCase를 사용합니다.

## 사용 방법

스크립트를 사용하여 특정 파일이나 디렉토리의 명명 규칙을 일괄 검사할 수 있습니다.

```bash
node scripts/validate_functions.cjs <path>
```

## 검사 결과 해석

*   **[FAIL]**: 명명 규칙이 파일명과 명확히 일치하지 않아 수정이 강력히 권장됩니다.
*   **[WARN]**: 이름이 부분적으로 일치하지 않거나 컨벤션 위반 가능성이 있습니다.
