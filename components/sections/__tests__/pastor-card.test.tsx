import { render, screen } from "@testing-library/react";
import PastorCard from "../pastor-card";

const defaultProps = {
  name: "김은진",
  role: "담임목사",
  bio: "신학대학원을 졸업하고 30년간 목회하였습니다.",
};

describe("PastorCard - 4-3-A. 담임목사 프로필", () => {
  it("담임목사 이름이 렌더링된다", () => {
    render(<PastorCard {...defaultProps} />);
    expect(screen.getByText("김은진")).toBeInTheDocument();
  });

  it("직분 텍스트가 렌더링된다", () => {
    render(<PastorCard {...defaultProps} />);
    expect(screen.getByText("담임목사")).toBeInTheDocument();
  });

  it("약력 텍스트가 렌더링된다", () => {
    render(<PastorCard {...defaultProps} />);
    expect(
      screen.getByText("신학대학원을 졸업하고 30년간 목회하였습니다.")
    ).toBeInTheDocument();
  });

  it("imageUrl 있을 때 이미지(alt=이름)가 렌더링된다", () => {
    render(<PastorCard {...defaultProps} imageUrl="/pastor.jpg" />);
    expect(screen.getByAltText("김은진")).toBeInTheDocument();
  });
});
