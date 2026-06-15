import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { StreakHero } from "@/components/streaks/streak-hero";
import { TierSection } from "@/components/streaks/tier-section";
import { HeadStartSection } from "@/components/streaks/head-start-section";
import { StreakTimeline } from "@/components/streaks/streak-timeline";
import { streakRules } from "@/lib/streaks";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Bloom Badge & Streak System",
	description:
		"Show up each month, earn your place, and wear what you've earned. Learn how the Bloom Outreach monthly streak system rewards faithful volunteers.",
};

export default function StreaksPage() {
	return (
		<>
			<StreakHero />

			<Section className="relative overflow-hidden">
				<div className="pointer-events-none absolute -right-32 top-20 size-[420px] rounded-full bg-bloom-petal/25 blur-3xl" />
				<SectionHeader
					eyebrow="Reward Tiers"
					title="Five milestones. Five ways to wear your faithfulness."
					description="Tap a tier to explore what you earn — from your first badge to full Ambassador status."
				/>
				<TierSection />
			</Section>

			<Section className="relative overflow-hidden bg-muted/40 pt-0">
				<div className="pointer-events-none absolute -left-40 top-0 size-[400px] rounded-full bg-bloom-petal/30 blur-3xl" />
				<div className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-bloom-pink/15 blur-3xl" />
				<SectionHeader
					eyebrow="How It Works"
					title="Simple rules. Lasting rewards."
					description="One monthly outreach attended = one month on your streak. Built to celebrate consistency — not punish imperfection."
				/>
				<div className="grid gap-5 md:grid-cols-2 md:gap-6">
					{streakRules.map((rule, index) => {
						const Icon = rule.icon;
						return (
							<FadeIn key={rule.title} delay={index * 0.08}>
								<div
									className={cn(
										"group relative h-full overflow-hidden rounded-3xl border border-bloom-pink/20 bg-card p-7 ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-bloom-pink/35 hover:shadow-xl hover:shadow-bloom-wine/5 md:p-8",
										index === 0 && "md:row-span-1",
									)}
								>
									<span
										aria-hidden
										className="pointer-events-none absolute -right-2 -top-4 font-heading text-[6rem] font-semibold leading-none text-bloom-petal/80 transition-colors duration-300 group-hover:text-bloom-pink/30"
									>
										{String(index + 1).padStart(2, "0")}
									</span>
									<div className="relative">
										<span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-bloom-petal/40 text-primary ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
											<Icon className="size-6" />
										</span>
										<h3 className="mt-6 font-heading text-xl font-semibold text-bloom-wine dark:text-bloom-petal md:text-2xl">
											{rule.title}
										</h3>
										<p className="mt-3 max-w-md leading-relaxed text-muted-foreground dark:text-foreground/75">
											{rule.description}
										</p>
									</div>
								</div>
							</FadeIn>
						);
					})}
				</div>
			</Section>

			<Section>
				<HeadStartSection />
			</Section>

			<Section className="relative overflow-hidden bg-muted/40 pt-0">
				<div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-bloom-petal/20 blur-3xl" />
				<SectionHeader
					eyebrow="Roadmap"
					title="The path to launch"
					description="Mark your calendar — here's how the streak system rolls out through 2026."
				/>
				<StreakTimeline />
			</Section>

			<Section className="pt-0">
				<FadeIn>
					<div className="relative overflow-hidden rounded-[2rem] border border-bloom-pink/25 bg-gradient-to-br from-bloom-petal/40 via-card to-bloom-petal/15 px-8 py-16 ring-1 ring-white/20 dark:from-secondary/50 dark:via-card dark:to-secondary/30 md:px-16 md:py-24">
						<div className="pointer-events-none absolute inset-0 bloom-pattern opacity-40" />
						<div className="pointer-events-none absolute -left-16 top-1/2 size-48 -translate-y-1/2 rounded-full bg-bloom-pink/15 blur-3xl" />
						<div className="pointer-events-none absolute -right-12 top-8 size-36 rounded-full bg-bloom-wine/10 blur-3xl" />

						<div className="relative mx-auto max-w-3xl text-center">
							<Quote className="mx-auto size-10 text-bloom-pink/50" />
							<blockquote className="mt-6 font-heading text-2xl font-medium leading-snug text-bloom-wine dark:text-bloom-petal md:text-3xl lg:text-4xl text-balance">
								Every month you show up, you plant something eternal. Your streak is
								proof that faithfulness compounds — in service, in community, and in
								Christ.
							</blockquote>
							<div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-bloom-pink to-transparent" />
							<p className="mt-8 font-heading text-xl font-semibold tracking-wide text-bloom-wine dark:text-bloom-petal md:text-2xl">
								{siteConfig.motto}
							</p>
							<Badge variant="soft" className="mt-4">
								Bloom Badge & Streak System
							</Badge>
							<Button
								asChild
								size="lg"
								className="mt-10 h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20"
							>
								<Link href="/calendar">
									View Upcoming Outreaches
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</FadeIn>
			</Section>
		</>
	);
}
