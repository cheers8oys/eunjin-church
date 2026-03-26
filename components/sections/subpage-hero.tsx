import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  /** 배경 커스텀 CSS 클래스 (기본: primary 그라디언트) */
  className?: string;
}

export default function SubpageHero({
  title,
  subtitle,
  breadcrumbs,
  className,
}: SubpageHeroProps) {
  return (
    <section
      className={`relative w-full h-[260px] md:h-[320px] flex flex-col items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: "#FAF8F5" }}
    >
      {/* 장식 요소: 대각선 패턴 */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 좌하단 골드 포인트 원 */}
      <div
        className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-20"
        style={{ background: "#C9A96E" }}
      />
      {/* 우상단 골드 포인트 원 */}
      <div
        className="absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-20"
        style={{ background: "#C9A96E" }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* 골드 구분선 */}
        <div
          className="w-10 h-[3px] mb-4 rounded-full"
          style={{ background: "#C9A96E" }}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-sm md:text-base text-gray-500 max-w-md">
            {subtitle}
          </p>
        )}

        {/* 브레드크럼 */}
        <nav
          aria-label="breadcrumb"
          className="mt-5 flex items-center gap-1 text-xs text-gray-400"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-700 transition-colors"
          >
            <Home size={12} />
            <span>홈</span>
          </Link>
          {breadcrumbs.map((item, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <ChevronRight size={12} className="opacity-40" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
