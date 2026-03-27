import { render, screen } from "@testing-library/react";
import AboutPage from "../about/page";

jest.mock("@/components/sections/pastor-greeting", () =>
  function MockPastorGreeting() { return <div data-testid="pastor-greeting" />; }
);
jest.mock("@/components/sections/vision-cards", () =>
  function MockVisionCards() { return <div data-testid="vision-cards" />; }
);
jest.mock("@/components/sections/history-timeline", () =>
  function MockHistoryTimeline() { return <div data-testid="history-timeline" />; }
);
jest.mock("@/components/sections/subpage-hero", () =>
  function MockSubpageHero({ title }: { title: string }) {
    return <div data-testid="subpage-hero">{title}</div>;
  }
);

describe("AboutPage - 4-1-D. 교회소개 통합", () => {
  it("PastorGreeting 컴포넌트가 렌더링된다", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("pastor-greeting")).toBeInTheDocument();
  });

  it("VisionCards 컴포넌트가 렌더링된다", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("vision-cards")).toBeInTheDocument();
  });

  it("HistoryTimeline 컴포넌트가 렌더링된다", () => {
    render(<AboutPage />);
    expect(screen.getByTestId("history-timeline")).toBeInTheDocument();
  });
});
