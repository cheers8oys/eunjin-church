import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("메인 페이지 - 3-6-A. 섹션 통합", () => {
  it("HeroSection이 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("QuickActions가 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /예배안내/ })).toBeInTheDocument();
  });

  it("CommunitySection이 렌더링된다", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /공동체 둘러보기/ })
    ).toBeInTheDocument();
  });

  it("ContentSection이 렌더링된다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /영상 콘텐츠/ })
    ).toBeInTheDocument();
  });

  it("GalleryPreview가 렌더링된다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /사진 갤러리/ })
    ).toBeInTheDocument();
  });
});

describe("메인 페이지 - 3-6-B. 스크롤 애니메이션", () => {
  it("섹션 컨테이너에 data-animate 속성이 있다", () => {
    render(<Home />);
    const animatedDivs = document.querySelectorAll("[data-animate]");
    expect(animatedDivs.length).toBeGreaterThanOrEqual(5);
  });
});
