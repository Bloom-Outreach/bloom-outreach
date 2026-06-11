"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/auth-fields";

export function ResetPasswordForm() {
  const router = useRouter();

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const password = String(formData.get("password") ?? "");
          const confirmPassword = String(formData.get("confirmPassword") ?? "");
          if (password !== confirmPassword) return;
          router.push("/sign-in");
        }}
      >
        <PasswordInput
          id="reset-password"
          name="password"
          label="New Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <PasswordInput
          id="reset-confirm-password"
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
          Reset Password
          <KeyRound className="size-4" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
            All set?
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
