---
name: code-deduplicator
description: 프로젝트 내 중복된 코드나 로직을 식별하고, 이를 공통 컴포넌트나 함수로 통합(Merge)하거나 불필요한 중복을 삭제(Prune)하여 코드 효율성을 높입니다.
---

# Code Deduplicator

이 스킬은 프로젝트 내에서 반복되는 코드 패턴을 찾아 정돈하고, Atomic Design 원칙에 따라 적절한 위치로 추상화하는 과정을 가이드합니다.

## 워크플로우

### 1. 중복 탐색 (Identify)
중복이 의심되는 영역(예: `components/organisms`, `components/ui`)에서 유사한 코드 블록을 찾습니다.
- **도구 활용**: `grep_search`를 사용하여 특정 키워드나 로직 패턴을 검색하거나, `scripts/find_duplicates.cjs`를 실행하여 구조적 중복을 확인합니다.
- **기준**: 3줄 이상의 동일한 로직, 유사한 Props 구조를 가진 컴포넌트, 반복되는 유틸리티 함수 등.

### 2. 분석 및 전략 수립 (Analyze & Plan)
탐색된 중복 코드를 어떻게 처리할지 결정합니다.
- **통합 (Merge)**: 로직은 같으나 위치가 다른 경우.
    - UI 요소인 경우: `components/atoms`나 `components/molecules`로 추출.
    - 로직/데이터 처리인 경우: `lib/utils.ts`나 커스텀 `hooks`로 추출.
- **삭제 (Prune)**: 단순히 복사되어 방치된, 완전히 동일한 코드인 경우.
    - 하나의 원본만 남기고 나머지는 원본을 참조하도록 수정하거나 제거.

### 3. 실행 (Execute)
- **추출**: 새로운 공통 파일 생성 (예: `components/atoms/common-button.tsx`).
- **교체**: 기존 중복 코드를 추출된 공통 코드로 교체. 이때 `import` 경로가 정확한지 확인하십시오.
- **제거**: 불필요해진 파일이나 코드 블록 삭제.

### 4. 검증 (Verify)
- 빌드 오류가 없는지 확인 (`npm run build`).
- 관련 컴포넌트가 여전히 의도한 대로 동작하는지 확인.
- `Atomic Design` 규칙을 준수했는지 확인.

## 주의 사항
- **과도한 추상화 금지**: 로직이 겉보기에만 비슷하고 목적이 완전히 다른 경우, 무리하게 통합하지 마십시오.
- **타입 안전성**: 추출 시 Interface나 Type을 명확히 정의하여 `any` 사용을 방지하십시오.
- **정적 배포 제약**: 추출된 로직에서도 서버 측 기능(Server Actions 등)을 사용하지 않도록 주의하십시오.

## 리소스
- `scripts/find_duplicates.cjs`: 디렉토리 내 유사한 코드 블록을 탐색하는 헬퍼 스크립트.
