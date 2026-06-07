import { BookOpen, Brush, Users } from "lucide-react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { pillars } from "@/lib/constants";
import { siteImages } from "@/lib/images";

const iconMap = {
  users: Users,
  brush: Brush,
  "book-open": BookOpen,
} as const;

const pillarImages: Record<string, string> = {
  Volunteer: siteImages.pillars.volunteer,
  Clean: siteImages.pillars.clean,
  "Spread the Word": siteImages.pillars.spreadTheWord,
};

export function PillarsSection() {
  return (
    <Section id="what-we-do" className="bloom-pattern bg-muted/30">
      <SectionHeader
        eyebrow="What We Do"
        title="Volunteer. Clean. Spread the Word."
        description="Everything we do at Bloom Outreach comes down to three things — showing up to serve, cleaning our community, and sharing the gospel of Jesus Christ."
      />

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar, index) => {
          const Icon = iconMap[pillar.icon];
          return (
            <FadeIn key={pillar.title} delay={index * 0.1}>
              <Card className="group overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillarImages[pillar.title]}
                    alt={`${pillar.title} — Bloom Outreach`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-2xl bg-white/95 text-primary shadow-lg backdrop-blur-sm">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                  <blockquote className="mt-6 rounded-2xl bg-muted/60 px-4 py-3 text-sm italic text-muted-foreground">
                    &ldquo;{pillar.verse}&rdquo;
                    <footer className="mt-1 not-italic text-xs font-medium text-primary">
                      {pillar.reference}
                    </footer>
                  </blockquote>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
