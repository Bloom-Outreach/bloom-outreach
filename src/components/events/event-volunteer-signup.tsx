"use client";

import { useState } from "react";
import {
	AlertCircle,
	Award,
	Check,
	CheckCircle2,
	Hand,
	HeartPulse,
	Leaf,
	ScanFace,
	Shovel,
	Sparkles,
	Trash2,
	User,
	UserPlus,
	Users,
	Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UpcomingEvent } from "@/lib/constants";
import {
	addEventSignup,
	canCancelSignup,
	EVENT_ROLE_OPTIONS,
	EVENT_TOOL_OPTIONS,
	getLocalAttendanceCount,
	getSignupForEvent,
	getStoredVolunteerEmail,
	removeEventSignup,
	type EventRole,
	type EventSignup,
	type EventToolId,
} from "@/lib/event-signups";
import { cn } from "@/lib/utils";

type EventVolunteerSignupProps = {
	event: UpcomingEvent;
};

type FormState = {
	name: string;
	phone: string;
	email: string;
	bringingGuests: boolean | null;
	guestCount: string;
	tools: EventToolId[];
	role: EventRole | "";
	hearAbout: string;
};

const TOOL_ICONS: Record<EventToolId, LucideIcon> = {
	shovel: Shovel,
	rake: Leaf,
	"waste-bags": Trash2,
	gloves: Hand,
	"face-mask": ScanFace,
	"first-aid": HeartPulse,
	none: Sparkles,
};

const emptyForm = (): FormState => ({
	name: "",
	phone: "",
	email: "",
	bringingGuests: null,
	guestCount: "",
	tools: [],
	role: "",
	hearAbout: "",
});

type SignupViewState = {
	eventId: number;
	attendanceCount: number;
	myEmail: string | null;
	mySignup: EventSignup | undefined;
};

function loadSignupViewState(eventId: number): SignupViewState {
	const storedEmail = getStoredVolunteerEmail();
	return {
		eventId,
		attendanceCount: getLocalAttendanceCount(eventId),
		myEmail: storedEmail,
		mySignup: storedEmail ? getSignupForEvent(eventId, storedEmail) : undefined,
	};
}

function FormSection({
	title,
	icon: Icon,
	accent = "primary",
	className,
	children,
}: {
	title: string;
	icon: LucideIcon;
	accent?: "primary" | "green" | "gold";
	className?: string;
	children: React.ReactNode;
}) {
	const accentStyles = {
		primary: "bg-primary/10 text-primary ring-primary/20",
		green: "bg-bloom-green/10 text-bloom-green ring-bloom-green/20",
		gold: "bg-bloom-gold/12 text-bloom-gold-foreground ring-bloom-gold/25",
	};

	return (
		<div className={cn("space-y-4", className)}>
			<div className="flex w-full items-center gap-3">
				<span
					className={cn(
						"flex size-10 shrink-0 items-center justify-center rounded-2xl ring-1",
						accentStyles[accent],
					)}
				>
					<Icon className="size-4" strokeWidth={1.75} />
				</span>
				<h4 className="font-heading text-lg font-semibold leading-tight text-foreground">
					{title}
				</h4>
			</div>
			<div className="rounded-2xl border border-border/40 bg-background/70 p-4 shadow-sm backdrop-blur-sm md:p-5">
				{children}
			</div>
		</div>
	);
}

function FieldLabel({
	id,
	children,
	optional,
}: {
	id: string;
	children: React.ReactNode;
	optional?: boolean;
}) {
	return (
		<label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
			{children}
			{optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
		</label>
	);
}

export function EventVolunteerSignup({ event }: EventVolunteerSignupProps) {
	const [signupState, setSignupState] = useState(() => loadSignupViewState(event.id));
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState<FormState>(emptyForm());
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const refresh = () => {
		const next = loadSignupViewState(event.id);
		setSignupState(next);
		if (next.myEmail) {
			setForm((current) => ({ ...current, email: next.myEmail! }));
		}
	};

	if (signupState.eventId !== event.id) {
		const next = loadSignupViewState(event.id);
		setSignupState(next);
		if (next.myEmail) {
			setForm((current) => ({ ...current, email: next.myEmail! }));
		}
	}

	const { attendanceCount, myEmail, mySignup } = signupState;
	const isSignedUp = Boolean(mySignup);
	const totalPeople = event.volunteersSignedUp + attendanceCount;
	const cancelAllowed = canCancelSignup(event.date);

	const toggleTool = (toolId: EventToolId) => {
		setForm((current) => {
			if (toolId === "none") {
				return { ...current, tools: current.tools.includes("none") ? [] : ["none"] };
			}
			const withoutNone = current.tools.filter((t) => t !== "none");
			if (withoutNone.includes(toolId)) {
				return { ...current, tools: withoutNone.filter((t) => t !== toolId) };
			}
			return { ...current, tools: [...withoutNone, toolId] };
		});
	};

	const handleSignUp = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const name = form.name.trim();
		const phone = form.phone.trim();
		const email = form.email.trim();

		if (!name || !phone || !email) {
			setError("Please complete your personal info so we know you're coming.");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (form.bringingGuests === null) {
			setError("Please let us know if you're bringing anyone along.");
			return;
		}

		let guestCount = 0;
		if (form.bringingGuests) {
			const parsed = Number.parseInt(form.guestCount, 10);
			if (!parsed || parsed < 1) {
				setError("Please enter how many people you're bringing along.");
				return;
			}
			guestCount = parsed;
		}

		if (form.tools.length === 0) {
			setError("Please select at least one tools option.");
			return;
		}

		addEventSignup({
			eventId: event.id,
			name,
			phone,
			email,
			bringingGuests: form.bringingGuests,
			guestCount,
			tools: form.tools,
			role: form.role || undefined,
			hearAbout: form.hearAbout.trim() || undefined,
		});

		refresh();
		setShowForm(false);
		setSuccess("You're signed up! We'll count on you to serve with us.");
	};

	const handleCancel = () => {
		if (!myEmail) return;
		setError(null);
		setSuccess(null);

		if (!cancelAllowed) {
			setError(
				"Sign-ups can't be cancelled the day before an event. Please contact us if something urgent comes up.",
			);
			return;
		}

		const removed = removeEventSignup(event.id, myEmail);
		if (removed) {
			refresh();
			setForm(emptyForm());
			setSuccess("Your sign-up has been cancelled.");
		}
	};

	return (
		<div className="mt-auto space-y-4 border-t border-border/60 pt-5">
			<div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/8 via-secondary/50 to-bloom-green/8 px-4 py-3">
				<div className="bloom-pattern pointer-events-none absolute inset-0 opacity-30" />
				<div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
					<span className="flex items-center gap-2 font-medium text-foreground">
						<span className="flex size-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
							<Users className="size-4" />
						</span>
						<span>
							<span className="font-heading text-xl font-semibold text-primary">
								{totalPeople}
							</span>
							<span className="ml-1.5">Volunteers signed up</span>
						</span>
					</span>
				</div>
			</div>

			{error && (
				<p className="flex items-start gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					<AlertCircle className="mt-0.5 size-4 shrink-0" />
					{error}
				</p>
			)}

			{success && (
				<p className="flex items-start gap-2 rounded-2xl border border-bloom-green/25 bg-bloom-green/10 px-4 py-3 text-sm text-bloom-green">
					<CheckCircle2 className="mt-0.5 size-4 shrink-0" />
					{success}
				</p>
			)}

			{isSignedUp && mySignup ? (
				<div className="relative overflow-hidden rounded-3xl border border-bloom-green/25 bg-gradient-to-br from-bloom-green/8 to-card p-5 shadow-md shadow-bloom-green/5">
					<div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-bloom-green/15 blur-2xl" />
					<div
						className={cn(
							"relative flex items-center gap-3 rounded-2xl border border-bloom-green/20 bg-background/80 px-4 py-3 text-sm font-medium backdrop-blur-sm",
							"text-bloom-green",
						)}
					>
						<CheckCircle2 className="size-5 shrink-0" />
						You&apos;re signed up to serve at this event
					</div>
					<dl className="relative mt-4 space-y-3 text-sm">
						<div className="rounded-xl bg-background/60 px-4 py-3">
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Attendance
							</dt>
							<dd className="mt-1 font-medium text-foreground">
								{mySignup.bringingGuests
									? `You + ${mySignup.guestCount} guest${mySignup.guestCount === 1 ? "" : "s"}`
									: "Just you"}
							</dd>
						</div>
						<div className="rounded-xl bg-background/60 px-4 py-3">
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Tools
							</dt>
							<dd className="mt-1 font-medium text-foreground">
								{mySignup.tools
									.map(
										(id) =>
											EVENT_TOOL_OPTIONS.find((tool) => tool.id === id)
												?.label ?? id,
									)
									.join(", ")}
							</dd>
						</div>
						{mySignup.role && (
							<div className="rounded-xl bg-background/60 px-4 py-3">
								<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Role
								</dt>
								<dd className="mt-1 font-medium text-foreground">
									{mySignup.role}
								</dd>
							</div>
						)}
					</dl>
					<Button
						type="button"
						variant="outline"
						className="relative mt-4 w-full rounded-full sm:w-auto"
						disabled={!cancelAllowed}
						onClick={handleCancel}
					>
						Cancel my sign-up
					</Button>
					{!cancelAllowed && (
						<p className="relative mt-3 text-xs text-muted-foreground">
							Cancellation isn&apos;t available the day before the event. Reach out
							via Contact Us if you have an emergency.
						</p>
					)}
				</div>
			) : (
				<>
					{!showForm ? (
						<Button
							type="button"
							className="h-11 w-full rounded-full px-6 shadow-lg shadow-primary/20 sm:w-auto"
							onClick={() => {
								setShowForm(true);
								setError(null);
								setSuccess(null);
								if (myEmail) {
									setForm((current) => ({ ...current, email: myEmail }));
								}
							}}
						>
							<Sparkles className="size-4" />
							Sign up to serve
						</Button>
					) : (
						<form
							onSubmit={handleSignUp}
							className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-background to-secondary/30 p-5 shadow-lg shadow-primary/5 md:p-6"
						>
							<div className="bloom-pattern pointer-events-none absolute inset-0 opacity-[0.35]" />
							<div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-bloom-pink/20 blur-3xl" />
							<div className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-bloom-green/15 blur-3xl" />

							<div className="relative z-10 space-y-7">
								<div className="border-b border-border/50 pb-5">
									<p className="font-heading text-xl font-semibold text-foreground">
										Volunteer sign-up
									</p>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										Tell us you&apos;re coming so we can plan supplies and
										teams. You can cancel anytime except the day before the
										event.
									</p>
								</div>

								<FormSection
									title="Tools you're bringing"
									icon={Wrench}
									accent="gold"
									className="mt-8"
								>
									<div className="grid gap-2 sm:grid-cols-2">
										{EVENT_TOOL_OPTIONS.map((tool) => {
											const ToolIcon = TOOL_ICONS[tool.id];
											const selected = form.tools.includes(tool.id);
											return (
												<label
													key={tool.id}
													className={cn(
														"group flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all duration-200",
														selected
															? "border-bloom-gold/40 bg-bloom-gold/10 shadow-sm shadow-bloom-gold/10"
															: "border-border/60 bg-background/80 hover:border-bloom-gold/30 hover:bg-bloom-gold/5",
													)}
												>
													<input
														type="checkbox"
														className="sr-only"
														checked={selected}
														onChange={() => toggleTool(tool.id)}
													/>
													<span
														className={cn(
															"flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
															selected
																? "bg-bloom-gold/20 text-bloom-gold-foreground"
																: "bg-muted text-muted-foreground group-hover:bg-bloom-gold/15 group-hover:text-bloom-gold-foreground",
														)}
													>
														<ToolIcon
															className="size-4"
															strokeWidth={1.75}
														/>
													</span>
													<span className="min-w-0 flex-1 text-sm text-foreground leading-snug">
														{tool.label}
													</span>
													<span
														className={cn(
															"flex size-6 shrink-0 items-center justify-center rounded-full border transition-all",
															selected
																? "border-bloom-gold bg-bloom-gold text-white"
																: "border-border bg-background",
														)}
													>
														{selected && (
															<Check
																className="size-3.5"
																strokeWidth={3}
															/>
														)}
													</span>
												</label>
											);
										})}
									</div>
								</FormSection>

								{/* <FormSection
									title="Role / Skills"
									icon={Award}
									accent="primary"
									className="mt-8"
								>
									<FieldLabel id={`role-${event.id}`} optional>
										Select your role or skills
									</FieldLabel>
									<select
										id={`role-${event.id}`}
										value={form.role}
										onChange={(e) =>
											setForm({
												...form,
												role: e.target.value as EventRole | "",
											})
										}
										className="flex h-11 w-full rounded-xl border border-border/60 bg-background/90 px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
									>
										<option value="">Select a role (optional)</option>
										{EVENT_ROLE_OPTIONS.map((role) => (
											<option key={role} value={role}>
												{role}
											</option>
										))}
									</select>
								</FormSection> */}

								<div className="rounded-2xl border border-border/40 bg-background/70 p-4 backdrop-blur-sm md:p-5">
									<FieldLabel id={`hear-about-${event.id}`} optional>
										How did you hear about this event?
									</FieldLabel>
									<Input
										id={`hear-about-${event.id}`}
										value={form.hearAbout}
										onChange={(e) =>
											setForm({ ...form, hearAbout: e.target.value })
										}
										placeholder="Friend, church, social media…"
										className="h-11 rounded-xl border-border/60 bg-background/90"
									/>
								</div>

								<div className="flex flex-wrap gap-3 border-t border-border/50 pt-5">
									<Button
										type="submit"
										className="h-11 rounded-full px-6 shadow-lg shadow-primary/20"
									>
										<CheckCircle2 className="size-4" />
										Confirm I&apos;m coming
									</Button>
									<Button
										type="button"
										variant="outline"
										className="h-11 rounded-full px-6"
										onClick={() => {
											setShowForm(false);
											setForm(emptyForm());
											if (myEmail) {
												setForm((current) => ({
													...emptyForm(),
													email: myEmail,
												}));
											}
										}}
									>
										Cancel
									</Button>
								</div>
							</div>
						</form>
					)}
				</>
			)}
		</div>
	);
}
