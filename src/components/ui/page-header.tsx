import { BackgroundImage } from "@/components/ui/background-image";
import { Badge } from "@/components/ui/badge";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
	image?: string;
	eyebrow?: string;
	size?: "default" | "large";
}

const sizeClasses = {
	default: "py-24 md:py-32",
	large: "flex w-full min-h-[480px] items-center py-40 md:min-h-[580px] md:py-48 lg:min-h-[680px] lg:py-56",
} as const;

export function PageHeader({
	title,
	description,
	className,
	image = siteImages.pageHeaders.default,
	eyebrow = "Bloom Outreach",
	size = "default",
}: PageHeaderProps) {
	return (
		<BackgroundImage
			src={image}
			alt=""
			priority
			className={cn("-mt-16 pt-16", sizeClasses[size], className)}
			overlayClassName="bg-gradient-to-br from-bloom-wine-deep/95 via-primary/88 to-[#4a2530]/90"
		>
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<Badge variant="outline" className="mb-5 border-white/25 text-white">
						{eyebrow}
					</Badge>
					<h1 className="max-w-full font-heading text-4xl font-semibold text-white md:text-5xl lg:text-6xl text-balance">
						{title}
					</h1>
					{description && (
						<p className="mt-5 max-w-full text-lg leading-relaxed text-white/80 text-balance md:text-xl">
							{description}
						</p>
					)}
				</div>
			</div>
		</BackgroundImage>
	);
}
