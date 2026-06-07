import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Bloom Outreach volunteer account.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to manage your profile, events, and volunteer activity."
    >
      <SignInForm />
    </AuthLayout>
  );
}
