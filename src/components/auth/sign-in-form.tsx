"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";
import { signInSchema, type SignInValues } from "@/lib/validation";

export function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = handleSubmit(async () => {
    router.push("/profile");
  });

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <EmailInput
          id="sign-in-email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="sign-in-password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 rounded border-input accent-primary"
              {...register("remember")}
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

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Signing in...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Sign In
              <LogIn className="size-4" />
            </>
          )}
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
