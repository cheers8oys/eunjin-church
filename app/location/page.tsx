import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";
import KakaoMap from "@/components/common/kakao-map";
import TransportGuide from "@/components/sections/transport-guide";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "은진교회 오시는 길과 교통 안내입니다. 경기 의정부시 추동로 98.",
};

export default function LocationPage() {
  return (
    <>
      <SubpageHero
        title="오시는 길"
        subtitle="은진교회로 오시는 길을 안내합니다"
        breadcrumbs={[{ label: "오시는 길" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <KakaoMap />
        </div>
      </section>

      <TransportGuide />
    </>
  );
}
