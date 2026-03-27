import { render, screen } from "@testing-library/react";
import NewcomerPage from "../newcomer/page";

jest.mock("@/components/sections/visit-guide", () =>
  function MockVisitGuide() { return <div data-testid="visit-guide" />; }
);
jest.mock("@/components/sections/subpage-hero", () =>
  function MockSubpageHero({ title }: { title: string }) {
    return <div data-testid="subpage-hero">{title}</div>;
  }
);

describe("NewcomerPage - 4-4. 새신자 안내 통합", () => {
  it("VisitGuide 컴포넌트가 렌더링된다", () => {
    render(<NewcomerPage />);
    expect(screen.getByTestId("visit-guide")).toBeInTheDocument();
  });

  it("id='register' 요소가 존재한다", () => {
    render(<NewcomerPage />);
    expect(document.getElementById("register")).toBeInTheDocument();
  });

  it("id='prayer' 요소가 존재한다", () => {
    render(<NewcomerPage />);
    expect(document.getElementById("prayer")).toBeInTheDocument();
  });

  it("id='serve' 요소가 존재한다", () => {
    render(<NewcomerPage />);
    expect(document.getElementById("serve")).toBeInTheDocument();
  });

  it("'등록' 관련 텍스트가 존재한다", () => {
    render(<NewcomerPage />);
    expect(screen.getAllByText(/등록/).length).toBeGreaterThan(0);
  });

  it("'기도' 관련 텍스트가 존재한다", () => {
    render(<NewcomerPage />);
    expect(screen.getAllByText(/기도/).length).toBeGreaterThan(0);
  });

  it("'봉사' 관련 텍스트가 존재한다", () => {
    render(<NewcomerPage />);
    expect(screen.getAllByText(/봉사/).length).toBeGreaterThan(0);
  });
});
