import { render, screen, within } from "@testing-library/react";
import SubpageHero from "../subpage-hero";

describe("SubpageHero - 2-3-A. 기본 렌더링", () => {
  it("title prop이 <h1>으로 렌더링된다", () => {
    render(
      <SubpageHero title="교회소개" breadcrumbs={[{ label: "교회소개" }]} />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "교회소개" })
    ).toBeInTheDocument();
  });

  it("subtitle prop이 있을 때 렌더링된다", () => {
    render(
      <SubpageHero
        title="교회소개"
        subtitle="은진교회를 소개합니다"
        breadcrumbs={[{ label: "교회소개" }]}
      />
    );
    expect(screen.getByText("은진교회를 소개합니다")).toBeInTheDocument();
  });

  it("subtitle prop이 없을 때 렌더링되지 않는다", () => {
    render(
      <SubpageHero title="교회소개" breadcrumbs={[{ label: "교회소개" }]} />
    );
    // subtitle을 넘기지 않았을 때 아무 부제 텍스트도 없어야 함
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("nav[aria-label='breadcrumb']이 존재한다", () => {
    render(
      <SubpageHero title="교회소개" breadcrumbs={[{ label: "교회소개" }]} />
    );
    expect(
      screen.getByRole("navigation", { name: "breadcrumb" })
    ).toBeInTheDocument();
  });

  it("Home 링크가 href='/'를 가진다", () => {
    render(
      <SubpageHero title="교회소개" breadcrumbs={[{ label: "교회소개" }]} />
    );
    expect(screen.getByRole("link", { name: /홈/ })).toHaveAttribute(
      "href",
      "/"
    );
  });
});

describe("SubpageHero - 2-3-A. 브레드크럼 렌더링", () => {
  it("href가 있는 breadcrumb는 링크로 렌더링된다", () => {
    render(
      <SubpageHero
        title="교회소개"
        breadcrumbs={[{ label: "소개", href: "/about" }, { label: "교회소개" }]}
      />
    );
    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("href가 없는 마지막 breadcrumb는 링크가 아닌 텍스트로 렌더링된다", () => {
    render(
      <SubpageHero
        title="교회소개"
        breadcrumbs={[{ label: "소개", href: "/about" }, { label: "교회소개" }]}
      />
    );
    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    // 브레드크럼 nav 안에서 "교회소개"가 링크가 아니어야 함
    const linkTextsInNav = within(nav)
      .getAllByRole("link")
      .map((l) => l.textContent?.trim());
    expect(linkTextsInNav).not.toContain("교회소개");
    // nav 안에 "교회소개" 텍스트는 존재해야 함
    expect(within(nav).getByText("교회소개")).toBeInTheDocument();
  });
});
