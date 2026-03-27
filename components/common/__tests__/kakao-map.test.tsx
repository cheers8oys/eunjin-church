import { render, screen } from "@testing-library/react";
import KakaoMap from "../kakao-map";

describe("KakaoMap - 4-6-B. 카카오 지도", () => {
  it("id='kakao-map' 컨테이너가 렌더링된다", () => {
    render(<KakaoMap />);
    expect(document.getElementById("kakao-map")).toBeInTheDocument();
  });

  it("주소 텍스트 '경기 의정부시 추동로 98'이 렌더링된다", () => {
    render(<KakaoMap />);
    expect(screen.getByText(/경기 의정부시 추동로 98/)).toBeInTheDocument();
  });
});
