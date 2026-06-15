import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brush, Heart, Megaphone, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundImage } from "@/components/ui/background-image";
import { FadeIn } from "@/components/motion/fade-in";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Support Us",
	description:
		"Support Bloom Outreach — help us volunteer, clean our community, and spread the gospel of Jesus.",
};

const impactAreas = [
	{
		icon: Brush,
		title: "Cleanup Supplies",
		description:
			"Gloves, trash bags, tools, and safety gear for every neighborhood cleanup we run.",
		percent: "40%",
	},
	{
		icon: Users,
		title: "Volunteer & Outreach",
		description:
			"Transport, refreshments, and resources that keep our volunteers showing up faithfully.",
		percent: "35%",
	},
	{
		icon: Megaphone,
		title: "Gospel Materials",
		description:
			"Bibles, tracts, and outreach materials shared as we serve and spread the word.",
		percent: "25%",
	},
] as const;

const reasons = [
	{
		title: "Every gift is an act of worship",
		description:
			"When you support Bloom Outreach, you're investing in practical love — cleaning streets, serving neighbors, and pointing people to Jesus.",
	},
	{
		title: "We steward every naira with care",
		description:
			"Bloom Outreach is a faith-based community service. We operate with transparency and direct your support toward real, on-the-ground impact.",
	},
	{
		title: "Your support multiplies",
		description:
			"One gift equips dozens of volunteers. One cleanup reaches hundreds of neighbors. One conversation can change an eternity.",
	},
] as const;

export default function SupportUsPage() {
	return (
		<>
			<PageHeader
				title="Support Us"
				description="Your generosity fuels cleanups, equips volunteers, and helps us spread the gospel of Jesus in our community."
				image={siteImages.pageHeaders.support}
				eyebrow="Partner With Us"
				size="large"
			/>

			<Section>
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<FadeIn>
						<div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-border/50">
							<Image
								src={siteImages.mission.src}
								alt="Volunteers serving together"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-bloom-wine-deep/50 via-transparent to-transparent" />
							<div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
								<p className="font-heading text-lg font-medium text-white text-balance">
									&ldquo;Freely you have received; freely give.&rdquo;
								</p>
								<p className="mt-2 text-sm text-white/70">— Matthew 10:8</p>
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={0.1}>
						<Badge variant="soft" className="mb-4">
							Why We Need You
						</Badge>
						<h2 className="font-heading text-3xl font-semibold md:text-4xl text-balance">
							Bloom grows when hearts give generously
						</h2>
						<div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
							<p>
								Bloom Outreach is more than a cleanup crew — we are a family of
								believers committed to volunteering, cleaning our neighborhoods, and
								sharing the gospel of Jesus Christ.
							</p>
							<p>
								We don&apos;t charge for service. We don&apos;t sell tickets.
								Everything we do is powered by people like you who believe that
								practical and the message of Christ belong in every community.
							</p>
							<p>
								Whether you give once or become a monthly partner, your support
								keeps us on the streets, in the parks, and in the conversations
								where hope is needed most.
							</p>
						</div>
						<Button asChild size="lg" className="mt-8 h-12 rounded-full px-8 text-base">
							<Link href="/support">
								Support Us
								<Heart className="size-4 fill-primary-foreground/30" />
							</Link>
						</Button>
					</FadeIn>
				</div>
			</Section>

			<Section className="bg-muted/40 pt-0">
				<SectionHeader
					eyebrow="Our Mission"
					title="Three pillars. One purpose. All for Jesus."
					description="Your support strengthens every part of what we do — from gloves on the ground to gospel conversations in the neighborhood."
				/>

				<div className="grid gap-6 md:grid-cols-3">
					{reasons.map((reason, index) => (
						<FadeIn key={reason.title} delay={index * 0.08}>
							<Card className="h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
								<Sparkles className="size-5 text-primary" />
								<h3 className="mt-4 font-heading text-xl font-semibold">
									{reason.title}
								</h3>
								<p className="mt-3 leading-relaxed text-muted-foreground">
									{reason.description}
								</p>
							</Card>
						</FadeIn>
					))}
				</div>
			</Section>

			<Section>
				<SectionHeader
					title="Where Your Support Goes"
					description="We believe in transparency. Here's how your gifts are directed across our work."
				/>

				<div className="grid gap-6 md:grid-cols-3">
					{impactAreas.map((area, index) => {
						const Icon = area.icon;
						return (
							<FadeIn key={area.title} delay={index * 0.08}>
								<div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
									<div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
									<span className="relative mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
										<Icon className="size-5" />
									</span>
									<p className="relative mt-5 font-heading text-4xl font-semibold text-primary">
										{area.percent}
									</p>
									<h3 className="relative mt-2 font-heading text-lg font-semibold">
										{area.title}
									</h3>
									<p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
										{area.description}
									</p>
								</div>
							</FadeIn>
						);
					})}
				</div>
			</Section>

			<Section className="pt-0">
				<FadeIn>
					<BackgroundImage
						src={siteImages.cta.src}
						alt=""
						className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-border/30"
						overlayClassName="bg-gradient-to-br from-primary/92 via-bloom-wine-deep/88 to-primary/85"
					>
						<div className="px-8 py-16 text-center md:px-16 md:py-20">
							<Badge variant="outline" className="mb-5 border-white/25 text-white">
								Ready to Give?
							</Badge>
							<h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold text-white md:text-4xl lg:text-5xl text-balance">
								Partner with us and watch hope bloom
							</h2>
							<p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
								Give online in seconds with Paystack, or send a bank transfer.
								However you give, you&apos;re part of something eternal.
							</p>
							<Button
								asChild
								size="lg"
								className="mt-10 h-12 rounded-full bg-white px-8 text-base text-primary hover:bg-white/90"
							>
								<Link href="/support">
									Support
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</BackgroundImage>
				</FadeIn>
			</Section>
		</>
	);
}
