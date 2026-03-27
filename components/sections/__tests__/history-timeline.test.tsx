import { render, screen } from "@testing-library/react";
import HistoryTimeline from "../history-timeline";

const mockEvents = [
  { year: "1990", title: "교회 창립" },
  { year: "2000", title: "성전 건축", description: "현재 예배당 완공" },
  { year: "2010", title: "선교 파송" },
];

describe("HistoryTimeline - 4-1-C. 연혁 렌더링", () => {
  it("events prop 개수만큼 항목이 렌더링된다", () => {
    render(<HistoryTimeline events={mockEvents} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("각 항목에 year가 표시된다", () => {
    render(<HistoryTimeline events={mockEvents} />);
    expect(screen.getByText("1990")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
  });

  it("각 항목에 title이 표시된다", () => {
    render(<HistoryTimeline events={mockEvents} />);
    expect(screen.getByText("교회 창립")).toBeInTheDocument();
    expect(screen.getByText("성전 건축")).toBeInTheDocument();
    expect(screen.getByText("선교 파송")).toBeInTheDocument();
  });
});
