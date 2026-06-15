import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isProtected = protectedPaths.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`),
	);

	if (!isProtected) {
		return NextResponse.next();
	}

	const hasSession = request.cookies.get("bloom-session")?.value === "1";

	if (!hasSession) {
		const signInUrl = new URL("/sign-in", request.url);
		signInUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
