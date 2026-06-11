import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your Bloom Outreach account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Almost done"
      title="Reset your password"
      description="Create a new password and get back to serving with the Bloom team."
      image={siteImages.auth.forgot}
      imagePosition="right"
      backHref="/sign-in"
      backLabel="Back to sign in"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
