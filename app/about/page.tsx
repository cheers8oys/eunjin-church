import type { Metadata } from "next";
import SubpageHero from "@/components/sections/subpage-hero";
import PastorGreeting from "@/components/sections/pastor-greeting";
import VisionCards from "@/components/sections/vision-cards";
import HistoryTimeline from "@/components/sections/history-timeline";

export const metadata: Metadata = {
  title: "교회소개",
  description: "은진교회의 비전, 핵심가치, 연혁, 담임목사 인사말을 소개합니다.",
};

const VISIONS = [
  {
    icon: "✝️",
    title: "말씀 중심",
    description: "하나님의 말씀을 삶의 기준으로 삼고 그 말씀대로 살아가는 공동체입니다.",
  },
  {
    icon: "🙏",
    title: "기도하는 교회",
    description: "기도로 세워지고 기도로 움직이는 교회로서, 중보기도 사역을 통해 하나님의 뜻을 이루어 갑니다.",
  },
  {
    icon: "🌍",
    title: "선교하는 교회",
    description: "땅 끝까지 복음을 전하는 사명을 감당하기 위해 국내외 선교를 적극 지원합니다.",
  },
  {
    icon: "🤝",
    title: "섬기는 공동체",
    description: "서로 사랑하고 섬기는 제자 공동체를 이루어 세상의 빛과 소금이 됩니다.",
  },
  {
    icon: "📖",
    title: "다음 세대",
    description: "어린이와 청소년이 말씀 안에서 바르게 성장할 수 있도록 돕는 교회입니다.",
  },
  {
    icon: "💛",
    title: "은혜와 진리",
    description: "은혜와 진리가 충만한 예배를 통해 하나님을 높이고 성도가 함께 성장합니다.",
  },
];

const HISTORY = [
  { year: "1993", title: "은진교회 창립", description: "경기도 의정부시에서 작은 성도들의 모임으로 시작" },
  { year: "2001", title: "현 예배당 건축 완공", description: "추동로 98번지 본당 완공 및 이전 예배" },
  { year: "2008", title: "해외 선교 파송", description: "첫 해외 선교사 파송 (동남아시아)" },
  { year: "2015", title: "다음 세대 센터 개관", description: "어린이·청소년 교육관 신축" },
  { year: "2020", title: "온라인 예배 시작", description: "유튜브 실시간 예배 송출 시작" },
  { year: "2024", title: "30주년 기념 감사예배", description: "창립 30주년 감사예배 및 비전 선포식" },
];

export default function AboutPage() {
  return (
    <>
      <SubpageHero
        title="교회소개"
        subtitle="은혜와 진리가 충만한 교회, 은진교회를 소개합니다"
        breadcrumbs={[{ label: "소개" }, { label: "교회소개" }]}
      />

      <PastorGreeting
        name="담임목사"
        title="담임목사"
        greeting={`사랑하는 성도 여러분, 은진교회에 오신 것을 환영합니다.\n\n저희 교회는 '은혜와 진리가 충만한 교회'라는 비전을 품고,\n말씀과 기도, 선교와 섬김으로 하나님 나라를 함께 세워가고 있습니다.\n\n처음 오신 분들을 환영하며, 이곳에서 하나님의 사랑을 경험하시길 기도합니다.`}
      />

      <VisionCards visions={VISIONS} />

      <HistoryTimeline events={HISTORY} />
    </>
  );
}
