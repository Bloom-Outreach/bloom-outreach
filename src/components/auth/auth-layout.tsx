import Link from "next/link";
import Image from "next/image";
import { Heart, Quote } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";
import { siteImages } from "@/lib/images";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="relative -mt-16 min-h-svh overflow-hidden pt-16">
      <div className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden overflow-hidden bloom-mesh lg:flex lg:flex-col lg:justify-between">
          <div className="bloom-pattern absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -left-20 top-32 size-[360px] rounded-full bg-bloom-petal/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-[300px] rounded-full bg-bloom-green/15 blur-3xl" />

          <div className="relative z-10 p-10 xl:p-14">
            <Logo variant="light" />
            <div className="mt-16 max-w-md">
              <Badge variant="outline" className="mb-6 border-white/25 text-white">
                <Heart className="mr-1.5 size-3 fill-white/80" />
                {siteConfig.motto}
              </Badge>
              <h1 className="font-heading text-4xl font-semibold leading-tight text-white xl:text-5xl text-balance">
                Volunteer. Clean.{" "}
                <span className="gradient-text">Spread the Word.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Join a community of believers serving neighborhoods, cleaning
                our cities, and sharing the gospel of Jesus Christ.
              </p>
            </div>
          </div>

          <div className="relative z-10 p-10 xl:p-14">
            <div className="glass-card max-w-md rounded-3xl p-6">
              <Quote className="size-8 text-white/40" strokeWidth={1.5} />
              <blockquote className="mt-4 font-heading text-lg leading-relaxed text-white">
                &ldquo;I came to pick up trash and left knowing I&apos;d been
                part of something bigger — serving Jesus by serving my
                neighborhood.&rdquo;
              </blockquote>
              <footer className="mt-4 text-sm text-white/60">
                — Sarah Mitchell, Cleanup Volunteer
              </footer>
            </div>

            <div className="relative mt-8 h-32 overflow-hidden rounded-2xl ring-1 ring-white/20">
              <Image
                src={siteImages.mission.src}
                alt=""
                width={600}
                height={200}
                className="size-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bloom-wine-deep/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="relative flex flex-col justify-center bg-background px-4 py-12 sm:px-8 lg:px-12 xl:px-20">
          <div className="pointer-events-none absolute -right-32 top-20 size-[280px] rounded-full bg-bloom-petal/20 blur-3xl lg:hidden" />

          <div className="relative mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
                {title}
              </h2>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>

            {children}

            <p className="mt-8 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-primary">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
