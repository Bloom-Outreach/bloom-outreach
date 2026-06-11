"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailInput } from "@/components/auth/auth-fields";

export function ForgotPasswordForm() {
  const router = useRouter();

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = String(formData.get("email") ?? "");
          router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`);
        }}
      >
        <EmailInput
          id="forgot-password-email"
          name="email"
          placeholder="you@example.com"
          required
        />

        <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
          Send Reset Code
          <Mail className="size-4" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
            Remember your password?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full text-base">
        <Link href="/sign-in">
          Back to Sign In
          <ArrowLeft className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
