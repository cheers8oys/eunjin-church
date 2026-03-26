import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";

export const metadata: Metadata = {
  title: "예배안내",
  description: "은진교회 주일예배, 수요예배, 새벽기도 등 예배 시간과 장소를 안내합니다.",
};

export default function WorshipPage() {
  return (
    <>
      <SubpageHero
        title="예배안내"
        subtitle="주님 앞에 나아오는 모든 예배를 안내합니다"
        breadcrumbs={[{ label: "소개" }, { label: "예배안내" }]}
      />

      {/* 본문 (추후 구현) */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-muted-foreground">
        콘텐츠 준비 중입니다.
      </div>
    </>
  );
}
