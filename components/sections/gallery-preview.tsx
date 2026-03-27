"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "@/components/common/lightbox";

interface GalleryPreviewProps {
  photos?: {
    id: string;
    src: string;
    alt: string;
  }[];
}

export default function GalleryPreview({ photos }: GalleryPreviewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayPhotos = photos?.slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            사진 갤러리
          </h2>
          <Link
            href="/media/gallery"
            className="text-primary font-medium hover:underline shrink-0"
          >
            갤러리 더보기
          </Link>
        </div>

        {photos === undefined ? (
          <p className="text-center text-muted-foreground py-12">
            등록된 사진이 없습니다
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {displayPhotos?.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => {
                  setSelectedIndex(index);
                  setLightboxOpen(true);
                }}
                className="relative aspect-square overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {photos && (
        <Lightbox
          open={lightboxOpen}
          photos={photos.slice(0, 8)}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
