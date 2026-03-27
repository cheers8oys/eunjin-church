"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface LightboxPhoto {
  src: string;
  alt: string;
}

interface LightboxProps {
  open: boolean;
  photos: LightboxPhoto[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({
  open,
  photos,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open || photos.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, photos.length]);

  const goNext = () => setCurrentIndex((i) => (i + 1) % photos.length);
  const goPrev = () =>
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);

  const current = photos[currentIndex];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-5xl w-full p-0 bg-black border-none overflow-hidden">
        <DialogTitle className="sr-only">
          {current?.alt ?? "사진 보기"}
        </DialogTitle>

        <div className="relative flex items-center justify-center w-full aspect-[4/3] md:aspect-video">
          {current && (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          )}

          {photos.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="이전"
                className="absolute left-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goNext}
                aria-label="다음"
                className="absolute right-2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <p className="text-center text-white/60 text-sm py-2">
            {currentIndex + 1} / {photos.length}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
