# 은진교회 웹사이트 개발 Todo List v2.0

> PRD v2.0 · TRD v2.0 기반. Next.js + shadcn/ui + Claude Code + Playwright 스택.
> 위에서 아래로 순서대로 진행한다.
> 상태: `[ ]` 미완 · `[x]` 완료 · `[-]` 스킵/보류

---

## Phase 0. 사전 준비 (개발 착수 전)

### 0-1. 콘텐츠 수집 (교회 측 제공) — 개발 완료 후 진행
- [-] 교회 전경/예배 사진 (히어로 배경용 고해상도 최소 3장)
- [-] 담임목사 프로필 사진 (정방형 고해상도)
- [-] 담임목사 인사말 텍스트
- [-] 교회 비전 및 핵심가치 텍스트
- [-] 예배 시간표 확정 (주일 1·2부·오후, 수·새벽·금요·청년·주일학교)
- [-] 교역자/사역자 프로필 (이름, 직분, 담당사역, 사진)
- [-] 각 공동체 소개 텍스트 (장년·청년·다음세대·주일학교)
- [-] 각 공동체 대표 사진
- [-] YouTube 채널 URL → Channel ID 확인
- [-] Instagram 계정 URL (미구현)
- [-] 교회 연락처 (전화번호, 이메일)
- [-] 교회 연혁 자료 (선택)
- [-] 포토 갤러리용 사진 (선택)
- [-] 새신자 안내 상세 텍스트 (선택)
- [-] 기도요청/등록 접수용 Google Form 링크 또는 이메일 (선택)

### 0-2. 레퍼런스 스크린샷 캡처
- [x] 산성교회(sansung.org) 데스크톱(1440px) 메인 페이지 전체 캡처 → `references/pages/main-full.png`
- [x] 메인 히어로 섹션 캡처 → `references/desktop/01-hero.png`
- [x] 퀵 액션 바 캡처 → `references/desktop/02-quick-actions.png`
- [x] 공동체 소개 섹션 캡처 → `references/desktop/03-community.png`
- [x] 콘텐츠 영상 그리드 캡처 → `references/desktop/04-contents.png`
- [x] 포토 앨범 갤러리 캡처 → `references/desktop/05-gallery.png`
- [x] 푸터 캡처 → `references/desktop/06-footer.png`
- [x] 스크롤 후 헤더 상태 캡처 → `references/desktop/07-header-scroll.png`
- [x] 서브페이지 히어로 배너 캡처 → `references/desktop/08-subpage-banner.png`
- [x] 모바일(390px) 메인 히어로 캡처 → `references/mobile/01-hero-mobile.png`
- [x] 모바일 사이드 메뉴 캡처 → `references/mobile/02-menu-mobile.png`
- [x] 모바일 카드 레이아웃 캡처 → `references/mobile/03-cards-mobile.png`
- [x] 태블릿(768px) 메인 전체 캡처 → `references/tablet/01-main-full.png`
- [x] 태블릿 히어로 캡처 → `references/tablet/02-hero.png`
- [x] 태블릿 메뉴 캡처 → `references/tablet/03-menu.png`

### 0-3. Google API 설정
- [x] Google Cloud Console 프로젝트 생성 (`eunjin-church-website`)
- [x] Google Drive API v3 활성화
- [x] YouTube Data API v3 활성화
- [x] Service Account 생성 및 JSON 키 다운로드
- [x] Drive 최상위 폴더 생성 (`은진교회 웹사이트/`) 및 Service Account 이메일에 뷰어 권한 공유
- [x] YouTube API Key 생성 (YouTube Data API v3만 허용으로 키 제한)
- [x] Drive 하위 폴더 구조 생성 (주보/갤러리/섬기는사람들/공동체/히어로)
- [x] 각 폴더 ID 메모

### 0-4. Kakao Maps 설정
- [x] Kakao Developers 앱 등록
- [x] JavaScript 키 발급
- [x] 배포 도메인 + localhost 플랫폼 등록
- [x] 은진교회 위도/경도 확인 (경기 의정부시 추동로 98)

### 0-5. 인프라 설정
- [x] GitHub 저장소 생성 (public)
- [x] Vercel 계정 생성 및 GitHub 연동
- [x] Vercel 프로젝트 생성 (GitHub 저장소 연결)
- [-] 도메인 구매 (예: eunjin.church) — 배포 시점에 진행
- [-] Vercel DNS 연결 및 SSL 자동 발급 확인 — 배포 시점에 진행

---

## Phase 1. 프로젝트 셋업

### 1-1. Next.js 프로젝트 초기화
- [x] `npx create-next-app@latest eunjin-church --typescript --tailwind --app --src-dir=false`
- [x] 불필요한 보일러플레이트 정리 (기본 페이지/스타일 제거)
- [x] `.env.example` 파일 작성 (모든 환경변수 목록)
- [x] `.env.local` 생성 및 API 키 입력
- [x] `.gitignore` 확인 (`.env.local`, `references/`, `screenshots/`)

### 1-2. shadcn/ui 설치 및 설정
- [x] `npx shadcn@latest init` (shadcn registry 오류로 수동 구성)
- [x] `components.json` 설정: baseColor `slate`, CSS variables `true`
- [x] 필요한 컴포넌트 설치: button, card, dialog, sheet, badge, tabs, input, separator, scroll-area
- [x] `globals.css`에 커스텀 테마 변수 설정 (Primary #1B2A4A, Accent #C9A96E 등)

### 1-3. 폰트 설정
- [x] Pretendard Variable 웹폰트 다운로드 → `public/fonts/`
- [x] `app/layout.tsx`에 `next/font/local`로 Pretendard 로드
- [x] Tailwind 4 `@theme inline`으로 `--font-sans` 확장

### 1-4. Playwright 설정
- [x] `npm install -D @playwright/test`
- [x] `npx playwright install chromium` (Chrome 채널 사용)
- [x] `playwright.config.ts` 작성
- [x] `e2e/screenshot.spec.ts` 작성 (desktop 1440 / tablet 768 / mobile 390)
- [x] `screenshots/` 디렉토리 생성
- [x] `package.json`에 `"screenshot": "npx playwright test"` 추가

### 1-5. Claude Code 설치 확인
- [x] Claude Code CLI v2.1.84 확인

### 1-6. Google Drive 유틸리티
- [x] `npm install googleapis google-auth-library`
- [x] `lib/google-drive.ts` 작성: Service Account 인증, `listFiles()`, `getFileStream()`, `readJsonFile()`, `listFolders()`
- [-] 로컬 테스트: API 키 입력 후 진행

### 1-7. YouTube 유틸리티
- [x] `lib/youtube.ts` 작성: API Key 인증, 채널 최신 영상 50개 조회, 카테고리 자동 분류 로직
- [-] 로컬 테스트: API 키 입력 후 진행

### 1-8. API Routes 기본 구현
- [x] `app/api/drive/[...path]/route.ts` — Drive 데이터 API (bulletins, gallery, staff, community, hero)
- [x] `app/api/youtube/route.ts` — YouTube 영상 목록 API
- [x] `app/api/revalidate/route.ts` — ISR 수동 재검증 웹훅
- [x] 각 API Route에 `Cache-Control: s-maxage=3600` 헤더 설정

### 1-9. 타입 정의
- [x] `lib/types.ts` — Sermon, Bulletin, Album, Photo, StaffMember, Community, HeroConfig 타입 정의

---

## Phase 2. 공통 컴포넌트 (Claude Code + Playwright 루프)

> 이 Phase부터 Claude Code + Playwright 스크린샷 루프를 적극 활용한다.
> 각 항목의 ★ 표시는 Playwright 비교 대상 레퍼런스 파일을 나타낸다.

### 2-1. 헤더/네비게이션 ★ `07-header-scroll.png`
- [x] `components/layout/header.tsx` 작성
- [x] 로고 (`next/image`) + 교회명 텍스트
- [x] 데스크톱 네비게이션 (shadcn `NavigationMenu`): 소개(3개 드롭다운) / 공동체(4개) / 미디어(3개) / 새신자 / 오시는 길
- [x] 스크롤 시 배경 투명 → `bg-primary/95 backdrop-blur` 전환 (useState + useEffect scroll 감지)
- [x] 모바일 햄버거 메뉴 (shadcn `Sheet`): 전체 메뉴 트리, 아코디언 서브메뉴
- [x] 접근성: `aria-label`, `aria-expanded`
- [x] **Claude Code + Playwright 루프로 레퍼런스와 비교 조정**

### 2-2. 푸터 ★ `06-footer.png`
- [x] `components/layout/footer.tsx` 작성
- [x] 3열 그리드: 교회 정보 / 바로가기 링크 / SNS 아이콘
- [x] YouTube 아이콘 (인라인 SVG — lucide-react 1.7.0 미지원)
- [x] 저작권 바 + 개인정보처리방침/이용약관 링크
- [x] `bg-primary text-white` 다크 배경
- [x] **Claude Code + Playwright 루프** (완료)

### 2-3. 서브 페이지 히어로 배너 ★ `08-subpage-banner.png`
- [x] `components/sections/subpage-hero.tsx` 작성 (`SubpageHero` 컴포넌트)
- [x] Props: `title`, `subtitle` (선택), `breadcrumbs`, `className` (선택)
- [x] 높이 260px(mobile) / 320px(desktop), Primary 네이비 그라디언트 + 골드 장식 요소
- [x] 브레드크럼 내비게이션 포함 (Home → 상위 → 현재)
- [ ] backgroundImage prop 지원 (next/image 연동) — 보류: 교회 사진 미제공(Phase 0-1), 서브페이지용 Drive 폴더/API 미정의. hero-section.tsx(Phase 3-1)에서 동일 패턴 구현 후 재사용 예정
- [x] **Claude Code + Playwright 루프** (시각 검증 완료)

### 2-4. 루트 레이아웃
- [x] `app/layout.tsx`: Pretendard 폰트 로드, Metadata 기본값, Header + Footer 배치
- [x] `app/globals.css`: Tailwind 커스텀 테마 변수 확정

---

## Phase 3. 메인 페이지 (Claude Code + Playwright 루프)

### 3-1. 히어로 섹션 ★ `01-hero.png`
- [ ] `components/sections/hero-section.tsx` 작성
- [ ] 풀 와이드 배경 이미지 (next/image, `fill`, `priority`)
- [ ] 어두운 그라디언트 오버레이
- [ ] 교회명 + 슬로건 텍스트 (clamp 폰트)
- [ ] 최신 설교 정보 영역 (accent 색 왼쪽 보더) — `/api/drive/hero` fetch
- [ ] CTA 버튼 2개 ("예배 영상 보기", "교회 방문하기")
- [ ] **Claude Code + Playwright 루프** (3~5회)

### 3-2. 퀵 액션 바 ★ `02-quick-actions.png`
- [ ] `components/sections/quick-actions.tsx` 작성
- [ ] `bg-primary` 배경, 5개 아이콘 버튼 (Lucide Icons + accent 원형 배경)
- [ ] 각 버튼 링크 연결 (/newcomer, /worship, /newcomer#register, /newcomer#prayer, /newcomer#serve)
- [ ] 모바일: flex-wrap으로 2행 처리 또는 가로 스크롤
- [ ] **Claude Code + Playwright 루프** (2~3회)

### 3-3. 공동체 소개 섹션 ★ `03-community.png`
- [ ] `components/sections/community-section.tsx` 작성
- [ ] 섹션 제목 + 부제 텍스트
- [ ] 3열 카드 그리드 (shadcn Card: 이미지 + 제목 + 설명)
- [ ] "공동체 둘러보기" CTA 버튼 (shadcn Button)
- [ ] 카드 hover 효과 (`hover:shadow-lg hover:-translate-y-1 transition`)
- [ ] **Claude Code + Playwright 루프** (2~3회)

### 3-4. 콘텐츠 영상 섹션 ★ `04-contents.png`
- [ ] `components/sections/content-section.tsx` 작성
- [ ] 섹션 제목 + 부제
- [ ] 4열(lg) / 2열(md) / 1열(sm) 영상 카드 그리드
- [ ] 카드: YouTube 썸네일 + 재생 아이콘 오버레이 + 제목 + 날짜
- [ ] 클릭 시 YouTube 모달 (shadcn Dialog + facade 패턴)
- [ ] `/api/youtube` fetch → 최신 4개 표시
- [ ] "더보기" 버튼 → /media/sermons 링크
- [ ] **Claude Code + Playwright 루프** (2~3회)

### 3-5. 포토 앨범 섹션 ★ `05-gallery.png`
- [ ] `components/sections/gallery-preview.tsx` 작성
- [ ] 4열 사진 그리드 (최신 앨범 8장)
- [ ] 클릭 시 라이트박스 (shadcn Dialog)
- [ ] `/api/drive/gallery` fetch → 최신 앨범 데이터
- [ ] "갤러리 더보기" 버튼 → /media/gallery 링크
- [ ] **Claude Code + Playwright 루프** (2~3회)

### 3-6. 메인 페이지 통합 ★ `main-full.png`
- [ ] `app/page.tsx`에 모든 섹션 조합
- [ ] 섹션 간 여백 조정 (`py-16 md:py-24`)
- [ ] 스크롤 등장 애니메이션 (Framer Motion 또는 Intersection Observer)
- [ ] **전체 페이지 Playwright 캡처 후 레퍼런스와 최종 비교** (3~5회)

### 3-7. YouTube 영상 모달
- [ ] `components/youtube-modal.tsx` 작성
- [ ] shadcn Dialog + YouTube iframe embed
- [ ] Facade 패턴: 모달 열릴 때만 iframe 로드
- [ ] ESC 키 닫기, 배경 클릭 닫기

### 3-8. 갤러리 라이트박스
- [ ] `components/lightbox.tsx` 작성
- [ ] shadcn Dialog 기반, 이전/다음 탐색, 키보드(좌우 화살표, ESC) 지원

---

## Phase 4. 서브 페이지

### 4-1. 교회소개 `/about`
- [x] 페이지 히어로 배너
- [ ] 담임목사 인사말 섹션 (사진 + 텍스트 2열 레이아웃)
- [ ] 비전 & 핵심가치 카드 그리드
- [ ] 교회 연혁 타임라인 (Tailwind CSS 세로 라인 + 좌우 교차)
- [ ] 교회 시설 사진 갤러리

### 4-2. 예배안내 `/worship`
- [x] 페이지 히어로 배너
- [ ] 8개 예배 카드 (shadcn Card: 예배명 + 시간 + 장소 + 설명)
- [ ] 2열(md) / 1열(sm) 그리드

### 4-3. 섬기는 사람들 `/staff`
- [ ] 페이지 히어로 배너
- [ ] 담임목사 대형 프로필 카드 (사진 + 약력 + 인사말)
- [ ] 교역자 카드 그리드 (원형 프로필 사진 + 이름 + 직분)
- [ ] `/api/drive/staff` fetch → 동적 렌더링

### 4-4. 새신자 안내 `/newcomer`
- [x] 페이지 히어로 배너
- [ ] 방문 가이드 (아이콘 + 텍스트 카드): 주차, 안내데스크, 예배 참여
- [ ] 등록 안내 스텝 UI (`id="register"`)
- [ ] 기도 요청 안내 + Google Form 링크 (`id="prayer"`)
- [ ] 봉사 참여 안내 (`id="serve"`)

### 4-5. 교회 일정 `/calendar`
- [ ] 페이지 히어로 배너
- [ ] Google Calendar iframe 임베드 (공개 캘린더)
- [ ] 모바일 높이 조정 (h-[600px] md:h-[400px])

### 4-6. 오시는 길 `/location`
- [ ] 페이지 히어로 배너
- [ ] Kakao Maps 임베드 (`useEffect`로 SDK 로드 + 마커 표시)
- [ ] 교통편 안내 3열 카드 (버스/지하철/자가용)
- [ ] 주소 + 연락처 텍스트

---

## Phase 5. 공동체 & 미디어 페이지

### 5-1. 공동체 공통 레이아웃 (4페이지 동일 패턴)
- [ ] 공통 레이아웃 컴포넌트 또는 패턴 정의
  - 페이지 히어로 배너 (각 공동체 대표 이미지)
  - 소개 텍스트 + 모임 일정 + 담당자
  - 활동 사진 갤러리 그리드
  - `/api/drive/community` fetch → 동적 렌더링
- [ ] `/community/senior` — 장년 공동체
- [ ] `/community/youth` — 청년 공동체
- [ ] `/community/nextgen` — 다음세대
- [ ] `/community/sunday-school` — 주일학교

### 5-2. 설교 영상 `/media/sermons`
- [ ] 페이지 히어로 배너
- [ ] 카테고리 필터 탭 (shadcn Tabs: 전체/주일설교/수요설교/새벽말씀/특별집회)
- [ ] 제목 검색 (shadcn Input)
- [ ] 영상 카드 그리드 (썸네일 + 제목 + 날짜 + 카테고리 Badge)
- [ ] 클릭 시 YouTube 모달 (facade 패턴)
- [ ] `/api/youtube` fetch → 전체 목록

### 5-3. 콘텐츠 `/media/contents`
- [ ] 페이지 히어로 배너
- [ ] 찬양/기도/간증/스토리 영상 카드 그리드
- [ ] sermons 페이지와 동일한 카드 + 모달 재사용

### 5-4. 포토 갤러리 `/media/gallery`
- [ ] 페이지 히어로 배너
- [ ] 앨범 목록 뷰: 앨범 카드 그리드 (커버 이미지 + 제목 + 날짜 + 사진 수)
- [ ] 앨범 클릭 시 → 사진 그리드 표시 (URL 상태 관리 또는 `useState`)
- [ ] 라이트박스: 클릭/ESC/좌우키/모바일 스와이프
- [ ] Lazy loading (next/image 자동) + 무한 스크롤 (12장씩)
- [ ] `/api/drive/gallery` fetch

---

## Phase 6. SEO & 성능 최적화

### 6-1. SEO
- [ ] 모든 페이지 Metadata 설정 (title template: `%s | 은진교회`)
- [ ] 모든 페이지 고유 description
- [ ] 모든 이미지 alt 텍스트
- [ ] Open Graph 태그 페이지별 적용 (generateMetadata 함수)
- [ ] Schema.org Church JSON-LD (`components/church-jsonld.tsx`)
- [ ] `app/sitemap.ts` 자동 생성
- [ ] `app/robots.ts` 생성
- [ ] 네이버 서치어드바이저 메타태그 추가
- [ ] Canonical URL 설정

### 6-2. 성능 최적화
- [ ] 모든 이미지 `next/image` 사용 확인 (자동 WebP/lazy loading)
- [ ] 히어로 이미지 `priority={true}` 적용
- [ ] YouTube facade 패턴 전체 적용 확인
- [ ] 동적 import로 무거운 컴포넌트 지연 로드 (`dynamic(() => import(...))`)
- [ ] `next.config.ts`에 이미지 도메인 설정 (Google Drive, YouTube 썸네일)
- [ ] Vercel Analytics 활성화 (선택)

### 6-3. 접근성 (WCAG 2.1 AA)
- [ ] shadcn/ui 컴포넌트 기본 접근성 확인 (Radix UI 기반)
- [ ] Skip navigation 링크 추가
- [ ] 모든 인터랙티브 요소 focus 스타일 확인
- [ ] 모달/라이트박스 focus trap 동작 확인 (shadcn Dialog 내장)
- [ ] 색상 대비 비율 검증 (Primary #1B2A4A 기준 AA 이상)

---

## Phase 7. 배포 및 QA

### 7-1. Vercel 배포 설정
- [ ] Vercel Project Settings에 환경변수 등록 (12개)
- [ ] Framework Preset: Next.js 확인
- [ ] Build Command: `next build` (기본값)
- [ ] 도메인 연결 및 HTTPS 확인
- [ ] Preview Deployment 동작 확인 (PR 생성 시)

### 7-2. 기능 테스트
- [ ] Google Drive 파일 업로드 → 1시간 내 사이트 반영 확인
- [ ] `/api/revalidate` 웹훅 → 즉시 반영 확인
- [ ] 주보 PDF 업로드 → 목록 표시
- [ ] 갤러리 폴더 + 사진 업로드 → 앨범 표시
- [ ] hero-config.json 수정 → 히어로 설교 정보 변경
- [ ] YouTube 영상 → 설교 목록 갱신
- [ ] 갤러리 라이트박스: 열기/닫기/이전/다음/ESC/스와이프
- [ ] 설교 모달: 재생/닫기/ESC
- [ ] Kakao Maps 지도 및 마커 표시
- [ ] Google Calendar 임베드 표시
- [ ] 네비게이션 전체 링크 (데스크톱 드롭다운 + 모바일 Sheet)
- [ ] 퀵 액션 버튼 링크 (앵커 포함)

### 7-3. Playwright 최종 스크린샷 비교
- [ ] Desktop 1440px: 메인 페이지 전체 vs `references/pages/main-full.png`
- [ ] Mobile 390px: 메인 페이지 전체
- [ ] 주요 서브 페이지 (about, worship, gallery) 데스크톱/모바일
- [ ] 레퍼런스와 90%+ 유사도 달성 확인

### 7-4. 반응형 테스트
- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (393px)
- [ ] Galaxy S 시리즈 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1280px / 1440px / 1920px

### 7-5. 크로스 브라우저 테스트
- [ ] Chrome (Desktop / Android)
- [ ] Safari (Desktop / iOS)
- [ ] Edge (Desktop)
- [ ] Samsung Internet

### 7-6. 성능 테스트 (Lighthouse)
- [ ] Performance 90+
- [ ] Accessibility 90+
- [ ] Best Practices 90+
- [ ] SEO 90+
- [ ] FCP < 1.2s
- [ ] LCP < 2.0s
- [ ] CLS < 0.1

### 7-7. 콘텐츠 최종 입력
- [ ] 모든 placeholder 텍스트 → 실제 콘텐츠 교체
- [ ] 예배 시간표 확정 값 입력
- [ ] 교역자 프로필 사진/정보 → Drive staff.json 업로드
- [ ] 공동체 소개 → Drive community/info.json 업로드
- [ ] 초기 주보/갤러리 콘텐츠 → Drive 업로드
- [ ] YouTube 채널 ID, API Key 실제 값
- [ ] Kakao Maps 실제 좌표
- [ ] Google Calendar 공개 캘린더 ID
- [ ] SNS 링크 실제 URL
- [ ] 연락처 실제 값 (전화번호, 이메일)
- [ ] OG 이미지 제작 및 `/public/images/og-image.jpg` 배치
- [ ] favicon.ico 제작 및 배치

### 7-8. 법적 페이지
- [ ] 개인정보처리방침 페이지 (`/privacy`)
- [ ] 이용약관 페이지 (`/terms`)

---

## Phase 8. 런칭 후

- [ ] Google Search Console 등록 및 sitemap.xml 제출
- [ ] 네이버 서치어드바이저 등록 및 sitemap.xml 제출
- [ ] 교회 담당자 콘텐츠 운영 가이드 문서 작성 (Drive 업로드 방법 3단계)
- [ ] Vercel Deployment Protection 설정 (선택)
- [ ] 정기 모니터링: Vercel Analytics 대시보드 확인
- [ ] Dependabot 또는 Renovate 활성화 (의존성 자동 업데이트)
- [ ] 긴급 반영 가이드: `/api/revalidate` 웹훅 호출 방법 문서화
