"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";

type NavLeaf = { label: string; href: string };
type NavGroup = { label: string; children: NavLeaf[] };
type NavItem = NavLeaf | NavGroup;

export const NAV_ITEMS: NavItem[] = [
  {
    label: "소개",
    children: [
      { label: "교회소개", href: "/about" },
      { label: "예배안내", href: "/worship" },
      { label: "섬기는 사람들", href: "/staff" },
    ],
  },
  {
    label: "공동체",
    children: [
      { label: "장년", href: "/community/senior" },
      { label: "청년", href: "/community/youth" },
      { label: "다음세대", href: "/community/nextgen" },
      { label: "주일학교", href: "/community/sunday-school" },
    ],
  },
  {
    label: "미디어",
    children: [
      { label: "설교 영상", href: "/media/sermons" },
      { label: "콘텐츠", href: "/media/contents" },
      { label: "갤러리", href: "/media/gallery" },
    ],
  },
  { label: "새신자 안내", href: "/newcomer" },
  { label: "오시는 길", href: "/location" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        {/* 로고 */}
        <Link href="/" aria-label="은진교회 홈으로" className="flex items-center gap-2">
          <Image
            src="/은진교회_로고.jpeg"
            alt="은진교회 로고"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-white text-lg">은진교회</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav aria-label="주 메뉴" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) =>
            "href" in item ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-accent transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                  className="flex items-center gap-1 text-white hover:text-accent transition-colors text-sm font-medium"
                >
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {openMenu === item.label && (
                  <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md min-w-[160px] py-1 z-50">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                          onClick={() => setOpenMenu(null)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          )}
        </nav>

        {/* 모바일 햄버거 */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-white"
              aria-label="메뉴 열기"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">메뉴</SheetTitle>
            <nav aria-label="모바일 메뉴" className="flex flex-col mt-8">
              {NAV_ITEMS.map((item) =>
                "href" in item ? (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ) : (
                  <div key={item.label} className="border-b border-gray-100">
                    <button
                      className="flex items-center justify-between w-full py-3 px-2 font-medium text-gray-800"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    {mobileExpanded === item.label && (
                      <ul className="pl-4 pb-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <SheetClose asChild>
                              <Link
                                href={child.href}
                                className="block py-2 px-2 text-sm text-gray-600"
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
