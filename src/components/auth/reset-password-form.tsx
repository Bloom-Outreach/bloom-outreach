"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/auth-fields";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/validation";

export function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async () => {
    router.push("/sign-in");
  });

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <PasswordInput
          id="reset-password"
          label="New Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="reset-confirm-password"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Resetting...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Reset Password
              <KeyRound className="size-4" />
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
