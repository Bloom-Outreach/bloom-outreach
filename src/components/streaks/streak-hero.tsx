"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Flame, Gift, Sparkles, Trophy } from "lucide-react";
import { BackgroundImage } from "@/components/ui/background-image";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { streakTiers } from "@/lib/streaks";
import { siteImages } from "@/lib/images";

const heroStats = [
	{ icon: Trophy, value: "5", label: "Reward tiers" },
	{ icon: Flame, value: "12", label: "Months to Ambassador" },
	{ icon: Gift, value: "Every", label: "Tier earns merch" },
] as const;

const floatTransition = {
	duration: 6,
	repeat: Infinity,
	ease: "easeInOut" as const,
};

export function StreakHero() {
	const previewTiers = [streakTiers[0], streakTiers[2], streakTiers[4]];

	return (
		<BackgroundImage
			src={siteImages.pageHeaders.streaks}
			alt=""
			priority
			className="-mt-16 overflow-hidden pt-16 py-24 md:py-32 lg:py-36"
			overlayClassName="bg-gradient-to-br from-bloom-wine-deep/95 via-primary/88 to-[#4a2530]/90"
		>
			<div className="pointer-events-none absolute -left-32 top-24 size-[420px] rounded-full bg-bloom-petal/15 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-0 size-[360px] rounded-full bg-bloom-pink/20 blur-3xl" />
			<motion.div
				aria-hidden
				animate={{ y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
				transition={floatTransition}
				className="pointer-events-none absolute right-[18%] top-[20%] size-20 rounded-full bg-bloom-gold/20 blur-2xl"
			/>

			<div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
					<div className="max-w-xl">
						<FadeIn>
							<Badge
								variant="outline"
								className="mb-6 border-white/25 bg-white/5 text-white backdrop-blur-sm"
							>
								<Sparkles className="mr-1.5 size-3 text-bloom-petal" />
								Bloom Streak System
							</Badge>
						</FadeIn>

						<FadeIn delay={0.08}>
							<h1 className="font-heading text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl text-balance">
								Show up. Earn your place.{" "}
								<span className="gradient-text">Wear what you&apos;ve earned.</span>
							</h1>
						</FadeIn>

						<FadeIn delay={0.16}>
							<p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl text-balance">
								Show up to the monthly outreach and your streak grows by one month.
								Reach monthly milestones to unlock exclusive Bloom badges and merch —
								proof of the faithfulness you&apos;re building month by month.
							</p>
						</FadeIn>

						<FadeIn delay={0.24}>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<span className="inline-flex items-center gap-2 rounded-full border border-bloom-pink/40 bg-bloom-petal/15 px-4 py-2.5 text-sm font-medium text-bloom-petal shadow-lg shadow-black/10 backdrop-blur-md">
									<CalendarCheck className="size-4 text-bloom-pink" />
									Streak officially starts October 25, 2026
								</span>
							</div>
						</FadeIn>

						<FadeIn delay={0.32}>
							<div className="mt-10 flex flex-wrap gap-3">
								{heroStats.map((stat) => {
									const Icon = stat.icon;
									return (
										<div
											key={stat.label}
											className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3 text-white"
										>
											<span className="flex size-9 items-center justify-center rounded-xl bg-white/15">
												<Icon className="size-4 text-bloom-petal" />
											</span>
											<div>
												<p className="font-heading text-xl font-semibold leading-none">
													{stat.value}
												</p>
												<p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-white/65">
													{stat.label}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</FadeIn>
					</div>

					<FadeIn delay={0.15} direction="none" className="relative mx-auto w-full max-w-md lg:max-w-none">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
							className="relative mx-auto aspect-[4/5] max-w-sm sm:max-w-md lg:max-w-none"
						>
							<div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-bloom-petal/20 via-transparent to-bloom-pink/10 blur-2xl" />

							{previewTiers.map((tier, index) => {
								const Icon = tier.icon;
								const positions = [
									"left-0 top-0 z-10 rotate-[-3deg]",
									"right-0 top-[28%] z-20 rotate-[2deg]",
									"bottom-0 left-[12%] z-30 rotate-[-1deg]",
								];
								return (
									<motion.div
										key={tier.id}
										animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
										transition={{ ...floatTransition, delay: index * 0.6 }}
										className={`absolute w-[72%] sm:w-[68%] ${positions[index]}`}
									>
										<div className="overflow-hidden rounded-3xl border border-white/25 bg-white/10 p-5 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
											<div className="flex items-start justify-between gap-3">
												<span className="rounded-full bg-bloom-petal/25 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-bloom-petal">
													{tier.monthLabel}
												</span>
												<span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-bloom-petal">
													<Icon className="size-5" />
												</span>
											</div>
											<h3 className="mt-3 font-heading text-xl font-semibold text-white">
												{tier.name}
											</h3>
											<p className="mt-1.5 text-sm text-white/70">
												{tier.rewards.slice(0, 2).join(" · ")}
												{tier.rewards.length > 2 ? " · +" : ""}
											</p>
										</div>
									</motion.div>
								);
							})}

							<div className="absolute -right-2 top-[58%] z-40 rounded-2xl border border-bloom-gold/30 bg-bloom-gold/20 px-4 py-3 shadow-xl backdrop-blur-md">
								<p className="text-[0.65rem] font-semibold uppercase tracking-widest text-bloom-petal">
									Your journey
								</p>
								<p className="mt-0.5 font-heading text-sm font-medium text-white">
									Seedling → Ambassador
								</p>
							</div>
						</motion.div>
					</FadeIn>
				</div>
			</div>
		</BackgroundImage>
	);
}
