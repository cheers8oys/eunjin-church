import { render, screen } from "@testing-library/react";
import CalendarPage from "../calendar/page";

jest.mock("@/components/sections/subpage-hero", () =>
  function MockSubpageHero({ title }: { title: string }) {
    return <div data-testid="subpage-hero">{title}</div>;
  }
);

describe("CalendarPage - 4-5. 교회 일정", () => {
  it("SubpageHero가 렌더링된다 (title='교회 일정')", () => {
    render(<CalendarPage />);
    expect(screen.getByText("교회 일정")).toBeInTheDocument();
  });

  it("iframe이 렌더링된다", () => {
    render(<CalendarPage />);
    expect(screen.getByTitle("교회 일정 캘린더")).toBeInTheDocument();
  });

  it("iframe에 title 접근성 속성이 있다", () => {
    render(<CalendarPage />);
    const iframe = screen.getByTitle("교회 일정 캘린더");
    expect(iframe).toHaveAttribute("title", "교회 일정 캘린더");
  });
});
