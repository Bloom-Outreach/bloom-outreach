import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, HandHeart, Megaphone, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { MediaCard } from "@/components/ui/media-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { VolunteerSpotlightSection } from "@/components/sections/volunteer-spotlight-section";
import { involvementOptions } from "@/lib/constants";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Bloom Outreach — volunteer, clean your community, and spread the word of Jesus.",
};

const steps = [
  {
    icon: Users,
    title: "Connect With Us",
    description:
      "Fill out our interest form or come to a cleanup day to get started.",
  },
  {
    icon: Calendar,
    title: "Pick Your Role",
    description:
      "Volunteer at events, join a neighborhood cleanup, or help spread the gospel — we'll find the right fit for you.",
  },
  {
    icon: HandHeart,
    title: "Serve for Jesus",
    description:
      "Show up, clean up, and share the word. Watch God work through simple acts of faithful service.",
  },
] as const;

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        title="Get Involved"
        description="Volunteer with us, join a cleanup, or help spread the word of Jesus. Discover how you can be part of Bloom Outreach."
        image={siteImages.pageHeaders.getInvolved}
        eyebrow="Join the Team"
        size="large"
      />

      <Section>
        <SectionHeader
          eyebrow="Serve With Us"
          title="Ways to Serve"
          description="Three ways to be part of Bloom Outreach — volunteer, clean, or spread the word."
        />
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {involvementOptions.map((option, index) => (
            <FadeIn key={option.title} delay={index * 0.1}>
              <MediaCard
                image={option.image}
                imageAlt={option.title}
                eyebrow={option.category}
                title={option.title}
                description={option.description}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-full"
              >
                <Button asChild className="mt-4 w-full rounded-full">
                  <Link href="/contact">{option.cta}</Link>
                </Button>
              </MediaCard>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-muted/40 pt-0">
        <div className="pointer-events-none absolute -right-40 top-0 size-[400px] rounded-full bg-bloom-petal/30 blur-3xl" />
        <SectionHeader
          title="How It Works"
          description="Getting started is simple. Here's what to expect."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="relative text-center">
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+2.5rem)] top-7 hidden h-px w-[calc(100%-5rem)] bg-border md:block" />
                  )}
                  <div className="relative mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Icon className="size-7" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <VolunteerSpotlightSection />

      <Section>
        <FadeIn>
          <Card className="flex flex-col items-center gap-6 overflow-hidden bg-gradient-to-br from-card to-muted/40 text-center md:flex-row md:text-left">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Megaphone className="size-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl font-semibold md:text-2xl">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Reach out and we&apos;ll help you find the perfect way to serve.
                No commitment required — just a conversation.
              </p>
            </div>
            <Button asChild className="rounded-full px-7" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </Card>
        </FadeIn>
      </Section>
    </>
  );
}
