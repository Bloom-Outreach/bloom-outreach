import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { JoinUsForm } from "@/components/auth/join-us-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Join Us",
	description: "Join Bloom Outreach as a volunteer — create your account and start serving.",
};

export default function JoinUsPage() {
	return (
		<AuthLayout
			eyebrow="New here?"
			title="Join the Bloom Team"
			description="Create your volunteer account to RSVP to outreaches, track your streak, and serve with us."
			image={siteImages.auth.joinUs}
			imagePosition="right"
		>
			<JoinUsForm />
		</AuthLayout>
	);
}
