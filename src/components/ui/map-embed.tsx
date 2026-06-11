import { getMapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

interface MapEmbedProps {
	location: string;
	title?: string;
	className?: string;
}

export function MapEmbed({ location, title, className }: MapEmbedProps) {
	return (
		<iframe
			src={getMapEmbedUrl(location)}
			title={title ?? `Map for ${location}`}
			className={cn("h-48 w-full rounded-xl border-0", className)}
			loading="lazy"
			referrerPolicy="no-referrer-when-downgrade"
			allowFullScreen
		/>
	);
}
