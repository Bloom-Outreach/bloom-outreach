"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import type { VideoItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface VideoMasonryProps {
  items: readonly VideoItem[];
  className?: string;
}

function getYoutubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export function VideoMasonry({ items, className }: VideoMasonryProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div
        className={cn(
          "columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4",
          className
        )}
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="group break-inside-avoid overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
          >
            <button
              type="button"
              onClick={() => setActiveVideo(item)}
              className="relative block w-full overflow-hidden text-left"
              aria-label={`Play video: ${item.title}`}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-muted",
                  item.aspect === "tall" ? "aspect-[3/4]" : "aspect-video"
                )}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 size-6 fill-primary" />
                  </span>
                </span>
              </div>
            </button>

            <div className="p-4 md:p-5">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {item.category}
              </span>
              <h3 className="mt-1 font-heading text-base font-semibold text-foreground md:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={getYoutubeEmbedUrl(activeVideo.youtubeId)}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
            <div className="border-t border-white/10 bg-foreground px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                {activeVideo.category}
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-white">
                {activeVideo.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
