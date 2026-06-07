import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { VideoGrid } from "@/components/sections/video-grid";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch Bloom Outreach videos — volunteer days, neighborhood cleanups, and spreading the word of Jesus.",
};

export default function VideosPage() {
  return (
    <>
      <PageHeader
        title="Volunteer, Clean, Share"
        description="Watch how Bloom Outreach volunteers clean our community and spread the gospel of Jesus Christ."
        image={siteImages.pageHeaders.videos}
        eyebrow="Watch"
      />

      <Section>
        <VideoGrid />
      </Section>

      <Section className="pt-0">
        <div className="rounded-[2rem] border border-border/50 bg-gradient-to-br from-muted/60 to-muted/30 px-8 py-12 text-center shadow-sm md:px-14 md:py-14">
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">
            Want to be part of the next story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join us at an upcoming outreach or support our mission.
            Every hand and every gift helps us reach more people with the love
            of Christ.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <Link href="/support-us">Support Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
