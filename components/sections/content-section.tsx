"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import YoutubeModal from "@/components/common/youtube-modal";

interface ContentSectionProps {
  videos?: {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
  }[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ContentSection({ videos }: ContentSectionProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <section className="bg-section-warm py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              영상 콘텐츠
            </h2>
            <p className="mt-2 text-muted-foreground">
              은진교회의 설교와 다양한 영상을 만나보세요
            </p>
          </div>
          <Link
            href="/media/sermons"
            className="text-primary font-medium hover:underline shrink-0"
          >
            더보기
          </Link>
        </div>

        {/* 영상 목록 */}
        {videos === undefined ? (
          <p className="text-center text-muted-foreground py-12">
            등록된 영상이 없습니다
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <button
                key={video.id}
                className="group text-left w-full"
                onClick={() => setSelectedVideoId(video.id)}
              >
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* 썸네일 */}
                  <div className="relative aspect-video bg-muted">
                    <Image
                      fill
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <Play className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  {/* 정보 */}
                  <div className="p-4">
                    <p className="font-semibold text-primary line-clamp-2 text-sm">
                      {video.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(video.publishedAt)}
                    </p>
                  </div>
                </article>
              </button>
            ))}
          </div>
        )}
      </div>

      <YoutubeModal
        open={selectedVideoId !== null}
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </section>
  );
}
