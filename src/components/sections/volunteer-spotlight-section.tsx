import Image from "next/image";
import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { volunteerPhotos, volunteerQuotes } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function VolunteerSpotlightSection() {
  return (
    <Section className="relative overflow-hidden bg-muted/40">
      <div className="pointer-events-none absolute -left-32 top-1/2 size-[400px] -translate-y-1/2 rounded-full bg-bloom-petal/25 blur-3xl" />

      <SectionHeader
        eyebrow="Our Volunteers"
        title="Meet the people who make it happen"
        description="Bloom Outreach is powered by volunteers who clean our community and spread the word of Jesus. Here are a few of the people who serve alongside us."
      />

      <div className="mb-14 grid gap-6 md:grid-cols-2 md:gap-8">
        {volunteerQuotes.map((item, index) => (
          <FadeIn key={item.name} delay={index * 0.1}>
            <Card className="relative h-full">
              <Quote
                className="mb-4 size-9 text-primary/25"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="font-heading text-lg leading-relaxed text-foreground md:text-xl">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-border/60 pt-4">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </footer>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div
        className={cn(
          "columns-2 gap-3 sm:gap-4 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4"
        )}
      >
        {volunteerPhotos.map((volunteer, index) => (
          <FadeIn key={volunteer.id} delay={index * 0.05}>
            <figure className="group relative break-inside-avoid overflow-hidden rounded-3xl bg-muted shadow-sm ring-1 ring-border/30">
              <Image
                src={volunteer.image}
                alt={`${volunteer.name}, ${volunteer.role}`}
                width={volunteer.width}
                height={volunteer.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-heading text-sm font-semibold text-white sm:text-base">
                  {volunteer.name}
                </p>
                <p className="text-xs text-white/75 sm:text-sm">{volunteer.role}</p>
              </div>
            </figure>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
