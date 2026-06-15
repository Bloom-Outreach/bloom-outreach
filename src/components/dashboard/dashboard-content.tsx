"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
	Bell,
	ChevronRight,
	MapPin,
	ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { VolunteerAvatar } from "@/components/dashboard/volunteer-avatar";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth-session";
import { parseEventDate } from "@/lib/date-utils";
import { tierBadges, formatTierLabel } from "@/lib/streak-utils";
import { getVolunteerDashboardData } from "@/lib/volunteer-dashboard";
import { cn } from "@/lib/utils";

const pageVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
	},
};

const badgeVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: (index: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			delay: index * 0.05,
			duration: 0.35,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	}),
};

function formatDateBlock(date: string) {
	const parsed = parseEventDate(date);
	return {
		month: parsed.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
		day: parsed.getDate(),
	};
}

function formatDisplayDate(date: string) {
	return parseEventDate(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function DashboardContent() {
	const router = useRouter();
	const { user, isLoading, isSignedIn } = useAuth();
	const [dataReady, setDataReady] = useState(false);

	useEffect(() => {
		if (!isLoading && !isSignedIn) {
			router.replace("/sign-in");
		}
	}, [isLoading, isSignedIn, router]);

	useEffect(() => {
		if (isSignedIn && user) {
			const timer = window.setTimeout(() => setDataReady(true), 350);
			return () => window.clearTimeout(timer);
		}
		setDataReady(false);
	}, [isSignedIn, user]);

	const dashboard = useMemo(() => {
		if (!user) return null;
		const session = getAuthSession();
		return getVolunteerDashboardData(user, {
			isNewVolunteer: session?.isNewVolunteer,
		});
	}, [user]);

	if (isLoading || !isSignedIn || !user || !dashboard) {
		return <DashboardSkeleton />;
	}

	if (!dataReady) {
		return <DashboardSkeleton />;
	}

	const recentAttendance = dashboard.attendanceHistory.slice(0, 5);
	const hasMoreAttendance = dashboard.attendanceHistory.length > 5;
	const tierOrder = Object.keys(tierBadges) as (keyof typeof tierBadges)[];
	const nextEventDate = dashboard.nextEvent
		? formatDisplayDate(dashboard.nextEvent.date)
		: null;

	return (
		<motion.div
			className="mx-auto min-h-[calc(100vh-4rem)] max-w-2xl px-4 py-8 sm:px-6 lg:py-10"
			initial="hidden"
			animate="visible"
			variants={pageVariants}
		>
			{/* Top bar */}
			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 items-center gap-3">
					<VolunteerAvatar user={dashboard} size="md" />
					<div className="min-w-0">
						<h1 className="truncate font-heading text-lg font-semibold text-bloom-wine-deep dark:text-bloom-petal sm:text-xl">
							Welcome back, {dashboard.firstName}
						</h1>
						<p className="text-sm text-muted-foreground">
							Bloom Outreach — your journey
						</p>
					</div>
				</div>
				<button
					type="button"
					aria-label="Notifications"
					className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-bloom-pink/30 bg-bloom-petal/40 text-bloom-wine transition-colors hover:bg-bloom-petal/70 dark:border-bloom-pink/25 dark:bg-secondary dark:text-bloom-petal dark:hover:bg-secondary/80"
				>
					<Bell className="size-[1.1rem]" />
				</button>
			</div>

			{/* Tier & streak card */}
			<section className="mt-8 overflow-hidden rounded-3xl border border-bloom-pink/25 bg-card p-6 shadow-sm ring-1 ring-white/20 dark:border-bloom-pink/20 dark:ring-white/10 sm:p-7">
				<div className="flex items-start justify-between gap-4">
					<span className="inline-flex items-center rounded-full bg-bloom-petal px-3.5 py-1.5 text-sm font-semibold text-bloom-wine-deep dark:bg-secondary dark:text-bloom-petal">
						{dashboard.streakMonths > 0
							? formatTierLabel(dashboard.currentTierId)
							: "🌱 Your first tier awaits"}
					</span>
					<div className="text-right">
						{dashboard.streakMonths > 0 ? (
							<>
								<p className="font-heading text-5xl font-semibold leading-none text-bloom-wine dark:text-bloom-petal">
									{dashboard.streakMonths}
								</p>
								<p className="mt-1 text-sm text-muted-foreground">
									month streak
								</p>
							</>
						) : (
							<>
								<p className="font-heading text-lg font-semibold leading-snug text-bloom-wine dark:text-bloom-petal">
									Your streak starts here
								</p>
								<p className="mt-1 max-w-[11rem] text-sm text-muted-foreground">
									Attend this month&apos;s outreach to start your streak
								</p>
							</>
						)}
					</div>
				</div>

				{dashboard.nextTierName && (
					<div className="mt-8">
						<div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
							<span>
								{dashboard.streakMonths > 0
									? tierBadges[dashboard.currentTierId].label
									: "Start"}
							</span>
							<span>{dashboard.nextTierName}</span>
						</div>
						<div className="h-2.5 overflow-hidden rounded-full bg-bloom-petal/60 dark:bg-secondary">
							<motion.div
								className="h-full rounded-full bg-bloom-wine dark:bg-primary"
								initial={{ width: 0 }}
								animate={{ width: `${dashboard.progressPercent}%` }}
								transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
							/>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							{dashboard.monthsToNext} more month
							{dashboard.monthsToNext === 1 ? "" : "s"} to {dashboard.nextTierName}
						</p>
					</div>
				)}

				{!dashboard.nextTierName && dashboard.streakMonths > 0 && (
					<p className="mt-6 text-sm font-medium text-bloom-wine dark:text-bloom-petal">
						👑 You&apos;ve reached Ambassador — the highest tier. Keep showing up!
					</p>
				)}
			</section>

			{/* Stats row */}
			<section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
				{[
					{ label: "Outreaches attended", value: dashboard.outreachesAttended },
					{ label: "Months on streak", value: dashboard.streakMonths },
					{ label: "Badges earned", value: dashboard.badgesEarned },
				].map((stat, index) => (
					<div
						key={stat.label}
						className={cn(
							"rounded-3xl border border-bloom-pink/20 bg-bloom-petal/25 p-4 ring-1 ring-white/20 dark:border-bloom-pink/25 dark:bg-secondary/70 dark:ring-white/10 sm:p-5",
							index === 2 && "col-span-2 sm:col-span-1",
						)}
					>
						<p className="font-heading text-3xl font-semibold text-bloom-wine dark:text-bloom-petal">
							{stat.value}
						</p>
						<p className="mt-1 text-xs leading-snug text-bloom-wine-deep/80 dark:text-muted-foreground sm:text-sm">
							{stat.label}
						</p>
					</div>
				))}
			</section>

			{/* Badges */}
			<section className="mt-8">
				<h2 className="font-heading text-lg font-semibold text-bloom-wine-deep dark:text-bloom-petal">
					Your badges
				</h2>
				<div className="mt-4 flex flex-wrap justify-between gap-3 sm:justify-start sm:gap-4">
					{tierOrder.map((tierId, index) => {
						const earned = dashboard.earnedTierIds.includes(tierId);
						const badge = tierBadges[tierId];
						return (
							<motion.div
								key={tierId}
								custom={index}
								variants={badgeVariants}
								initial="hidden"
								animate="visible"
								className="flex flex-col items-center gap-2"
							>
								<div
									className={cn(
										"flex size-14 items-center justify-center rounded-full text-2xl sm:size-16 sm:text-3xl",
										earned
											? "bg-bloom-petal ring-2 ring-bloom-pink dark:bg-secondary dark:ring-bloom-pink/50"
											: "bg-muted/80 opacity-45 grayscale",
									)}
									title={badge.label}
								>
									{badge.emoji}
								</div>
								<span
									className={cn(
										"text-[0.65rem] font-semibold uppercase tracking-wider sm:text-xs",
										earned ? "text-bloom-wine-deep dark:text-bloom-petal" : "text-muted-foreground",
									)}
								>
									{badge.label}
								</span>
							</motion.div>
						);
					})}
				</div>
			</section>

			{/* Next outreach */}
			<section className="mt-8">
				<h2 className="mb-4 font-heading text-lg font-semibold text-bloom-wine-deep dark:text-bloom-petal">
					Next outreach
				</h2>
				{dashboard.nextEvent ? (
					<div className="flex flex-col gap-4 rounded-3xl border border-bloom-pink/20 bg-card p-5 ring-1 ring-white/20 dark:border-bloom-pink/20 dark:ring-white/10 sm:flex-row sm:items-center sm:p-6">
						<div className="flex shrink-0 items-center gap-4 sm:gap-5">
							<div className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-2xl bg-bloom-petal px-4 py-3 text-center dark:bg-secondary">
								<span className="text-xs font-bold tracking-widest text-bloom-wine-deep dark:text-bloom-petal/80">
									{formatDateBlock(dashboard.nextEvent.date).month}
								</span>
								<span className="font-heading text-3xl font-semibold leading-none text-bloom-wine dark:text-bloom-petal">
									{formatDateBlock(dashboard.nextEvent.date).day}
								</span>
							</div>
							<div className="min-w-0 flex-1 sm:hidden">
								<h3 className="font-heading text-base font-semibold text-foreground">
									{dashboard.nextEvent.title}
								</h3>
								<p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
									<MapPin className="mt-0.5 size-3.5 shrink-0 text-bloom-pink" />
									<span>{dashboard.nextEvent.location}</span>
								</p>
							</div>
						</div>
						<div className="hidden min-w-0 flex-1 sm:block">
							<h3 className="font-heading text-lg font-semibold text-foreground">
								{dashboard.nextEvent.title}
							</h3>
							<p className="mt-1.5 flex items-start gap-1.5 text-sm text-muted-foreground">
								<MapPin className="mt-0.5 size-3.5 shrink-0 text-bloom-pink" />
								<span>{dashboard.nextEvent.location}</span>
							</p>
						</div>
						<Button
							asChild
							className="w-full shrink-0 rounded-full bg-bloom-wine px-6 hover:bg-bloom-wine-deep sm:w-auto"
						>
							<Link href={`/events/${dashboard.nextEvent.id}`}>RSVP</Link>
						</Button>
					</div>
				) : (
					<div className="rounded-3xl border border-dashed border-bloom-pink/30 bg-bloom-petal/20 px-6 py-8 text-center ring-1 ring-white/20 dark:border-bloom-pink/25 dark:bg-secondary/50 dark:ring-white/10">
						<p className="font-heading text-base font-medium text-bloom-wine dark:text-bloom-petal">
							Stay tuned — next outreach coming soon
						</p>
						<p className="mt-2 text-sm text-muted-foreground">
							We&apos;ll notify you when the next monthly outreach is on the calendar.
						</p>
					</div>
				)}
			</section>

			{/* Attendance history */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between gap-3">
					<h2 className="font-heading text-lg font-semibold text-bloom-wine-deep dark:text-bloom-petal">
						Attendance history
					</h2>
					{hasMoreAttendance && (
						<Link
							href="/profile"
							className="inline-flex items-center gap-1 text-sm font-medium text-bloom-wine hover:underline dark:text-bloom-petal dark:hover:text-bloom-pink"
						>
							View all
							<ChevronRight className="size-4" />
						</Link>
					)}
				</div>

				{recentAttendance.length > 0 ? (
					<ul className="divide-y divide-bloom-pink/15 overflow-hidden rounded-3xl border border-bloom-pink/20 bg-card ring-1 ring-white/20 dark:divide-bloom-pink/20 dark:border-bloom-pink/20 dark:ring-white/10">
						{recentAttendance.map((entry) => (
							<li
								key={entry.id}
								className="flex items-center gap-4 px-4 py-4 sm:px-5"
							>
								<span
									className={cn(
										"size-2.5 shrink-0 rounded-full",
										entry.status === "attended" ? "bg-bloom-green" : "bg-bloom-gold",
									)}
									aria-hidden
								/>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium text-foreground">
										{entry.eventName}
									</p>
									<p className="text-xs text-muted-foreground">
										{formatDisplayDate(entry.date)}
									</p>
								</div>
								<span
									className={cn(
										"shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
										entry.status === "attended"
											? "bg-bloom-green/15 text-bloom-green dark:text-[#8ec4a8]"
											: "bg-bloom-gold/15 text-bloom-gold-foreground dark:text-[#e8c878]",
									)}
								>
									{entry.status}
								</span>
							</li>
						))}
					</ul>
				) : (
					<div className="rounded-3xl border border-bloom-pink/20 bg-bloom-petal/20 px-6 py-8 text-center ring-1 ring-white/20 dark:border-bloom-pink/25 dark:bg-secondary/50 dark:ring-white/10">
						<p className="text-sm leading-relaxed text-muted-foreground">
							{nextEventDate
								? `No outreaches yet — your first one is coming up on ${nextEventDate}`
								: "No outreaches yet — we can't wait to serve alongside you."}
						</p>
						{dashboard.nextEvent && (
							<Button asChild variant="outline" className="mt-4 rounded-full">
								<Link href={`/events/${dashboard.nextEvent.id}`}>RSVP now</Link>
							</Button>
						)}
					</div>
				)}
			</section>

			{/* Merch status */}
			{dashboard.merch && (
				<section className="mt-8">
					<div className="rounded-3xl border-2 border-bloom-pink/40 bg-gradient-to-br from-bloom-petal/40 to-card p-5 ring-1 ring-white/20 dark:border-bloom-pink/30 dark:from-secondary/80 dark:to-card dark:ring-white/10 sm:p-6">
						<div className="flex items-start gap-4">
							<span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-bloom-wine/10 text-bloom-wine dark:bg-primary/20 dark:text-bloom-petal">
								<ShoppingBag className="size-5" />
							</span>
							<div className="min-w-0 flex-1">
								<p className="text-xs font-semibold uppercase tracking-widest text-bloom-wine/70 dark:text-bloom-petal/70">
									Your merch
								</p>
								<h3 className="mt-1 font-heading text-lg font-semibold text-bloom-wine-deep dark:text-bloom-petal">
									{dashboard.merch.itemName}
								</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									Earned at {dashboard.merch.tierName} tier
								</p>
							</div>
							<span
								className={cn(
									"shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
									dashboard.merch.status === "pending"
										? "bg-bloom-petal text-bloom-wine-deep dark:bg-secondary dark:text-bloom-petal"
										: "bg-bloom-green/15 text-bloom-green dark:text-[#8ec4a8]",
								)}
							>
								{dashboard.merch.status === "pending"
									? "Pending dispatch"
									: "Dispatched"}
							</span>
						</div>
					</div>
				</section>
			)}
		</motion.div>
	);
}
