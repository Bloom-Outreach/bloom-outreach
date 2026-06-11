import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/components/sections/contact-form";
import { MapEmbed } from "@/components/ui/map-embed";
import { SocialLinks } from "@/components/layout/social-links";
import { siteConfig } from "@/lib/constants";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with Bloom Outreach. We'd love to hear from you about volunteering, support, or partnerships.",
};

const contactItems = [
	{
		icon: Mail,
		label: "Email",
		href: `mailto:${siteConfig.email}`,
		value: siteConfig.email,
	},
	{
		icon: Phone,
		label: "Phone",
		href: `tel:${siteConfig.phone.replace(/\D/g, "")}`,
		value: siteConfig.phone,
	},
] as const;

export default function ContactPage() {
	return (
		<>
			<PageHeader
				title="Contact Us"
				description="We'd love to hear from you. Whether you want to volunteer, support us, or simply learn more — reach out anytime."
				image={siteImages.pageHeaders.contact}
				eyebrow="Get In Touch"
			/>

			<Section>
				<div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
					<FadeIn className="lg:col-span-2">
						<Badge variant="soft" className="mb-4">
							Reach Out
						</Badge>
						<h2 className="font-heading text-3xl font-semibold md:text-4xl">
							Get in Touch
						</h2>
						<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
							Our team typically responds within 1–2 business days. For urgent
							outreach needs, please call us directly.
						</p>

						<ul className="mt-10 space-y-4">
							{contactItems.map((item) => {
								const Icon = item.icon;
								return (
									<li key={item.label}>
										<a
											href={item.href}
											className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
										>
											<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
												<Icon className="size-5" />
											</span>
											<span>
												<span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
													{item.label}
												</span>
												<span className="mt-0.5 block text-foreground transition-colors group-hover:text-primary">
													{item.value}
												</span>
											</span>
										</a>
									</li>
								);
							})}
							<li>
								<div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
									<div className="flex items-start gap-4 p-4">
										<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
											<MapPin className="size-5" />
										</span>
									</div>
								</div>
							</li>
						</ul>

						<div className="mt-8">
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Follow Us
							</h3>
							<SocialLinks variant="card" className="mt-4 flex-col sm:flex-row" />
						</div>
					</FadeIn>

					<FadeIn delay={0.1} className="lg:col-span-3">
						<ContactForm />
					</FadeIn>
				</div>
			</Section>
		</>
	);
}
