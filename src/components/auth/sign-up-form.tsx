"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";
import { volunteerFocusOptions, type VolunteerRole } from "@/lib/mock-volunteer";
import { cn } from "@/lib/utils";

export function SignUpForm() {
  const router = useRouter();
  const [focus, setFocus] = useState<VolunteerRole>("Volunteer");

  return (
    <Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/profile");
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder="Sarah"
              className="h-11 rounded-xl"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              placeholder="Mitchell"
              className="h-11 rounded-xl"
              required
            />
          </div>
        </div>

        <EmailInput
          id="sign-up-email"
          name="email"
          placeholder="you@example.com"
          required
        />

        <PasswordInput
          id="sign-up-password"
          name="password"
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <div>
          <p className="mb-3 text-sm font-medium">How do you want to serve?</p>
          <div className="flex flex-wrap gap-2">
            {volunteerFocusOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFocus(option)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  focus === option
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <input type="hidden" name="focus" value={focus} />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="terms"
            className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
            required
          />
          <span>
            I agree to volunteer with Bloom Outreach and serve in accordance
            with our mission to love, serve, and share the gospel of Jesus.
          </span>
        </label>

        <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
          Create Account
          <UserPlus className="size-4" />
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
            Already a volunteer?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full text-base">
        <Link href="/sign-in">
          Sign In Instead
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
