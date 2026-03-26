# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

은진교회 공식 웹사이트. Next.js 15 (App Router) + shadcn/ui + TypeScript + Tailwind CSS 4. Google Drive를 CMS로 사용하며 Vercel에 배포. 디자인 레퍼런스는 sansung.org이며 Claude Code + Playwright 스크린샷 반복 루프로 개발.

> 상세 스펙은 `docs/` 참고:
> - 요구사항·디자인·사이트맵 → `docs/은진교회_웹사이트_PRD_v2.md`
> - 아키텍처·API·환경변수·코드 패턴 → `docs/은진교회_웹사이트_TRD_v2.md`
> - 개발 단계별 체크리스트 → `docs/은진교회_웹사이트_TodoList_v2.md`

## Commands

```bash
npm run dev        # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint
npm run screenshot # Playwright 전체 스크린샷 (npx playwright test)
npx playwright test --grep 'hero'  # 특정 섹션만 캡처
```

## Architecture

```
Google Drive (CMS) → /api/drive/[...path] → Pages (RSC, ISR 1h)
YouTube API        → /api/youtube         → Pages (RSC, ISR 1h)
```

- `components/ui/` — shadcn/ui 자동 생성 파일. 직접 수정 금지.
- `references/` / `screenshots/` — gitignore. Playwright 비교용.

## Design System (변경 불가)

| 항목 | 값 |
|------|-----|
| Primary | `#1B2A4A` (딥 네이비) |
| Accent | `#C9A96E` (소프트 골드) |
| Background | `#F5F5F5` |
| Font | Pretendard Variable (`font-sans`) |
