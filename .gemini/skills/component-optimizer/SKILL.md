---
name: component-optimizer
description: 비대해진 React/Next.js 컴포넌트를 Atomic Design 규칙에 따라 리팩토링하고, 지연 로딩 및 메모이제이션을 통해 렌더링 성능을 최적화합니다.
---

# Component Optimizer

이 스킬은 비대해진 컴포넌트로 인해 발생하는 UI 버벅임(Stuttering)과 유지보수 어려움을 해결하기 위한 체계적인 리팩토링 가이드를 제공합니다.

## 1. 진단 기준 (Diagnosis)

다음 조건 중 하나라도 해당되면 리팩토링 대상으로 간주합니다:
- **코드 규모**: 단일 파일이 300라인을 초과하거나 20KB를 넘는 경우.
- **성능 이슈**: 모달 오픈, 탭 전환 등 사용자 인터랙션 시 프레임 드랍이 발생하는 경우.
- **데이터 밀도**: 대규모 정적 데이터(JSON 등)가 컴포넌트 파일 내에 직접 정의된 경우.

## 2. 최적화 워크플로우 (Optimization Workflow)

### 단계 1: 데이터 분리 (Data Extraction)
- 컴포넌트 내부에 하드코딩된 데이터 상수를 `constants/` 폴더 또는 해당 섹션의 전용 `data.ts` 파일로 추출합니다.
- 복잡한 타입 정의는 별도의 `.types.ts` 파일로 분리합니다.

### 단계 2: 컴포넌트 쪼개기 (Atomic Design)
프로젝트의 Atomic Design 규칙을 준수하여 계층별로 분리합니다:
- **Atoms**: 독립적으로 재사용 가능한 최소 단위 (Label, Badge, Icon Wrapper 등).
- **Molecules**: 2개 이상의 Atom이 결합된 작은 기능 단위 (Tab Trigger, Info Card 등).
- **Organisms**: 특정 도메인 로직을 포함한 복잡한 단위 (ProjectCard, DetailModalContent 등).
- **Folder Structure**:
  ```
  components/organisms/my-section/
  ├── index.tsx              (Main Entry)
  ├── project-card.tsx       (Sub-component)
  ├── project-detail-modal.tsx
  └── tabs/                  (Tab-specific components)
      ├── overview-tab.tsx
      └── gallery-tab.tsx
  ```

### 단계 3: 성능 최적화 적용 (Performance Tuning)
- **Lazy Loading**: `next/dynamic`을 사용하여 초기 렌더링에 필요 없는 무거운 컴포넌트(모달, 상세 탭)를 지연 로딩합니다.
- **React.memo**: 부모가 리렌더링될 때 불필요하게 다시 그려지는 하위 컴포넌트에 적용합니다.
- **Windowing/Virtualization**: 리스트나 갤러리가 매우 긴 경우 보이는 부분만 렌더링합니다.
- **Animation Optimization**: `will-change-transform`, `transform-gpu`를 활용하여 GPU 가속을 유도합니다.

## 3. 구현 지침 (Implementation Guide)

### Dynamic Import 예시
```tsx
import dynamic from 'next/dynamic'

const ProjectDetailModal = dynamic(() => import('./project-detail-modal').then(mod => mod.ProjectDetailModal), {
  loading: () => <Skeleton className="w-full h-[400px]" />,
  ssr: false
})
```

### Memoization 예시
```tsx
export const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  // ...
})
ProjectCard.displayName = 'ProjectCard'
```

## 4. 검증 (Validation)
- 리팩토링 후 기존 기능(이벤트 핸들러, 링크 등)이 정상 작동하는지 확인합니다.
- 브라우저 개발자 도구의 **Performance** 탭에서 스크립팅 시간 및 렌더링 프레임을 측정합니다.
