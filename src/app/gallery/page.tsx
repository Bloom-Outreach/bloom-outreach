import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Bloom Outreach — volunteers cleaning and spreading the word of Jesus.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Volunteering, cleaning, and sharing the gospel — moments captured from our community."
        image={siteImages.pageHeaders.gallery}
        eyebrow="Photos"
      />

      <Section>
        <GalleryGrid />
      </Section>
    </>
  );
}
