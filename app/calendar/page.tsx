import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";

export const metadata: Metadata = {
  title: "교회 일정",
  description: "은진교회의 주요 행사와 일정을 확인하세요.",
};

export default function CalendarPage() {
  return (
    <>
      <SubpageHero
        title="교회 일정"
        subtitle="은진교회의 주요 행사와 일정을 안내합니다"
        breadcrumbs={[{ label: "교회 일정" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <iframe
            title="교회 일정 캘린더"
            src="https://calendar.google.com/calendar/embed?src=placeholder"
            className="w-full h-[600px] md:h-[800px] rounded-xl border border-gray-100"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>
    </>
  );
}
