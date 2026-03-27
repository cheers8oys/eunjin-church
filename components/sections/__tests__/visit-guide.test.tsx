import { render, screen } from "@testing-library/react";
import VisitGuide from "../visit-guide";

describe("VisitGuide - 4-4-A. 방문 가이드", () => {
  it("3개 안내 카드가 렌더링된다", () => {
    render(<VisitGuide />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("주차 안내 카드가 렌더링된다", () => {
    render(<VisitGuide />);
    expect(screen.getByText("주차 안내")).toBeInTheDocument();
  });

  it("안내데스크 카드가 렌더링된다", () => {
    render(<VisitGuide />);
    expect(screen.getByText("안내데스크")).toBeInTheDocument();
  });

  it("예배 참여 카드가 렌더링된다", () => {
    render(<VisitGuide />);
    expect(screen.getByText("예배 참여")).toBeInTheDocument();
  });

  it("각 카드에 설명 텍스트가 있다", () => {
    render(<VisitGuide />);
    const articles = screen.getAllByRole("article");
    articles.forEach((article) => {
      expect(article.textContent).not.toBe("");
    });
  });
});
