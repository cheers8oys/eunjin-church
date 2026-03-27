import { render, screen } from "@testing-library/react";
import TransportGuide from "../transport-guide";

describe("TransportGuide - 4-6-A. 교통편 안내", () => {
  it("버스 안내 카드가 렌더링된다", () => {
    render(<TransportGuide />);
    expect(screen.getByText("버스")).toBeInTheDocument();
  });

  it("지하철 안내 카드가 렌더링된다", () => {
    render(<TransportGuide />);
    expect(screen.getByText("지하철")).toBeInTheDocument();
  });

  it("자가용 안내 카드가 렌더링된다", () => {
    render(<TransportGuide />);
    expect(screen.getByText("자가용")).toBeInTheDocument();
  });
});
