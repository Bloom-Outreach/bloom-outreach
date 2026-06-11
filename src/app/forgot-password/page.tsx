import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset code for your Bloom Outreach account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot password?"
      description="Enter your email and we'll send you a code to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
