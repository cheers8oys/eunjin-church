import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryPreview from "../gallery-preview";

const mockPhotos = [
  { id: "p1", src: "/img/1.jpg", alt: "사진 1" },
  { id: "p2", src: "/img/2.jpg", alt: "사진 2" },
  { id: "p3", src: "/img/3.jpg", alt: "사진 3" },
];

describe("GalleryPreview - 3-5-A. 섹션 구조", () => {
  it("섹션 제목이 렌더링된다", () => {
    render(<GalleryPreview />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it('"갤러리 더보기" 링크가 /media/gallery를 가진다', () => {
    render(<GalleryPreview />);
    expect(
      screen.getByRole("link", { name: /갤러리 더보기/ })
    ).toHaveAttribute("href", "/media/gallery");
  });
});

describe("GalleryPreview - 3-5-B. 사진 그리드", () => {
  it("photos prop으로 이미지 개수만큼 렌더링된다", () => {
    render(<GalleryPreview photos={mockPhotos} />);
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
    expect(screen.getByAltText("사진 2")).toBeInTheDocument();
    expect(screen.getByAltText("사진 3")).toBeInTheDocument();
  });

  it("각 이미지에 alt 속성이 설정된다", () => {
    render(<GalleryPreview photos={mockPhotos} />);
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
  });

  it("photos가 8개 초과 시 처음 8개만 표시된다", () => {
    const manyPhotos = Array.from({ length: 10 }, (_, i) => ({
      id: `p${i}`,
      src: `/img/${i}.jpg`,
      alt: `사진 ${i + 1}`,
    }));
    render(<GalleryPreview photos={manyPhotos} />);
    expect(screen.getByAltText("사진 8")).toBeInTheDocument();
    expect(screen.queryByAltText("사진 9")).not.toBeInTheDocument();
    expect(screen.queryByAltText("사진 10")).not.toBeInTheDocument();
  });

  it("photos prop이 없을 때 빈 상태 메시지가 표시된다", () => {
    render(<GalleryPreview />);
    expect(screen.getByText(/등록된 사진이 없습니다/)).toBeInTheDocument();
  });
});

describe("GalleryPreview - 3-5-C. 라이트박스 연동", () => {
  it("사진 클릭 시 Lightbox가 열린다", async () => {
    render(<GalleryPreview photos={mockPhotos} />);
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    // Lightbox open → 다음/이전 버튼이 나타남 (photos.length > 1)
    expect(screen.getByRole("button", { name: "다음" })).toBeInTheDocument();
  });

  it("클릭한 사진의 인덱스가 Lightbox initialIndex로 전달된다", async () => {
    render(<GalleryPreview photos={mockPhotos} />);
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[1]); // 두 번째 사진 (index=1)
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });
});
