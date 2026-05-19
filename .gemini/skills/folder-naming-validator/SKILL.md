---
name: folder-naming-validator
description: 프로젝트 내의 폴더명이 소문자와 하이픈을 사용한 kebab-case인지 검사합니다.
---

# Folder Naming Validator

이 스킬은 프로젝트 내 모든 폴더의 명명 규칙을 검증합니다.

## 명명 규칙

*   **권장 형식**: `kebab-case` (예: `user-profile`, `main-navigation`)
*   **비권장 형식**: `PascalCase`, `camelCase`, `snake_case` (대문자나 언더바 포함 시 경고)

## 사용 방법

```bash
node scripts/check_folder_names.cjs [path]
```

## 검사 대상 제외
*   `.`으로 시작하는 숨김 폴더 (`.git`, `.next`, `.gemini` 등)
*   `node_modules`
