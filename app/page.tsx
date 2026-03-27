import HeroSection from "@/components/sections/hero-section";
import QuickActions from "@/components/sections/quick-actions";
import CommunitySection from "@/components/sections/community-section";
import ContentSection from "@/components/sections/content-section";

const SAMPLE_VIDEOS = [
  {
    id: "sample1",
    title: "주일 예배 설교 — 은혜와 진리가 충만한 삶",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    publishedAt: "2025-03-23T10:00:00Z",
  },
  {
    id: "sample2",
    title: "수요 예배 — 하나님의 인도하심을 믿으며",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    publishedAt: "2025-03-19T19:30:00Z",
  },
  {
    id: "sample3",
    title: "금요 성령집회 — 기도로 세워지는 교회",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    publishedAt: "2025-03-14T19:30:00Z",
  },
  {
    id: "sample4",
    title: "주일 예배 설교 — 말씀으로 살아가는 성도",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    publishedAt: "2025-03-09T10:00:00Z",
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuickActions />
      <CommunitySection />
      <ContentSection videos={SAMPLE_VIDEOS} />
    </main>
  );
}
