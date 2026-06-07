import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Building2, Gift, Heart, Repeat } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { siteImages, media } from "@/lib/images";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Bloom Outreach — help us volunteer, clean our community, and spread the gospel of Jesus.",
};

const supportOptions = [
  {
    icon: Heart,
    title: "One-Time Gift",
    description:
      "Make a single gift to support cleanup supplies, volunteer resources, and gospel outreach materials.",
    action: "Support Us",
    image: media.support.oneTime,
  },
  {
    icon: Repeat,
    title: "Monthly Partner",
    description:
      "Become a sustaining partner. Your monthly support helps us plan cleanups and outreach throughout the year.",
    action: "Support Us",
    image: media.support.monthly,
  },
  {
    icon: Gift,
    title: "Cleanup Supplies",
    description:
      "Contribute gloves, trash bags, cleaning tools, or other supplies needed for our neighborhood cleanups.",
    action: "Support Us",
    image: media.support.supplies,
  },
  {
    icon: Building2,
    title: "Church Partner",
    description:
      "Partner with Bloom Outreach as a church or organization to volunteer, clean, and spread the word together.",
    action: "Support Us",
    image: media.support.church,
  },
] as const;

export default function SupportUsPage() {
  return (
    <>
      <PageHeader
        title="Support Us"
        description="Your support helps us buy cleanup supplies, equip volunteers, and spread the word of Jesus in our community."
        image={siteImages.pageHeaders.support}
        eyebrow="Partner With Us"
      />

      <Section>
        <FadeIn>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Bloom Outreach is a faith-based community service. Every gift goes
              toward volunteering, cleaning our neighborhoods, and sharing the
              gospel of Jesus Christ.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <FadeIn key={option.title} delay={index * 0.08}>
                <Card className="group overflow-hidden p-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-2xl bg-white/95 text-primary shadow-lg">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <div className="flex flex-col p-6 md:p-8">
                    <h3 className="font-heading text-xl font-semibold md:text-2xl">
                      {option.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {option.description}
                    </p>
                    <Button asChild className="mt-6 rounded-full">
                      <Link href="/contact">{option.action}</Link>
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section className="bg-muted/40 pt-0">
        <SectionHeader
          title="Where Your Support Goes"
          description="Transparency and accountability are core to how we operate."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Cleanup Supplies", percent: "40%" },
            { label: "Volunteer & Outreach", percent: "35%" },
            { label: "Gospel Materials", percent: "25%" },
          ].map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.08}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="font-heading text-4xl font-semibold text-primary">
                  {item.percent}
                </p>
                <p className="mt-2 text-muted-foreground">{item.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src={siteImages.mission.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-bloom-wine-deep/85 to-primary/80" />
          <div className="relative flex min-h-[280px] items-center justify-center p-10 text-center">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl text-balance">
                &ldquo;Go therefore and make disciples of all nations.&rdquo;
              </h3>
              <p className="mt-4 text-white/70">— Matthew 28:19</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
