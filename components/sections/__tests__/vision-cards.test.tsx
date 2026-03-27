import { render, screen } from "@testing-library/react";
import VisionCards from "../vision-cards";

const mockVisions = [
  { title: "비전 1", description: "설명 1" },
  { title: "비전 2", description: "설명 2" },
  { title: "비전 3", description: "설명 3" },
];

describe("VisionCards - 4-1-B. 카드 렌더링", () => {
  it("visions prop 개수만큼 카드가 렌더링된다", () => {
    render(<VisionCards visions={mockVisions} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("각 카드에 title이 표시된다", () => {
    render(<VisionCards visions={mockVisions} />);
    expect(screen.getByText("비전 1")).toBeInTheDocument();
    expect(screen.getByText("비전 2")).toBeInTheDocument();
    expect(screen.getByText("비전 3")).toBeInTheDocument();
  });

  it("각 카드에 description이 표시된다", () => {
    render(<VisionCards visions={mockVisions} />);
    expect(screen.getByText("설명 1")).toBeInTheDocument();
    expect(screen.getByText("설명 2")).toBeInTheDocument();
    expect(screen.getByText("설명 3")).toBeInTheDocument();
  });
});
