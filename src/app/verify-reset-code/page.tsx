import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { VerifyResetCodeForm } from "@/components/auth/verify-reset-code-form";
import { siteImages } from "@/lib/images";

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
      eyebrow="One more step"
      title="Check your email"
      description="Enter the 6-digit verification code we sent to your inbox."
      image={siteImages.auth.forgot}
      backHref="/forgot-password"
      backLabel="Use a different email"
    >
      <VerifyResetCodeForm email={email} />
    </AuthLayout>
  );
}
