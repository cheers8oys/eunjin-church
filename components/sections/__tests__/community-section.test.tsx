import { render, screen } from "@testing-library/react";
import CommunitySection from "../community-section";

const mockCommunities = [
  {
    id: "1",
    title: "청년부",
    description: "청년들이 함께 성장하는 공동체",
    href: "/community/youth",
  },
  {
    id: "2",
    title: "장년부",
    description: "믿음으로 세워지는 장년 공동체",
    href: "/community/adult",
  },
];

describe("CommunitySection - 3-3-A. 섹션 구조", () => {
  it("섹션 제목이 렌더링된다", () => {
    render(<CommunitySection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("부제 텍스트가 렌더링된다", () => {
    render(<CommunitySection />);
    expect(screen.getByText(/다양한 공동체가/)).toBeInTheDocument();
  });

  it('"공동체 둘러보기" 링크가 렌더링된다', () => {
    render(<CommunitySection />);
    expect(
      screen.getByRole("link", { name: /공동체 둘러보기/ })
    ).toBeInTheDocument();
  });
});

describe("CommunitySection - 3-3-B. 공동체 카드", () => {
  it("communities prop으로 카드 개수만큼 렌더링된다", () => {
    render(<CommunitySection communities={mockCommunities} />);
    expect(screen.getAllByText(/청년부|장년부/)).toHaveLength(2);
  });

  it("각 카드에 title이 표시된다", () => {
    render(<CommunitySection communities={mockCommunities} />);
    expect(screen.getByText("청년부")).toBeInTheDocument();
    expect(screen.getByText("장년부")).toBeInTheDocument();
  });

  it("각 카드에 description이 표시된다", () => {
    render(<CommunitySection communities={mockCommunities} />);
    expect(
      screen.getByText("청년들이 함께 성장하는 공동체")
    ).toBeInTheDocument();
    expect(
      screen.getByText("믿음으로 세워지는 장년 공동체")
    ).toBeInTheDocument();
  });

  it("각 카드 링크가 올바른 href를 가진다", () => {
    render(<CommunitySection communities={mockCommunities} />);
    const links = screen.getAllByRole("link");
    const cardLinks = links.filter(
      (link) =>
        link.getAttribute("href") === "/community/youth" ||
        link.getAttribute("href") === "/community/adult"
    );
    expect(cardLinks).toHaveLength(2);
  });

  it("communities prop이 없을 때 기본 목록(장년/청년/다음세대/주일학교)이 렌더링된다", () => {
    render(<CommunitySection />);
    expect(screen.getByText("장년부")).toBeInTheDocument();
    expect(screen.getByText("청년부")).toBeInTheDocument();
    expect(screen.getByText("다음세대")).toBeInTheDocument();
    expect(screen.getByText("주일학교")).toBeInTheDocument();
  });
});
