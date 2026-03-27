import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";
import VisitGuide from "@/components/sections/visit-guide";

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

      <VisitGuide />

      <section id="register" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">새신자 등록</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            은진교회 성도로 등록하시면 다양한 공동체와 소그룹 활동에 참여하실 수 있습니다.
            예배 후 안내데스크에서 등록 신청서를 작성해 주세요.
          </p>
        </div>
      </section>

      <section id="prayer" className="py-16 md:py-24 bg-section-warm">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">기도 요청</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            개인적인 기도 제목이 있으신 분은 기도 요청서를 작성해 주시면
            교역자들이 함께 기도해 드립니다.
          </p>
        </div>
      </section>

      <section id="serve" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">봉사 신청</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            찬양, 안내, 미디어, 주차 등 다양한 봉사 사역에 참여하실 수 있습니다.
            봉사를 원하시는 분은 담당 교역자에게 문의해 주세요.
          </p>
        </div>
      </section>
    </>
  );
}
