import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("RootLayout - 2-4. 루트 레이아웃 통합", () => {
  it("Header(banner)가 렌더링된다", () => {
    render(<RootLayout>테스트 콘텐츠</RootLayout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Footer(contentinfo)가 렌더링된다", () => {
    render(<RootLayout>테스트 콘텐츠</RootLayout>);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("children이 main 태그 안에 렌더링된다", () => {
    render(<RootLayout>테스트 콘텐츠</RootLayout>);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("테스트 콘텐츠");
  });

  it("main 태그에 pt-[72px] 클래스가 있다", () => {
    render(<RootLayout>테스트 콘텐츠</RootLayout>);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("pt-[72px]");
  });
});
