import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("Footer - 2-2-A. 교회 정보 컬럼", () => {
  it("교회명 '은진교회'가 렌더링된다", () => {
    render(<Footer />);
    expect(screen.getByText("은진교회")).toBeInTheDocument();
  });

  it("주소 '경기 의정부시 추동로 98'이 렌더링된다", () => {
    render(<Footer />);
    expect(screen.getByText(/경기 의정부시 추동로 98/)).toBeInTheDocument();
  });

  it("슬로건이 렌더링된다", () => {
    render(<Footer />);
    expect(screen.getByText(/은혜와 진리가 충만한 교회/)).toBeInTheDocument();
  });
});

describe("Footer - 2-2-B. 바로가기 링크 컬럼", () => {
  it("'예배안내' 링크가 /worship을 가진다", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "예배안내" })).toHaveAttribute("href", "/worship");
  });

  it("'새신자 안내' 링크가 /newcomer를 가진다", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "새신자 안내" })).toHaveAttribute("href", "/newcomer");
  });

  it("'오시는 길' 링크가 /location을 가진다", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "오시는 길" })).toHaveAttribute("href", "/location");
  });
});

describe("Footer - 2-2-C. SNS 아이콘 & 저작권", () => {
  it("YouTube 아이콘 링크가 존재한다 (aria-label='YouTube')", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "YouTube" })).toBeInTheDocument();
  });

  it("저작권 텍스트에 '은진교회'가 포함된다", () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright.*은진교회/i)).toBeInTheDocument();
  });

  it("개인정보처리방침 링크가 /privacy를 가진다", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "개인정보처리방침" })).toHaveAttribute("href", "/privacy");
  });
});
