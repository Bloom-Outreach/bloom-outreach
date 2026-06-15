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
		>
			<SignUpForm />
		</AuthLayout>
	);
}
