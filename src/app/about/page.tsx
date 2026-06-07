import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { pillars } from "@/lib/constants";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Bloom Outreach — we volunteer together, clean our community, and spread the gospel of Jesus Christ.",
};

const values = [
  {
    title: "Show Up",
    description:
      "Volunteering starts with simply being there. We believe faithful presence in our community is the first step to making a difference.",
  },
  {
    title: "Serve Practically",
    description:
      "Cleaning streets, parks, and neighborhoods is how we love our neighbors in a tangible, visible way.",
  },
  {
    title: "Share Jesus",
    description:
      "Every act of service is an opportunity to point people to the gospel — the ultimate reason we serve.",
  },
  {
    title: "Serve Together",
    description:
      "We are stronger as a team. Bloom Outreach brings believers together to volunteer, clean, and spread the word as one body.",
  },
] as const;

const pillarImageMap: Record<string, string> = {
  Volunteer: siteImages.pillars.volunteer,
  Clean: siteImages.pillars.clean,
  "Spread the Word": siteImages.pillars.spreadTheWord,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Bloom Outreach"
        description="We volunteer together, clean our community, and spread the word of Jesus. That's who we are — nothing more, nothing less."
        image={siteImages.pageHeaders.about}
        eyebrow="Our Story"
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/50">
              <Image
                src={siteImages.aboutStory.src}
                alt={siteImages.aboutStory.alt}
                width={siteImages.aboutStory.width}
                height={siteImages.aboutStory.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Badge variant="soft" className="mb-4">
              Who We Are
            </Badge>
            <h2 className="font-heading text-3xl font-semibold md:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Bloom Outreach began when a small group of believers asked a
                simple question: how can we serve our community for Jesus? The
                answer was clear — volunteer together, clean our neighborhoods,
                and spread the word of God.
              </p>
              <p>
                What started as a single neighborhood cleanup has grown into a
                movement of volunteers who show up week after week with gloves,
                trash bags, and hearts ready to share the gospel.
              </p>
              <p>
                Our name reflects our mission: like a flower that blooms when
                nurtured, lives and communities flourish when touched by the
                love of Christ — through volunteering, cleaning, and spreading
                His word.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-muted/40 pt-0">
        <FadeIn>
          <div className="mb-14 overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-border/50">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={siteImages.aboutCommunity.src}
                alt={siteImages.aboutCommunity.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <p className="max-w-lg font-heading text-2xl font-medium text-white md:text-3xl text-balance">
                  Three things. One mission. All for Jesus.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <SectionHeader
          title="What We Stand For"
          description="The values that guide every cleanup, every volunteer hour, and every conversation about Jesus."
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.08}>
              <Card className="h-full">
                <h3 className="font-heading text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Our Pillars"
          title="Volunteer · Clean · Spread the Word"
          description="Three pillars. One mission. Everything we do flows from these commitments."
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.1}>
              <div className="text-center">
                <div className="relative mx-auto mb-5 aspect-square w-full max-w-[220px] overflow-hidden rounded-3xl shadow-xl ring-4 ring-primary/10">
                  <Image
                    src={pillarImageMap[pillar.title]}
                    alt={`${pillar.title} at Bloom Outreach`}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
