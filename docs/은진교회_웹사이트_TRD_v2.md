# 은진교회 웹사이트 TRD (Technical Requirements Document)

**문서 버전:** v2.0  
**작성일:** 2026년 3월 26일  
**이전 버전:** v1.0 (2026-03-25) — HTML/CSS/JS + Netlify + GitHub Actions → Next.js + Vercel + ISR  
**기반 문서:** 은진교회 웹사이트 PRD v2.0  
**참고 사이트:** [산성교회 대전&세종](https://www.sansung.org/main)

---

## 1. 아키텍처 개요

### 1.1 시스템 구성도

```
┌──────────────────────────────────────────────────────────────┐
│                       콘텐츠 운영 흐름                         │
│                                                              │
│  ┌───────────────┐     ┌──────────────┐     ┌────────────┐  │
│  │ Google Drive   │────▶│ Next.js API  │────▶│   Vercel   │  │
│  │ (콘텐츠 저장소)  │     │  Routes+ISR  │     │  (호스팅)   │  │
│  └───────────────┘     └──────────────┘     └────────────┘  │
│         ▲                                          │        │
│         │                                          ▼        │
│  ┌───────────────┐     ┌──────────────┐     ┌────────────┐  │
│  │ 교회 담당자     │     │ YouTube API  │     │ 사용자 접속  │  │
│  │ (파일 업로드)   │     │ (설교 영상)   │     │ (웹브라우저) │  │
│  └───────────────┘     └──────────────┘     └────────────┘  │
│                                                              │
│  ┌───────────────┐     ┌──────────────┐                     │
│  │ Claude Code    │     │  Playwright  │                     │
│  │ (코드 생성)    │◀───▶│ (스크린샷 비교)│                     │
│  └───────────────┘     └──────────────┘                     │
│         ▲                                                    │
│  ┌───────────────┐                                          │
│  │ 레퍼런스 이미지  │                                          │
│  │ (산성교회 캡처)  │                                          │
│  └───────────────┘                                          │
└──────────────────────────────────────────────────────────────┘
```

### 1.2 핵심 설계 원칙

- **Google Drive as CMS:** 어드민 페이지 없이 Drive 폴더에 파일 업로드 → 사이트 자동 반영
- **ISR (Incremental Static Regeneration):** 정적 생성 + 주기적 재검증으로 빠른 로딩과 실시간성 균형
- **Claude Code + Playwright 루프:** 레퍼런스 스크린샷과 비교하며 반복 수정하여 디자인 완성도 극대화
- **shadcn/ui 컴포넌트:** 일관된 UI + 빠른 개발 + Radix UI 기반 접근성

### 1.3 v1.0 대비 주요 변경사항

| 항목 | v1.0 (기존) | v2.0 (현재) |
|------|------|------|
| 프레임워크 | 없음 (Vanilla HTML/CSS/JS) | Next.js 15 (App Router) |
| UI 라이브러리 | 수작업 CSS | shadcn/ui + Tailwind CSS |
| 호스팅 | Netlify | Vercel |
| 데이터 갱신 | GitHub Actions 6시간 스케줄 빌드 | ISR revalidate (1시간) + 웹훅 즉시 반영 |
| 이미지 처리 | sharp 빌드 스크립트 (수동) | Next.js Image 자동 최적화 |
| 개발 방식 | 수동 코딩 | Claude Code + Playwright 스크린샷 루프 |
| 빌드 파이프라인 | 6개 빌드 스크립트 | Next.js 내장 빌드 + API Route |

---

## 2. 기술 스택 상세

### 2.1 프론트엔드

| 구분 | 기술 | 버전 | 용도 |
|------|------|------|------|
| 프레임워크 | Next.js | 15.x | App Router, RSC, ISR |
| 언어 | TypeScript | 5.x | 타입 안정성 |
| UI 컴포넌트 | shadcn/ui | latest | Card, Dialog, Sheet, NavigationMenu 등 |
| 스타일 | Tailwind CSS | 4.x | 유틸리티 클래스, 반응형 |
| 폰트 | Pretendard | Variable | next/font/local 로드 |
| 아이콘 | Lucide React | latest | 네비게이션, 퀵 액션 아이콘 |
| 애니메이션 | Framer Motion (선택) | latest | 스크롤 등장, 페이지 전환 |

### 2.2 백엔드 (Next.js API Routes)

| 구분 | 기술 | 용도 |
|------|------|------|
| Drive 연동 | googleapis (google-auth-library) | Google Drive API v3 파일 조회/다운로드 |
| YouTube 연동 | googleapis | YouTube Data API v3 영상 목록 |
| 이미지 처리 | Next.js Image (자동) | WebP 변환, 리사이즈, lazy loading |
| 캐시 | Next.js ISR | revalidate 기반 증분 정적 재생성 |

### 2.3 인프라

| 구분 | 기술 | 비고 |
|------|------|------|
| 호스팅 | Vercel | Hobby 플랜 무료 (월 100GB 대역폭) |
| 저장소 | GitHub | 소스코드 관리 |
| CI/CD | Vercel 자동 배포 | main push 시 자동 빌드/배포 |
| 도메인 | 별도 구매 | Vercel DNS 연결 |
| SSL | Vercel 자동 발급 | Let's Encrypt |

### 2.4 개발 도구

| 구분 | 기술 | 용도 |
|------|------|------|
| Claude Code | @anthropic-ai/claude-code | AI 코드 생성 (터미널 CLI) |
| Playwright | @playwright/test | 스크린샷 캡처, 레퍼런스 비교 |
| ESLint | next/eslint | 코드 품질 |
| Prettier | prettier | 코드 포맷팅 |

### 2.5 외부 서비스

| 서비스 | 용도 | 인증 방식 | 비용 |
|------|------|------|------|
| Google Drive API v3 | 주보/갤러리/설정 | Service Account | 무료 |
| YouTube Data API v3 | 설교 영상 목록 | API Key | 무료 (일 10,000유닛) |
| Google Calendar (임베드) | 교회 일정 | 공개 캘린더 iframe | 무료 |
| Kakao Maps JS API | 오시는 길 지도 | App Key | 무료 (일 300,000회) |

---

## 3. Claude Code + Playwright 개발 워크플로우

### 3.1 개요

레퍼런스 사이트(산성교회)의 디자인을 최대한 재현하기 위해, 스크린샷 기반 반복 루프를 사용한다.

```
레퍼런스 이미지 → Claude Code가 코드 생성 → 
Playwright 스크린샷 → 비교 → 차이점 수정 → 반복
```

### 3.2 레퍼런스 스크린샷 준비

산성교회 사이트에서 캡처할 섹션 목록:

```
📁 references/
├── 📁 desktop/               ← 1440px 뷰포트
│   ├── 01-hero.png           ← 메인 히어로 (풀 와이드 배경 + 설교 정보)
│   ├── 02-quick-actions.png  ← 퀵 액션 버튼 바
│   ├── 03-community.png     ← 공동체 소개 카드 섹션
│   ├── 04-contents.png      ← 콘텐츠 영상 카드 그리드
│   ├── 05-gallery.png       ← 포토 앨범 그리드
│   ├── 06-footer.png        ← 푸터
│   ├── 07-header-scroll.png ← 스크롤 후 헤더 상태
│   └── 08-subpage-banner.png ← 서브페이지 히어로 배너
├── 📁 mobile/                ← 390px 뷰포트
│   ├── 01-hero-mobile.png
│   ├── 02-menu-mobile.png   ← 모바일 사이드 메뉴
│   └── 03-cards-mobile.png
└── 📁 pages/                 ← 전체 페이지 캡처
    ├── main-full.png
    ├── about-full.png
    └── worship-full.png
```

### 3.3 Playwright 스크린샷 스크립트

```typescript
// e2e/screenshot.spec.ts
import { test } from '@playwright/test';

const pages = [
  { path: '/', name: 'main' },
  { path: '/about', name: 'about' },
  { path: '/worship', name: 'worship' },
  { path: '/staff', name: 'staff' },
  { path: '/newcomer', name: 'newcomer' },
  { path: '/location', name: 'location' },
  { path: '/media/gallery', name: 'gallery' },
  { path: '/media/sermons', name: 'sermons' },
];

for (const { path, name } of pages) {
  test(`screenshot ${name} - desktop`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:3000${path}`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `screenshots/desktop/${name}.png`,
      fullPage: true
    });
  });

  test(`screenshot ${name} - mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:3000${path}`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `screenshots/mobile/${name}.png`,
      fullPage: true
    });
  });
}
```

### 3.4 Claude Code 프롬프트 패턴

섹션별로 진행하며, 각 프롬프트는 다음 패턴을 따른다:

```bash
# 1단계: 섹션 구현
claude "references/desktop/01-hero.png 이미지를 참고해서
app/(main)/page.tsx에 히어로 섹션을 구현해줘.
- 교회명: 은진교회
- 슬로건: 은혜와 진리가 충만한 교회
- Primary 컬러: #1B2A4A, Accent: #C9A96E
- shadcn/ui 컴포넌트와 Tailwind CSS 사용
- 반응형 (모바일 대응)
완성되면 npx playwright test --grep 'hero' 실행해서
screenshots/에 저장한 후 references/ 이미지와 비교하고,
차이가 있으면 수정해줘. 만족스러울 때까지 반복."

# 2단계: 전체 페이지 통합 후 비교
claude "references/pages/main-full.png과 
screenshots/desktop/main.png을 비교해서
차이점을 찾아 수정해줘. 특히:
- 섹션 간 여백
- 폰트 크기/굵기
- 카드 그림자/둥글기
- 전체적인 색감 톤
반복해서 최대한 비슷하게 맞춰줘."
```

### 3.5 섹션별 개발 순서

| 순서 | 섹션 | 레퍼런스 파일 | 예상 반복 횟수 |
|------|------|------|------|
| 1 | 헤더 + 네비게이션 | `07-header-scroll.png` | 3~5회 |
| 2 | 히어로 섹션 | `01-hero.png` | 3~5회 |
| 3 | 퀵 액션 바 | `02-quick-actions.png` | 2~3회 |
| 4 | 공동체 카드 섹션 | `03-community.png` | 2~3회 |
| 5 | 콘텐츠 영상 그리드 | `04-contents.png` | 2~3회 |
| 6 | 포토 앨범 갤러리 | `05-gallery.png` | 2~3회 |
| 7 | 푸터 | `06-footer.png` | 2~3회 |
| 8 | 모바일 메뉴 | `02-menu-mobile.png` | 2~3회 |
| 9 | 서브 페이지 배너 | `08-subpage-banner.png` | 1~2회 |
| 10 | 전체 통합 미세 조정 | `main-full.png` | 3~5회 |

---

## 4. 프로젝트 구조

```
📁 eunjin-church/
├── 📁 app/
│   ├── layout.tsx                 ← 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx                   ← 메인 페이지
│   ├── globals.css                ← Tailwind + 커스텀 테마 변수
│   ├── 📁 about/
│   │   └── page.tsx
│   ├── 📁 worship/
│   │   └── page.tsx
│   ├── 📁 staff/
│   │   └── page.tsx
│   ├── 📁 newcomer/
│   │   └── page.tsx
│   ├── 📁 calendar/
│   │   └── page.tsx
│   ├── 📁 location/
│   │   └── page.tsx
│   ├── 📁 community/
│   │   ├── 📁 senior/page.tsx
│   │   ├── 📁 youth/page.tsx
│   │   ├── 📁 nextgen/page.tsx
│   │   └── 📁 sunday-school/page.tsx
│   ├── 📁 media/
│   │   ├── 📁 sermons/page.tsx
│   │   ├── 📁 contents/page.tsx
│   │   └── 📁 gallery/page.tsx
│   └── 📁 api/
│       ├── 📁 drive/
│       │   └── [...path]/route.ts  ← Google Drive 데이터 API
│       ├── 📁 youtube/
│       │   └── route.ts            ← YouTube 영상 목록 API
│       └── 📁 revalidate/
│           └── route.ts            ← ISR 수동 재검증 웹훅
│
├── 📁 components/
│   ├── 📁 layout/
│   │   ├── header.tsx              ← 네비게이션 + 모바일 메뉴
│   │   ├── footer.tsx              ← 푸터
│   │   └── page-hero.tsx           ← 서브 페이지 배너
│   ├── 📁 sections/
│   │   ├── hero-section.tsx        ← 메인 히어로
│   │   ├── quick-actions.tsx       ← 퀵 액션 바
│   │   ├── community-section.tsx   ← 공동체 소개
│   │   ├── content-section.tsx     ← 콘텐츠 영상 그리드
│   │   └── gallery-preview.tsx     ← 포토 앨범 프리뷰
│   ├── 📁 ui/                      ← shadcn/ui 컴포넌트 (자동 생성)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── navigation-menu.tsx
│   │   └── ...
│   ├── youtube-modal.tsx           ← YouTube 영상 모달
│   ├── lightbox.tsx                ← 갤러리 라이트박스
│   └── gallery-grid.tsx            ← 갤러리 그리드
│
├── 📁 lib/
│   ├── google-drive.ts             ← Drive API 유틸리티
│   ├── youtube.ts                  ← YouTube API 유틸리티
│   ├── types.ts                    ← TypeScript 타입 정의
│   └── utils.ts                    ← 공통 유틸리티 (cn 함수 등)
│
├── 📁 references/                   ← 레퍼런스 스크린샷 (gitignore)
│   ├── 📁 desktop/
│   └── 📁 mobile/
│
├── 📁 screenshots/                  ← Playwright 캡처 결과 (gitignore)
│
├── 📁 e2e/
│   └── screenshot.spec.ts          ← Playwright 스크린샷 테스트
│
├── 📁 public/
│   ├── 📁 images/
│   │   └── logo.jpeg
│   └── favicon.ico
│
├── .env.local                       ← API 키 (gitignore)
├── .env.example                     ← 환경변수 목록
├── next.config.ts
├── tailwind.config.ts
├── playwright.config.ts
├── components.json                  ← shadcn/ui 설정
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. Google Drive 연동 (Next.js API Route + ISR)

### 5.1 아키텍처 변경 (v1.0 → v2.0)

```
v1.0: GitHub Actions (6시간마다) → 빌드 스크립트 → 정적 JSON → 배포
v2.0: Next.js API Route → Drive API 직접 호출 → ISR 캐시 (1시간) → 요청 시 갱신
```

장점: GitHub Actions 불필요, 빌드 스크립트 6개 제거, 반영 속도 향상 (최대 1시간)

### 5.2 Drive API 유틸리티 (lib/google-drive.ts)

```typescript
// 핵심 로직 (의사 코드)
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// 폴더 내 파일 목록 조회
export async function listFiles(folderId: string) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, modifiedTime, thumbnailLink, webContentLink)',
    orderBy: 'modifiedTime desc',
  });
  return res.data.files;
}

// 파일 다운로드 URL 생성 (이미지 프록시용)
export async function getFileStream(fileId: string) {
  return drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
}

// JSON 파일 읽기
export async function readJsonFile(fileId: string) {
  const res = await drive.files.get({ fileId, alt: 'media' });
  return res.data;
}
```

### 5.3 API Route 예시 (app/api/drive/[...path]/route.ts)

```typescript
import { NextResponse } from 'next/server';
import { listFiles, readJsonFile } from '@/lib/google-drive';

const FOLDER_IDS = {
  bulletins: process.env.DRIVE_BULLETIN_FOLDER_ID!,
  gallery: process.env.DRIVE_GALLERY_FOLDER_ID!,
  staff: process.env.DRIVE_STAFF_FOLDER_ID!,
  community: process.env.DRIVE_COMMUNITY_FOLDER_ID!,
  hero: process.env.DRIVE_HERO_FOLDER_ID!,
};

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const [type] = params.path;

  switch (type) {
    case 'bulletins':
      const bulletins = await listFiles(FOLDER_IDS.bulletins);
      return NextResponse.json({ bulletins }, {
        headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' }
      });
    case 'gallery':
      // 갤러리 폴더 → 앨범 목록 → 각 앨범 내 사진 목록
      // ...
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
```

### 5.4 ISR 활용 (페이지에서)

```typescript
// app/media/gallery/page.tsx
async function getGalleryData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/drive/gallery`, {
    next: { revalidate: 3600 } // 1시간마다 재검증
  });
  return res.json();
}

export default async function GalleryPage() {
  const data = await getGalleryData();
  return <GalleryGrid albums={data.albums} />;
}
```

### 5.5 수동 재검증 웹훅 (app/api/revalidate/route.ts)

```typescript
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { secret, paths } = await request.json();
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  for (const path of paths) {
    revalidatePath(path);
  }
  return NextResponse.json({ revalidated: true });
}
```

---

## 6. YouTube 연동

### 6.1 API Route (app/api/youtube/route.ts)

```typescript
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  const res = await youtube.search.list({
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    part: ['snippet'],
    order: 'date',
    maxResults: 50,
    type: ['video'],
  });

  const sermons = res.data.items?.map(item => ({
    id: item.id?.videoId,
    title: item.snippet?.title,
    description: item.snippet?.description,
    thumbnail: item.snippet?.thumbnails?.high?.url,
    publishedAt: item.snippet?.publishedAt,
  }));

  return NextResponse.json({ sermons }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' }
  });
}
```

---

## 7. shadcn/ui 컴포넌트 활용 계획

| 컴포넌트 | 용도 |
|------|------|
| `NavigationMenu` | 데스크톱 헤더 네비게이션 + 드롭다운 |
| `Sheet` | 모바일 사이드 메뉴 (슬라이드) |
| `Card` | 공동체 카드, 영상 카드, 예배 카드, 스태프 카드 |
| `Dialog` | YouTube 영상 모달, 갤러리 라이트박스 |
| `Button` | CTA 버튼, 퀵 액션 버튼 |
| `Badge` | 설교 카테고리 뱃지 |
| `Tabs` | 설교 카테고리 필터 탭 |
| `Input` | 설교 제목 검색 |
| `Select` | 주보 연/월 필터 드롭다운 |
| `Separator` | 섹션 구분선 |
| `ScrollArea` | 모바일 메뉴 내부 스크롤 |

---

## 8. Tailwind CSS 테마 설정

### 8.1 globals.css 커스텀 테마

```css
@theme inline {
  --color-primary: #1B2A4A;          /* 버튼·강조 포인트 — 배경 금지 */
  --color-primary-foreground: #ffffff;
  --color-accent: #C9A96E;           /* 소프트 골드 */
  --color-accent-foreground: #3a2a0e;
  --color-background: #FFFFFF;       /* 흰색 기본 배경 */
  --color-section-warm: #FAF8F5;     /* 따뜻한 크림 — 짝수 섹션·서브페이지 배너 */
  --color-foreground: #1A1A1A;       /* 본문 텍스트 */
  --color-muted: #6B7280;
  --color-muted-foreground: #6B7280;
  --color-border: #E0E0E0;
  --color-card: #ffffff;
  --color-card-foreground: #1A1A1A;
  --color-secondary: #ffffff;
  --color-secondary-foreground: #1B2A4A;
  --radius: 0.75rem;
}
```

### 8.2 tailwind.config.ts 확장

```typescript
// Pretendard 폰트 패밀리
fontFamily: {
  sans: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
},
// 커스텀 컬러 (shadcn/ui 테마 외 추가)
colors: {
  church: {
    navy: '#1B2A4A',
    gold: '#C9A96E',
  }
}
```

---

## 9. SEO 및 메타데이터

### 9.1 Next.js Metadata API

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: '은진교회', template: '%s | 은진교회' },
  description: '은진교회 — 은혜와 진리가 충만한 교회. 경기 의정부시 추동로 98',
  keywords: ['은진교회', '의정부교회', '은혜와진리', '유창재목사'],
  openGraph: {
    siteName: '은진교회',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};
```

### 9.2 구조화 데이터 (JSON-LD)

```typescript
// components/church-jsonld.tsx
export function ChurchJsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Church',
        name: '은진교회',
        description: '은혜와 진리가 충만한 교회',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '추동로 98',
          addressLocality: '의정부시',
          addressRegion: '경기도',
          addressCountry: 'KR',
        },
      })
    }} />
  );
}
```

### 9.3 Sitemap 및 Robots

```typescript
// app/sitemap.ts (Next.js 자동 생성)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://eunjin.church', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://eunjin.church/about', changeFrequency: 'monthly', priority: 0.8 },
    // ... 모든 페이지
  ];
}
```

---

## 10. 성능 최적화

### 10.1 성능 목표

| 지표 | 목표 |
|------|------|
| Lighthouse Performance | 90+ |
| FCP | < 1.2s |
| LCP | < 2.0s |
| CLS | < 0.1 |

### 10.2 최적화 전략

| 전략 | 구현 방식 |
|------|------|
| 이미지 최적화 | `next/image` 자동 WebP/AVIF, srcSet, lazy loading |
| 폰트 최적화 | `next/font/local` Pretendard, swap display |
| YouTube 지연 로드 | Facade 패턴 (썸네일 클릭 시에만 iframe) |
| 코드 분할 | Next.js 자동 code splitting + dynamic import |
| ISR 캐시 | 정적 페이지 CDN 캐시, API 1시간 revalidate |
| Vercel Edge | 글로벌 CDN, 자동 압축 (gzip/brotli) |

---

## 11. 환경변수

### 11.1 .env.local (로컬 개발)

```env
# Google API
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
DRIVE_BULLETIN_FOLDER_ID=xxx
DRIVE_GALLERY_FOLDER_ID=xxx
DRIVE_STAFF_FOLDER_ID=xxx
DRIVE_COMMUNITY_FOLDER_ID=xxx
DRIVE_HERO_FOLDER_ID=xxx

# YouTube
YOUTUBE_API_KEY=xxx
YOUTUBE_CHANNEL_ID=xxx

# Kakao Maps
NEXT_PUBLIC_KAKAO_MAP_KEY=xxx

# Revalidation
REVALIDATION_SECRET=xxx

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 11.2 Vercel 환경변수

위 `.env.local`의 모든 변수를 Vercel Project Settings → Environment Variables에 등록. `NEXT_PUBLIC_BASE_URL`은 프로덕션 도메인으로 설정.

---

## 12. 보안 고려사항

| 항목 | 대응 |
|------|------|
| API 키 노출 | 서버 사이드(API Route)에서만 사용, 클라이언트 비노출 |
| Kakao Maps Key | `NEXT_PUBLIC_` 접두사, 도메인 제한 설정으로 보호 |
| HTTPS | Vercel 자동 SSL |
| Revalidation | Secret 토큰으로 보호 |
| 입력 폼 | Google Form 외부 링크 방식 |
| CSP | next.config.ts에 Content-Security-Policy 헤더 설정 |

---

## 13. 배포 프로세스

```
1. GitHub main 브랜치에 push
2. Vercel 자동 감지 → 빌드 트리거
3. Next.js 빌드 (정적 페이지 생성 + API Route 번들)
4. Vercel CDN에 배포
5. 완료 (평균 1~2분)
```

Preview 배포: PR 생성 시 자동 Preview URL 생성 (Vercel 기본 기능)

---

## 14. 테스트 체크리스트

### 14.1 기능 테스트
- [ ] Google Drive 파일 업로드 → ISR 갱신 → 사이트 반영 확인
- [ ] 주보 PDF 업로드 → 주보 목록 표시
- [ ] 갤러리 폴더 + 사진 업로드 → 앨범 표시
- [ ] hero-config.json 수정 → 히어로 설교 정보 변경
- [ ] YouTube 영상 → 설교 목록 갱신
- [ ] `/api/revalidate` 웹훅 → 즉시 반영 확인
- [ ] 갤러리 라이트박스, 설교 모달, 지도, 캘린더

### 14.2 반응형/브라우저/성능 테스트
- [ ] Playwright 스크린샷 비교 (Desktop 1440px, Mobile 390px)
- [ ] Chrome, Safari, Edge, Samsung Internet
- [ ] Lighthouse 90+ (Performance, Accessibility, SEO)
