import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { VideoMasonry } from "@/components/sections/video-masonry";
import { videoItems } from "@/lib/constants";

export function VideoPreviewSection() {
  const previewItems = videoItems.slice(0, 3);

  return (
    <Section className="bg-muted/40">
      <SectionHeader
        eyebrow="Videos"
        title="See us volunteer, clean, and spread the word"
        description="Watch highlights from cleanup days, volunteer gatherings, and gospel outreach in our community."
      />

      <VideoMasonry items={previewItems} />

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/videos">
            Watch All Videos
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
