import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Sign Up",
	description: "Create your Bloom Outreach volunteer account and start serving.",
};

export default function SignUpPage() {
	return (
		<AuthLayout
			eyebrow="New here?"
			title="Join the Bloom Team"
			description="Create an account to volunteer, join cleanups, and spread the word with us."
			image={siteImages.auth.signUp}
			imagePosition="right"
			testimonial={{
				quote: "Bloom showed me that cleaning a street and sharing the gospel go hand in hand. Simple acts, eternal impact.",
				author: "David Okonkwo",
				role: "Volunteer & Witness",
			}}
		>
			<SignUpForm />
		</AuthLayout>
	);
}
