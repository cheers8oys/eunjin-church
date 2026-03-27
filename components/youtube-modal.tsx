"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface YoutubeModalProps {
  open: boolean;
  videoId: string | null;
  onClose: () => void;
}

export default function YoutubeModal({
  open,
  videoId,
  onClose,
}: YoutubeModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-none overflow-hidden">
        <DialogTitle className="sr-only">YouTube 영상 재생</DialogTitle>
        {open && videoId && (
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
