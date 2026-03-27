import { render, screen } from "@testing-library/react";
import QuickActions from "../quick-actions";

describe("QuickActions - 3-2-A. 버튼 렌더링", () => {
  it("5개 액션 링크가 모두 렌더링된다", () => {
    render(<QuickActions />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it('"예배안내" 링크가 /worship을 가진다', () => {
    render(<QuickActions />);
    expect(screen.getByRole("link", { name: /예배안내/ })).toHaveAttribute(
      "href",
      "/worship"
    );
  });

  it('"주보" 링크가 /media/bulletins를 가진다', () => {
    render(<QuickActions />);
    expect(screen.getByRole("link", { name: /주보/ })).toHaveAttribute(
      "href",
      "/media/bulletins"
    );
  });

  it('"새신자 등록" 링크가 /newcomer#register를 가진다', () => {
    render(<QuickActions />);
    expect(screen.getByRole("link", { name: /새신자 등록/ })).toHaveAttribute(
      "href",
      "/newcomer#register"
    );
  });

  it('"기도 요청" 링크가 /newcomer#prayer를 가진다', () => {
    render(<QuickActions />);
    expect(screen.getByRole("link", { name: /기도 요청/ })).toHaveAttribute(
      "href",
      "/newcomer#prayer"
    );
  });

  it('"봉사 신청" 링크가 /newcomer#serve를 가진다', () => {
    render(<QuickActions />);
    expect(screen.getByRole("link", { name: /봉사 신청/ })).toHaveAttribute(
      "href",
      "/newcomer#serve"
    );
  });
});
