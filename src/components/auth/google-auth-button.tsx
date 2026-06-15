"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

type GoogleAuthMode = "signin" | "join";

interface GoogleAuthButtonProps {
	mode: GoogleAuthMode;
	className?: string;
}

function parseGoogleName(metadata: Record<string, unknown> | undefined) {
	const fullName =
		(typeof metadata?.full_name === "string" && metadata.full_name) ||
		(typeof metadata?.name === "string" && metadata.name) ||
		"";

	if (fullName) {
		const parts = fullName.trim().split(/\s+/);
		return {
			firstName: parts[0] ?? "Volunteer",
			lastName: parts.slice(1).join(" ") || "Member",
		};
	}

	return {
		firstName:
			(typeof metadata?.given_name === "string" && metadata.given_name) || "Volunteer",
		lastName:
			(typeof metadata?.family_name === "string" && metadata.family_name) || "Member",
	};
}

export function GoogleAuthButton({ mode, className }: GoogleAuthButtonProps) {
	const router = useRouter();
	const { signIn } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const label = mode === "join" ? "Join Us with Google" : "Continue with Google";

	async function handleGoogleAuth() {
		setError(null);
		setLoading(true);

		try {
			if (isSupabaseConfigured()) {
				const supabase = createClient();
				const redirectTo = new URL("/auth/callback", window.location.origin);
				redirectTo.searchParams.set("mode", mode);
				redirectTo.searchParams.set("next", "/auth/complete");

				const { error: oauthError } = await supabase.auth.signInWithOAuth({
					provider: "google",
					options: {
						redirectTo: redirectTo.toString(),
						queryParams: {
							access_type: "offline",
							prompt: "consent",
						},
					},
				});

				if (oauthError) {
					throw oauthError;
				}

				return;
			}

			// Demo fallback when Supabase env vars are not configured yet.
			signIn(
				{
					id: `google-${Date.now()}`,
					email: "volunteer@gmail.com",
					firstName: "Alex",
					lastName: "Johnson",
				},
				{ isNewVolunteer: mode === "join" },
			);
			router.push("/dashboard");
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
			setError(message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className={cn("space-y-3", className)}>
			<Button
				type="button"
				variant="outline"
				size="lg"
				className="h-12 w-full rounded-full border-border/70 bg-background text-base hover:bg-muted/60"
				disabled={loading}
				onClick={handleGoogleAuth}
			>
				{loading ? (
					<>
						Connecting...
						<Loader2 className="size-4 animate-spin" />
					</>
				) : (
					<>
						<GoogleIcon className="size-5" />
						{label}
					</>
				)}
			</Button>
			{error ? <p className="text-center text-sm text-destructive">{error}</p> : null}
		</div>
	);
}

export { parseGoogleName };
