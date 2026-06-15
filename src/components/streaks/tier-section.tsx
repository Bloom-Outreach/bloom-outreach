"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { streakTiers, type StreakTier } from "@/lib/streaks";
import { cn } from "@/lib/utils";

const accentStyles: Record<
	StreakTier["accent"],
	{ card: string; selected: string; glow: string; panel: string }
> = {
	petal: {
		card: "from-bloom-petal via-bloom-petal/70 to-white text-bloom-wine border-bloom-pink/35 dark:from-secondary dark:via-card dark:to-secondary dark:text-bloom-petal dark:border-bloom-pink/25",
		selected: "ring-bloom-wine/40 shadow-bloom-wine/10 dark:ring-bloom-petal/50",
		glow: "bg-bloom-petal/40 dark:bg-bloom-pink/15",
		panel: "from-bloom-petal/50 to-white dark:from-card dark:via-secondary/70 dark:to-card",
	},
	pink: {
		card: "from-bloom-pink/50 via-bloom-petal/80 to-white text-bloom-wine border-bloom-pink/45 dark:from-[#4a2530] dark:via-card dark:to-secondary dark:text-bloom-petal dark:border-bloom-pink/25",
		selected: "ring-bloom-wine/50 shadow-bloom-pink/25 dark:ring-bloom-petal/50",
		glow: "bg-bloom-pink/30 dark:bg-bloom-pink/15",
		panel: "from-bloom-pink/20 via-bloom-petal/30 to-white dark:from-card dark:via-secondary/70 dark:to-card",
	},
	wine: {
		card: "from-primary via-bloom-wine-deep to-[#4a2530] text-white border-bloom-pink/35",
		selected: "ring-bloom-petal/60 shadow-bloom-petal/20",
		glow: "bg-bloom-wine/30",
		panel: "from-primary/10 via-bloom-petal/30 to-white dark:from-card dark:via-secondary/70 dark:to-card",
	},
};

function TierCard({
	tier,
	index,
	isSelected,
	onSelect,
}: {
	tier: StreakTier;
	index: number;
	isSelected: boolean;
	onSelect: () => void;
}) {
	const Icon = tier.icon;
	const styles = accentStyles[tier.accent];
	const isDark = tier.accent === "wine";

	return (
		<motion.button
			type="button"
			onClick={onSelect}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
			whileHover={{ y: -6 }}
			whileTap={{ scale: 0.98 }}
			className={cn(
				"group relative w-full overflow-hidden rounded-3xl border bg-gradient-to-br p-6 text-left shadow-md ring-1 ring-white/20 transition-all duration-300 md:p-7",
				styles.card,
				isSelected && cn("ring-2 shadow-xl scale-[1.02] z-10", styles.selected),
				index === 4 && "xl:col-span-1",
			)}
		>
			<div
				className={cn(
					"pointer-events-none absolute -right-6 -top-6 size-32 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150",
					styles.glow,
				)}
			/>
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute -bottom-4 -right-1 font-heading text-[5rem] font-semibold leading-none opacity-[0.07]",
					isDark ? "text-white" : "text-bloom-wine",
				)}
			>
				{String(index + 1).padStart(2, "0")}
			</span>

			<div className="relative">
				<div className="flex items-center justify-between gap-2">
					<span
						className={cn(
							"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ring-1 ring-white/25",
							isDark
								? "bg-white/15 text-bloom-petal"
								: "bg-bloom-wine/10 text-bloom-wine dark:bg-bloom-petal/15 dark:text-bloom-petal",
						)}
					>
						{tier.monthLabel}
					</span>
					{isSelected && (
						<motion.span
							layoutId="tier-active-dot"
							className="size-2 rounded-full bg-bloom-pink shadow-[0_0_12px_rgba(201,123,139,0.8)]"
						/>
					)}
				</div>

				<div
					className={cn(
						"mt-5 flex size-14 items-center justify-center rounded-2xl ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-110",
						isDark
							? "bg-white/15 text-bloom-petal"
							: "bg-bloom-wine/10 text-bloom-wine dark:bg-bloom-petal/15 dark:text-bloom-petal",
					)}
				>
					<Icon className="size-7" />
				</div>

				<h3 className="mt-5 font-heading text-xl font-semibold md:text-2xl">{tier.name}</h3>
				<div className="mt-3 flex flex-wrap gap-1.5">
					{tier.rewards.map((reward) => (
						<span
							key={reward}
							className={cn(
								"rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold ring-1 ring-white/20",
								isDark
									? "bg-white/10 text-white/85"
									: "bg-bloom-wine/10 text-bloom-wine/80 dark:bg-bloom-petal/10 dark:text-bloom-petal/90",
							)}
						>
							{reward}
						</span>
					))}
				</div>
			</div>
		</motion.button>
	);
}

export function TierSection() {
	const [selectedId, setSelectedId] = useState<string>(streakTiers[0].id);
	const selectedTier = streakTiers.find((tier) => tier.id === selectedId) ?? streakTiers[0];
	const selectedIndex = streakTiers.findIndex((tier) => tier.id === selectedId);
	const SelectedIcon = selectedTier.icon;
	const panelStyles = accentStyles[selectedTier.accent];

	return (
		<div>
			<div className="relative mb-8 hidden xl:block">
				<div className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-bloom-pink/50 to-transparent" />
				<div className="relative flex justify-between px-4">
					{streakTiers.map((tier, index) => (
						<button
							key={tier.id}
							type="button"
							onClick={() => setSelectedId(tier.id)}
							className="group flex flex-col items-center gap-2"
						>
							<span
								className={cn(
									"flex size-3 rounded-full transition-all duration-300",
									selectedId === tier.id
										? "scale-125 bg-bloom-wine shadow-[0_0_0_4px_rgba(240,212,220,0.5)]"
										: "bg-bloom-pink/60 group-hover:bg-bloom-wine/70",
								)}
							/>
							<span
								className={cn(
									"text-[0.65rem] font-semibold uppercase tracking-widest transition-colors",
									selectedId === tier.id
										? "text-bloom-wine dark:text-bloom-petal"
										: "text-muted-foreground",
								)}
							>
								{tier.monthLabel}
							</span>
						</button>
					))}
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
				{streakTiers.map((tier, index) => (
					<TierCard
						key={tier.id}
						tier={tier}
						index={index}
						isSelected={selectedId === tier.id}
						onSelect={() => setSelectedId(tier.id)}
					/>
				))}
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={selectedTier.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -12 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				>
					<div
						className={cn(
							"relative mt-8 overflow-hidden rounded-3xl border border-bloom-pink/30 bg-gradient-to-br p-6 ring-1 ring-white/20 md:p-10",
							panelStyles.panel,
						)}
					>
						<div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-bloom-pink/20 blur-3xl" />
						<div className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-bloom-wine/10 blur-3xl" />

						<div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
							<div className="flex items-center gap-5">
								<div className="flex size-20 shrink-0 items-center justify-center rounded-[1.25rem] bg-bloom-wine text-bloom-petal shadow-lg shadow-bloom-wine/25 ring-1 ring-white/20">
									<SelectedIcon className="size-9" />
								</div>
								<div className="lg:hidden">
									<p className="text-xs font-semibold uppercase tracking-widest text-bloom-wine/60 dark:text-bloom-petal/70">
										Tier {String(selectedIndex + 1).padStart(2, "0")}
									</p>
									<h3 className="font-heading text-2xl font-semibold text-bloom-wine dark:text-bloom-petal">
										{selectedTier.name}
									</h3>
								</div>
							</div>

							<div>
								<div className="hidden items-center gap-3 lg:flex">
									<Sparkles className="size-4 text-bloom-pink" />
									<p className="text-xs font-semibold uppercase tracking-widest text-bloom-wine/60 dark:text-bloom-petal/70">
										{selectedTier.monthLabel} milestone · Tier{" "}
										{String(selectedIndex + 1).padStart(2, "0")}
									</p>
								</div>
								<h3 className="mt-1 hidden font-heading text-3xl font-semibold text-bloom-wine dark:text-bloom-petal lg:block">
									{selectedTier.name}
								</h3>
								<p className="mt-4 max-w-2xl text-lg leading-relaxed text-bloom-wine-deep/85 dark:text-foreground/85">
									{selectedTier.description}
								</p>

								<div className="mt-6 flex flex-wrap gap-2">
									{selectedTier.rewards.map((reward) => (
										<span
											key={reward}
											className="inline-flex items-center gap-1.5 rounded-full border border-bloom-pink/40 bg-white/70 px-4 py-2 text-sm font-semibold text-bloom-wine shadow-sm backdrop-blur-sm dark:border-bloom-pink/35 dark:bg-secondary dark:text-bloom-petal"
										>
											<ChevronRight className="size-3.5 text-bloom-pink" />
											{reward}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
