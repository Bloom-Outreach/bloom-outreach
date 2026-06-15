import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

type AuthImage = {
	src: string;
	alt: string;
};

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	description: string;
	eyebrow?: string;
	image?: AuthImage;
	imagePosition?: "left" | "right";
	backHref?: string;
	backLabel?: string;
}

export function AuthLayout({
	children,
	title,
	description,
	eyebrow,
	image = siteImages.auth.signIn,
	imagePosition = "left",
	backHref,
	backLabel,
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
						className="object-cover object-right"
					/>

					{/* Layered overlays for legibility */}
					<div className="absolute inset-0 bg-gradient-to-t from-bloom-wine-deep/95 via-bloom-wine-deep/55 to-bloom-wine-deep/30 lg:bg-gradient-to-br lg:from-bloom-wine-deep/85 lg:via-bloom-wine-deep/55 lg:to-primary/30" />
					<div className="bloom-pattern pointer-events-none absolute inset-0 opacity-15" />
					<div className="pointer-events-none absolute -left-24 top-1/3 size-[360px] rounded-full bg-bloom-petal/25 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-32 right-0 size-[420px] rounded-full bg-bloom-green/20 blur-3xl" />

					{/* Top brand row */}
					<div className="relative z-10 p-6 sm:p-10 xl:p-14">
						<Link href="/">
							<Logo variant="light" />
						</Link>
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
