import { render, screen } from "@testing-library/react";
import StaffPage from "../staff/page";

jest.mock("@/components/sections/pastor-card", () =>
  function MockPastorCard() { return <div data-testid="pastor-card" />; }
);
jest.mock("@/components/sections/staff-grid", () =>
  function MockStaffGrid() { return <div data-testid="staff-grid" />; }
);
jest.mock("@/components/sections/subpage-hero", () =>
  function MockSubpageHero({ title }: { title: string }) {
    return <div data-testid="subpage-hero">{title}</div>;
  }
);

describe("StaffPage - 4-3. 섬기는 사람들 통합", () => {
  it("PastorCard 컴포넌트가 렌더링된다", () => {
    render(<StaffPage />);
    expect(screen.getByTestId("pastor-card")).toBeInTheDocument();
  });

  it("StaffGrid 컴포넌트가 렌더링된다", () => {
    render(<StaffPage />);
    expect(screen.getByTestId("staff-grid")).toBeInTheDocument();
  });
});
