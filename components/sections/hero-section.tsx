import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heroData?: {
    sermonTitle: string;
    sermonDate: string;
    sermonSpeaker?: string;
  } | null;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-primary">
      <Image
        fill
        priority
        alt="은진교회 배경"
        src="/placeholder.jpg"
        className="object-cover"
      />
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          은진교회
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-accent" />
          <p className="text-lg md:text-xl text-white/90">
            은혜와 진리가 충만한 교회
          </p>
          <span className="w-8 h-px bg-accent" />
        </div>

        {/* 버튼 그룹 */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Button asChild variant="default">
            <Link href="/media/sermons">예배 영상 보기</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/location">교회 방문하기</Link>
          </Button>
        </div>

        {/* 설교 정보 */}
        {heroData && (
          <div className="mt-8 border-l-4 border-accent pl-4 text-left text-white/90 max-w-sm">
            <p className="font-semibold">{heroData.sermonTitle}</p>
            <p className="text-sm text-white/70">{heroData.sermonDate}</p>
          </div>
        )}
      </div>
    </section>
  );
}
