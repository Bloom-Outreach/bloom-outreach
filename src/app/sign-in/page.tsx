import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/sign-in-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
	title: "Sign In",
	description: "Sign in to your Bloom Outreach volunteer account.",
};

export default function SignInPage() {
	return (
		<AuthLayout
			eyebrow="Welcome back"
			title="Sign in to Bloom"
			description="Sign in to Bloom
      Manage your profile, RSVP to upcoming outreaches, and stay connected with your community."
			image={siteImages.auth.signIn}
			imagePosition="left"
		>
			<SignInForm />
		</AuthLayout>
	);
}
