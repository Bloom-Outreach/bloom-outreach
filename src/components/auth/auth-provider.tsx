"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	type AuthSession,
	type AuthUser,
	clearAuthSession,
	getAuthSession,
	setAuthSession as persistSession,
} from "@/lib/auth-session";

type AuthContextValue = {
	session: AuthSession | null;
	isLoading: boolean;
	isSignedIn: boolean;
	user: AuthUser | null;
	signIn: (user: AuthUser, options?: { isNewVolunteer?: boolean }) => AuthSession;
	signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const refresh = useCallback(() => {
		setSession(getAuthSession());
		setIsLoading(false);
	}, []);

	useEffect(() => {
		refresh();
		const onChange = () => refresh();
		window.addEventListener("bloom-auth-change", onChange);
		window.addEventListener("storage", onChange);
		return () => {
			window.removeEventListener("bloom-auth-change", onChange);
			window.removeEventListener("storage", onChange);
		};
	}, [refresh]);

	const signIn = useCallback(
		(user: AuthUser, options?: { isNewVolunteer?: boolean }) => {
			const next = persistSession(user, options);
			setSession(next);
			setIsLoading(false);
			return next;
		},
		[],
	);

	const signOut = useCallback(() => {
		clearAuthSession();
		setSession(null);
	}, []);

	const value = useMemo(
		() => ({
			session,
			isLoading,
			isSignedIn: Boolean(session),
			user: session?.user ?? null,
			signIn,
			signOut,
		}),
		[session, isLoading, signIn, signOut],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
