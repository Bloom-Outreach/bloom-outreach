const BASE_URL = (
	process.env.NEXT_PUBLIC_API_URL ?? "https://bloom-outreach-server.onrender.com/api/v1"
).replace(/\/$/, "");

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export interface VolunteerFormData {
	name: string;
	email: string;
	phone: string;
	available: boolean;
	contribution?: string;
}

export interface SupportFormData {
	name: string;
	email: string;
	type: "financial" | "equipment" | "skills" | "prayer";
	message?: string;
}

export interface GalleryItem {
	id: string;
	src: string;
	alt: string;
	caption?: string;
	date?: string;
	event?: string;
}

export interface ImpactStat {
	id: string;
	value: string;
	label: string;
}

export interface ApiResponse<T = null> {
	success: boolean;
	data?: T;
	error?: string;
}

export interface SignUpData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	focus?: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface EmailOnlyData {
	email: string;
}

export interface VerifyEmailData {
	email: string;
	otp: string;
}

export interface ResetPasswordData {
	email: string;
	otp: string;
	password: string;
}

export interface AuthUser {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
}

export interface AuthSession {
	accessToken?: string;
	refreshToken?: string;
	user?: AuthUser;
}

// ── BASE FETCH UTILITY ────────────────────────────────────────────────────────

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, {
			headers: {
				"Content-Type": "application/json",
				...options?.headers,
			},
			...options,
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || `Request failed with status ${res.status}`);
		}

		return { success: true, data };
	} catch (error) {
		const message = error instanceof Error ? error.message : "Something went wrong";
		return { success: false, error: message };
	}
}

function apiPost<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
	return apiFetch<T>(endpoint, {
		method: "POST",
		body: JSON.stringify(body),
	});
}

// ── AUTH ──────────────────────────────────────────────────────────────────────

export async function signUp(data: SignUpData): Promise<ApiResponse<AuthSession>> {
	return apiPost<AuthSession>("/user/auth/sign-up", data);
}

export async function resendOtp(data: EmailOnlyData): Promise<ApiResponse> {
	return apiPost("/user/auth/resend-otp", data);
}

export async function verifyEmail(data: VerifyEmailData): Promise<ApiResponse<AuthSession>> {
	return apiPost<AuthSession>("/user/auth/verify-email", data);
}

export async function login(data: LoginData): Promise<ApiResponse<AuthSession>> {
	return apiPost<AuthSession>("/user/auth/login", data);
}

export async function forgotPassword(data: EmailOnlyData): Promise<ApiResponse> {
	return apiPost("/user/auth/forgot-password", data);
}

export async function resendPasswordResetOtp(data: EmailOnlyData): Promise<ApiResponse> {
	return apiPost("/user/auth/resend-password-reset-otp", data);
}

export async function resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
	return apiPost("/user/auth/reset-password", data);
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
	return apiFetch("/contact", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

// ── VOLUNTEER ─────────────────────────────────────────────────────────────────

export async function submitVolunteerForm(data: VolunteerFormData): Promise<ApiResponse> {
	return apiFetch("/volunteer", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

// ── SUPPORT ───────────────────────────────────────────────────────────────────

export async function submitSupportForm(data: SupportFormData): Promise<ApiResponse> {
	return apiFetch("/support", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

// ── GALLERY ───────────────────────────────────────────────────────────────────

export async function fetchGallery(): Promise<ApiResponse<GalleryItem[]>> {
	return apiFetch<GalleryItem[]>("/gallery");
}

// ── IMPACT STATS ──────────────────────────────────────────────────────────────

export async function fetchImpactStats(): Promise<ApiResponse<ImpactStat[]>> {
	return apiFetch<ImpactStat[]>("/stats");
}
