"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";

import { signUpSchema, type SignUpValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

export function SignUpForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		mode: "onTouched",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			focus: "Volunteer",
			terms: false,
		},
	});

	const onSubmit = handleSubmit(async () => {
		router.push("/profile");
	});

	return (
		<Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
			<form className="space-y-5" onSubmit={onSubmit} noValidate>
				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label htmlFor="firstName" className="mb-2 block text-sm font-medium">
							First Name
						</label>
						<Input
							id="firstName"
							autoComplete="given-name"
							placeholder="Sarah"
							className="h-11 rounded-xl"
							aria-invalid={Boolean(errors.firstName)}
							{...register("firstName")}
						/>
						<FieldError message={errors.firstName?.message} />
					</div>
					<div>
						<label htmlFor="lastName" className="mb-2 block text-sm font-medium">
							Last Name
						</label>
						<Input
							id="lastName"
							autoComplete="family-name"
							placeholder="Mitchell"
							className="h-11 rounded-xl"
							aria-invalid={Boolean(errors.lastName)}
							{...register("lastName")}
						/>
						<FieldError message={errors.lastName?.message} />
					</div>
				</div>

				<EmailInput
					id="sign-up-email"
					placeholder="you@example.com"
					error={errors.email?.message}
					{...register("email")}
				/>

				<PasswordInput
					id="sign-up-password"
					label="Password"
					placeholder="At least 8 characters"
					autoComplete="new-password"
					error={errors.password?.message}
					{...register("password")}
				/>

				<PasswordInput
					id="confirm-password"
					label="Confirm Password"
					placeholder="Re-enter your password"
					autoComplete="new-password"
					error={errors.confirmPassword?.message}
					{...register("confirmPassword")}
				/>

				<div>
					<label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
						<input
							type="checkbox"
							className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
							aria-invalid={Boolean(errors.terms)}
							{...register("terms")}
						/>
						<span>
							I agree to volunteer with Bloom Outreach and serve our community with
							kindness, hope, and love..
						</span>
					</label>
					<FieldError message={errors.terms?.message} />
				</div>

				<Button
					type="submit"
					size="lg"
					className="h-12 w-full rounded-full text-base"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>
							Creating account...
							<Loader2 className="size-4 animate-spin" />
						</>
					) : (
						<>
							Create Account
							<UserPlus className="size-4" />
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
						Already a volunteer?
					</span>
				</div>
			</div>

			<Button
				asChild
				variant="outline"
				size="lg"
				className="h-12 w-full rounded-full text-base"
			>
				<Link href="/sign-in">
					Sign In Instead
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</Card>
	);
}
