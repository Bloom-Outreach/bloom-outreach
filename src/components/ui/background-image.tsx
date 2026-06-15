import Image from "next/image";
import { cn } from "@/lib/utils";

interface BackgroundImageProps {
	src: string;
	alt: string;
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
	priority?: boolean;
}

export function BackgroundImage({
	src,
	alt,
	children,
	className,
	overlayClassName,
	priority = false,
}: BackgroundImageProps) {
	return (
		<div className={cn("relative overflow-hidden", className)}>
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				sizes="100vw"
				className="object-cover"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70",
					overlayClassName,
				)}
			/>
			<div className="bloom-pattern absolute inset-0 opacity-20" />
			<div className="relative z-10">{children}</div>
		</div>
	);
}

interface ContentImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	priority?: boolean;
}

export function ContentImage({
	src,
	alt,
	width,
	height,
	className,
	priority = false,
}: ContentImageProps) {
	return (
		<div className={cn("relative overflow-hidden rounded-2xl bg-muted shadow-lg", className)}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				sizes="(max-width: 768px) 100vw, 50vw"
				className="h-full w-full object-cover"
			/>
		</div>
	);
}
