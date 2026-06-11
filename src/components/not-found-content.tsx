"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Home,
  Mail,
  MapPinOff,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const quickLinks = [
  {
    href: "/",
    label: "Home",
    description: "Back to the main page",
    icon: Home,
  },
  {
    href: "/calendar",
    label: "Events",
    description: "See what's coming up",
    icon: CalendarDays,
  },
  {
    href: "/get-involved",
    label: "Get Involved",
    description: "Join our volunteer team",
    icon: Heart,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "We're happy to help",
    icon: Mail,
  },
] as const;

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden bloom-mesh">
      <div className="bloom-pattern absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full bg-bloom-petal/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 size-80 rounded-full bg-bloom-green/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 size-56 rounded-full bg-bloom-gold/15 blur-3xl" />

      <motion.span
        aria-hidden
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={floatTransition}
        className="pointer-events-none absolute left-[12%] top-[22%] size-16 rounded-full bg-bloom-petal/25 blur-sm"
      />
      <motion.span
        aria-hidden
        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
        transition={{ ...floatTransition, delay: 0.8 }}
        className="pointer-events-none absolute right-[15%] top-[30%] size-10 rounded-full bg-bloom-pink/30 blur-sm"
      />
      <motion.span
        aria-hidden
        animate={{ y: [0, -10, 0] }}
        transition={{ ...floatTransition, delay: 1.4 }}
        className="pointer-events-none absolute bottom-[28%] left-[20%] size-8 rounded-full bg-bloom-green/25 blur-sm"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-white/25 bg-white/5 text-white backdrop-blur-sm"
            >
              <MapPinOff className="mr-1.5 size-3" />
              Page not found
            </Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[5.5rem] font-semibold leading-none tracking-tight sm:text-[7rem] md:text-[8.5rem]"
          >
            <span className="gradient-text">404</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl text-balance"
          >
            This page wandered off the path
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            Like a petal in the breeze, the page you&apos;re looking for has
            drifted away. Let&apos;s get you back to serving with{" "}
            {siteConfig.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-7 text-base text-primary shadow-lg shadow-black/20 hover:bg-white/90"
            >
              <Link href="/">
                <Home className="size-4" />
                Back to Home
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/30 bg-white/5 px-7 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/calendar">
                <CalendarDays className="size-4" />
                View Events
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Sparkles className="size-4 text-bloom-petal" />
            <span>Or try one of these</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-md transition-all duration-300",
                      "hover:border-white/30 hover:bg-white/12 hover:shadow-lg hover:shadow-black/10"
                    )}
                  >
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white transition-colors group-hover:bg-white/25"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block font-medium text-white">
                        {link.label}
                      </span>
                      <span className="block text-sm text-white/65">
                        {link.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center text-sm text-white/50"
        >
          {siteConfig.motto} · {siteConfig.tagline}
        </motion.p>
      </div>
    </section>
  );
}
