"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon, Play, Video as VideoIcon, X } from "lucide-react";
import type { EventPhoto, EventVideo } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventMediaProps {
	photos: EventPhoto[];
	videos: EventVideo[];
}

function getYoutubeEmbedUrl(youtubeId: string) {
	return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export function EventMedia({ photos, videos }: EventMediaProps) {
	const [activeVideo, setActiveVideo] = useState<EventVideo | null>(null);
	const [activePhoto, setActivePhoto] = useState<EventPhoto | null>(null);

	useEffect(() => {
		const open = Boolean(activeVideo || activePhoto);
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeVideo, activePhoto]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setActiveVideo(null);
			setActivePhoto(null);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	if (photos.length === 0 && videos.length === 0) {
		return (
			<div className="rounded-3xl border border-dashed border-border bg-muted/30 p-10 text-center">
				<ImageIcon className="mx-auto size-10 text-muted-foreground/40" />
				<p className="mt-4 font-medium text-foreground">
					Pictures and videos coming soon
				</p>
				<p className="mt-1 text-sm text-muted-foreground">
					We&apos;ll share photos and recap videos here after the event.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-12">
			{photos.length > 0 && (
				<section>
					<div className="mb-6 flex items-end justify-between gap-4">
						<div>
							<Badge variant="soft" className="mb-2">
								<ImageIcon className="mr-1.5 size-3" />
								Photos
							</Badge>
							<h2 className="font-heading text-2xl font-semibold md:text-3xl">
								From this event
							</h2>
						</div>
						<p className="text-sm text-muted-foreground">
							{photos.length} {photos.length === 1 ? "photo" : "photos"}
						</p>
					</div>

					<div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
						{photos.map((photo) => (
							<button
								key={photo.id}
								type="button"
								onClick={() => setActivePhoto(photo)}
								className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl bg-muted text-left shadow-sm ring-1 ring-border/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
								aria-label={`Open photo: ${photo.title}`}
							>
								<Image
									src={photo.image}
									alt={photo.title}
									width={photo.width}
									height={photo.height}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
								<div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
									<span className="text-xs font-medium uppercase tracking-wider text-white/70">
										{photo.category}
									</span>
									<p className="mt-1 font-heading text-base font-medium text-white md:text-lg">
										{photo.title}
									</p>
								</div>
							</button>
						))}
					</div>
				</section>
			)}

			{videos.length > 0 && (
				<section>
					<div className="mb-6 flex items-end justify-between gap-4">
						<div>
							<Badge variant="soft" className="mb-2">
								<VideoIcon className="mr-1.5 size-3" />
								Videos
							</Badge>
							<h2 className="font-heading text-2xl font-semibold md:text-3xl">
								Watch the recap
							</h2>
						</div>
						<p className="text-sm text-muted-foreground">
							{videos.length} {videos.length === 1 ? "video" : "videos"}
						</p>
					</div>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{videos.map((video) => (
							<article
								key={video.id}
								className="group overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
							>
								<button
									type="button"
									onClick={() => setActiveVideo(video)}
									className="relative block w-full overflow-hidden text-left"
									aria-label={`Play video: ${video.title}`}
								>
									<div
										className={cn(
											"relative w-full overflow-hidden bg-muted",
											video.aspect === "tall" ? "aspect-[3/4]" : "aspect-video",
										)}
									>
										<Image
											src={video.thumbnail}
											alt={video.title}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
										<span className="absolute inset-0 flex items-center justify-center">
											<span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
												<Play className="ml-1 size-6 fill-primary" />
											</span>
										</span>
									</div>
								</button>

								<div className="p-4 md:p-5">
									<span className="text-xs font-medium uppercase tracking-wider text-primary">
										{video.category}
									</span>
									<h3 className="mt-1 font-heading text-base font-semibold text-foreground md:text-lg">
										{video.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										{video.description}
									</p>
								</div>
							</article>
						))}
					</div>
				</section>
			)}

			{activeVideo && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-label={activeVideo.title}
				>
					<button
						type="button"
						className="absolute inset-0 bg-black/80 backdrop-blur-sm"
						onClick={() => setActiveVideo(null)}
						aria-label="Close video"
					/>
					<div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
						<button
							type="button"
							onClick={() => setActiveVideo(null)}
							className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
							aria-label="Close video"
						>
							<X className="size-5" />
						</button>
						<div className="aspect-video w-full">
							<iframe
								src={getYoutubeEmbedUrl(activeVideo.youtubeId)}
								title={activeVideo.title}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="size-full"
							/>
						</div>
						<div className="border-t border-white/10 bg-foreground px-5 py-4">
							<p className="text-xs font-medium uppercase tracking-wider text-white/60">
								{activeVideo.category}
							</p>
							<p className="mt-1 font-heading text-lg font-semibold text-white">
								{activeVideo.title}
							</p>
						</div>
					</div>
				</div>
			)}

			{activePhoto && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
					role="dialog"
					aria-modal="true"
					aria-label={activePhoto.title}
				>
					<button
						type="button"
						className="absolute inset-0 bg-black/85 backdrop-blur-sm"
						onClick={() => setActivePhoto(null)}
						aria-label="Close photo"
					/>
					<div className="relative z-10 w-full max-w-5xl">
						<button
							type="button"
							onClick={() => setActivePhoto(null)}
							className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
							aria-label="Close photo"
						>
							<X className="size-5" />
						</button>
						<Image
							src={activePhoto.image}
							alt={activePhoto.title}
							width={activePhoto.width}
							height={activePhoto.height}
							sizes="100vw"
							className="h-auto max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
						/>
						<div className="mt-4 text-center">
							<p className="text-xs font-medium uppercase tracking-wider text-white/60">
								{activePhoto.category}
							</p>
							<p className="mt-1 font-heading text-lg font-semibold text-white">
								{activePhoto.title}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
