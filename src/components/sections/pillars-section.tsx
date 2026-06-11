import { Section, SectionHeader } from "@/components/ui/section";
import { MediaCard } from "@/components/ui/media-card";
import { FadeIn } from "@/components/motion/fade-in";
import { pillars } from "@/lib/constants";
import { siteImages } from "@/lib/images";

const pillarImages: Record<string, string> = {
	Volunteer: siteImages.pillars.volunteer,
	Clean: siteImages.pillars.clean,
	"Spread the Word": siteImages.pillars.spreadTheWord,
};

export function PillarsSection() {
	return (
		<Section id="what-we-do" className="bloom-pattern bg-muted/30">
			<SectionHeader
				eyebrow="What We Do"
				title="Volunteer. Clean. Spread the Word."
				description="Everything we do at Bloom Outreach comes down to three things — showing up to serve, cleaning our community, and sharing the gospel of Jesus Christ."
			/>

			<div className="grid gap-6 md:grid-cols-3 md:gap-8">
				{pillars.map((pillar, index) => (
					<FadeIn key={pillar.title} delay={index * 0.1}>
						<MediaCard
							image={pillarImages[pillar.title]}
							imageAlt={`${pillar.title} — Bloom Outreach`}
							eyebrow={pillar.category}
							title={pillar.title}
							description={pillar.description}
							sizes="(max-width: 768px) 100vw, 33vw"
							className="h-full"
						>
							<blockquote className="mt-4 border-t border-border/60 pt-4 text-sm italic leading-relaxed text-muted-foreground">
								&ldquo;{pillar.verse}&rdquo;
								<footer className="mt-1 not-italic text-xs font-medium text-primary">
									{pillar.reference}
								</footer>
							</blockquote>
						</MediaCard>
					</FadeIn>
				))}
			</div>
		</Section>
	);
}
