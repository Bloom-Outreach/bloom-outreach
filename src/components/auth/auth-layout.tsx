import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Quote, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

type AuthImage = {
	src: string;
	alt: string;
};

type AuthTestimonial = {
	quote: string;
	author: string;
	role: string;
};

type AuthStat = {
	label: string;
	value: string;
};

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	description: string;
	eyebrow?: string;
	/** Image displayed on the brand side of the layout. */
	image?: AuthImage;
	/** Mirror the brand panel to the right of the form (default left). */
	imagePosition?: "left" | "right";
	/** Optional path to render a small "back to..." link above the heading. */
	backHref?: string;
	backLabel?: string;
	/** Optional small stat chips overlaid on the hero. */
	stats?: AuthStat[];
	/** Optional testimonial card overlaid on the hero. */
	testimonial?: AuthTestimonial;
}

const defaultStats: AuthStat[] = [
	{ value: "2K+", label: "Hours served" },
	{ value: "35", label: "Cleanups" },
	{ value: "12", label: "Communities" },
];

const defaultTestimonial: AuthTestimonial = {
	quote: "I came to pick up trash and left knowing I'd been part of something bigger — serving Jesus by serving my neighborhood.",
	author: "Sarah Mitchell",
	role: "Cleanup Volunteer",
};

export function AuthLayout({
	children,
	title,
	description,
	eyebrow,
	image = siteImages.auth.signIn,
	imagePosition = "left",
	backHref,
	backLabel,
	stats = defaultStats,
	testimonial = defaultTestimonial,
}: AuthLayoutProps) {
	const imageOnRight = imagePosition === "right";

	return (
		<div className="relative -mt-16 min-h-svh overflow-hidden bg-background pt-16">
			<div
				className={cn(
					"grid min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_1fr]",
					imageOnRight && "lg:grid-cols-[1fr_1.05fr]",
				)}
			>
				{/* Brand / image panel */}
				<div
					className={cn(
						"relative overflow-hidden",
						"h-[42svh] min-h-[320px] lg:h-auto lg:min-h-0",
						imageOnRight && "lg:order-2",
					)}
				>
					<Image
						src={image.src}
						alt={image.alt}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 55vw"
						className="object-cover"
					/>

					{/* Layered overlays for legibility */}
					<div className="absolute inset-0 bg-gradient-to-t from-bloom-wine-deep/95 via-bloom-wine-deep/55 to-bloom-wine-deep/30 lg:bg-gradient-to-br lg:from-bloom-wine-deep/85 lg:via-bloom-wine-deep/55 lg:to-primary/30" />
					<div className="bloom-pattern pointer-events-none absolute inset-0 opacity-15" />
					<div className="pointer-events-none absolute -left-24 top-1/3 size-[360px] rounded-full bg-bloom-petal/25 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-32 right-0 size-[420px] rounded-full bg-bloom-green/20 blur-3xl" />

					{/* Top brand row */}
					<div className="relative z-10 flex items-start justify-between p-6 sm:p-10 xl:p-14">
						<Logo variant="light" />
						<Link
							href="/"
							className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm transition-colors hover:bg-white/15 lg:inline-flex"
						>
							<ArrowLeft className="size-3.5" />
							Back to site
						</Link>
					</div>

					{/* Hero copy + stats */}
					<div className="relative z-10 flex h-full flex-col justify-end gap-8 px-6 pb-8 sm:px-10 sm:pb-10 xl:px-14 xl:pb-14">
						<div className="max-w-xl">
							<Badge
								variant="outline"
								className="mb-4 border-white/30 bg-white/10 text-white backdrop-blur-sm"
							>
								<Heart className="mr-1.5 size-3 fill-white/80" />
								{siteConfig.motto}
							</Badge>
							<h1 className="font-heading text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl xl:text-5xl">
								Volunteer. Clean.{" "}
								<span className="gradient-text">Spread the Word.</span>
							</h1>
							<p className="mt-4 hidden text-base leading-relaxed text-white/80 sm:block sm:text-lg">
								Join a community serving neighborhoods, cleaning our cities, and
								spreading hope and love.
							</p>
						</div>

						{/* Stat chips */}
						<div className="hidden flex-wrap gap-3 sm:flex">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
								>
									<p className="font-heading text-xl font-semibold leading-none text-white">
										{stat.value}
									</p>
									<p className="mt-1 text-[0.7rem] font-medium uppercase tracking-wider text-white/70">
										{stat.label}
									</p>
								</div>
							))}
						</div>

						{/* Testimonial */}
						{testimonial && (
							<figure className="glass-card hidden max-w-md rounded-3xl p-6 lg:block">
								<Quote className="size-7 text-white/40" strokeWidth={1.5} />
								<blockquote className="mt-3 font-heading text-base leading-relaxed text-white sm:text-lg">
									&ldquo;{testimonial.quote}&rdquo;
								</blockquote>
								<figcaption className="mt-4 flex items-center gap-3 text-sm text-white/70">
									<span className="flex size-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
										<Sparkles className="size-4 text-white" />
									</span>
									<span>
										<span className="block font-medium text-white">
											{testimonial.author}
										</span>
										<span className="text-xs uppercase tracking-wider text-white/55">
											{testimonial.role}
										</span>
									</span>
								</figcaption>
							</figure>
						)}
					</div>
				</div>

				{/* Form panel */}
				<div
					className={cn(
						"relative flex flex-col justify-center bg-background px-4 py-12 sm:px-8 lg:px-12 xl:px-16",
						imageOnRight && "lg:order-1",
					)}
				>
					<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent lg:hidden" />
					<div className="pointer-events-none absolute -right-32 top-20 size-[280px] rounded-full bg-bloom-petal/15 blur-3xl lg:hidden" />
					<div className="pointer-events-none absolute -bottom-32 -left-32 size-[280px] rounded-full bg-bloom-green/10 blur-3xl" />

					<div className="relative mx-auto w-full max-w-md">
						{backHref && (
							<Link
								href={backHref}
								className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
							>
								<ArrowLeft className="size-4" />
								{backLabel ?? "Back"}
							</Link>
						)}

						<div className="mb-8">
							{eyebrow && (
								<Badge variant="soft" className="mb-3">
									{eyebrow}
								</Badge>
							)}
							<h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
								{title}
							</h2>
							<p className="mt-2 text-base text-muted-foreground">{description}</p>
						</div>

						{children}

						<p className="mt-8 text-center text-xs text-muted-foreground">
							By continuing, you agree to our{" "}
							<Link
								href="/terms"
								className="underline underline-offset-2 hover:text-primary"
							>
								Terms
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-2 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
