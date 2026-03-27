import { render, screen } from "@testing-library/react";
import LocationPage from "../location/page";

jest.mock("@/components/sections/transport-guide", () =>
  function MockTransportGuide() { return <div data-testid="transport-guide" />; }
);
jest.mock("@/components/common/kakao-map", () =>
  function MockKakaoMap() { return <div data-testid="kakao-map" />; }
);
jest.mock("@/components/sections/subpage-hero", () =>
  function MockSubpageHero({ title }: { title: string }) {
    return <div data-testid="subpage-hero">{title}</div>;
  }
);

describe("LocationPage - 4-6. 오시는 길 통합", () => {
  it("TransportGuide 컴포넌트가 렌더링된다", () => {
    render(<LocationPage />);
    expect(screen.getByTestId("transport-guide")).toBeInTheDocument();
  });

  it("KakaoMap 컴포넌트가 렌더링된다", () => {
    render(<LocationPage />);
    expect(screen.getByTestId("kakao-map")).toBeInTheDocument();
  });
});
