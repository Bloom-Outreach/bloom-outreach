"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/constants";
import { siteImages } from "@/lib/images";

const stats = [
	{ value: "15+", label: "Volunteers" },
	{ value: "1+", label: "Cleanups" },
	{ value: "12", label: "Events / yr" },
] as const;

export function HeroSection() {
	return (
		<section className="relative -mt-16 min-h-svh overflow-hidden bloom-mesh pt-16">
			<div className="bloom-pattern absolute inset-0 opacity-30" />
			<div className="pointer-events-none absolute -left-32 top-20 size-[480px] rounded-full bg-bloom-petal/20 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-0 size-[400px] rounded-full bg-bloom-green/15 blur-3xl" />

			<div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
				<div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="relative z-10">
						<FadeIn>
							<Badge variant="outline" className="mb-6 border-white/25 text-white">
								<Heart className="mr-1.5 size-3 fill-white/80" />
								{siteConfig.motto}
							</Badge>
						</FadeIn>

						<FadeIn delay={0.1}>
							<h1 className="font-heading text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
								Volunteer. Clean.{" "}
								<span className="gradient-text">Spread the Word.</span>
							</h1>
						</FadeIn>

						<FadeIn delay={0.2}>
							<p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
								Bloom Outreach is a community of believers who volunteer together,
								clean our neighborhoods, and share the gospel of Jesus Christ.
							</p>
						</FadeIn>

						<FadeIn delay={0.3}>
							<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
								<Button
									asChild
									size="lg"
									className="h-12 rounded-full bg-white px-7 text-base text-primary shadow-lg shadow-black/20 hover:bg-white/90"
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
									<Link href="/about">Learn Our Story</Link>
								</Button>
							</div>
						</FadeIn>

						<FadeIn delay={0.4}>
							<div className="mt-12 flex flex-wrap gap-3">
								{stats.map((stat) => (
									<div
										key={stat.label}
										className="glass-card rounded-2xl px-5 py-3 text-white"
									>
										<p className="font-heading text-2xl font-semibold">
											{stat.value}
										</p>
										<p className="text-xs uppercase tracking-wider text-white/70">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</FadeIn>
					</div>

					<FadeIn delay={0.2} direction="none" className="relative">
						<motion.div
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
							className="relative"
						>
							<div
								className="relative aspect-[4/5] overflow-hidden rounded-3xl
    shadow-2xl ring-1 ring-white/20 sm:aspect-[5/6] lg:aspect-[4/5]"
							>
								<Image
									src="/images/hero/bloom-volunteer.webp"
									alt="Bloom Volunteer"
									width={1365}
									height={910}
									priority
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="w-full h-full object-cover object-top"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-bloom-wine-deep/70 via-transparent to-transparent" />
							</div>

							<div className="absolute -bottom-5 -left-5 max-w-[220px] rounded-2xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:bg-card/95">
								<div className="flex items-center gap-2 text-primary">
									<Sparkles className="size-4" />
									<span className="text-xs font-semibold uppercase tracking-wider">
										This Month
									</span>
								</div>
								<p className="mt-1 font-heading text-sm font-medium text-foreground">
									3 cleanup days &amp; 1 gospel outreach
								</p>
							</div>

							<div className="absolute -right-3 -top-3 size-24 rounded-full bg-bloom-gold/25 blur-2xl" />
						</motion.div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}
