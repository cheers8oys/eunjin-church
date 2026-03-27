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

## File Structure (준수 필수)

```
app/
├── layout.tsx / page.tsx / globals.css
├── (각 라우트)/page.tsx        ← 서브페이지는 app/ 하위 폴더로 추가
└── api/(기능명)/route.ts       ← API 라우트

components/
├── layout/                    ← header.tsx, footer.tsx
├── sections/                  ← 메인 페이지 섹션 컴포넌트
├── common/                    ← 여러 페이지에서 공용으로 쓰는 컴포넌트 (모달 등)
└── ui/                        ← shadcn/ui 자동생성 — 직접 수정 금지

lib/
├── types.ts                   ← 모든 TypeScript 인터페이스 정의
├── utils.ts                   ← cn() 등 범용 헬퍼
├── google-drive.ts            ← Google Drive API 래퍼
└── youtube.ts                 ← YouTube API 래퍼

public/
├── images/                    ← 모든 이미지 파일
└── fonts/                     ← 폰트 파일

scripts/                       ← 개발용 일회성 스크립트 (빌드/배포에 포함 안 됨)
e2e/                           ← Playwright 스크린샷 테스트
docs/                          ← PRD / TRD / 체크리스트
```

### 파일 배치 규칙

- **새 페이지** → `app/(라우트명)/page.tsx`
- **새 섹션 컴포넌트** → `components/sections/(이름).tsx`
- **여러 곳에서 쓰는 공용 컴포넌트** (모달, 카드 등) → `components/common/(이름).tsx`
- **타입 정의** → 모두 `lib/types.ts`에 추가 (파일 분산 금지)
- **이미지** → `public/images/` (루트에 직접 두지 않음)
- **개발 스크립트** → `scripts/` (루트에 직접 두지 않음)

### 테스트 배치 규칙 (co-location)

각 컴포넌트 폴더 바로 아래 `__tests__/` 폴더에 위치:
```
components/layout/__tests__/header.test.tsx
components/sections/__tests__/hero-section.test.tsx
components/common/__tests__/lightbox.test.tsx
app/__tests__/page.test.tsx
```

- `__mocks__/` — 루트에 위치 (Jest 규약)
- `e2e/` — Playwright 전용 (Jest testMatch에서 제외)

- `references/` / `screenshots/` — gitignore. Playwright 비교용.

## Design System (변경 불가)

> **디자인 방향**: 흰색·따뜻한 크림 배경 주도. 네이비(`#1B2A4A`)는 버튼·강조 포인트에만 사용. 레퍼런스: sansung.org

| 항목 | 값 | 용도 |
|------|-----|------|
| Primary | `#1B2A4A` (딥 네이비) | 버튼, 강조 텍스트, 링크 hover — 배경 금지 |
| Accent | `#C9A96E` (소프트 골드) | 장식선, 포인트 요소 |
| Background | `#FFFFFF` (흰색) | 기본 배경 |
| Section-warm | `#FAF8F5` (따뜻한 크림) | 짝수 섹션, 서브페이지 배너 배경 |
| Font | Pretendard Variable (`font-sans`) | 전체 |
