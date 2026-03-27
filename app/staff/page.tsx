import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";
import PastorCard from "@/components/sections/pastor-card";
import StaffGrid from "@/components/sections/staff-grid";

export const metadata: Metadata = {
  title: "섬기는 사람들",
  description: "은진교회를 함께 섬기는 목회자와 교역자를 소개합니다.",
};

const STAFF = [
  { name: "부목사", role: "부목사" },
  { name: "교육목사", role: "교육목사" },
  { name: "전도사 1", role: "전도사" },
  { name: "전도사 2", role: "전도사" },
  { name: "전도사 3", role: "전도사" },
  { name: "전도사 4", role: "전도사" },
];

export default function StaffPage() {
  return (
    <>
      <SubpageHero
        title="섬기는 사람들"
        subtitle="은진교회를 함께 세워가는 목회자와 교역자를 소개합니다"
        breadcrumbs={[{ label: "소개" }, { label: "섬기는 사람들" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            담임목사
          </h2>
          <PastorCard
            name="담임목사"
            role="담임목사"
            bio="신학대학원을 졸업하고 오랜 목회 경험을 통해 은진교회를 섬기고 있습니다."
          />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-section-warm">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            교역자
          </h2>
          <StaffGrid staff={STAFF} />
        </div>
      </section>
    </>
  );
}
