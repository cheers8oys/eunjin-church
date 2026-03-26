import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";

export const metadata: Metadata = {
  title: "새신자 안내",
  description: "은진교회에 처음 오신 분들을 위한 방문 안내, 등록 방법, 기도 요청을 안내합니다.",
};

export default function NewcomerPage() {
  return (
    <>
      <SubpageHero
        title="새신자 안내"
        subtitle="은진교회에 처음 오신 것을 환영합니다"
        breadcrumbs={[{ label: "새신자 안내" }]}
      />

      {/* 본문 (추후 구현) */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-muted-foreground">
        콘텐츠 준비 중입니다.
      </div>
    </>
  );
}
