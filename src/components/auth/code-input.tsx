"use client";

import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function CodeInput({
  length = 6,
  value,
  onChange,
  id = "verification-code",
  disabled = false,
  className,
}: CodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const digits = value.padEnd(length, " ").split("").slice(0, length);

  function updateDigit(index: number, digit: string) {
    const next = digits.map((d, i) => (i === index ? digit : d.trim())).join("");
    onChange(next.slice(0, length));
  }

  function focusInput(index: number) {
    const clamped = Math.max(0, Math.min(index, length - 1));
    inputsRef.current[clamped]?.focus();
    setFocusedIndex(clamped);
  }

  function handleChange(index: number, nextValue: string) {
    const digit = nextValue.replace(/\D/g, "").slice(-1);
    updateDigit(index, digit);
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]?.trim()) {
        updateDigit(index, "");
      } else if (index > 0) {
        updateDigit(index - 1, "");
        focusInput(index - 1);
      }
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    focusInput(Math.min(pasted.length, length - 1));
  }

  return (
    <div
      role="group"
      aria-label="Verification code"
      className={cn("flex justify-center gap-2 sm:gap-3", className)}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          id={index === 0 ? id : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit.trim()}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          onFocus={() => setFocusedIndex(index)}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className={cn(
            "size-11 rounded-xl border border-input bg-background text-center text-lg font-semibold tabular-nums transition-colors sm:size-12 sm:text-xl",
            "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            focusedIndex === index && "border-primary/60",
          )}
        />
      ))}
    </div>
  );
}
