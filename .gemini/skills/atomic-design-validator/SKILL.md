---
name: atomic-design-validator
description: components/ 폴더의 구조가 Atomic Design(atoms, molecules, organisms, templates, ui)을 준수하는지 검사합니다.
---

# Atomic Design Validator

이 스킬은 `components/` 디렉토리가 Atomic Design 원칙에 따라 올바르게 구성되었는지 검증합니다.

## 허용된 계층 (Tiers)

1.  **atoms**: 가장 작은 단위의 컴포넌트
2.  **molecules**: 여러 atom의 조합
3.  **organisms**: 복잡한 섹션 단위
4.  **templates**: 페이지 레이아웃 구조
5.  **ui**: shadcn/ui 등 외부 라이브러리 컴포넌트 (이 프로젝트에서는 atoms 계층으로 취급)

## 사용 방법

```bash
node scripts/check_atomic_design.cjs [project_root]
```

## 검사 항목
*   `components/` 하위에 위 5개 이외의 폴더가 존재하는지 확인합니다.
