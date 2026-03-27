import { render, screen } from "@testing-library/react";
import PastorGreeting from "../pastor-greeting";

const defaultProps = {
  name: "홍길동",
  title: "담임목사",
  greeting: "은혜와 진리가 충만한 교회에 오신 것을 환영합니다.",
};

describe("PastorGreeting - 4-1-A. 기본 렌더링", () => {
  it("담임목사 이름이 렌더링된다", () => {
    render(<PastorGreeting {...defaultProps} />);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
  });

  it("직함(title)이 렌더링된다", () => {
    render(<PastorGreeting {...defaultProps} />);
    expect(screen.getByText("담임목사")).toBeInTheDocument();
  });

  it("인사말 텍스트가 렌더링된다", () => {
    render(<PastorGreeting {...defaultProps} />);
    expect(
      screen.getByText("은혜와 진리가 충만한 교회에 오신 것을 환영합니다.")
    ).toBeInTheDocument();
  });

  it("imageUrl prop이 있을 때 이미지가 렌더링된다", () => {
    render(<PastorGreeting {...defaultProps} imageUrl="/pastor.jpg" />);
    expect(screen.getByAltText("홍길동")).toBeInTheDocument();
  });

  it("imageUrl prop이 없을 때 이미지가 렌더링되지 않는다", () => {
    render(<PastorGreeting {...defaultProps} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
