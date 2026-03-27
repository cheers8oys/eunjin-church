import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Lightbox from "../lightbox";

const photos = [
  { src: "/img/1.jpg", alt: "사진 1" },
  { src: "/img/2.jpg", alt: "사진 2" },
  { src: "/img/3.jpg", alt: "사진 3" },
];

describe("Lightbox - 3-8-A. 기본 렌더링", () => {
  it("open=true 시 initialIndex 이미지가 렌더링된다", () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={0} onClose={() => {}} />
    );
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
  });

  it("initialIndex=1 이면 두 번째 이미지가 렌더링된다", () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={1} onClose={() => {}} />
    );
    expect(screen.getByAltText("사진 2")).toBeInTheDocument();
  });

  it("open=false 일 때 이미지가 렌더링되지 않는다", () => {
    render(
      <Lightbox open={false} photos={photos} initialIndex={0} onClose={() => {}} />
    );
    expect(screen.queryByAltText("사진 1")).not.toBeInTheDocument();
  });
});

describe("Lightbox - 3-8-B. 이전/다음 탐색", () => {
  it('"다음" 버튼 클릭 시 다음 이미지로 이동한다', async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={0} onClose={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByAltText("사진 2")).toBeInTheDocument();
  });

  it('"이전" 버튼 클릭 시 이전 이미지로 이동한다', async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={1} onClose={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "이전" }));
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
  });

  it("마지막 이미지에서 다음 클릭 시 첫 번째로 순환한다", async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={2} onClose={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
  });

  it("첫 번째 이미지에서 이전 클릭 시 마지막으로 순환한다", async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={0} onClose={() => {}} />
    );
    await userEvent.click(screen.getByRole("button", { name: "이전" }));
    expect(screen.getByAltText("사진 3")).toBeInTheDocument();
  });
});

describe("Lightbox - 3-8-C. 단일 사진", () => {
  it("photos가 1개일 때 이전/다음 버튼이 없다", () => {
    render(
      <Lightbox
        open={true}
        photos={[{ src: "/img/1.jpg", alt: "사진 1" }]}
        onClose={() => {}}
      />
    );
    expect(screen.queryByRole("button", { name: "이전" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "다음" })).not.toBeInTheDocument();
  });
});

describe("Lightbox - 3-8-D. 닫기", () => {
  it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
    const onClose = jest.fn();
    render(
      <Lightbox open={true} photos={photos} initialIndex={0} onClose={onClose} />
    );
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("Lightbox - 3-8-E. 키보드 탐색", () => {
  it("ArrowRight 키 입력 시 다음 이미지로 이동한다", async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={0} onClose={() => {}} />
    );
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByAltText("사진 2")).toBeInTheDocument();
  });

  it("ArrowLeft 키 입력 시 이전 이미지로 이동한다", async () => {
    render(
      <Lightbox open={true} photos={photos} initialIndex={1} onClose={() => {}} />
    );
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByAltText("사진 1")).toBeInTheDocument();
  });
});
