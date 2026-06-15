"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { parseGoogleName } from "@/components/auth/google-auth-button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AuthCompleteClient() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { signIn } = useAuth();
	const [message, setMessage] = useState("Finishing sign-in...");

	useEffect(() => {
		let cancelled = false;

		async function completeAuth() {
			const mode = searchParams.get("mode") === "join" ? "join" : "signin";

			if (!isSupabaseConfigured()) {
				router.replace("/sign-in?error=auth");
				return;
			}

			try {
				const supabase = createClient();
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser();

				if (error || !user?.email) {
					throw new Error("Unable to load your Google account.");
				}

				const { firstName, lastName } = parseGoogleName(user.user_metadata);

				if (!cancelled) {
					signIn(
						{
							id: user.id,
							email: user.email,
							firstName,
							lastName,
						},
						{ isNewVolunteer: mode === "join" },
					);
					router.replace("/dashboard");
				}
			} catch {
				if (!cancelled) {
					setMessage("Something went wrong. Redirecting...");
					router.replace("/sign-in?error=auth");
				}
			}
		}

		void completeAuth();

		return () => {
			cancelled = true;
		};
	}, [router, searchParams, signIn]);

	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
			<Loader2 className="size-8 animate-spin text-primary" />
			<p className="text-sm text-muted-foreground">{message}</p>
		</div>
	);
}
