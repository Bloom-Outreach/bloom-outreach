import { Suspense } from "react";
import AuthCompleteClient from "./auth-complete-client";

export default function AuthCompletePage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
					Finishing sign-in...
				</div>
			}
		>
			<AuthCompleteClient />
		</Suspense>
	);
}
