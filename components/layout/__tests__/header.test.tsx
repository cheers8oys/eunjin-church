import { render, screen, within, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../header";

describe("Header - 2-1-A. 로고 렌더링", () => {
  it("로고 이미지가 렌더링된다 (alt='은진교회 로고')", () => {
    render(<Header />);
    expect(screen.getByAltText("은진교회 로고")).toBeInTheDocument();
  });

  it("교회명 텍스트 '은진교회'가 렌더링된다", () => {
    render(<Header />);
    expect(screen.getByText("은진교회")).toBeInTheDocument();
  });

  it("로고가 / 링크를 가진다", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /은진교회/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});

describe("Header - 2-1-B. 데스크톱 네비게이션 메뉴 구조", () => {
  it("'소개' 메뉴가 존재한다", () => {
    render(<Header />);
    expect(screen.getByText("소개")).toBeInTheDocument();
  });

  it("'공동체' 메뉴가 존재한다", () => {
    render(<Header />);
    expect(screen.getByText("공동체")).toBeInTheDocument();
  });

  it("'미디어' 메뉴가 존재한다", () => {
    render(<Header />);
    expect(screen.getByText("미디어")).toBeInTheDocument();
  });

  it("'새신자 안내' 링크가 /newcomer를 가진다", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "새신자 안내" })).toHaveAttribute("href", "/newcomer");
  });

  it("'오시는 길' 링크가 /location을 가진다", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "오시는 길" })).toHaveAttribute("href", "/location");
  });
});

describe("Header - 2-1-C. 드롭다운 서브메뉴", () => {
  it("'소개' 클릭 시 하위 메뉴 3개 표시 (교회소개, 예배안내, 섬기는 사람들)", async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole("button", { name: /소개/ }));
    expect(screen.getByText("교회소개")).toBeInTheDocument();
    expect(screen.getByText("예배안내")).toBeInTheDocument();
    expect(screen.getByText("섬기는 사람들")).toBeInTheDocument();
  });

  it("'공동체' 클릭 시 하위 메뉴 4개 표시 (장년, 청년, 다음세대, 주일학교)", async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole("button", { name: /공동체/ }));
    expect(screen.getByText("장년")).toBeInTheDocument();
    expect(screen.getByText("청년")).toBeInTheDocument();
    expect(screen.getByText("다음세대")).toBeInTheDocument();
    expect(screen.getByText("주일학교")).toBeInTheDocument();
  });

  it("'미디어' 클릭 시 하위 메뉴 3개 표시 (설교 영상, 콘텐츠, 갤러리)", async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole("button", { name: /미디어/ }));
    expect(screen.getByText("설교 영상")).toBeInTheDocument();
    expect(screen.getByText("콘텐츠")).toBeInTheDocument();
    expect(screen.getByText("갤러리")).toBeInTheDocument();
  });
});

describe("Header - 2-1-D. 스크롤 투명→불투명 전환", () => {
  it("초기 상태: 헤더에 bg-white 클래스 적용", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveClass("bg-white");
  });

  it("scroll 이벤트 발생 후: shadow-sm 클래스 적용", async () => {
    render(<Header />);
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    await waitFor(() => {
      expect(screen.getByRole("banner")).toHaveClass("shadow-sm");
    });
  });
});

describe("Header - 2-1-E. 모바일 햄버거 메뉴", () => {
  it("햄버거 버튼이 존재한다 (aria-label='메뉴 열기')", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "메뉴 열기" })).toBeInTheDocument();
  });

  it("햄버거 버튼 클릭 시 Sheet가 열린다", async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole("button", { name: "메뉴 열기" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("Sheet 안에 전체 메뉴 항목이 존재한다", async () => {
    render(<Header />);
    await userEvent.click(screen.getByRole("button", { name: "메뉴 열기" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("소개")).toBeInTheDocument();
    expect(within(dialog).getByText("공동체")).toBeInTheDocument();
    expect(within(dialog).getByText("미디어")).toBeInTheDocument();
    expect(within(dialog).getByText("새신자 안내")).toBeInTheDocument();
    expect(within(dialog).getByText("오시는 길")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 Sheet가 닫힌다", async () => {
    render(<Header />);
    const hamburger = screen.getByRole("button", { name: "메뉴 열기" });
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "메뉴 열기" })).toHaveAttribute("aria-expanded", "false");
    });
  });
});

describe("Header - 2-1-F. 접근성", () => {
  it("nav에 aria-label='주 메뉴'가 있다", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "주 메뉴" })).toBeInTheDocument();
  });

  it("햄버거 버튼에 aria-expanded 속성이 있다", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "메뉴 열기" })).toHaveAttribute("aria-expanded");
  });

  it("aria-expanded 값이 메뉴 열림 상태와 일치한다", async () => {
    render(<Header />);
    const btn = screen.getByRole("button", { name: "메뉴 열기" });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(btn);
    await waitFor(() => {
      // Sheet 오픈 시 Radix가 배경을 aria-hidden 처리 → hidden:true 로 조회
      const trigger = screen.getByRole("button", { name: "메뉴 열기", hidden: true });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });
});
