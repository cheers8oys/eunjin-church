import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContentSection from "../content-section";

const mockVideos = [
  {
    id: "vid1",
    title: "주일 설교 - 은혜의 말씀",
    thumbnailUrl: "/thumb1.jpg",
    publishedAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "vid2",
    title: "수요 예배 - 믿음으로",
    thumbnailUrl: "/thumb2.jpg",
    publishedAt: "2024-03-07T00:00:00Z",
  },
];

describe("ContentSection - 3-4-A. 섹션 구조", () => {
  it("섹션 제목이 렌더링된다", () => {
    render(<ContentSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it('"더보기" 링크가 /media/sermons를 가진다', () => {
    render(<ContentSection />);
    expect(screen.getByRole("link", { name: /더보기/ })).toHaveAttribute(
      "href",
      "/media/sermons"
    );
  });
});

describe("ContentSection - 3-4-B. 영상 카드", () => {
  it("videos prop으로 카드 개수만큼 렌더링된다", () => {
    render(<ContentSection videos={mockVideos} />);
    expect(screen.getByText("주일 설교 - 은혜의 말씀")).toBeInTheDocument();
    expect(screen.getByText("수요 예배 - 믿음으로")).toBeInTheDocument();
  });

  it("각 카드에 영상 제목이 표시된다", () => {
    render(<ContentSection videos={mockVideos} />);
    expect(screen.getByText("주일 설교 - 은혜의 말씀")).toBeInTheDocument();
  });

  it("각 카드에 날짜가 표시된다", () => {
    render(<ContentSection videos={mockVideos} />);
    const dates = screen.getAllByText(/2024/);
    expect(dates.length).toBeGreaterThan(0);
  });

  it("videos prop이 빈 배열일 때 카드가 없다", () => {
    render(<ContentSection videos={[]} />);
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("videos prop이 없을 때(undefined) 빈 상태 메시지가 표시된다", () => {
    render(<ContentSection />);
    expect(screen.getByText(/등록된 영상이 없습니다/)).toBeInTheDocument();
  });
});

describe("ContentSection - 3-4-C. YouTube 모달 연동", () => {
  it("영상 카드 클릭 시 YoutubeModal이 열린다", async () => {
    render(<ContentSection videos={mockVideos} />);
    const card = screen.getByText("주일 설교 - 은혜의 말씀").closest("button");
    await userEvent.click(card!);
    expect(screen.getByTitle("YouTube video player")).toBeInTheDocument();
  });

  it("클릭한 카드의 videoId가 모달에 전달된다", async () => {
    render(<ContentSection videos={mockVideos} />);
    const card = screen.getByText("주일 설교 - 은혜의 말씀").closest("button");
    await userEvent.click(card!);
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toHaveAttribute("src", expect.stringContaining("vid1"));
  });
});
