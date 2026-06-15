import { streakTiers } from "@/lib/streaks";

export type TierId = (typeof streakTiers)[number]["id"];

export const tierBadges: Record<
	TierId,
	{ emoji: string; label: string; months: number }
> = {
	seedling: { emoji: "🌱", label: "Seedling", months: 1 },
	bloomer: { emoji: "🌸", label: "Bloomer", months: 3 },
	rooted: { emoji: "🌿", label: "Rooted", months: 6 },
	flourishing: { emoji: "🌺", label: "Flourishing", months: 9 },
	ambassador: { emoji: "👑", label: "Ambassador", months: 12 },
};

export function getTierForStreak(streakMonths: number): TierId {
	let current: TierId = "seedling";
	for (const tier of streakTiers) {
		if (streakMonths >= tier.months) {
			current = tier.id as TierId;
		}
	}
	return current;
}

export function getEarnedTierIds(streakMonths: number): TierId[] {
	return streakTiers
		.filter((tier) => streakMonths >= tier.months)
		.map((tier) => tier.id as TierId);
}

export function getTierProgress(streakMonths: number) {
	if (streakMonths === 0) {
		const firstTier = streakTiers[0];
		return {
			currentTierId: firstTier.id as TierId,
			currentTier: firstTier,
			nextTier: firstTier,
			progressPercent: 0,
			monthsToNext: firstTier.months,
		};
	}

	const currentTierId = getTierForStreak(streakMonths);
	const currentIndex = streakTiers.findIndex((tier) => tier.id === currentTierId);
	const currentTier = streakTiers[currentIndex];
	const nextTier = streakTiers[currentIndex + 1];

	if (!nextTier) {
		return {
			currentTierId,
			currentTier,
			nextTier: null,
			progressPercent: 100,
			monthsToNext: 0,
		};
	}

	const span = nextTier.months - currentTier.months;
	const elapsed = Math.max(0, streakMonths - currentTier.months);
	const progressPercent = Math.min(100, Math.round((elapsed / span) * 100));
	const monthsToNext = Math.max(0, nextTier.months - streakMonths);

	return {
		currentTierId,
		currentTier,
		nextTier,
		progressPercent,
		monthsToNext,
	};
}

export function formatTierLabel(tierId: TierId) {
	const badge = tierBadges[tierId];
	return `${badge.emoji} ${badge.label} tier`;
}
