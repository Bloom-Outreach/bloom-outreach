import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your Bloom Outreach account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Create a new password for your volunteer account."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
