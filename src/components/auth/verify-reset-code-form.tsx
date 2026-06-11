"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeInput } from "@/components/auth/code-input";

interface VerifyResetCodeFormProps {
  email: string;
}

const CODE_LENGTH = 6;

export function VerifyResetCodeForm({ email }: VerifyResetCodeFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <p className="mb-6 text-center text-sm text-muted-foreground">
        We sent a {CODE_LENGTH}-digit code to{" "}
        <span className="font-medium text-foreground">{email}</span>. Enter it
        below to reset your password.
      </p>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.length !== CODE_LENGTH) return;
          router.push("/reset-password");
        }}
      >
        <div>
          <label htmlFor="verification-code" className="mb-3 block text-center text-sm font-medium">
            Verification code
          </label>
          <CodeInput
            id="verification-code"
            length={CODE_LENGTH}
            value={code}
            onChange={setCode}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          disabled={code.length !== CODE_LENGTH}
        >
          Verify Code
          <ShieldCheck className="size-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          className="font-medium text-primary hover:underline"
          onClick={() => setCode("")}
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
