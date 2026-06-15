import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/auth/complete";
	const mode = searchParams.get("mode") ?? "signin";
	const authError = searchParams.get("error_description") ?? searchParams.get("error");

	if (authError) {
		return NextResponse.redirect(
			`${origin}/sign-in?error=${encodeURIComponent(authError)}`,
		);
	}

	if (!code || !isSupabaseConfigured()) {
		return NextResponse.redirect(`${origin}/sign-in?error=auth`);
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		return NextResponse.redirect(`${origin}/sign-in?error=auth`);
	}

	const redirectUrl = new URL(next, origin);
	redirectUrl.searchParams.set("mode", mode);
	return NextResponse.redirect(redirectUrl.toString());
}
