import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset code for your Bloom Outreach account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Forgot password?"
      description="Enter your email and we'll send a code to help you get back to serving."
      image={siteImages.auth.forgot}
      backHref="/sign-in"
      backLabel="Back to sign in"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
