import { render, screen } from "@testing-library/react";
import WorshipSchedule from "../worship-schedule";

const mockSchedules = [
  { name: "주일 1부 예배", time: "오전 9시", location: "본당" },
  { name: "주일 2부 예배", time: "오전 11시", location: "본당", description: "온라인 동시 송출" },
];

describe("WorshipSchedule - 4-2-A. 예배 스케줄 렌더링", () => {
  it("schedules prop 개수만큼 카드가 렌더링된다", () => {
    render(<WorshipSchedule schedules={mockSchedules} />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("각 카드에 예배명(name)이 표시된다", () => {
    render(<WorshipSchedule schedules={mockSchedules} />);
    expect(screen.getByText("주일 1부 예배")).toBeInTheDocument();
    expect(screen.getByText("주일 2부 예배")).toBeInTheDocument();
  });

  it("각 카드에 시간(time)이 표시된다", () => {
    render(<WorshipSchedule schedules={mockSchedules} />);
    expect(screen.getByText("오전 9시")).toBeInTheDocument();
    expect(screen.getByText("오전 11시")).toBeInTheDocument();
  });

  it("각 카드에 장소(location)이 표시된다", () => {
    render(<WorshipSchedule schedules={mockSchedules} />);
    expect(screen.getAllByText("본당")).toHaveLength(2);
  });

  it("description이 있을 때 표시된다", () => {
    render(<WorshipSchedule schedules={mockSchedules} />);
    expect(screen.getByText("온라인 동시 송출")).toBeInTheDocument();
  });

  it("description이 없을 때 표시되지 않는다", () => {
    render(<WorshipSchedule schedules={[{ name: "새벽 기도회", time: "오전 5시 30분", location: "본당" }]} />);
    expect(screen.queryByText("온라인 동시 송출")).not.toBeInTheDocument();
  });
});
