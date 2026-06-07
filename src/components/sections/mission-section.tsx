import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { siteImages } from "@/lib/images";

export function MissionSection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-0 size-[500px] rounded-full bg-bloom-petal/15 blur-3xl" />
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Mission"
              title="Volunteer. Clean. Spread the Word."
              description="Bloom Outreach exists for three things: volunteering together, cleaning our community, and sharing the gospel of Jesus Christ. That's our calling — simple, faithful, and full of love."
              className="mb-0"
            />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We believe practical service opens hearts. When we clean a neighborhood
              and show up consistently as volunteers, we earn the opportunity to
              tell people about the One who sent us — Jesus.
            </p>
            <Button asChild className="mt-8 rounded-full px-6" variant="outline">
              <Link href="/about">
                Read Our Story
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/50">
              <Image
                src={siteImages.mission.src}
                alt={siteImages.mission.alt}
                width={siteImages.mission.width}
                height={siteImages.mission.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <blockquote className="font-heading text-xl font-medium leading-snug md:text-2xl">
                  &ldquo;Go therefore and make disciples of all nations.&rdquo;
                </blockquote>
                <cite className="mt-4 block text-sm not-italic text-white/70">
                  — Matthew 28:19
                </cite>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 size-full rounded-3xl bg-primary/10" />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
