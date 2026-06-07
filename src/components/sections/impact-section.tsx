import Image from "next/image";
import { SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";
import { siteImages } from "@/lib/images";

const stats = [
  { value: "50+", label: "Cleanups Completed" },
  { value: "150+", label: "Active Volunteers" },
  { value: "24", label: "Events This Year" },
  { value: "1000+", label: "Lives Touched" },
] as const;

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden py-20 text-white md:py-28">
      <Image
        src={siteImages.aboutCommunity.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-bloom-wine-deep/88 to-primary/85" />
      <div className="bloom-pattern absolute inset-0 opacity-20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Impact"
          title="Serving through volunteer, clean, and share"
          description="Every cleanup, every volunteer hour, and every conversation about Jesus adds up to real change in our community."
          className="[&_h2]:text-white [&_p]:text-white/75 [&_span]:border-white/25 [&_span]:bg-white/10 [&_span]:text-white"
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.08}>
              <div className="glass-card rounded-3xl p-6 text-center md:p-8">
                <p className="font-heading text-4xl font-semibold text-white md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/70 md:text-base">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
