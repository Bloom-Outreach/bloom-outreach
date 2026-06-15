"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { AuthDivider } from "@/components/auth/auth-divider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { EmailInput, PasswordInput } from "@/components/auth/auth-fields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockVolunteer } from "@/lib/mock-volunteer";
import { signInSchema, type SignInValues } from "@/lib/validation";

export function SignInForm() {
	const router = useRouter();
	const { signIn } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		mode: "onTouched",
		defaultValues: { email: "", password: "", remember: false },
	});

	const onSubmit = handleSubmit(async (values) => {
		signIn({
			id: mockVolunteer.id,
			email: values.email,
			firstName: mockVolunteer.firstName,
			lastName: mockVolunteer.lastName,
		});
		router.push("/dashboard");
	});

	return (
		<Card className="border-border/50 p-6 shadow-lg shadow-primary/5 sm:p-8">
			<GoogleAuthButton mode="signin" />

			<AuthDivider />

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

			<AuthDivider label="New to Bloom?" />

			<Button asChild variant="outline" size="lg" className="h-12 w-full rounded-full text-base">
				<Link href="/join-us">
					Join Us
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</Card>
	);
}
