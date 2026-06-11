import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { VerifyResetCodeForm } from "@/components/auth/verify-reset-code-form";

export const metadata: Metadata = {
  title: "Check Your Email",
  description: "Enter the verification code sent to your email to reset your password.",
};

export default async function VerifyResetCodePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email : "";

  if (!email) {
    redirect("/forgot-password");
  }

  return (
    <AuthLayout
      title="Check your email"
      description="Enter the verification code we sent to your inbox."
    >
      <VerifyResetCodeForm email={email} />
    </AuthLayout>
  );
}
