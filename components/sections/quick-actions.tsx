import Link from "next/link";
import { Church, BookOpen, UserPlus, Heart, HandHelping } from "lucide-react";

const QUICK_ACTIONS = [
  { label: "예배안내", href: "/worship", icon: Church },
  { label: "주보", href: "/media/bulletins", icon: BookOpen },
  { label: "새신자 등록", href: "/newcomer#register", icon: UserPlus },
  { label: "기도 요청", href: "/newcomer#prayer", icon: Heart },
  { label: "봉사 신청", href: "/newcomer#serve", icon: HandHelping },
] as const;

export default function QuickActions() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 justify-items-center">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Icon size={24} style={{ color: "#C9A96E" }} />
                </span>
                <span className="text-sm font-medium text-primary">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
