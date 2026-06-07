import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Bloom Outreach volunteer account and start serving.",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Join the team"
      description="Create your account to volunteer, join cleanups, and spread the word with us."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
