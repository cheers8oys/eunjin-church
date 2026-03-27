import { render, screen } from "@testing-library/react";
import HeroSection from "../hero-section";

describe("HeroSection - 3-1-A. 기본 콘텐츠", () => {
  it('"은진교회" 교회명이 h1으로 렌더링된다', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { level: 1, name: "은진교회" })
    ).toBeInTheDocument();
  });

  it("슬로건 텍스트가 렌더링된다", () => {
    render(<HeroSection />);
    expect(screen.getByText("은혜와 진리가 충만한 교회")).toBeInTheDocument();
  });

  it('"예배 영상 보기" 버튼이 렌더링된다', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: "예배 영상 보기" })
    ).toBeInTheDocument();
  });

  it('"교회 방문하기" 버튼이 렌더링된다', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: "교회 방문하기" })
    ).toBeInTheDocument();
  });

  it('"예배 영상 보기" 링크가 /media/sermons를 가진다', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: "예배 영상 보기" })
    ).toHaveAttribute("href", "/media/sermons");
  });

  it('"교회 방문하기" 링크가 /location을 가진다', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: "교회 방문하기" })
    ).toHaveAttribute("href", "/location");
  });
});

describe("HeroSection - 3-1-B. 설교 정보 영역", () => {
  const heroData = {
    sermonTitle: "하나님의 사랑",
    sermonDate: "2026-03-27",
    sermonSpeaker: "홍길동 목사",
  };

  it("heroData prop 있을 때 설교 제목이 렌더링된다", () => {
    render(<HeroSection heroData={heroData} />);
    expect(screen.getByText(heroData.sermonTitle)).toBeInTheDocument();
  });

  it("heroData prop 있을 때 설교 날짜가 렌더링된다", () => {
    render(<HeroSection heroData={heroData} />);
    expect(screen.getByText(heroData.sermonDate)).toBeInTheDocument();
  });

  it("heroData prop이 null일 때 설교 정보가 렌더링되지 않는다", () => {
    render(<HeroSection heroData={null} />);
    expect(screen.queryByText(heroData.sermonTitle)).not.toBeInTheDocument();
  });
});
