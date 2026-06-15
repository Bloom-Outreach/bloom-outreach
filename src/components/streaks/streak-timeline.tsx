"use client";

import { motion } from "framer-motion";
import { CalendarDays, Flag, Rocket, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { streakTimeline } from "@/lib/streaks";
import { cn } from "@/lib/utils";

const timelineIcons = [Rocket, CalendarDays, CalendarDays, Flag] as const;

export function StreakTimeline() {
	return (
		<div className="relative mx-auto max-w-3xl">
			<div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-bloom-pink/20 via-bloom-pink/50 to-bloom-wine md:block" />

			{streakTimeline.map((event, index) => {
				const Icon = timelineIcons[index];
				const isLeft = index % 2 === 0;

				return (
					<FadeIn key={event.date} delay={index * 0.1}>
						<div
							className={cn(
								"relative pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-8 md:pb-16",
								isLeft ? "md:[&>div:first-child]:pr-8" : "md:[&>div:first-child]:col-start-2 md:[&>div:first-child]:pl-8",
							)}
						>
							<div
								className={cn(
									"md:mb-0",
									!isLeft && "md:col-start-2",
								)}
							>
								<motion.div
									whileHover={{ y: -4 }}
									transition={{ duration: 0.25 }}
									className={cn(
										"relative overflow-hidden rounded-3xl border p-6 ring-1 ring-white/20 transition-shadow duration-300 hover:shadow-xl md:p-8",
										event.highlight
											? "border-bloom-wine/30 bg-gradient-to-br from-bloom-petal/60 via-card to-bloom-petal/20 shadow-lg shadow-bloom-wine/5 dark:from-secondary/80 dark:via-card dark:to-secondary/40"
											: "border-bloom-pink/25 bg-card hover:shadow-bloom-pink/10",
									)}
								>
									{event.highlight && (
										<div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-bloom-pink/20 blur-3xl" />
									)}
									<div className="relative flex items-start gap-4">
										<span
											className={cn(
												"flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/20",
												event.highlight
													? "bg-bloom-wine text-bloom-petal shadow-md"
													: "bg-bloom-petal/50 text-bloom-wine dark:bg-secondary dark:text-bloom-petal",
											)}
										>
											<Icon className="size-5" />
										</span>
										<div>
											<p className="text-xs font-semibold uppercase tracking-widest text-bloom-wine/65 dark:text-bloom-petal/70">
												{event.date}
											</p>
											<h3
												className={cn(
													"mt-1 font-heading text-xl font-semibold md:text-2xl",
													event.highlight
														? "text-bloom-wine dark:text-bloom-petal"
														: "text-foreground",
												)}
											>
												{event.title}
											</h3>
											<p className="mt-2 leading-relaxed text-muted-foreground dark:text-foreground/75">
												{event.description}
											</p>
											{event.highlight && (
												<span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-bloom-wine/10 px-3 py-1 text-xs font-semibold text-bloom-wine dark:bg-bloom-petal/15 dark:text-bloom-petal">
													<Sparkles className="size-3" />
													Launch day
												</span>
											)}
										</div>
									</div>
								</motion.div>
							</div>

							<div
								className={cn(
									"absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:flex",
									"size-4 items-center justify-center rounded-full ring-4 ring-background",
									event.highlight
										? "bg-bloom-wine shadow-[0_0_20px_rgba(122,51,73,0.45)]"
										: "bg-bloom-pink",
								)}
							/>

							<div className={cn("hidden md:block", isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1")} />
						</div>
					</FadeIn>
				);
			})}
		</div>
	);
}
