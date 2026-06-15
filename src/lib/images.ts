/**
 * Curated Bloom-themed imagery from Unsplash.
 *
 * Every image used across the site flows through this module so the visual
 * story stays consistent with Bloom's mission: volunteering, cleaning, and
 * spreading the word of Jesus.
 *
 * Photo IDs come from stable Unsplash photos. Swap any entry below to replace
 * an image everywhere in the app at once.
 */

/** Build a stable Unsplash URL with sensible cropping defaults. */
export function unsplash(photoId: string, width: number, height: number) {
	const safeW = Math.max(1, Math.round(width));
	const safeH = Math.max(1, Math.round(height));
	return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${safeW}&h=${safeH}&q=80`;
}

/* ───────── Theme libraries ─────────
 * Grouped by what Bloom is about so the picker (`picsum`) and `siteImages`
 * pull from on-theme photos rather than random placeholders.
 */

/** Volunteers serving together. */
const VOLUNTEERING = [
	"1559027615-cd4628902d4a", // hands stacked together
	"1469571486292-0ba58a3f068b", // volunteers in autumn park
	"1488521787991-ed7bbaae773c", // diverse hands joining
	"1593113598332-cd288d649433", // volunteers gathering supplies
	"1582213782179-e0d53f98f2ca", // volunteers in vests
	"1542838132-92c53300491e", // teamwork outdoors
	"1593113616828-6f22bca04804", // donation drive
	"1607113761670-c1f3c6ce6d54", // volunteer crew planning
] as const;

/** Cleaning the neighborhood. */
const CLEANING = [
	"1604187355105-ea2acbe44b0e", // park clean-up crew
	"1572177812156-58036aae439c", // bag of collected litter
	"1611273426858-450d8e3c9fce", // sweeping the streets
	"1611273426858-450d8e3c9fce", // path being cleared
	"1542838132-92c53300491e", // street cleaners at sunrise
	"1542621334-a254cf47733d", // outdoor sweep
] as const;

/** Sharing the gospel and prayer. */
const GOSPEL = [
	"1438232992991-995b7058bbb3", // open bible
	"1507692049790-de58290a4334", // hands in prayer
	"1492321936769-b49830bc1d1e", // sun rays / hope
	"1490127252417-7c393f993ee4", // cross at dawn
	"1518837695005-2083093ee35b", // ocean horizon (peace)
	"1518609878373-06d740f60d8b", // worship gathering
] as const;

/** Community life — faces, fellowship, joy. */
const COMMUNITY = [
	"1529156069898-49953e39b3ac", // friends laughing
	"1521791136064-7986c2920216", // group meeting
	"1511632765486-a01980e01a18", // diverse group portrait
	"1517457373958-b7bdd4587205", // candle/community
	"1559027615-cd4628902d4a", // hands together
	"1556761175-5973dc0f32e7", // city neighborhood
] as const;

/**
 * Backwards-compatible picker used throughout the codebase. The numeric `id`
 * is deterministically hashed onto one of the curated photo banks so existing
 * call sites get on-theme imagery without per-site changes.
 */
export function picsum(id: number, width: number, height: number) {
	const banks = [VOLUNTEERING, CLEANING, COMMUNITY, GOSPEL] as const;
	const bank = banks[Math.abs(id) % banks.length];
	const photoId = bank[Math.abs(id) % bank.length];
	return unsplash(photoId, width, height);
}

/** Direct theme accessor for when a specific Bloom theme is required. */
export const bloomPhotos = {
	volunteer: (i: number, w: number, h: number) =>
		unsplash(VOLUNTEERING[Math.abs(i) % VOLUNTEERING.length], w, h),
	clean: (i: number, w: number, h: number) =>
		unsplash(CLEANING[Math.abs(i) % CLEANING.length], w, h),
	gospel: (i: number, w: number, h: number) =>
		unsplash(GOSPEL[Math.abs(i) % GOSPEL.length], w, h),
	community: (i: number, w: number, h: number) =>
		unsplash(COMMUNITY[Math.abs(i) % COMMUNITY.length], w, h),
};

export const siteImages = {
	hero: {
		src: unsplash(VOLUNTEERING[0], 1600, 1200),
		alt: "Volunteers gathered to serve their community",
		width: 1600,
		height: 1200,
	},
	mission: {
		src: unsplash(VOLUNTEERING[2], 1200, 900),
		alt: "Volunteers joining hands to serve",
		width: 1200,
		height: 900,
	},
	cta: {
		src: unsplash(COMMUNITY[1], 1600, 900),
		alt: "Bloom Outreach volunteer team",
		width: 1600,
		height: 900,
	},
	aboutStory: {
		src: "/images/resend-code/reset-password.webp",
		alt: "Bloom volunteers cleaning a public park",
		width: 1200,
		height: 900,
	},
	aboutCommunity: {
		src: unsplash(VOLUNTEERING[1], 1200, 800),
		alt: "Volunteers serving outdoors together",
		width: 1200,
		height: 800,
	},
	auth: {
		signIn: {
			src: "/images/hero/bloom-volunteer.webp",
			alt: "Bloom Outreach volunteers serving their community",
			width: 1365,
			height: 910,
		},
		signUp: {
			src: "/images/sign-up/sign-up.webp",
			alt: "Hands joined together in volunteer service",
			width: 1535,
			height: 1024,
		},
		forgot: {
			src: "/images/forgot-password/forget-password.webp",
			alt: "Light breaking through — a sign of hope",
			width: 1600,
			height: 2000,
		},
	},
	pageHeaders: {
		about: "/images/resend-code/reset-password.webp",
		getInvolved: unsplash(VOLUNTEERING[5], 1600, 900),
		support: unsplash(COMMUNITY[1], 1600, 900),
		gallery: unsplash(CLEANING[0], 1600, 900),
		videos: unsplash(COMMUNITY[0], 1600, 900),
		contact: unsplash(GOSPEL[2], 1600, 900),
		calendar: "/images/event/events.webp",
		profile: unsplash(VOLUNTEERING[1], 1600, 900),
		default: unsplash(VOLUNTEERING[0], 1600, 900),
	},
	pillars: {
		volunteer: unsplash(VOLUNTEERING[0], 800, 600),
		clean: unsplash(CLEANING[0], 800, 600),
		spreadTheWord: unsplash(GOSPEL[0], 800, 600),
	},
} as const;

export const media = {
	involvement: {
		volunteer: unsplash(VOLUNTEERING[0], 800, 600),
		clean: unsplash(CLEANING[0], 800, 600),
		spreadTheWord: unsplash(GOSPEL[0], 800, 600),
	},
	support: {
		oneTime: unsplash(COMMUNITY[1], 800, 600),
		monthly: unsplash(VOLUNTEERING[3], 800, 600),
		supplies: unsplash(CLEANING[1], 800, 600),
		church: unsplash(GOSPEL[5], 800, 600),
	},
} as const;
