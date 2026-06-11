import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brush, CalendarDays, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapEmbed } from "@/components/ui/map-embed";
import { FadeIn } from "@/components/motion/fade-in";
import { ProfileNav } from "@/components/profile/profile-nav";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { VolunteerFocusChart, VolunteerHoursChart } from "@/components/dashboard/volunteer-charts";
import { mockVolunteer } from "@/lib/mock-volunteer";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Profile",
	description: "Your Bloom Outreach volunteer profile — events, activity, and service stats.",
};

const statIcons = {
	eventsJoined: CalendarDays,
	cleanups: Brush,
	hoursServed: Users,
} as const;

export default function ProfilePage() {
	const { stats, upcomingEvents, recentActivity, bio } = mockVolunteer;

	const statItems = [
		{ key: "eventsJoined" as const, label: "Events Joined", value: stats.eventsJoined },

		{ key: "hoursServed" as const, label: "Hours Served", value: stats.hoursServed },
	];

	return (
		<>
			<PageHeader
				title="My Profile"
				description="Track your volunteer journey — events, cleanups, and the impact you're making for Jesus."
				image={siteImages.pageHeaders.profile}
				eyebrow="Volunteer Dashboard"
			/>

			<Section className="pt-0">
				<div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
					<FadeIn className="lg:col-span-4 xl:col-span-3">
						<div className="space-y-6 lg:sticky lg:top-24">
							<ProfileSidebar />
							<Card className="hidden lg:block">
								<ProfileNav />
							</Card>
						</div>
					</FadeIn>

					<div className="space-y-8 lg:col-span-8 xl:col-span-9">
						<FadeIn delay={0.05}>
							<Card className="lg:hidden">
								<ProfileNav orientation="horizontal" />
							</Card>
						</FadeIn>

						<FadeIn delay={0.1}>
							<div className="grid gap-4 sm:grid-cols-3">
								{statItems.map(({ key, label, value }) => {
									const Icon = statIcons[key];
									return (
										<Card
											key={key}
											className="relative overflow-hidden text-center"
										>
											<div className="pointer-events-none absolute -right-4 -top-4 size-20 rounded-full bg-primary/5" />
											<span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
												<Icon className="size-5" />
											</span>
											<p className="mt-4 font-heading text-3xl font-semibold text-primary">
												{value}
											</p>
											<p className="mt-1 text-sm text-muted-foreground">
												{label}
											</p>
										</Card>
									);
								})}
							</div>
						</FadeIn>

						<FadeIn delay={0.12}>
							<div className="grid gap-6 md:grid-cols-2">
								<Card>
									<div className="mb-4">
										<Badge variant="soft" className="mb-2">
											My Service
										</Badge>
										<h3 className="font-heading text-lg font-semibold">
											Hours This Year
										</h3>
									</div>
									<VolunteerHoursChart />
								</Card>
								<Card>
									<div className="mb-4">
										<Badge variant="soft" className="mb-2">
											Volunteering
										</Badge>
										<h3 className="font-heading text-lg font-semibold">
											Saturday Attendance This Year
										</h3>
									</div>
									<VolunteerFocusChart />
								</Card>
							</div>
						</FadeIn>

						<FadeIn delay={0.15}>
							<Card className="bg-gradient-to-br from-card to-muted/30">
								<div className="flex items-start gap-3">
									<Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
									<div>
										<h3 className="font-heading text-lg font-semibold">
											About Me
										</h3>
										<p className="mt-2 leading-relaxed text-muted-foreground">
											{bio}
										</p>
									</div>
								</div>
							</Card>
						</FadeIn>

						<FadeIn delay={0.2}>
							<div className="flex items-center justify-between gap-4">
								<div>
									<Badge variant="soft" className="mb-2">
										Up Next
									</Badge>
									<h3 className="font-heading text-2xl font-semibold">
										Upcoming Events
									</h3>
								</div>
								<Button
									asChild
									variant="outline"
									className="hidden rounded-full sm:inline-flex"
								>
									<Link href="/calendar">
										View Calendar
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>

							<div className="mt-6 space-y-4">
								{upcomingEvents.map((event) => (
									<Card key={event.id} className="flex flex-col gap-4">
										<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
											<div>
												<span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
													Volunteering
												</span>
												<h4 className="mt-2 font-heading text-lg font-semibold">
													{event.title}
												</h4>
												<ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
													<li className="flex items-center gap-2">
														<CalendarDays className="size-4 shrink-0 text-primary" />
														{event.date}
													</li>
													<li className="flex items-center gap-2">
														<Clock className="size-4 shrink-0 text-primary" />
														{event.time}
													</li>
													<li className="flex items-center gap-2">
														<MapPin className="size-4 shrink-0 text-primary" />
														{event.location}
													</li>
												</ul>
											</div>
											<Button asChild className="shrink-0 rounded-full">
												<Link href="/calendar">View Details</Link>
											</Button>
										</div>
										<MapEmbed location={event.location} className="h-40" />
									</Card>
								))}
							</div>

							<Button
								asChild
								variant="outline"
								className="mt-4 w-full rounded-full sm:hidden"
							>
								<Link href="/calendar">
									View Full Calendar
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</FadeIn>

						<FadeIn delay={0.25}>
							<div className="flex items-center justify-between gap-4">
								<div>
									<Badge variant="soft" className="mb-2">
										Activity
									</Badge>
									<h3 className="font-heading text-2xl font-semibold">
										Recent Activity
									</h3>
								</div>
							</div>

							<div className="mt-6 space-y-4">
								{recentActivity.map((item) => (
									<Card
										key={item.id}
										className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
									>
										<div>
											<span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
												Volunteering
											</span>
											<h4 className="mt-2 font-heading text-lg font-semibold">
												{item.action}
											</h4>
											<ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
												<li className="flex items-center gap-2">
													<CalendarDays className="size-4 shrink-0 text-primary" />
													{item.date}
												</li>
											</ul>
										</div>
									</Card>
								))}
							</div>
						</FadeIn>
					</div>
				</div>
			</Section>
		</>
	);
}
