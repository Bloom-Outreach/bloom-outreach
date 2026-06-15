"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flower2, Rocket, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { headStartMonths } from "@/lib/streaks";

export function HeadStartSection() {
	return (
		<FadeIn>
			<div className="relative overflow-hidden rounded-[2rem] border border-bloom-pink/30 bg-gradient-to-br from-primary via-bloom-wine-deep to-[#3d1a28] p-8 shadow-2xl ring-1 ring-white/20 md:p-14">
				<div className="pointer-events-none absolute inset-0 bloom-pattern opacity-10" />
				<div className="pointer-events-none absolute -left-20 top-0 size-64 rounded-full bg-bloom-petal/10 blur-3xl" />
				<div className="pointer-events-none absolute -right-16 bottom-0 size-72 rounded-full bg-bloom-pink/15 blur-3xl" />

				<div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
					<div>
						<Badge
							variant="outline"
							className="mb-5 border-bloom-petal/30 bg-bloom-petal/10 text-bloom-petal"
						>
							<Rocket className="mr-1.5 size-3" />
							Head Start Bonus
						</Badge>
						<h2 className="font-heading text-3xl font-semibold text-white md:text-4xl lg:text-[2.75rem] text-balance">
							Attend all three pre-launch outreaches —{" "}
							<span className="gradient-text">start as a Bloomer</span>
						</h2>
						<p className="mt-5 text-lg leading-relaxed text-white/75">
							Show up to every pre-launch outreach in July, August, and September
							2026 and you&apos;ll automatically begin the streak system at Bloomer
							tier when it goes live in October — skipping straight to 3-month
							rewards.
						</p>
					</div>

					<div className="relative">
						<div className="absolute left-8 right-8 top-1/2 hidden h-px -translate-y-1/2 border-t border-dashed border-bloom-petal/30 md:block" />

						<div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
							{headStartMonths.map((month, index) => (
								<motion.div
									key={month}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.12, duration: 0.5 }}
									className="relative z-10 flex flex-col items-center gap-3"
								>
									<div className="flex size-16 items-center justify-center rounded-2xl border border-bloom-pink/40 bg-white/10 text-lg font-heading font-semibold text-bloom-petal shadow-lg ring-1 ring-white/20 backdrop-blur-md">
										{month.slice(0, 3)}
									</div>
									<span className="text-xs font-semibold uppercase tracking-widest text-white/60">
										{month}
									</span>
									{index < headStartMonths.length - 1 && (
										<ArrowRight className="size-4 text-bloom-pink/60 md:hidden" />
									)}
								</motion.div>
							))}

							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.45, duration: 0.5 }}
								className="relative z-10"
							>
								<motion.div
									animate={{
										boxShadow: [
											"0 0 0 0 rgba(240,212,220,0.4)",
											"0 0 0 12px rgba(240,212,220,0)",
										],
									}}
									transition={{ duration: 2, repeat: Infinity }}
									className="flex flex-col items-center gap-3 rounded-[1.25rem] border border-white/30 bg-white/15 px-8 py-6 ring-1 ring-white/25 backdrop-blur-md"
								>
									<span className="flex size-14 items-center justify-center rounded-2xl bg-bloom-wine text-bloom-petal shadow-lg">
										<Flower2 className="size-7" />
									</span>
									<div className="text-center">
										<p className="flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-widest text-bloom-petal">
											<Star className="size-3 fill-bloom-gold text-bloom-gold" />
											You unlock
										</p>
										<p className="mt-1 font-heading text-xl font-semibold text-white">
											Bloomer
										</p>
										<p className="mt-0.5 text-sm text-white/65">3-month tier</p>
									</div>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</FadeIn>
	);
}
