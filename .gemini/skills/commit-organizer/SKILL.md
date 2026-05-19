---
name: commit-organizer
description: 대규모 변경 사항을 논리적 단위(Atomic Commits)로 분할하여 커밋하고 푸시하는 가이드를 제공합니다.
---

# Commit Organizer Workflow

이 스킬은 한꺼번에 많은 파일이 변경되었을 때, 이를 의미 있는 단위로 나누어 커밋함으로써 프로젝트 히스토리를 깔끔하게 관리하기 위해 사용됩니다.

## 1. 커밋 분할 원칙 (Atomic Commit)

변경 사항을 다음과 같은 우선순위로 그룹화합니다:

1.  **Chore**: 설정 파일, 의존성 관리 (`package.json`, `tsconfig.json`, `.gitignore` 등)
2.  **Feat (Core)**: 기본 앱 구조, 전역 스타일, 유틸리티 함수
3.  **Feat (UI)**: UI 컴포넌트, Atomic Design 요소들 (`components/`)
4.  **Feat (Tools)**: 검증 스크립트, 자동화 도구 (`.gemini/skills/` 등)
5.  **Refactor**: 기능 변경 없는 코드 구조 개선

## 2. 명명 규칙 (Conventional Commits + 한국어)

메시지 형식: `<type>: <한국어 설명>`

*   `feat`: 새로운 기능 추가
*   `fix`: 버그 수정
*   `chore`: 빌드 업무, 패키지 매니저 설정 등 (코드 수정 없음)
*   `refactor`: 기능 추가나 버그 수정이 없는 코드 수정
*   `docs`: 문서 수정

## 3. 실행 프로세스

1.  **상태 확인**: `git status`로 변경된 파일 목록 파악
2.  **그룹화**: 관련 있는 파일들을 `git add`로 스테이징
3.  **커밋**: 각 그룹에 맞는 타입과 한글 설명을 사용하여 `git commit`을 제안합니다. **(주의: 실행 전 채팅을 통해 사용자의 최종 승인을 받아야 함)**
4.  **반복**: 모든 변경 사항이 처리될 때까지 반복하며, 매 커밋마다 사용자에게 확인을 받으십시오.
5.  **최종 확인**: `git log --oneline`으로 히스토리 검토
6.  **푸시**: `git push origin <branch>`

## 4. 권장 사항

*   한 커밋에는 **하나의 논리적 변경**만 포함하십시오.
*   터미널 한글 깨짐 방지를 위해 `UTF-8` 인코딩 환경에서 확인하십시오.
*   커밋 전 반드시 `pre-commit-validator`를 실행하여 무결성을 검증하십시오.
