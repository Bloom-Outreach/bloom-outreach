import type { LucideIcon } from "lucide-react";
import {
	Crown,
	Flower2,
	Gift,
	Shield,
	Sparkles,
	Sprout,
	TreeDeciduous,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

export type StreakTier = {
	id: string;
	name: string;
	months: number;
	monthLabel: string;
	rewards: string[];
	description: string;
	icon: LucideIcon;
	accent: "petal" | "pink" | "wine";
};

export const streakTiers: StreakTier[] = [
	{
		id: "seedling",
		name: "Seedling",
		months: 1,
		monthLabel: "1 mo",
		rewards: ["Pen", "Badge", "Welcome card"],
		description:
			"Your journey begins here. One month of showing up faithfully earns your first Bloom badge, a welcome card, and a pen — small reminders that every act of service starts with simply being present.",
		icon: Sprout,
		accent: "petal",
	},
	{
		id: "bloomer",
		name: "Bloomer",
		months: 3,
		monthLabel: "3 mo",
		rewards: ["Tote bag"],
		description:
			"Three months in and you're blooming. You've proven you can show up — receive a Bloom tote bag to carry the mission with you wherever you serve.",
		icon: Flower2,
		accent: "pink",
	},
	{
		id: "rooted",
		name: "Rooted",
		months: 6,
		monthLabel: "6 mo",
		rewards: ["Mug", "Jotter"],
		description:
			"Half a year of consistency. You're rooted in the mission — a Bloom mug and jotter mark the depth of your commitment to showing up month after month.",
		icon: TreeDeciduous,
		accent: "wine",
	},
	{
		id: "flourishing",
		name: "Flourishing",
		months: 9,
		monthLabel: "9 mo",
		rewards: ["Flask", "Journal"],
		description:
			"Nine months of faithful service. You're flourishing — earn a flask and journal set to reflect on the lives touched and the hope shared along the way.",
		icon: Sparkles,
		accent: "pink",
	},
	{
		id: "ambassador",
		name: "Ambassador",
		months: 12,
		monthLabel: "12 mo",
		rewards: ["Hoodie", "Keychain", "Head warmer"],
		description:
			"A full year of showing up for Jesus and your community. You're a Bloom Ambassador — hoodie, keychain, and head warmer celebrate a year of love, service, and transformation.",
		icon: Crown,
		accent: "wine",
	},
];

export const streakRules = [
	{
		icon: TrendingUp,
		title: "Attend → streak grows",
		description:
			"Attend the monthly outreach and your streak grows by one month. Show up each month, serve faithfully, and watch your count climb toward the next tier.",
	},
	{
		icon: TrendingDown,
		title: "Miss one → drops to last milestone",
		description:
			"If you miss a month's outreach, your active streak resets to your last earned milestone — never below the tier you've already unlocked.",
	},
	{
		icon: Shield,
		title: "Milestones are protected forever",
		description:
			"Once you reach a tier, it's yours for good. Your earned badges and merch stay with you even if life interrupts your streak for a season.",
	},
	{
		icon: Gift,
		title: "Merch at every tier",
		description:
			"Every milestone comes with exclusive Bloom merchandise — wearable proof of the faithfulness you've built one month at a time.",
	},
] as const;

export const streakTimeline = [
	{
		date: "July 25, 2026",
		title: "Pre-launch season begins",
		description:
			"The Bloom Badge & Streak System kicks off with our first pre-launch outreach — the start of your head start journey.",
		highlight: false,
	},
	{
		date: "August 2026",
		title: "August outreach",
		description:
			"Second pre-launch outreach of the season. Attend to keep building toward your Head Start Bonus.",
		highlight: false,
	},
	{
		date: "September 2026",
		title: "September outreach",
		description:
			"Final pre-launch outreach before the streak system goes live. Complete all three to unlock Bloomer tier from day one.",
		highlight: false,
	},
	{
		date: "October 25, 2026",
		title: "Streak system goes live",
		description:
			"Official launch day. Your streak count begins — or picks up at Bloomer if you earned the Head Start Bonus.",
		highlight: true,
	},
] as const;

export const headStartMonths = ["July", "August", "September"] as const;
