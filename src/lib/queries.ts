import { useQuery, useMutation } from "@tanstack/react-query";
import {
	fetchGallery,
	fetchImpactStats,
	submitContactForm,
	submitVolunteerForm,
	submitSupportForm,
	signUp,
	resendOtp,
	verifyEmail,
	login,
	forgotPassword,
	resendPasswordResetOtp,
	resetPassword,
	type ContactFormData,
	type VolunteerFormData,
	type SupportFormData,
	type SignUpData,
	type LoginData,
	type EmailOnlyData,
	type VerifyEmailData,
	type ResetPasswordData,
} from "@/lib/api";

// ── QUERY KEYS ────────────────────────────────────────────────────────────────

export const queryKeys = {
	gallery: ["gallery"] as const,
	impactStats: ["impact-stats"] as const,
};

// ── QUERIES ───────────────────────────────────────────────────────────────────

export function useGallery() {
	return useQuery({
		queryKey: queryKeys.gallery,
		queryFn: fetchGallery,
		staleTime: 1000 * 60 * 10,
	});
}

export function useImpactStats() {
	return useQuery({
		queryKey: queryKeys.impactStats,
		queryFn: fetchImpactStats,
		staleTime: 1000 * 60 * 30,
	});
}

// ── MUTATIONS ─────────────────────────────────────────────────────────────────

export function useContactForm() {
	return useMutation({
		mutationFn: (data: ContactFormData) => submitContactForm(data),
	});
}

export function useVolunteerSignUp() {
	return useMutation({
		mutationFn: (data: VolunteerFormData) => submitVolunteerForm(data),
	});
}

export function useSupportForm() {
	return useMutation({
		mutationFn: (data: SupportFormData) => submitSupportForm(data),
	});
}

// ── AUTH MUTATIONS ────────────────────────────────────────────────────────────

export function useSignUp() {
	return useMutation({
		mutationFn: (data: SignUpData) => signUp(data),
	});
}

export function useResendOtp() {
	return useMutation({
		mutationFn: (data: EmailOnlyData) => resendOtp(data),
	});
}

export function useVerifyEmail() {
	return useMutation({
		mutationFn: (data: VerifyEmailData) => verifyEmail(data),
	});
}

export function useLogin() {
	return useMutation({
		mutationFn: (data: LoginData) => login(data),
	});
}

export function useForgotPassword() {
	return useMutation({
		mutationFn: (data: EmailOnlyData) => forgotPassword(data),
	});
}

export function useResendPasswordResetOtp() {
	return useMutation({
		mutationFn: (data: EmailOnlyData) => resendPasswordResetOtp(data),
	});
}

export function useResetPassword() {
	return useMutation({
		mutationFn: (data: ResetPasswordData) => resetPassword(data),
	});
}
