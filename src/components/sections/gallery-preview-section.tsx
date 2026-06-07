import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { GalleryMasonry } from "@/components/sections/gallery-masonry";
import { galleryItems } from "@/lib/constants";

export function GalleryPreviewSection() {
  const previewItems = galleryItems.slice(0, 6);

  return (
    <Section>
      <SectionHeader
        eyebrow="Gallery"
        title="Volunteering, cleaning, and sharing the gospel"
        description="Photos from our cleanup days, volunteer events, and moments sharing the word of Jesus in our community."
      />

      <GalleryMasonry items={previewItems} />

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/gallery">
            View Full Gallery
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
