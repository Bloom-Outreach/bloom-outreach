import { cn } from "@/lib/utils";

interface BloomLogoIconProps {
	className?: string;
	variant?: "default" | "light";
}

export function BloomLogoIcon({
	className,
	// variant = "default",
}: BloomLogoIconProps) {
	// const isLight = variant === "light";

	return (
		<span
			className={cn(
				"flex size-full items-center justify-center rounded-xl text-[1.5rem] leading-none",
				// isLight ? "bg-white/10" : "bg-primary/10",
				className,
			)}
			aria-hidden
		>
			🌸
		</span>
	);
}
