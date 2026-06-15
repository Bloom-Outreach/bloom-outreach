"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, UserPlus } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { AuthDivider } from "@/components/auth/auth-divider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { joinUsSchema, type JoinUsValues } from "@/lib/validation";

export function JoinUsForm() {
	const router = useRouter();
	const { signIn } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<JoinUsValues>({
		resolver: zodResolver(joinUsSchema),
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

	const onSubmit = handleSubmit(async (values) => {
		signIn(
			{
				id: `vol-${Date.now()}`,
				email: values.email,
				firstName: values.firstName,
				lastName: values.lastName,
			},
			{ isNewVolunteer: true },
		);
		router.push("/dashboard");
	});

	return (
		<Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
			<GoogleAuthButton mode="join" />

			<AuthDivider label="Or join with email" />

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
					id="join-us-email"
					placeholder="you@example.com"
					error={errors.email?.message}
					{...register("email")}
				/>

				<PasswordInput
					id="join-us-password"
					label="Password"
					placeholder="At least 8 characters"
					autoComplete="new-password"
					error={errors.password?.message}
					{...register("password")}
				/>

				<PasswordInput
					id="join-us-confirm-password"
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
							kindness, hope, and love.
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
							Joining...
							<Loader2 className="size-4 animate-spin" />
						</>
					) : (
						<>
							Join Us
							<UserPlus className="size-4" />
						</>
					)}
				</Button>
			</form>

			<AuthDivider label="Already part of the team?" />

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
