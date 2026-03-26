# TTMD — Phase 2 TDD 개발 계획

> TDD 사이클: **Red → Green → Refactor**
> 테스트 작성 → 최소 구현으로 통과 → 코드 정리
>
> **테스트 도구**
> - **Jest + React Testing Library** — 컴포넌트 단위 테스트
> - **Playwright** — 스크린샷 비교 (시각적 검증)
>
> **작업 단위 원칙**
> - 한 번에 하나의 기능만 구현
> - 테스트가 통과해야 다음 단계 진행
> - Playwright 스크린샷은 섹션 완성 후 레퍼런스와 비교

---

## 테스트 환경 셋업 (Phase 2 시작 전 1회)

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

**`jest.config.ts` 생성**
```ts
import type { Config } from 'jest';
const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testPathPattern: ['**/__tests__/**/*.test.tsx?'],
};
export default config;
```

**`jest.setup.ts` 생성**
```ts
import '@testing-library/jest-dom';
```

---

## 2-1. 헤더 / 네비게이션

레퍼런스: `references/desktop/07-header-scroll.png`, `references/mobile/02-menu-mobile.png`

---

### 2-1-A. 로고 렌더링

**테스트 파일:** `components/layout/__tests__/header.test.tsx`

```
[x] 테스트 작성
    - 로고 이미지가 렌더링된다 (alt="은진교회 로고")
    - 교회명 텍스트 "은진교회"가 렌더링된다
    - 로고가 / 링크를 가진다

[x] 구현
    - header.tsx에 next/image 로고 + 교회명 텍스트 작성
    - href="/" Link로 감싸기

[x] 테스트 통과 확인 (npm test)
```

---

### 2-1-B. 데스크톱 네비게이션 메뉴 구조

```
[x] 테스트 작성
    - "소개" 메뉴가 존재한다
    - "공동체" 메뉴가 존재한다
    - "미디어" 메뉴가 존재한다
    - "새신자 안내" 링크가 /newcomer를 가진다
    - "오시는 길" 링크가 /location을 가진다

[x] 구현
    - NAV_ITEMS 상수 정의 (메뉴 트리 데이터)
    - 데스크톱 nav 렌더링 (md: 이상에서만 표시)

[x] 테스트 통과 확인
```

---

### 2-1-C. 드롭다운 서브메뉴

```
[x] 테스트 작성
    - "소개" 호버/클릭 시 하위 메뉴 3개 표시 (교회소개, 예배안내, 섬기는 사람들)
    - "공동체" 클릭 시 하위 메뉴 4개 표시 (장년, 청년, 다음세대, 주일학교)
    - "미디어" 클릭 시 하위 메뉴 3개 표시 (설교 영상, 콘텐츠, 갤러리)

[x] 구현
    - NavigationMenu 기반 드롭다운 구현
    - 각 서브메뉴에 정확한 href 연결

[x] 테스트 통과 확인
```

---

### 2-1-D. 스크롤 투명→불투명 전환

```
[x] 테스트 작성
    - 초기 상태: 헤더에 투명 클래스 적용
    - window scroll 이벤트 발생 후: bg-primary 클래스 적용

[x] 구현
    - useEffect + addEventListener('scroll') 로직
    - scrollY > 10 이면 scrolled 상태 true
    - 조건부 className 적용

[x] 테스트 통과 확인
```

---

### 2-1-E. 모바일 햄버거 메뉴

```
[x] 테스트 작성
    - 햄버거 버튼이 존재한다 (aria-label="메뉴 열기")
    - 햄버거 버튼 클릭 시 Sheet가 열린다
    - Sheet 안에 전체 메뉴 항목이 존재한다
    - 닫기 버튼 클릭 시 Sheet가 닫힌다

[x] 구현
    - Sheet 컴포넌트 기반 모바일 메뉴
    - 아코디언 서브메뉴 (useState per group)

[x] 테스트 통과 확인
```

---

### 2-1-F. 접근성

```
[x] 테스트 작성
    - nav에 aria-label="주 메뉴"가 있다
    - 햄버거 버튼에 aria-expanded 속성이 있다
    - aria-expanded 값이 메뉴 열림 상태와 일치한다

[x] 구현
    - aria 속성 추가

[x] 테스트 통과 확인
```

---

### 2-1-G. Playwright 시각 검증

```
[x] npm run dev 실행 상태에서 npm run screenshot -- --grep "header"
[x] screenshots/desktop/header-scrolled.png 헤더 부분 vs references/desktop/07-header-scroll.png 비교
[x] screenshots/mobile/header-menu-open.png vs references/mobile/02-menu-mobile.png 비교
[x] 차이 발견 시 수정 → 재캡처 반복 (목표: 레퍼런스와 90%+ 유사)
```

---

## 2-2. 푸터

레퍼런스: `references/desktop/06-footer.png`

---

### 2-2-A. 교회 정보 컬럼

```
[x] 테스트 작성
    - 교회명 "은진교회"가 렌더링된다
    - 주소 "경기 의정부시 추동로 98"이 렌더링된다
    - 슬로건이 렌더링된다

[x] 구현
    - footer.tsx 기본 구조 작성 (bg-primary text-white)
    - 교회 정보 컬럼

[x] 테스트 통과 확인
```

---

### 2-2-B. 바로가기 링크 컬럼

```
[x] 테스트 작성
    - "예배안내" 링크가 /worship을 가진다
    - "새신자 안내" 링크가 /newcomer를 가진다
    - "오시는 길" 링크가 /location을 가진다

[x] 구현
    - 바로가기 링크 목록 렌더링

[x] 테스트 통과 확인
```

---

### 2-2-C. SNS 아이콘 & 저작권

```
[x] 테스트 작성
    - YouTube 아이콘 링크가 존재한다 (aria-label="YouTube")
    - 저작권 텍스트에 "은진교회"가 포함된다
    - 개인정보처리방침 링크가 /privacy를 가진다

[x] 구현
    - 인라인 SVG YouTube 아이콘 (lucide-react 1.7.0에 Youtube 아이콘 없어 SVG 직접 사용)
    - 저작권 바

[x] 테스트 통과 확인
```

---

### 2-2-D. Playwright 시각 검증

```
[x] screenshots/desktop/main.png 푸터 부분 vs references/desktop/06-footer.png 비교
[x] 3열 그리드 (교회정보/바로가기/SNS) + 저작권 바 정상 렌더링 확인
```

---

## 2-3. 서브페이지 히어로 배너 (PageHero)

레퍼런스: `references/desktop/08-subpage-banner.png`

---

### 2-3-A. 기본 렌더링

```
[x] 구현
    - components/sections/subpage-hero.tsx 작성
    - title, subtitle, breadcrumbs, className props
    - h-[260px] md:h-[320px], Primary 네이비 그라디언트 배경
    - 골드(#C9A96E) 장식선 + 반투명 원형 요소 + 대각선 패턴

[ ] 테스트 작성
    - title prop이 렌더링된다
    - 배경 그라디언트 오버레이가 존재한다
    - breadcrumbs가 올바르게 렌더링된다

[ ] 테스트 통과 확인
```

---

### 2-3-B. 배경 이미지 (선택적 prop) — 추후 구현

```
[ ] 테스트 작성
    - backgroundImage prop 없을 때: Primary 그라디언트 배경 적용
    - backgroundImage prop 있을 때: next/image 렌더링

[ ] 구현 (현재 그라디언트만 지원, 이미지 prop 미구현)
[ ] 테스트 통과 확인
```

---

### 2-3-C. Playwright 시각 검증

```
[ ] /about 접속 후 스크린샷 vs references/desktop/08-subpage-banner.png 비교
[ ] 차이 수정 → 재캡처 반복
```

---

## 2-4. 루트 레이아웃에 Header + Footer 통합

```
[x] 구현
    - app/layout.tsx에 Header, Footer import 및 배치 완료
    - main 태그로 children 감싸기 (pt-[72px] — 헤더 높이 보정)
    - Pretendard Variable 폰트 로드 (next/font/local)
    - Metadata 기본값 (title template, description, OG)

[ ] 테스트 작성
    - layout에 <Header />가 렌더링된다
    - layout에 <Footer />가 렌더링된다
    - children이 Header와 Footer 사이에 렌더링된다

[ ] 테스트 통과 확인

[ ] Playwright — 전체 페이지 스크린샷으로 레이아웃 통합 확인
```

---

## 진행 규칙

1. 각 단계는 반드시 **테스트 작성 → 구현 → 통과** 순서로 진행
2. `npm test -- --watch` 를 켜놓고 실시간으로 확인
3. Playwright 시각 검증은 섹션 전체 완성 후 1회 실행
4. 레퍼런스와 차이가 있으면 Playwright 루프 반복 (목표 90%+ 유사)
5. 한 단계가 완료되면 위 체크박스를 `[x]`로 업데이트
