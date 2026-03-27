import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";
import WorshipSchedule from "@/components/sections/worship-schedule";

export const metadata: Metadata = {
  title: "예배안내",
  description: "은진교회 주일예배, 수요예배, 새벽기도 등 예배 시간과 장소를 안내합니다.",
};

const SCHEDULES = [
  {
    name: "주일 1부 예배",
    time: "오전 9시 00분",
    location: "본당",
  },
  {
    name: "주일 2부 예배",
    time: "오전 11시 00분",
    location: "본당",
    description: "유튜브 온라인 동시 송출",
  },
  {
    name: "주일 3부 예배",
    time: "오후 1시 30분",
    location: "본당",
  },
  {
    name: "수요 예배",
    time: "수요일 오후 7시 30분",
    location: "본당",
  },
  {
    name: "새벽 기도회",
    time: "월~토 오전 5시 30분",
    location: "본당",
  },
  {
    name: "금요 철야 기도회",
    time: "금요일 오후 11시",
    location: "본당",
  },
];

export default function WorshipPage() {
  return (
    <>
      <SubpageHero
        title="예배안내"
        subtitle="주님 앞에 나아오는 모든 예배를 안내합니다"
        breadcrumbs={[{ label: "소개" }, { label: "예배안내" }]}
      />

      <WorshipSchedule schedules={SCHEDULES} />
    </>
  );
}
