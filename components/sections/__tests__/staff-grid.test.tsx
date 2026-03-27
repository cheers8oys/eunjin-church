import { render, screen } from "@testing-library/react";
import StaffGrid from "../staff-grid";

const mockStaff = [
  { name: "이은혜", role: "부목사" },
  { name: "박사랑", role: "전도사", imageUrl: "/staff1.jpg" },
  { name: "최믿음", role: "교육목사" },
];

describe("StaffGrid - 4-3-B. 교역자 그리드", () => {
  it("staff prop 개수만큼 카드가 렌더링된다", () => {
    render(<StaffGrid staff={mockStaff} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("각 카드에 이름이 표시된다", () => {
    render(<StaffGrid staff={mockStaff} />);
    expect(screen.getByText("이은혜")).toBeInTheDocument();
    expect(screen.getByText("박사랑")).toBeInTheDocument();
    expect(screen.getByText("최믿음")).toBeInTheDocument();
  });

  it("각 카드에 직분이 표시된다", () => {
    render(<StaffGrid staff={mockStaff} />);
    expect(screen.getByText("부목사")).toBeInTheDocument();
    expect(screen.getByText("전도사")).toBeInTheDocument();
    expect(screen.getByText("교육목사")).toBeInTheDocument();
  });

  it("imageUrl 있을 때 원형 프로필 이미지가 렌더링된다", () => {
    render(<StaffGrid staff={mockStaff} />);
    expect(screen.getByAltText("박사랑")).toBeInTheDocument();
  });
});
