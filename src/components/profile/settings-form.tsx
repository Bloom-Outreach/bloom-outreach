"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Bell,
	CheckCircle2,
	Loader2,
	Lock,
	LogOut,
	Mail,
	Phone,
	Save,
	Shield,
	User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/ui/field-error";
import { mockVolunteer, volunteerFocusOptions, type VolunteerRole } from "@/lib/mock-volunteer";
import { settingsProfileSchema, type SettingsProfileValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

function Toggle({
	enabled,
	onChange,
	label,
	description,
}: {
	enabled: boolean;
	onChange: (value: boolean) => void;
	label: string;
	description?: string;
}) {
	return (
		<div className="flex items-start justify-between gap-4">
			<div>
				<p className="font-medium text-foreground">{label}</p>
				{description && (
					<p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			<button
				type="button"
				role="switch"
				aria-checked={enabled}
				onClick={() => onChange(!enabled)}
				className={cn(
					"relative inline-flex h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
					enabled ? "bg-primary" : "bg-muted",
				)}
			>
				<span
					className={cn(
						"absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200",
						enabled ? "translate-x-5" : "translate-x-0.5",
					)}
				/>
			</button>
		</div>
	);
}

export function SettingsForm() {
	const v = mockVolunteer;
	const [focus, setFocus] = useState<VolunteerRole>(v.focus);
	const [notifications, setNotifications] = useState<{
		emailEvents: boolean;
		emailReminders: boolean;
		emailNewsletter: boolean;
		smsReminders: boolean;
	}>({
		emailEvents: v.preferences.emailEvents,
		emailReminders: v.preferences.emailReminders,
		emailNewsletter: v.preferences.emailNewsletter,
		smsReminders: v.preferences.smsReminders,
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
		reset,
	} = useForm<SettingsProfileValues>({
		resolver: zodResolver(settingsProfileSchema),
		mode: "onTouched",
		defaultValues: {
			firstName: v.firstName,
			lastName: v.lastName,
			email: v.email,
			phone: v.phone ?? "",
			bio: v.bio ?? "",
		},
	});

	const onSubmit = handleSubmit(async (values) => {
		await new Promise((resolve) => setTimeout(resolve, 600));
		reset(values, { keepValues: true });
	});

	return (
		<form className="space-y-8" onSubmit={onSubmit} noValidate>
			<Card>
				<div className="mb-6 flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<User className="size-5" />
					</span>
					<div>
						<h3 className="font-heading text-lg font-semibold">Personal Information</h3>
						<p className="text-sm text-muted-foreground">
							Update your name and contact details.
						</p>
					</div>
				</div>

				{isSubmitSuccessful && !isDirty && (
					<p className="mb-5 flex items-start gap-2 rounded-2xl border border-bloom-green/25 bg-bloom-green/10 px-4 py-3 text-sm text-bloom-green">
						<CheckCircle2 className="mt-0.5 size-4 shrink-0" />
						Your changes have been saved.
					</p>
				)}

				<div className="space-y-5">
					<div className="grid gap-5 sm:grid-cols-2">
						<div>
							<label htmlFor="firstName" className="mb-2 block text-sm font-medium">
								First Name
							</label>
							<Input
								id="firstName"
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
								className="h-11 rounded-xl"
								aria-invalid={Boolean(errors.lastName)}
								{...register("lastName")}
							/>
							<FieldError message={errors.lastName?.message} />
						</div>
					</div>
					<div>
						<label htmlFor="email" className="mb-2 block text-sm font-medium">
							Email
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="email"
								type="email"
								className="h-11 rounded-xl pl-10"
								aria-invalid={Boolean(errors.email)}
								{...register("email")}
							/>
						</div>
						<FieldError message={errors.email?.message} />
					</div>
					<div>
						<label htmlFor="phone" className="mb-2 block text-sm font-medium">
							Phone{" "}
							<span className="font-normal text-muted-foreground">(optional)</span>
						</label>
						<div className="relative">
							<Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="phone"
								type="tel"
								className="h-11 rounded-xl pl-10"
								aria-invalid={Boolean(errors.phone)}
								{...register("phone")}
							/>
						</div>
						<FieldError message={errors.phone?.message} />
					</div>
					<div>
						<label htmlFor="bio" className="mb-2 block text-sm font-medium">
							Bio{" "}
							<span className="font-normal text-muted-foreground">(optional)</span>
						</label>
						<Textarea
							id="bio"
							className="min-h-[100px] rounded-xl"
							aria-invalid={Boolean(errors.bio)}
							{...register("bio")}
						/>
						<FieldError message={errors.bio?.message} />
					</div>
				</div>
			</Card>

			{/* <Card>
				<div className="mb-6 flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-xl bg-bloom-green/10 text-bloom-green">
						<Shield className="size-5" />
					</span>
					<div>
						<h3 className="font-heading text-lg font-semibold">Volunteer Focus</h3>
						<p className="text-sm text-muted-foreground">
							How do you primarily serve with Bloom Outreach?
						</p>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					{volunteerFocusOptions.map((option) => (
						<button
							key={option}
							type="button"
							onClick={() => setFocus(option)}
							className={cn(
								"rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
								focus === option
									? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
									: "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
							)}
						>
							{option}
						</button>
					))}
				</div>
			</Card> */}

			<Card>
				<div className="mb-6 flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-xl bg-bloom-gold/12 text-bloom-gold-foreground">
						<Bell className="size-5" />
					</span>
					<div>
						<h3 className="font-heading text-lg font-semibold">Notifications</h3>
						<p className="text-sm text-muted-foreground">
							Choose how you hear from us about events and outreach.
						</p>
					</div>
				</div>

				<div className="divide-y divide-border/60">
					<div className="pb-5">
						<Toggle
							enabled={notifications.emailEvents}
							onChange={(value) =>
								setNotifications((n) => ({ ...n, emailEvents: value }))
							}
							label="Event updates"
							description="New cleanup days, volunteer orientations, and outreach events."
						/>
					</div>
					<div className="py-5">
						<Toggle
							enabled={notifications.emailReminders}
							onChange={(value) =>
								setNotifications((n) => ({ ...n, emailReminders: value }))
							}
							label="Event reminders"
							description="Reminders 24 hours before events you've signed up for."
						/>
					</div>
					<div className="py-5">
						<Toggle
							enabled={notifications.emailNewsletter}
							onChange={(value) =>
								setNotifications((n) => ({ ...n, emailNewsletter: value }))
							}
							label="Bloom newsletter"
							description="Monthly stories, impact updates, and volunteer highlights."
						/>
					</div>
				</div>
			</Card>

			<Card>
				<div className="mb-6 flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
						<Lock className="size-5" />
					</span>
					<div>
						<h3 className="font-heading text-lg font-semibold">Account</h3>
						<p className="text-sm text-muted-foreground">
							Manage your password and session.
						</p>
					</div>
				</div>

				<div className="space-y-4">
					<Button type="button" variant="outline" className="rounded-full">
						Change Password
					</Button>
					<div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
						<p className="text-sm font-medium text-foreground">Sign out</p>
						<p className="mt-1 text-sm text-muted-foreground">
							End your session on this device.
						</p>
						<Button
							type="button"
							variant="outline"
							className="mt-4 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
						>
							<LogOut className="size-4" />
							Sign Out
						</Button>
					</div>
				</div>
			</Card>

			<div className="flex justify-end">
				<Button
					type="submit"
					size="lg"
					className="rounded-full px-8"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>
							Saving...
							<Loader2 className="size-4 animate-spin" />
						</>
					) : (
						<>
							<Save className="size-4" />
							Save Changes
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
