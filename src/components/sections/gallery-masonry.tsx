import Image from "next/image";
import type { GalleryItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GalleryMasonryProps {
  items: readonly GalleryItem[];
  className?: string;
}

export function GalleryMasonry({ items, className }: GalleryMasonryProps) {
  return (
    <div
      className={cn(
        "columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4",
        className
      )}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="group relative break-inside-avoid overflow-hidden rounded-3xl bg-muted shadow-sm ring-1 ring-border/30"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={item.width}
            height={item.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:via-black/20" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              {item.category}
            </span>
            <p className="mt-1 font-heading text-base font-medium text-white md:text-lg">
              {item.title}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
