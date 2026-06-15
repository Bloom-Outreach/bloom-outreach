import { z } from "zod";
import { supportConfig } from "@/lib/support";
import {
	EVENT_ROLE_OPTIONS,
	EVENT_TOOL_OPTIONS,
	type EventRole,
	type EventToolId,
} from "@/lib/event-signups";

const VOLUNTEER_FOCUS_OPTIONS = [
	"Volunteer",
	"Clean",
	"Spread the Word",
] as const;

const trimmedString = (label: string, min = 1, max = 200) =>
	z
		.string({ message: `${label} is required` })
		.trim()
		.min(min, `${label} ${min === 1 ? "is required" : `must be at least ${min} characters`}`)
		.max(max, `${label} must be ${max} characters or fewer`);

export const emailSchema = z
	.string({ message: "Email is required" })
	.trim()
	.min(1, "Email is required")
	.email("Please enter a valid email address");

const passwordSchema = z
	.string({ message: "Password is required" })
	.min(8, "Password must be at least 8 characters")
	.max(72, "Password must be 72 characters or fewer");

const strongPasswordSchema = passwordSchema
	.regex(/[A-Za-z]/, "Password must include a letter")
	.regex(/\d/, "Password must include a number");

const phoneSchema = z
	.string()
	.trim()
	.min(7, "Please enter a valid phone number")
	.max(20, "Please enter a valid phone number")
	.regex(/^[+()\-\s\d]+$/, "Phone can only contain numbers, spaces, +, -, and parentheses");

const optionalPhoneSchema = z
	.string()
	.trim()
	.optional()
	.refine(
		(value) => !value || /^[+()\-\s\d]{7,20}$/.test(value),
		"Please enter a valid phone number",
	);

/* ---------- Auth ---------- */

export const signInSchema = z.object({
	email: emailSchema,
	password: z
		.string({ message: "Password is required" })
		.min(1, "Password is required"),
	remember: z.boolean().optional(),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
	.object({
		firstName: trimmedString("First name", 1, 60),
		lastName: trimmedString("Last name", 1, 60),
		email: emailSchema,
		password: strongPasswordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
		focus: z.enum(VOLUNTEER_FOCUS_OPTIONS, {
			message: "Pick how you'd like to serve",
		}),
		terms: z
			.boolean()
			.refine((value) => value === true, "Please agree before continuing"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords don't match",
	});

export type SignUpValues = z.infer<typeof signUpSchema>;

/** Volunteer account registration (Join Us page). */
export const joinUsSchema = signUpSchema;
export type JoinUsValues = SignUpValues;

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function makeVerifyCodeSchema(length = 6) {
	return z.object({
		code: z
			.string()
			.length(length, `Enter the ${length}-digit code we sent you`)
			.regex(/^\d+$/, "Code can only contain numbers"),
	});
}

export type VerifyCodeValues = z.infer<ReturnType<typeof makeVerifyCodeSchema>>;

export const resetPasswordSchema = z
	.object({
		password: strongPasswordSchema,
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords don't match",
	});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/* ---------- Contact ---------- */

export const contactFormSchema = z.object({
	firstName: trimmedString("First name", 1, 60),
	lastName: trimmedString("Last name", 1, 60),
	email: emailSchema,
	subject: trimmedString("Subject", 3, 120),
	message: trimmedString("Message", 10, 2000),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/* ---------- Settings ---------- */

export const settingsProfileSchema = z.object({
	firstName: trimmedString("First name", 1, 60),
	lastName: trimmedString("Last name", 1, 60),
	email: emailSchema,
	phone: optionalPhoneSchema,
	bio: z.string().trim().max(500, "Bio must be 500 characters or fewer").optional(),
});
export type SettingsProfileValues = z.infer<typeof settingsProfileSchema>;

/* ---------- Support / Donations ---------- */

export const MIN_DONATION_AMOUNT = 100;

const baseDonationSchema = z.object({
	firstName: trimmedString("First name", 1, 60),
	lastName: trimmedString("Last name", 1, 60),
	email: emailSchema,
	amount: z
		.number({ message: "Amount is required" })
		.int("Amount must be a whole number")
		.min(
			MIN_DONATION_AMOUNT,
			`Minimum amount is ${supportConfig.currencySymbol}${MIN_DONATION_AMOUNT}`,
		)
		.max(10_000_000, "Amount is too large"),
	note: z.string().trim().max(500, "Note must be 500 characters or fewer").optional(),
});

export const paystackDonationSchema = baseDonationSchema;
export type PaystackDonationValues = z.infer<typeof paystackDonationSchema>;

export const bankTransferSchema = baseDonationSchema.extend({
	phone: optionalPhoneSchema,
	reference: trimmedString("Reference", 2, 80),
});
export type BankTransferValues = z.infer<typeof bankTransferSchema>;

/* ---------- Event volunteer sign-up ---------- */

const toolIdSchema = z.enum(
	EVENT_TOOL_OPTIONS.map((tool) => tool.id) as [EventToolId, ...EventToolId[]],
);

export const eventVolunteerSignupSchema = z
	.object({
		name: trimmedString("Name", 2, 80),
		phone: phoneSchema,
		email: emailSchema,
		bringingGuests: z.boolean({ message: "Let us know if you're bringing guests" }),
		guestCount: z
			.number({ message: "Enter how many guests you're bringing" })
			.int("Guest count must be a whole number")
			.min(0, "Guest count can't be negative")
			.max(20, "Please contact us for groups larger than 20")
			.optional(),
		tools: z
			.array(toolIdSchema)
			.min(1, "Please select at least one tools option"),
		role: z
			.union([
				z.enum(EVENT_ROLE_OPTIONS as readonly [EventRole, ...EventRole[]]),
				z.literal(""),
			])
			.optional(),
		hearAbout: z
			.string()
			.trim()
			.max(120, "Keep this under 120 characters")
			.optional(),
	})
	.refine(
		(data) =>
			!data.bringingGuests ||
			(typeof data.guestCount === "number" && data.guestCount >= 1),
		{
			path: ["guestCount"],
			message: "Enter how many people you're bringing along",
		},
	);

export type EventVolunteerSignupValues = z.infer<typeof eventVolunteerSignupSchema>;
