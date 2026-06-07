import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundImage } from "@/components/ui/background-image";
import { FadeIn } from "@/components/motion/fade-in";
import { siteImages } from "@/lib/images";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="bloom-pattern absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BackgroundImage
          src={siteImages.cta.src}
          alt={siteImages.cta.alt}
          className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-border/30"
          overlayClassName="bg-gradient-to-br from-primary/92 via-bloom-wine-deep/85 to-primary/80"
        >
          <FadeIn>
            <div className="px-8 py-16 text-center md:px-16 md:py-24">
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl lg:text-5xl text-balance">
                  Ready to bloom where you&apos;re planted?
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
                  Whether you volunteer, join a cleanup, or help spread the word
                  of Jesus — there&apos;s a place for you at Bloom Outreach.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-white px-7 text-base text-primary hover:bg-white/90"
                  >
                    <Link href="/get-involved">
                      Get Involved
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full border-white/30 bg-white/5 px-7 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                  >
                    <Link href="/support-us">Support Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </BackgroundImage>
      </div>
    </section>
  );
}
