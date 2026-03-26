import Link from "next/link";

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "교회소개", href: "/about" },
  { label: "예배안내", href: "/worship" },
  { label: "섬기는 사람들", href: "/staff" },
  { label: "새신자 안내", href: "/newcomer" },
  { label: "오시는 길", href: "/location" },
  { label: "교회 일정", href: "/calendar" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 교회 정보 */}
          <div>
            <p className="font-bold text-lg mb-1">은진교회</p>
            <p className="text-gray-500 text-sm mb-4">은혜와 진리가 충만한 교회</p>
            <address className="not-italic text-sm text-gray-500 space-y-1">
              <p>경기 의정부시 추동로 98</p>
            </address>
          </div>

          {/* 바로가기 */}
          <div>
            <p className="font-semibold text-sm mb-4 text-gray-500 uppercase tracking-wider">
              바로가기
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS */}
          <div>
            <p className="font-semibold text-sm mb-4 text-gray-500 uppercase tracking-wider">
              SNS
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@eunjinchurch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 저작권 바 */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>Copyright © {new Date().getFullYear()} 은진교회. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
