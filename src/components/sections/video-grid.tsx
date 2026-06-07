"use client";

import { useState } from "react";
import { galleryCategories, videoItems } from "@/lib/constants";
import { VideoMasonry } from "@/components/sections/video-masonry";
import { cn } from "@/lib/utils";

export function VideoGrid() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]>("All");

  const filtered =
    activeCategory === "All"
      ? videoItems
      : videoItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <VideoMasonry items={filtered} />
    </>
  );
}
