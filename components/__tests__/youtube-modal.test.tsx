import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YoutubeModal from "../youtube-modal";

describe("YoutubeModal - 3-7-A. Facade 패턴 렌더링", () => {
  it("open=true + videoId 전달 시 iframe이 렌더링된다", () => {
    render(
      <YoutubeModal open={true} videoId="abc123" onClose={() => {}} />
    );
    expect(screen.getByTitle("YouTube video player")).toBeInTheDocument();
  });

  it("iframe src에 videoId가 포함된다", () => {
    render(
      <YoutubeModal open={true} videoId="abc123" onClose={() => {}} />
    );
    expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
      "src",
      expect.stringContaining("abc123")
    );
  });

  it("iframe src에 autoplay=1이 포함된다", () => {
    render(
      <YoutubeModal open={true} videoId="abc123" onClose={() => {}} />
    );
    expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
      "src",
      expect.stringContaining("autoplay=1")
    );
  });

  it("open=false 일 때 iframe이 렌더링되지 않는다", () => {
    render(
      <YoutubeModal open={false} videoId="abc123" onClose={() => {}} />
    );
    expect(
      screen.queryByTitle("YouTube video player")
    ).not.toBeInTheDocument();
  });

  it("videoId=null 일 때 iframe이 렌더링되지 않는다", () => {
    render(
      <YoutubeModal open={true} videoId={null} onClose={() => {}} />
    );
    expect(
      screen.queryByTitle("YouTube video player")
    ).not.toBeInTheDocument();
  });
});

describe("YoutubeModal - 3-7-B. 닫기", () => {
  it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
    const onClose = jest.fn();
    render(
      <YoutubeModal open={true} videoId="abc123" onClose={onClose} />
    );
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
