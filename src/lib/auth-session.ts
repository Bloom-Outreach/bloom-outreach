const SESSION_KEY = "bloom-auth-session";
const SESSION_COOKIE = "bloom-session";

export type AuthUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export type AuthSession = {
	user: AuthUser;
	signedInAt: string;
	isNewVolunteer?: boolean;
};

function readSession(): AuthSession | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(SESSION_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as AuthSession;
	} catch {
		return null;
	}
}

function writeCookie(active: boolean) {
	const maxAge = active ? 60 * 60 * 24 * 30 : 0;
	document.cookie = `${SESSION_COOKIE}=${active ? "1" : ""}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getAuthSession(): AuthSession | null {
	return readSession();
}

export function setAuthSession(
	user: AuthUser,
	options?: { isNewVolunteer?: boolean },
): AuthSession {
	const session: AuthSession = {
		user,
		signedInAt: new Date().toISOString(),
		isNewVolunteer: options?.isNewVolunteer,
	};
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	writeCookie(true);
	window.dispatchEvent(new Event("bloom-auth-change"));
	return session;
}

export function clearAuthSession() {
	localStorage.removeItem(SESSION_KEY);
	writeCookie(false);
	window.dispatchEvent(new Event("bloom-auth-change"));
}

export function getUserInitials(user: Pick<AuthUser, "firstName" | "lastName">) {
	const first = user.firstName.trim().charAt(0).toUpperCase();
	const last = user.lastName.trim().charAt(0).toUpperCase();
	return `${first}${last}` || "?";
}
