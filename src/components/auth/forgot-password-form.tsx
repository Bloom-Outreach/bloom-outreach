"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailInput } from "@/components/auth/auth-fields";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validation";

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`);
  });

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <EmailInput
          id="forgot-password-email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Sending code...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send Reset Code
              <Mail className="size-4" />
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
