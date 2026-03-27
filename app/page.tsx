import HeroSection from "@/components/sections/hero-section";
import QuickActions from "@/components/sections/quick-actions";
import CommunitySection from "@/components/sections/community-section";
import ContentSection from "@/components/sections/content-section";
import GalleryPreview from "@/components/sections/gallery-preview";

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

const SAMPLE_PHOTOS = [
  { id: "photo1", src: "/images/gallery/01.jpg", alt: "교회 예배 모습" },
  { id: "photo2", src: "/images/gallery/02.jpg", alt: "청년부 모임" },
  { id: "photo3", src: "/images/gallery/03.jpg", alt: "성탄절 행사" },
  { id: "photo4", src: "/images/gallery/04.jpg", alt: "새신자 환영회" },
  { id: "photo5", src: "/images/gallery/05.jpg", alt: "수련회" },
  { id: "photo6", src: "/images/gallery/06.jpg", alt: "봉사활동" },
  { id: "photo7", src: "/images/gallery/07.jpg", alt: "주일학교 행사" },
  { id: "photo8", src: "/images/gallery/08.jpg", alt: "부활절 예배" },
];

export default function Home() {
  return (
    <main>
      <div data-animate>
        <HeroSection />
      </div>
      <div data-animate>
        <QuickActions />
      </div>
      <div data-animate>
        <CommunitySection />
      </div>
      <div data-animate>
        <ContentSection videos={SAMPLE_VIDEOS} />
      </div>
      <div data-animate>
        <GalleryPreview photos={SAMPLE_PHOTOS} />
      </div>
    </main>
  );
}
