---
name: atomic-design-validator
description: components/ 폴더의 구조가 Atomic Design 및 도메인 주도(DDD/FSD) 리팩토링 규칙을 준수하는지 정밀 검사합니다.
---

# Atomic Design Validator (Enhanced)

이 스킬은 `components/` 디렉토리의 계층 구조뿐만 아니라, 각 **Organism** 내부의 설계 무결성을 검증합니다.

## 1. 계층 규칙 (Tier Rules)

1.  **atoms**: 최소 단위 컴포넌트 (`components/atoms/`)
2.  **molecules**: 2개 이상의 atom 조합 (`components/molecules/`)
3.  **organisms**: 도메인 맥락을 가진 복잡한 섹션 (`components/organisms/`)
4.  **templates**: 레이아웃 구조 (`components/templates/`)
5.  **ui**: shadcn/ui 등 외부 컴포넌트 (atoms로 취급)

## 2. Organism 도메인 구조 규칙 (Internal Rules)

복잡도가 높은 Organism은 다음 구조를 반드시 준수해야 합니다:

- **Folder-based**: 단일 파일 대신 도메인 폴더(`components/organisms/[domain]/`)를 사용합니다.
- **Entry Point**: 폴더 내에 반드시 `index.tsx`가 존재해야 하며, 섹션 전체를 조립하여 export 합니다.
- **Data Isolation**: 대규모 정적 데이터(JSON 등)는 반드시 `*-data.ts` 파일로 분리해야 합니다. (한 파일 내 데이터 비중이 30%를 넘지 않도록 권장)
- **Lazy Loading**: 모달(Dialog), 갤러리 등 초기 렌더링에 필요 없는 무거운 컴포넌트는 `next/dynamic`을 사용하여 `index.tsx`에서 지연 로딩해야 합니다.

## 3. 검증 방법

```bash
node .gemini/skills/atomic-design-validator/scripts/check_atomic_design.cjs
```

## 4. 검사 항목
- [ ] `components/` 하위 폴더의 계층 명칭 준수 여부
- [ ] Organism 내의 `index.tsx` 존재 여부
- [ ] 파일 크기 및 데이터 분리 상태 (비대해진 파일 탐지)
- [ ] `next/dynamic` 사용 여부 (무거운 UI 요소 대상)
