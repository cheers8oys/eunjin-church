# TTDL — Phase 3·4 TDD 개발 목록

> **TDD 사이클:** Red → Green → Playwright 시각 검증
> **규칙:**
> - 테스트 작성 후 구현. 구현 없이 테스트만 먼저 작성해도 됨
> - 각 단위가 독립적으로 테스트 가능해야 함
> - API 데이터에 의존하는 컴포넌트는 `props`로 받아 테스트 가능하게 설계
> - 상태: `[ ]` 미완 · `[x]` 완료
>
> **테스트 파일 위치:** `components/sections/__tests__/`, `components/__tests__/`, `app/__tests__/`

---

## Phase 3. 메인 페이지

---

### 3-7. YouTube 영상 모달 ← 3-4보다 먼저 구현

**파일:**
- 컴포넌트: `components/youtube-modal.tsx`
- 테스트: `components/__tests__/youtube-modal.test.tsx`

```
[x] 3-7-A 테스트 작성 (components/__tests__/youtube-modal.test.tsx, 6개 테스트)
    - open=true + videoId 전달 시 iframe이 렌더링된다
    - iframe src에 videoId·autoplay=1이 포함된다
    - open=false, videoId=null 일 때 iframe이 DOM에 없다 (facade 패턴)
    - 닫기 버튼 클릭 시 onClose가 호출된다

[x] 3-7-A 구현 (components/youtube-modal.tsx)
    - shadcn Dialog 래핑
    - open && videoId 일 때만 iframe 렌더링
    - src: `https://www.youtube.com/embed/${videoId}?autoplay=1`
    - DialogTitle sr-only (접근성)

[x] 3-7-A 테스트 통과 확인 (6/6 pass)
```

---

### 3-8. 갤러리 라이트박스 ← 3-5보다 먼저 구현

**파일:**
- 컴포넌트: `components/lightbox.tsx`
- 테스트: `components/__tests__/lightbox.test.tsx`

```
[x] 3-8-A 테스트 작성 (components/__tests__/lightbox.test.tsx, 11개 테스트)
    - open=true 시 initialIndex 이미지가 렌더링된다
    - initialIndex=1 이면 두 번째 이미지가 렌더링된다
    - open=false 일 때 이미지가 없다
    - 다음/이전 버튼 클릭으로 이미지 이동
    - 마지막/첫 번째에서 순환
    - photos 1개일 때 이전/다음 버튼 없음
    - 닫기 버튼 → onClose 호출
    - ArrowRight/ArrowLeft 키보드 탐색

[x] 3-8-A 구현 (components/lightbox.tsx)
    - shadcn Dialog 기반
    - photos/initialIndex prop, 내부 currentIndex 상태
    - useEffect로 open 변경 시 인덱스 리셋
    - document.addEventListener("keydown") — ArrowLeft/Right 처리
    - Escape는 Radix Dialog 자동 처리

[x] 3-8-A 테스트 통과 확인 (11/11 pass)
```

---

### 3-1. 히어로 섹션 ★ `references/desktop/01-hero.png`

**파일:**
- 컴포넌트: `components/sections/hero-section.tsx`
- 테스트: `components/sections/__tests__/hero-section.test.tsx`

**Props 인터페이스:**
```typescript
interface HeroSectionProps {
  heroData?: {
    sermonTitle: string;
    sermonDate: string;
    sermonSpeaker?: string;
  } | null;
}
```

```
[ ] 3-1-A 테스트 작성 — 기본 콘텐츠
    - "은진교회" 교회명이 렌더링된다
    - 슬로건 텍스트가 렌더링된다 ("은혜와 진리가 충만한 교회" 또는 설정된 슬로건)
    - CTA 버튼 "예배 영상 보기"가 렌더링된다
    - CTA 버튼 "교회 방문하기"가 렌더링된다
    - "예배 영상 보기" 링크가 /media/sermons를 가진다
    - "교회 방문하기" 링크가 /location을 가진다

[ ] 3-1-A 구현
    - 풀 와이드 섹션 (min-h-[85vh] 또는 min-h-screen)
    - 배경: next/image fill + priority (placeholder 이미지로 시작)
    - 어두운 그라디언트 오버레이 (bg-black/50 또는 linear-gradient)
    - 교회명 h1, 슬로건 p
    - Button 컴포넌트 2개

[ ] 3-1-A 테스트 통과 확인

[ ] 3-1-B 테스트 작성 — 설교 정보 영역
    - heroData prop 있을 때: 설교 제목이 렌더링된다
    - heroData prop 있을 때: 설교 날짜가 렌더링된다
    - heroData prop이 null/undefined일 때: 설교 정보 영역이 렌더링되지 않는다

[ ] 3-1-B 구현
    - heroData가 있을 때만 설교 정보 박스 렌더링
    - accent 색 왼쪽 보더 (border-l-4 border-accent)

[ ] 3-1-B 테스트 통과 확인

[ ] 3-1-C Playwright 시각 검증
    - npm run dev → npm run screenshot -- --grep "main.*desktop"
    - screenshots/desktop/main.png 히어로 영역 vs references/desktop/01-hero.png 비교
    - 차이 수정 → 재캡처 (3~5회)
```

---

### 3-2. 퀵 액션 바 ★ `references/desktop/02-quick-actions.png`

**파일:**
- 컴포넌트: `components/sections/quick-actions.tsx`
- 테스트: `components/sections/__tests__/quick-actions.test.tsx`

```
[ ] 3-2-A 테스트 작성 — 버튼 렌더링
    - 5개 액션 버튼이 모두 렌더링된다
    - "예배안내" 링크가 /worship을 가진다
    - "주보" 링크가 /media/bulletins (또는 Drive 주보 링크)를 가진다
    - "새신자 등록" 링크가 /newcomer#register를 가진다
    - "기도 요청" 링크가 /newcomer#prayer를 가진다
    - "봉사 신청" 링크가 /newcomer#serve를 가진다

[ ] 3-2-A 구현
    - 섹션 배경: bg-primary (레퍼런스 확인 후 조정)
    - QUICK_ACTIONS 상수 정의 (label, href, icon)
    - Lucide 아이콘 + accent 원형 배경 버튼

[ ] 3-2-A 테스트 통과 확인

[ ] 3-2-B Playwright 시각 검증
    - screenshots/desktop/main.png 퀵 액션 영역 vs references/desktop/02-quick-actions.png 비교
    - 차이 수정 → 재캡처 (2~3회)
```

---

### 3-3. 공동체 소개 섹션 ★ `references/desktop/03-community.png`

**파일:**
- 컴포넌트: `components/sections/community-section.tsx`
- 테스트: `components/sections/__tests__/community-section.test.tsx`

**Props 인터페이스:**
```typescript
interface CommunitySectionProps {
  communities?: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    href: string;
  }[];
}
```

```
[ ] 3-3-A 테스트 작성 — 섹션 구조
    - 섹션 제목이 렌더링된다
    - 부제 텍스트가 렌더링된다
    - "공동체 둘러보기" 버튼이 렌더링된다

[ ] 3-3-A 구현
    - 섹션 제목 h2, 부제 p
    - CTA 버튼 컴포넌트

[ ] 3-3-A 테스트 통과 확인

[ ] 3-3-B 테스트 작성 — 공동체 카드
    - communities prop으로 카드 개수만큼 렌더링된다
    - 각 카드에 title이 표시된다
    - 각 카드에 description이 표시된다
    - 각 카드 링크가 올바른 href를 가진다
    - communities prop이 없을 때 기본 목록(장년/청년/다음세대/주일학교)이 렌더링된다

[ ] 3-3-B 구현
    - DEFAULT_COMMUNITIES 상수 (4개 공동체 기본값)
    - shadcn Card 기반 그리드 (3열 lg / 2열 md / 1열 sm)
    - hover:shadow-lg hover:-translate-y-1 transition

[ ] 3-3-B 테스트 통과 확인

[ ] 3-3-C Playwright 시각 검증
    - 공동체 섹션 vs references/desktop/03-community.png 비교 (2~3회)
```

---

### 3-4. 콘텐츠 영상 섹션 ★ `references/desktop/04-contents.png`

**파일:**
- 컴포넌트: `components/sections/content-section.tsx`
- 테스트: `components/sections/__tests__/content-section.test.tsx`

**Props 인터페이스:**
```typescript
interface ContentSectionProps {
  videos?: {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
  }[];
}
```

```
[ ] 3-4-A 테스트 작성 — 섹션 구조
    - 섹션 제목이 렌더링된다
    - "더보기" 링크가 /media/sermons를 가진다

[ ] 3-4-A 구현
    - 섹션 제목, 부제
    - "더보기" Link

[ ] 3-4-A 테스트 통과 확인

[ ] 3-4-B 테스트 작성 — 영상 카드
    - videos prop으로 카드 개수만큼 렌더링된다
    - 각 카드에 영상 제목이 표시된다
    - 각 카드에 날짜가 표시된다
    - videos prop이 빈 배열일 때 카드가 없다
    - videos prop이 없을 때(undefined) 빈 상태 메시지가 표시된다

[ ] 3-4-B 구현
    - 4열(lg) / 2열(md) / 1열(sm) 그리드
    - 썸네일 next/image + 재생 아이콘 오버레이
    - 제목, 날짜 텍스트

[ ] 3-4-B 테스트 통과 확인

[ ] 3-4-C 테스트 작성 — YouTube 모달 연동
    - 영상 카드 클릭 시 YoutubeModal이 열린다 (open 상태 변경)
    - 클릭한 카드의 videoId가 모달에 전달된다

[ ] 3-4-C 구현
    - selectedVideoId 상태 (null | string)
    - 카드 클릭 → setSelectedVideoId
    - YoutubeModal에 open/videoId/onClose 전달

[ ] 3-4-C 테스트 통과 확인

[ ] 3-4-D Playwright 시각 검증
    - 콘텐츠 섹션 vs references/desktop/04-contents.png 비교 (2~3회)
```

---

### 3-5. 포토 앨범 섹션 ★ `references/desktop/05-gallery.png`

**파일:**
- 컴포넌트: `components/sections/gallery-preview.tsx`
- 테스트: `components/sections/__tests__/gallery-preview.test.tsx`

**Props 인터페이스:**
```typescript
interface GalleryPreviewProps {
  photos?: {
    id: string;
    src: string;
    alt: string;
  }[];
}
```

```
[ ] 3-5-A 테스트 작성 — 섹션 구조
    - 섹션 제목이 렌더링된다
    - "갤러리 더보기" 링크가 /media/gallery를 가진다

[ ] 3-5-A 구현
    - 섹션 제목, CTA 링크

[ ] 3-5-A 테스트 통과 확인

[ ] 3-5-B 테스트 작성 — 사진 그리드
    - photos prop으로 이미지 개수만큼 렌더링된다
    - 각 이미지에 alt 속성이 설정된다
    - photos가 8개 초과 시 처음 8개만 표시된다
    - photos prop이 없을 때 빈 상태 메시지가 표시된다

[ ] 3-5-B 구현
    - 4열(lg) / 2열(sm) 그리드
    - next/image 사용 (alt 필수)
    - photos.slice(0, 8)

[ ] 3-5-B 테스트 통과 확인

[ ] 3-5-C 테스트 작성 — 라이트박스 연동
    - 사진 클릭 시 Lightbox가 열린다
    - 클릭한 사진의 인덱스가 Lightbox initialIndex로 전달된다

[ ] 3-5-C 구현
    - lightboxOpen 상태 + selectedIndex 상태
    - 사진 클릭 → 상태 업데이트
    - Lightbox에 photos/initialIndex/open/onClose 전달

[ ] 3-5-C 테스트 통과 확인

[ ] 3-5-D Playwright 시각 검증
    - 갤러리 섹션 vs references/desktop/05-gallery.png 비교 (2~3회)
```

---

### 3-6. 메인 페이지 통합 ★ `references/pages/main-full.png`

**파일:**
- 페이지: `app/page.tsx`
- 테스트: `app/__tests__/page.test.tsx`

```
[ ] 3-6-A 테스트 작성 — 섹션 통합
    - HeroSection이 렌더링된다
    - QuickActions가 렌더링된다
    - CommunitySection이 렌더링된다
    - ContentSection이 렌더링된다
    - GalleryPreview가 렌더링된다

[ ] 3-6-A 구현
    - app/page.tsx에 모든 섹션 배치
    - 섹션 간 여백 (py-16 md:py-24)
    - 홀수 섹션 bg-white / 짝수 섹션 bg-section-warm 교차

[ ] 3-6-A 테스트 통과 확인

[ ] 3-6-B 스크롤 등장 애니메이션
    - Intersection Observer 기반 fade-in-up 효과
    - 테스트: 섹션 컨테이너에 data-animate 속성이 있다

[ ] 3-6-C Playwright 전체 페이지 검증
    - screenshots/desktop/main.png (fullPage) vs references/pages/main-full.png 비교
    - tablet, mobile 캡처 및 비교
    - 목표: 레퍼런스와 80%+ 유사 (3~5회 반복)
```

---

## Phase 4. 서브 페이지

---

### 4-1. 교회소개 `/about`

#### 4-1-A. 담임목사 인사말

**파일:**
- 컴포넌트: `components/sections/pastor-greeting.tsx`
- 테스트: `components/sections/__tests__/pastor-greeting.test.tsx`

**Props:**
```typescript
interface PastorGreetingProps {
  name: string;
  title: string;
  greeting: string;
  imageUrl?: string;
}
```

```
[ ] 테스트 작성
    - 담임목사 이름이 렌더링된다
    - 직함(title)이 렌더링된다
    - 인사말 텍스트가 렌더링된다
    - imageUrl prop 있을 때 이미지가 렌더링된다 (alt에 이름 포함)
    - imageUrl prop 없을 때 이미지가 렌더링되지 않는다

[ ] 구현
    - 2열 레이아웃 (이미지 왼쪽 / 텍스트 오른쪽, md: 이상)
    - 모바일: 세로 스택
    - 텍스트: whitespace-pre-line 또는 줄바꿈 처리

[ ] 테스트 통과 확인
```

#### 4-1-B. 비전 & 핵심가치

**파일:**
- 컴포넌트: `components/sections/vision-cards.tsx`
- 테스트: `components/sections/__tests__/vision-cards.test.tsx`

**Props:**
```typescript
interface VisionCardsProps {
  visions: { icon?: string; title: string; description: string }[];
}
```

```
[ ] 테스트 작성
    - visions prop 개수만큼 카드가 렌더링된다
    - 각 카드에 title이 표시된다
    - 각 카드에 description이 표시된다

[ ] 구현
    - 3열(lg) / 2열(md) / 1열(sm) 카드 그리드
    - shadcn Card, Lucide 아이콘 또는 이모지

[ ] 테스트 통과 확인
```

#### 4-1-C. 교회 연혁 타임라인

**파일:**
- 컴포넌트: `components/sections/history-timeline.tsx`
- 테스트: `components/sections/__tests__/history-timeline.test.tsx`

**Props:**
```typescript
interface HistoryTimelineProps {
  events: { year: string; title: string; description?: string }[];
}
```

```
[ ] 테스트 작성
    - events prop 개수만큼 항목이 렌더링된다
    - 각 항목에 year가 표시된다
    - 각 항목에 title이 표시된다

[ ] 구현
    - 세로 중앙선 (CSS border-left)
    - 좌우 교차 배치 (짝수 left / 홀수 right, md: 이상)
    - 모바일: 단방향

[ ] 테스트 통과 확인
```

#### 4-1-D. about/page.tsx 통합

**파일:** `app/about/page.tsx`

```
[ ] 테스트 작성 (app/__tests__/about.test.tsx)
    - PastorGreeting 컴포넌트가 렌더링된다
    - VisionCards 컴포넌트가 렌더링된다
    - HistoryTimeline 컴포넌트가 렌더링된다

[ ] 구현
    - about/page.tsx에 플레이스홀더 데이터로 각 섹션 배치

[ ] 테스트 통과 확인

[ ] Playwright 시각 검증
    - screenshots/desktop/about.png 캡처 및 육안 확인
```

---

### 4-2. 예배안내 `/worship`

#### 4-2-A. 예배 스케줄 카드 그리드

**파일:**
- 컴포넌트: `components/sections/worship-schedule.tsx`
- 테스트: `components/sections/__tests__/worship-schedule.test.tsx`

**Props:**
```typescript
interface WorshipScheduleProps {
  schedules: {
    name: string;
    time: string;
    location: string;
    description?: string;
  }[];
}
```

```
[ ] 테스트 작성
    - schedules prop 개수만큼 카드가 렌더링된다
    - 각 카드에 예배명(name)이 표시된다
    - 각 카드에 시간(time)이 표시된다
    - 각 카드에 장소(location)이 표시된다
    - description이 있을 때 표시된다
    - description이 없을 때 표시되지 않는다

[ ] 구현
    - 2열(md) / 1열(sm) 그리드
    - shadcn Card

[ ] 테스트 통과 확인

[ ] worship/page.tsx 통합 (기존 placeholder 교체)

[ ] Playwright 시각 검증
```

---

### 4-3. 섬기는 사람들 `/staff`

#### 4-3-A. 담임목사 프로필 카드

**파일:**
- 컴포넌트: `components/sections/pastor-card.tsx`
- 테스트: `components/sections/__tests__/pastor-card.test.tsx`

```
[ ] 테스트 작성
    - 담임목사 이름이 렌더링된다
    - 직분 텍스트가 렌더링된다
    - 약력 텍스트가 렌더링된다
    - imageUrl 있을 때 이미지(alt=이름)가 렌더링된다

[ ] 구현
    - 대형 카드 (가로 풀 또는 중앙 정렬)
    - next/image 프로필 사진
    - 약력 텍스트 영역

[ ] 테스트 통과 확인
```

#### 4-3-B. 교역자 카드 그리드

**파일:**
- 컴포넌트: `components/sections/staff-grid.tsx`
- 테스트: `components/sections/__tests__/staff-grid.test.tsx`

**Props:**
```typescript
interface StaffGridProps {
  staff: {
    name: string;
    role: string;
    imageUrl?: string;
  }[];
}
```

```
[ ] 테스트 작성
    - staff prop 개수만큼 카드가 렌더링된다
    - 각 카드에 이름이 표시된다
    - 각 카드에 직분이 표시된다
    - imageUrl 있을 때 원형 프로필 이미지가 렌더링된다

[ ] 구현
    - 4열(lg) / 3열(md) / 2열(sm) 그리드
    - 원형 프로필: rounded-full overflow-hidden
    - 이름, 직분 텍스트

[ ] 테스트 통과 확인

[ ] staff/page.tsx 작성 및 통합

[ ] Playwright 시각 검증
```

---

### 4-4. 새신자 안내 `/newcomer`

#### 4-4-A. 방문 가이드 카드

**파일:**
- 컴포넌트: `components/sections/visit-guide.tsx`
- 테스트: `components/sections/__tests__/visit-guide.test.tsx`

```
[ ] 테스트 작성
    - 주차 안내 카드가 렌더링된다
    - 안내데스크 카드가 렌더링된다
    - 예배 참여 카드가 렌더링된다
    - 각 카드에 아이콘이 있다 (svg 또는 Lucide)
    - 각 카드에 제목이 있다

[ ] 구현
    - 3개 고정 카드 (주차 / 안내데스크 / 예배 참여)
    - 3열(md) / 1열(sm)

[ ] 테스트 통과 확인
```

#### 4-4-B. 등록·기도·봉사 앵커 섹션

**파일:** `app/newcomer/page.tsx` (기존 placeholder 교체)

```
[ ] 테스트 작성 (app/__tests__/newcomer.test.tsx)
    - id="register" 요소가 존재한다
    - id="prayer" 요소가 존재한다
    - id="serve" 요소가 존재한다
    - "등록" 관련 텍스트가 존재한다
    - "기도" 관련 텍스트가 존재한다
    - "봉사" 관련 텍스트가 존재한다

[ ] 구현
    - 각 섹션에 id 앵커 추가
    - 텍스트 콘텐츠 (플레이스홀더 → 실제 안내문으로 교체 예정)

[ ] 테스트 통과 확인

[ ] Playwright 시각 검증
```

---

### 4-5. 교회 일정 `/calendar`

**파일:** `app/calendar/page.tsx`

```
[ ] 4-5 테스트 작성 (app/__tests__/calendar.test.tsx)
    - SubpageHero가 렌더링된다 (title="교회 일정")
    - iframe이 렌더링된다
    - iframe에 title 접근성 속성이 있다 ("교회 일정 캘린더")

[ ] 4-5 구현
    - calendar/page.tsx 생성
    - SubpageHero 배치
    - Google Calendar 공개 iframe (src는 환경변수 또는 placeholder)
    - h-[600px] md:h-[800px]

[ ] 4-5 테스트 통과 확인

[ ] Playwright 시각 검증
```

---

### 4-6. 오시는 길 `/location`

#### 4-6-A. 교통편 안내 카드

**파일:**
- 컴포넌트: `components/sections/transport-guide.tsx`
- 테스트: `components/sections/__tests__/transport-guide.test.tsx`

```
[ ] 테스트 작성
    - 버스 안내 카드가 렌더링된다
    - 지하철 안내 카드가 렌더링된다
    - 자가용 안내 카드가 렌더링된다

[ ] 구현
    - 3열(md) / 1열(sm) 카드
    - Lucide 아이콘 (Bus, Train, Car)

[ ] 테스트 통과 확인
```

#### 4-6-B. Kakao Maps 컴포넌트

**파일:**
- 컴포넌트: `components/kakao-map.tsx`
- 테스트: `components/__tests__/kakao-map.test.tsx`

```
[ ] 테스트 작성
    - id="kakao-map" 컨테이너가 렌더링된다
    - 주소 텍스트 "경기 의정부시 추동로 98"이 렌더링된다

[ ] 구현
    - "use client"
    - useEffect로 Kakao Maps SDK 동적 로드
    - SDK 로드 완료 후 지도 초기화 + 마커 표시
    - env: NEXT_PUBLIC_KAKAO_MAP_KEY

[ ] 테스트 통과 확인 (JSDOM에서 SDK 로드 mock 처리)

[ ] location/page.tsx 작성 및 통합
    - SubpageHero, KakaoMap, TransportGuide 배치
    - 주소 + 연락처 텍스트

[ ] Playwright 시각 검증
```

---

## 진행 규칙

1. **순서 엄수**: 3-7, 3-8 먼저 → 그 후 3-1~3-6 → Phase 4 순
2. **테스트 먼저**: 구현 전 테스트 파일 작성 후 `npx jest --testPathPatterns="파일명"` 으로 Red 확인
3. **props 기반 설계**: 모든 섹션 컴포넌트는 API 데이터를 props로 받도록 설계 (page.tsx에서 fetch 후 전달)
4. **Playwright 루프**: 각 섹션 완성 후 `npm run screenshot -- --grep "섹션명"` 으로 캡처 및 레퍼런스 비교
5. **완료 표시**: 각 단계 완료 시 `[ ]` → `[x]` 업데이트
