import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapEmbed } from "@/components/ui/map-embed";
import { FadeIn } from "@/components/motion/fade-in";
import { EventVolunteerSignup } from "@/components/events/event-volunteer-signup";
import { EventMedia } from "@/components/events/event-media";
import { getEventMedia, upcomingEvents } from "@/lib/constants";
import { formatEventDate, parseEventDate } from "@/lib/date-utils";
import { volunteerScheduleConfig } from "@/lib/mock-dashboard";
import { siteImages } from "@/lib/images";
import { BloomLogoIcon } from "@/components/bloom-logo-icon";
import { cn } from "@/lib/utils";

type EventDetailPageProps = {
	params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
	return upcomingEvents.map((event) => ({ id: String(event.id) }));
}

export async function generateMetadata({
	params,
}: EventDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const event = upcomingEvents.find((entry) => String(entry.id) === id);
	if (!event) {
		return {
			title: "Event Not Found",
			description: "We couldn't find that event.",
		};
	}
	return {
		title: event.title,
		description: event.description,
	};
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
	const { id } = await params;
	const event = upcomingEvents.find((entry) => String(entry.id) === id);
	if (!event) {
		notFound();
	}

	const media = getEventMedia(event.id);
	const isNext = event.date === volunteerScheduleConfig.nextEventDate;
	const eventDate = parseEventDate(event.date);

	return (
		<>
			<PageHeader
				title={event.title}
				description={event.description}
				image={siteImages.pageHeaders.calendar}
				eyebrow="Event Details"
			/>

			<Section className="pt-0">
				<FadeIn>
					<div className="mb-8 flex items-center justify-between gap-4">
						<Button asChild variant="outline" className="rounded-full">
							<Link href="/calendar">
								<ArrowLeft className="size-4" />
								Back to Events
							</Link>
						</Button>
						<div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
							<Users className="size-4 text-primary" />
							<span>
								{event.volunteersSignedUp} volunteers signed up
							</span>
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
						<div className="lg:col-span-3">
							<Card
								className={cn(
									"relative flex flex-col gap-5 overflow-hidden",
									isNext && "border-primary/30 ring-1 ring-primary/15",
								)}
							>
								{isNext && (
									<span
										className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-bl-xl border-l border-b border-primary/25 bg-primary/10"
										aria-label="Next volunteering Saturday"
									>
										<BloomLogoIcon className="size-5 text-sm" />
									</span>
								)}

								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<Badge variant="soft" className="mb-2">
											{event.category}
										</Badge>
										<h2 className="font-heading text-2xl font-semibold md:text-3xl">
											{event.title}
										</h2>
										{isNext && (
											<p className="mt-1 text-xs font-medium text-primary">
												Next volunteering Saturday
											</p>
										)}
									</div>
									<div className="rounded-xl bg-muted px-4 py-3 text-center">
										<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
											{eventDate.toLocaleDateString("en-US", { month: "short" })}
										</p>
										<p className="font-heading text-3xl font-semibold leading-none text-primary">
											{eventDate.getDate()}
										</p>
									</div>
								</div>

								<p className="text-base leading-relaxed text-muted-foreground">
									{event.description}
								</p>

								<ul className="grid gap-3 sm:grid-cols-2">
									<li className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4">
										<CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" />
										<div>
											<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
												Date
											</p>
											<p className="mt-0.5 text-sm font-medium text-foreground">
												{formatEventDate(event.date)}
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4">
										<Clock className="mt-0.5 size-5 shrink-0 text-primary" />
										<div>
											<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
												Time
											</p>
											<p className="mt-0.5 text-sm font-medium text-foreground">
												{event.startTime} – {event.endTime}
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4 sm:col-span-2">
										<MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
										<div>
											<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
												Location
											</p>
											<p className="mt-0.5 text-sm font-medium text-foreground">
												{event.location}
											</p>
										</div>
									</li>
								</ul>

								<MapEmbed location={event.location} className="h-56" />
							</Card>
						</div>

						<div className="lg:col-span-2">
							<Card className="lg:sticky lg:top-24">
								<h3 className="font-heading text-xl font-semibold">
									Volunteer at this event
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									Sign up below so we know to expect you. You can bring guests
									and pick the tools you&apos;ll have.
								</p>
								<EventVolunteerSignup event={event} />
							</Card>
						</div>
					</div>
				</FadeIn>
			</Section>

			<Section className="pt-0">
				<FadeIn>
					<EventMedia photos={media.photos} videos={media.videos} />
				</FadeIn>
			</Section>
		</>
	);
}
