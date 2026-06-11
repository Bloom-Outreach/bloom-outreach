"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";

export function SignInForm() {
  const router = useRouter();

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/profile");
        }}
      >
        <EmailInput
          id="sign-in-email"
          name="email"
          placeholder="you@example.com"
          required
        />

        <PasswordInput
          id="sign-in-password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-input accent-primary"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
          Sign In
          <LogIn className="size-4" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
            New to Bloom?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full text-base">
        <Link href="/sign-up">
          Create an Account
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
