import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";

export const metadata: Metadata = {
  title: "교회소개",
  description: "은진교회의 비전, 핵심가치, 연혁, 담임목사 인사말을 소개합니다.",
};

export default function AboutPage() {
  return (
    <>
      <SubpageHero
        title="교회소개"
        subtitle="은혜와 진리가 충만한 교회, 은진교회를 소개합니다"
        breadcrumbs={[{ label: "소개" }, { label: "교회소개" }]}
      />

      {/* 본문 (추후 구현) */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-muted-foreground">
        콘텐츠 준비 중입니다.
      </div>
    </>
  );
}
