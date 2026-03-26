# 은진교회 웹사이트 PRD (Product Requirements Document)

**문서 버전:** v2.0  
**작성일:** 2026년 3월 26일  
**이전 버전:** v1.0 (2026-03-25) — HTML/CSS/JS 정적 사이트 → Next.js + shadcn/ui로 전환  
**참고 사이트:** [산성교회 대전&세종](https://www.sansung.org/main)

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
은진교회 공식 웹사이트 구축

### 1.2 교회 기본 정보

**교회 로고:**

![은진교회 로고](은진교회_로고.jpeg)

| 항목 | 내용 |
|------|------|
| 교회명 | 은진교회 |
| 슬로건 | 은혜와 진리가 충만한 교회 |
| 주소 | 경기 의정부시 추동로 98 |
| 담임목사 | 유창재 목사 |

### 1.3 프로젝트 목적
- **새신자/방문자 안내:** 교회를 처음 접하는 사람에게 교회 소개와 등록 방법 제공
- **기존 성도 정보 제공:** 주보, 공지사항, 교회 일정 등 교회 생활에 필요한 정보 전달
- **온라인 예배/설교 영상 제공:** YouTube 연동을 통한 설교 및 콘텐츠 접근성 확보

### 1.4 타겟 사용자
- 은진교회에 처음 방문하려는 새신자/방문자
- 은진교회 기존 성도 및 가족
- 지역사회에서 교회를 찾는 일반인

---

## 2. 기술 스택

### 2.1 기술 선정 근거
참고 사이트(산성교회)의 모던하고 깔끔한 디자인을 **픽셀 수준**으로 재현하기 위해 Next.js + shadcn/ui + Tailwind CSS를 채택한다. Claude Code + Playwright 스크린샷 반복 루프 방식으로 레퍼런스 이미지와 최대한 동일한 UI를 구현한다.

### 2.2 기술 구성
| 구분 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 15 (App Router) | React 19, TypeScript |
| UI 컴포넌트 | shadcn/ui | Radix UI 기반, 커스터마이징 용이 |
| 스타일링 | Tailwind CSS 4 | 유틸리티 클래스, 반응형 내장 |
| 지도 | Kakao Maps JavaScript API | 오시는 길 페이지 |
| 영상 | YouTube iframe embed | 설교/콘텐츠 영상 |
| 호스팅 | Vercel | Next.js 최적 호스팅, 무료 플랜 |
| 버전관리 | Git + GitHub | 소스코드 관리 |
| 개발 도구 | Claude Code + Playwright | 스크린샷 기반 UI 개발 루프 |
| CMS | Google Drive (폴더 기반) | 어드민 페이지 없이 파일 업로드로 콘텐츠 관리 |

### 2.3 개발 방법론: Claude Code + Playwright 스크린샷 루프

레퍼런스 사이트(산성교회)의 각 섹션을 스크린샷으로 캡처 → Claude Code에 레퍼런스 이미지와 함께 지시 → 코드 생성 → Playwright로 결과물 스크린샷 → 레퍼런스와 비교 → 차이점 수정 반복. 이 과정을 섹션별로 진행하여 레퍼런스와 최대한 동일한 분위기를 달성한다.

### 2.4 브라우저 지원
- Chrome (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)
- Samsung Internet (최신 버전)
- 모바일 브라우저 우선 최적화

---

## 3. 디자인 가이드

### 3.1 디자인 방향
산성교회 사이트를 참고하여 **모던하고 깔끔한** 디자인을 지향한다. 여백을 충분히 활용하고, 이미지와 영상 중심의 시각적 레이아웃을 구성한다. Claude Code + Playwright 루프로 레퍼런스 사이트의 톤앤매너를 최대한 재현한다.

### 3.2 컬러 시스템
산성교회 사이트 분석 기반 컬러 팔레트. 교회 로고 원본은 다크 그레이(`#555555`) + 화이트 조합이나, 웹사이트의 모던하고 깔끔한 분위기에 맞춰 아래와 같이 조정한다.

| 용도 | 컬러 | 코드 | Tailwind 변수 |
|------|------|------|------|
| Primary | 딥 네이비/다크 블루 | `#1B2A4A` | `--primary` |
| Secondary | 화이트 | `#FFFFFF` | `--secondary` |
| Accent | 소프트 골드 / 따뜻한 베이지 | `#C9A96E` | `--accent` |
| Text (본문) | 다크 그레이 | `#333333` | `--foreground` |
| Text (보조) | 미디엄 그레이 | `#777777` | `--muted-foreground` |
| Background | 라이트 그레이 / 오프화이트 | `#F5F5F5` | `--background` |
| Divider / Border | 라이트 그레이 | `#E0E0E0` | `--border` |

> **로고 적용 가이드:** 로고는 배경에 따라 화이트 버전(어두운 배경)과 Primary 컬러 버전(밝은 배경)을 사용한다. 원본 로고의 그레이 톤 대신 사이트 Primary 컬러(`#1B2A4A`)로 변환하여 통일감을 유지한다.

### 3.3 타이포그래피
| 용도 | 폰트 | 사이즈(Desktop) | Tailwind 클래스 |
|------|------|------|------|
| 대제목(Hero) | Pretendard Bold | 40–48px | `text-4xl md:text-5xl font-bold` |
| 섹션 제목 | Pretendard SemiBold | 28–32px | `text-2xl md:text-3xl font-semibold` |
| 소제목 | Pretendard Medium | 20–24px | `text-xl font-medium` |
| 본문 | Pretendard Regular | 16px | `text-base` |
| 캡션/보조 | Pretendard Regular | 13–14px | `text-sm` |

### 3.4 반응형 브레이크포인트
| 구분 | Tailwind | 너비 |
|------|------|------|
| Mobile | 기본 | ~767px |
| Tablet | `md:` | 768px~1023px |
| Desktop | `lg:` | 1024px~ |
| Wide | `xl:` | 1280px~ |

---

## 4. 사이트맵 및 라우트 구조

```
은진교회 (Next.js App Router)
├── / (메인 페이지)
├── /about (교회소개)
├── /worship (예배안내)
├── /staff (섬기는 사람들)
├── /community
│   ├── /community/senior (장년 공동체)
│   ├── /community/youth (청년 공동체)
│   ├── /community/nextgen (다음세대)
│   └── /community/sunday-school (주일학교)
├── /media
│   ├── /media/sermons (설교 영상)
│   ├── /media/contents (콘텐츠)
│   └── /media/gallery (포토 갤러리)
├── /newcomer (새신자 안내)
├── /calendar (교회 일정)
├── /location (오시는 길)
├── /api/drive/[...path] (Google Drive 데이터 API)
├── /api/youtube (YouTube 데이터 API)
└── /api/revalidate (ISR 수동 재검증 웹훅)
```

---

## 5. 페이지별 상세 요구사항

### 5.1 메인 페이지 (/)

#### 5.1.1 헤더/네비게이션
- 상단 고정(sticky) 네비게이션 바
- 좌측: 교회 로고 + 교회명
- 우측: 주요 메뉴 (소개, 공동체, 미디어, 새신자 안내, 오시는 길)
- 모바일: 햄버거 메뉴로 전환 (shadcn/ui Sheet 컴포넌트)
- 스크롤 시 배경 투명 → 불투명 전환

#### 5.1.2 히어로 섹션
- 풀 와이드 배경 이미지 또는 영상 (교회 전경/예배 장면)
- 오버레이 텍스트: 교회명 + 슬로건 ("은혜와 진리가 충만한 교회")
- 최신 주일예배 설교 제목 + 성경 본문 표시 (Google Drive hero-config.json 연동)
- CTA 버튼: "예배 영상 보기"

#### 5.1.3 퀵 액션 버튼 섹션
| 버튼 | 링크 대상 |
|------|------|
| 처음 오셨나요? | /newcomer |
| 예배시간 안내 | /worship |
| 교회 등록하기 | /newcomer#register |
| 중보기도 요청 | /newcomer#prayer |
| 교회 섬기기 | /newcomer#serve |

#### 5.1.4 공동체 소개 섹션
- 카드형 레이아웃으로 각 공동체 썸네일 + 이름 + 간단 설명 (shadcn/ui Card)
- "공동체 둘러보기" CTA 버튼

#### 5.1.5 콘텐츠/미디어 섹션
- YouTube 영상 썸네일 카드 그리드 (3~4개)
- 클릭 시 YouTube 영상 모달 (shadcn/ui Dialog)

#### 5.1.6 포토 앨범 섹션
- 그리드 형태의 교회 사진 갤러리 (Google Drive 갤러리 폴더 연동)
- 라이트박스 기능 (shadcn/ui Dialog)

#### 5.1.7 푸터
- 교회명, 주소, 전화번호, 이메일
- SNS 링크 아이콘 (YouTube)
- 저작권 표시, 이용약관, 개인정보처리방침 링크

### 5.2 교회소개 (/about)
- 교회 비전 및 핵심가치, 교회 연혁 (타임라인 UI), 교회 시설 사진 갤러리, 담임목사 인사말

### 5.3 예배안내 (/worship)
- 8개 예배별 카드 (주일 1부/2부/오후, 수요, 새벽, 금요, 청년, 주일학교)
- 각 예배별 시간 + 장소 + 간략 설명

### 5.4 섬기는 사람들 (/staff)
- 담임목사 프로필 (사진, 약력, 인사말)
- 교역자/사역자 카드 그리드 (Google Drive staff.json 연동)

### 5.5 공동체 페이지 (/community/*)
- 각 공동체별 하위 페이지 (장년, 청년, 다음세대, 주일학교)
- 공통: 대표 이미지, 소개 텍스트, 모임 일정, 담당자 정보, 활동 갤러리

### 5.6 미디어 페이지 (/media/*)
- 설교 영상: YouTube API 연동, 카테고리 필터, 영상 모달 재생
- 콘텐츠: 찬양, 기도, 간증 영상 카드 그리드
- 포토 갤러리: Google Drive 갤러리 폴더 연동, 앨범별 분류, 라이트박스

### 5.7 새신자 안내 (/newcomer)
- 방문 가이드, 등록 안내, 기도 요청, 봉사 참여 안내

### 5.8 교회 일정 (/calendar)
- Google Calendar 공개 임베드 + 다가오는 일정 리스트

### 5.9 오시는 길 (/location)
- Kakao Maps 임베드, 교통편 안내, 주소/연락처

---

## 6. Google Drive CMS 시스템

어드민 페이지 없이, Google Drive 폴더에 파일을 올리면 사이트에 자동 반영되는 시스템.

### 6.1 Drive 폴더 구조
```
📁 은진교회 웹사이트/
├── 📁 주보/          ← 주보_YYYY-MM-DD.pdf
├── 📁 갤러리/        ← YYYY-MM-DD_행사명/ 폴더에 사진
├── 📁 섬기는사람들/   ← staff.json + 프로필 사진
├── 📁 공동체/        ← 장년/청년/다음세대/주일학교 각 info.json + 사진
└── 📁 히어로/        ← hero-config.json + 배경 이미지
```

### 6.2 데이터 반영 방식
- Next.js API Route + ISR (Incremental Static Regeneration)
- 기본 revalidate 주기: 1시간
- 긴급 시 `/api/revalidate` 웹훅 호출로 즉시 반영

### 6.3 운영 가이드 (교회 담당자)
1. **주보 올리기:** `주보/` 폴더에 `주보_YYYY-MM-DD.pdf` 업로드
2. **사진 올리기:** `갤러리/` 아래에 `날짜_행사명` 폴더 생성 후 사진 업로드
3. **설교 정보 수정:** `히어로/hero-config.json` 파일의 제목/성경 본문 수정

---

## 7. 비기능 요구사항

### 7.1 성능
- Lighthouse 성능 점수 90+ 목표
- Next.js Image 컴포넌트로 자동 최적화 (WebP, lazy loading, 반응형 크기)
- YouTube iframe facade 패턴 (썸네일 클릭 시에만 iframe 로드)

### 7.2 SEO
- Next.js Metadata API 활용 (페이지별 title, description, OG 태그)
- 시맨틱 HTML, Schema.org Church JSON-LD
- 자동 sitemap.xml, robots.txt (next-sitemap)

### 7.3 접근성
- WCAG 2.1 AA 수준 준수
- shadcn/ui 기본 제공 접근성 (Radix UI 기반)
- 키보드 네비게이션, alt 텍스트

### 7.4 유지보수성
- shadcn/ui 컴포넌트 재사용으로 일관된 UI
- Tailwind CSS 변수로 테마 일괄 변경 가능
- Google Drive CMS로 비개발자도 콘텐츠 업데이트 가능

---

## 8. 콘텐츠 준비 체크리스트

### 필수 콘텐츠
- [x] 교회 로고 파일 (첨부 완료 — 웹사이트 톤에 맞춰 컬러 변환 필요)
- [ ] 교회 전경/내부 사진 (히어로 배경용 고해상도)
- [ ] 담임목사 프로필 사진 및 인사말
- [ ] 교회 비전/핵심가치 텍스트
- [ ] 예배 시간표 (시간 + 장소 확정)
- [ ] 교역자/사역자 프로필 (사진, 이름, 직분)
- [ ] 각 공동체별 소개 텍스트 및 사진
- [ ] YouTube 채널 URL
- [ ] YouTube 채널 URL (SNS)
- [ ] 교회 연락처 (전화번호, 이메일)

### 선택 콘텐츠
- [ ] 교회 연혁 자료
- [ ] 포토 갤러리용 사진
- [ ] 새신자 안내 상세 텍스트
- [ ] 교회 일정/캘린더 데이터 (Google Calendar 계정)
- [ ] 기도요청/등록 접수용 Google Form 링크

---

## 9. 개발 마일스톤

| 단계 | 내용 | 예상 기간 |
|------|------|------|
| Phase 0 | 사전 준비 (콘텐츠 수집, API 설정, 레퍼런스 스크린샷) | 3~5일 |
| Phase 1 | 프로젝트 셋업 + 디자인 시스템 + 공통 컴포넌트 | 3~4일 |
| Phase 2 | 메인 페이지 + 핵심 서브 페이지 (Claude Code + Playwright 루프) | 1주 |
| Phase 3 | 공동체/미디어 페이지 + Google Drive 연동 | 1주 |
| Phase 4 | SEO, 성능 최적화, 접근성, QA | 3~4일 |
| Phase 5 | 최종 검수, 콘텐츠 입력, 배포 | 2~3일 |

**총 예상 기간: 약 4~5주** (v1.0 대비 1주 단축 — shadcn/ui 컴포넌트 재사용 + Claude Code 자동화)

---

## 10. 참고사항

- 산성교회 사이트(sansung.org)의 레이아웃과 UX 흐름을 기본 참고로 하되, 은진교회의 규모와 콘텐츠에 맞게 조정한다.
- Claude Code + Playwright 스크린샷 루프로 레퍼런스 사이트의 디자인을 최대한 재현한다.
- 로그인/회원가입 기능은 현재 범위에서 제외한다.
- 도메인 구매 및 Vercel DNS 설정이 별도로 필요하다.
- 월 유지비용: 도메인 비용(연 ₩15,000~40,000)만 발생, 나머지 전부 무료.
