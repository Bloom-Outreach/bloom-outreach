"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeInput } from "@/components/auth/code-input";
import { FieldError } from "@/components/ui/field-error";
import {
  makeVerifyCodeSchema,
  type VerifyCodeValues,
} from "@/lib/validation";

interface VerifyResetCodeFormProps {
  email: string;
}

const CODE_LENGTH = 6;
const schema = makeVerifyCodeSchema(CODE_LENGTH);

export function VerifyResetCodeForm({ email }: VerifyResetCodeFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VerifyCodeValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { code: "" },
  });

  const code = useWatch({ control, name: "code" });

  const onSubmit = handleSubmit(async () => {
    router.push("/reset-password");
  });

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <p className="mb-6 text-center text-sm text-muted-foreground">
        We sent a {CODE_LENGTH}-digit code to{" "}
        <span className="font-medium text-foreground">{email}</span>. Enter it
        below to reset your password.
      </p>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="verification-code"
            className="mb-3 block text-center text-sm font-medium"
          >
            Verification code
          </label>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <CodeInput
                id="verification-code"
                length={CODE_LENGTH}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div className="mt-2 flex justify-center">
            <FieldError message={errors.code?.message} />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={isSubmitting || code.length !== CODE_LENGTH}
        >
          {isSubmitting ? (
            <>
              Verifying...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Verify Code
              <ShieldCheck className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          className="font-medium text-primary hover:underline"
          onClick={() => reset({ code: "" })}
        >
          Resend code
        </button>
      </p>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
            Wrong email?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full text-base">
        <Link href="/forgot-password">
          Try a Different Email
          <ArrowLeft className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
