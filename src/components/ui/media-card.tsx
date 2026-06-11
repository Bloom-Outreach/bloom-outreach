import Image from "next/image";
import { cn } from "@/lib/utils";

export const mediaCardClasses =
	"group break-inside-avoid overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5";

interface MediaCardProps {
	image: string;
	imageAlt: string;
	eyebrow?: string;
	title: string;
	description?: string;
	aspect?: "video" | "tall";
	className?: string;
	sizes?: string;
	children?: React.ReactNode;
}

export function MediaCard({
	image,
	imageAlt,
	eyebrow,
	title,
	description,
	aspect = "video",
	className,
	sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
	children,
}: MediaCardProps) {
	return (
		<article className={cn(mediaCardClasses, className)}>
			<div className="relative block w-full overflow-hidden">
				<div
					className={cn(
						"relative w-full overflow-hidden bg-muted",
						aspect === "tall" ? "aspect-[3/4]" : "aspect-video",
					)}
				>
					<Image
						src={image}
						alt={imageAlt}
						fill
						sizes={sizes}
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
				</div>
			</div>

			<div className="p-4 md:p-5">
				{eyebrow && (
					<span className="text-xs font-medium uppercase tracking-wider text-primary">
						{eyebrow}
					</span>
				)}
				<h3
					className={cn(
						"font-heading text-base font-semibold text-foreground md:text-lg",
						eyebrow && "mt-1",
					)}
				>
					{title}
				</h3>
				{description && (
					<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
						{description}
					</p>
				)}
				{children}
			</div>
		</article>
	);
}
