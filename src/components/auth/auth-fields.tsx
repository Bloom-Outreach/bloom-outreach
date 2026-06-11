"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function PasswordInput({
  label,
  id,
  className,
  error,
  ref,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? "password";
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={inputId}
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("h-11 rounded-xl pl-10 pr-11", className)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface EmailInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function EmailInput({
  label = "Email",
  id,
  className,
  error,
  ref,
  ...props
}: EmailInputProps) {
  const inputId = id ?? "email";
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={inputId}
          ref={ref}
          type="email"
          autoComplete="email"
          className={cn("h-11 rounded-xl pl-10", className)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
