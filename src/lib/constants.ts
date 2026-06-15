import { media, picsum } from "./images";

export const siteConfig = {
	name: "Bloom Outreach",
	motto: "Love. Serve. Transform.",
	tagline: "Volunteering, cleaning, and spreading the word of Jesus",
	description:
		"Bloom Outreach is a faith-driven community service — we volunteer together, clean our neighborhoods, and spread the gospel of Jesus Christ.",
	email: "hellobloomoutreach@gmail.com",
	phone: "(555) 123-4567",

	social: {
		instagram: {
			handle: "bloomoutreachng",
			href: "https://www.instagram.com/bloomoutreachng",
		},
		tiktok: {
			handle: "bloomoutreachng",
			href: "https://www.tiktok.com/@bloomoutreachng",
		},
	},
} as const;

export const socialLinks = [
	{
		platform: "instagram" as const,
		label: "Instagram",
		handle: siteConfig.social.instagram.handle,
		href: siteConfig.social.instagram.href,
	},
	{
		platform: "tiktok" as const,
		label: "TikTok",
		handle: siteConfig.social.tiktok.handle,
		href: siteConfig.social.tiktok.href,
	},
] as const;

export const navLinks = [
	{ href: "/about", label: "About Us" },
	{ href: "/get-involved", label: "Get Involved" },
	{ href: "/calendar", label: "Events" },
	{ href: "/support-us", label: "Support Us" },
	{ href: "/contact", label: "Contact Us" },
] as const;

export const pillarCategories = {
	Volunteer: "Volunteering",
	Clean: "Cleaning",
	"Spread the Word": "Spreading the Word",
} as const;

export const pillars = [
	{
		title: "Volunteer",
		category: "Volunteering" as const,
		description:
			"We show up together. Whether it's your first time or your hundredth, there's a place for you on our team — all you need is a willing heart.",
		icon: "users" as const,
		verse: "For we are God's fellow workers. You are God's field, God's building.",
		reference: "1 Corinthians 3:9",
	},
	{
		title: "Clean",
		category: "Cleaning" as const,
		description:
			"We clean neighborhoods, parks, streets, and public spaces — caring for our community through hands-on service that makes a visible difference.",
		icon: "brush" as const,
		verse: "Whatever you do, work heartily, as for the Lord and not for men.",
		reference: "Colossians 3:23",
	},
	{
		title: "Spread the Word",
		category: "Spreading the Word" as const,
		description:
			"We share the love and gospel of Jesus Christ — through conversation, prayer, and living out our faith as we serve alongside our neighbors.",
		icon: "book-open" as const,
		verse: "Go therefore and make disciples of all nations.",
		reference: "Matthew 28:19",
	},
] as const;

export const involvementOptions = [
	{
		title: "Volunteer",
		category: "Volunteering" as const,
		description:
			"Join our team at cleanup days and outreach events. No experience needed — just come ready to serve.",
		cta: "Join Us",
		image: media.involvement.volunteer,
	},
	{
		title: "Clean",
		category: "Cleaning" as const,
		description:
			"Help us beautify our community. Grab gloves and join us as we clean streets, parks, and neighborhoods together.",
		cta: "Join a Cleanup",
		image: media.involvement.clean,
	},
	{
		title: "Spread the Word",
		category: "Spreading the Word" as const,
		description:
			"Share the gospel of Jesus with us — through prayer, conversation, and inviting others to come serve alongside Bloom Outreach.",
		cta: "Get Involved",
		image: media.involvement.spreadTheWord,
	},
] as const;

export const galleryCategories = ["All", "Volunteering", "Cleaning", "Spreading the Word"] as const;

export const galleryItems = [
	{
		id: 1,
		title: "Volunteer Team at Work",
		category: "Volunteering",
		image: picsum(119, 800, 520),
		width: 800,
		height: 520,
	},
	{
		id: 2,
		title: "Park Cleanup Day",
		category: "Cleaning",
		image: picsum(318, 800, 1100),
		width: 800,
		height: 1100,
	},
	{
		id: 3,
		title: "Neighborhood Street Cleanup",
		category: "Cleaning",
		image: picsum(160, 800, 640),
		width: 800,
		height: 640,
	},
	{
		id: 4,
		title: "Sharing the Gospel",
		category: "Spreading the Word",
		image: picsum(164, 800, 960),
		width: 800,
		height: 960,
	},
	{
		id: 5,
		title: "Volunteer Orientation",
		category: "Volunteering",
		image: picsum(106, 800, 480),
		width: 800,
		height: 480,
	},
	{
		id: 6,
		title: "Community Cleanup Crew",
		category: "Cleaning",
		image: picsum(139, 800, 720),
		width: 800,
		height: 720,
	},
	{
		id: 7,
		title: "Prayer Before Service",
		category: "Spreading the Word",
		image: picsum(152, 800, 880),
		width: 800,
		height: 880,
	},
	{
		id: 8,
		title: "Volunteers Serving Together",
		category: "Volunteering",
		image: picsum(180, 800, 560),
		width: 800,
		height: 560,
	},
	{
		id: 9,
		title: "Beach & River Cleanup",
		category: "Cleaning",
		image: picsum(225, 800, 1040),
		width: 800,
		height: 1040,
	},
	{
		id: 10,
		title: "Open Air Witness",
		category: "Spreading the Word",
		image: picsum(96, 800, 600),
		width: 800,
		height: 600,
	},
	{
		id: 11,
		title: "New Volunteers Welcome",
		category: "Volunteering",
		image: picsum(146, 800, 760),
		width: 800,
		height: 760,
	},
	{
		id: 12,
		title: "Sharing Hope in the Community",
		category: "Spreading the Word",
		image: picsum(177, 800, 920),
		width: 800,
		height: 920,
	},
] as const;

export type GalleryItem = (typeof galleryItems)[number];
export type GalleryCategory = GalleryItem["category"];

export const videoItems = [
	{
		id: 1,
		title: "Volunteer Day Recap",
		category: "Volunteering",
		youtubeId: "NGV9Qf629iY",
		thumbnail: picsum(119, 800, 450),
		description:
			"See our volunteers come together — ready to serve, clean, and share the love of Christ with our community.",
		aspect: "video",
	},
	{
		id: 2,
		title: "Neighborhood Cleanup Highlights",
		category: "Cleaning",
		youtubeId: "L7FIeZ4FAg0",
		thumbnail: picsum(318, 800, 1067),
		description:
			"Watch our team roll up their sleeves and transform streets and parks through hands-on cleaning.",
		aspect: "tall",
	},
	{
		id: 3,
		title: "Park Restoration Project",
		category: "Cleaning",
		youtubeId: "uxsOYVbzCNY",
		thumbnail: picsum(160, 800, 450),
		description:
			"From littered to loved — a full day of cleaning that left our local park beautiful for the whole community.",
		aspect: "video",
	},
	{
		id: 4,
		title: "Spreading the Gospel Together",
		category: "Spreading the Word",
		youtubeId: "j2u523cRdUt",
		thumbnail: picsum(164, 800, 1067),
		description:
			"How we share the word of Jesus while we serve — through prayer, conversation, and living out our faith.",
		aspect: "tall",
	},
	{
		id: 5,
		title: "Why We Volunteer",
		category: "Volunteering",
		youtubeId: "ZiP1lLSwwIs",
		thumbnail: picsum(106, 800, 450),
		description:
			"Hear from Bloom Outreach volunteers about why they show up to serve their community for Christ.",
		aspect: "video",
	},
	{
		id: 6,
		title: "City-Wide Cleanup Day",
		category: "Cleaning",
		youtubeId: "Rk6HdHtC0Uk",
		thumbnail: picsum(139, 800, 450),
		description:
			"Dozens of volunteers cleaning neighborhoods across the city — one street at a time, one heart at a time.",
		aspect: "video",
	},
	{
		id: 7,
		title: "Faith in Action",
		category: "Spreading the Word",
		youtubeId: "nD0JobWPPNc",
		thumbnail: picsum(152, 800, 1067),
		description:
			"Spreading the word isn't just talking — it's showing the love of Jesus through every act of service.",
		aspect: "tall",
	},
	{
		id: 8,
		title: "Join the Bloom Team",
		category: "Volunteering",
		youtubeId: "M7lc1UVf-VE",
		thumbnail: picsum(180, 800, 450),
		description:
			"Want to volunteer? See what a typical Bloom Outreach day looks like and come serve with us.",
		aspect: "video",
	},
	{
		id: 9,
		title: "Cleaning With Purpose",
		category: "Cleaning",
		youtubeId: "ysz5S6PUM-U",
		thumbnail: picsum(225, 800, 1067),
		description:
			"Every bag of trash picked up is an act of love. See how cleaning opens doors to share the gospel.",
		aspect: "tall",
	},
] as const;

export type VideoItem = (typeof videoItems)[number];
export type VideoCategory = VideoItem["category"];

export const volunteerQuotes = [
	{
		quote: "I came to pick up trash and left knowing I'd been part of something bigger — serving Jesus by serving my neighborhood.",
		name: "Sarah Mitchell",
		role: "Cleanup Volunteer",
	},
	{
		quote: "Bloom Outreach showed me that cleaning a street and sharing the gospel go hand in hand. Simple acts, eternal impact.",
		name: "David Okonkwo",
		role: "Volunteer & Witness",
	},
] as const;

export const volunteerPhotos = [
	{
		id: 1,
		name: "Sarah M.",
		role: "Cleanup Volunteer",
		image: picsum(64, 800, 600),
		width: 800,
		height: 600,
	},
	{
		id: 2,
		name: "David O.",
		role: "Volunteer",
		image: picsum(65, 800, 900),
		width: 800,
		height: 900,
	},
	{
		id: 3,
		name: "Maria L.",
		role: "Gospel Outreach",
		image: picsum(66, 800, 520),
		width: 800,
		height: 520,
	},
	{
		id: 4,
		name: "James T.",
		role: "Neighborhood Cleanup",
		image: picsum(68, 800, 720),
		width: 800,
		height: 720,
	},
	{
		id: 5,
		name: "Grace K.",
		role: "Volunteer",
		image: picsum(69, 800, 880),
		width: 800,
		height: 880,
	},
	{
		id: 6,
		name: "Michael R.",
		role: "Team Leader",
		image: picsum(70, 800, 640),
		width: 800,
		height: 640,
	},
] as const;

export type VolunteerPhoto = (typeof volunteerPhotos)[number];

export const upcomingEvents = [
	{
		id: 1,
		title: "Neighborhood Volunteering Day",
		description:
			"Bring gloves and a willing heart. We serve together every Saturday — show up ready to volunteer.",
		date: "2026-06-13",
		startTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Oakwood Neighborhood — meet at corner of 5th & Elm",
		category: "Volunteering",
		volunteersSignedUp: 14,
	},
	{
		id: 2,
		title: "Community Volunteer Day",
		description:
			"Our next Saturday volunteering gathering. All hands on deck to serve our neighborhood for Jesus.",
		date: "2026-07-25",
		startTime: "9:00 AM",
		endTime: "1:00 PM",
		location: "Bloom Outreach Center, 123 Hope Street",
		category: "Volunteering",
		volunteersSignedUp: 22,
	},
	{
		id: 3,
		title: "Saturday Volunteering",
		description:
			"Join us for our monthly Saturday serve day — volunteering together in the community.",
		date: "2026-08-08",
		startTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Riverside Community Park",
		category: "Volunteering",
		volunteersSignedUp: 18,
	},
	{
		id: 4,
		title: "Saturday Volunteering",
		description:
			"Another Saturday to show up, serve, and love our neighbors through volunteering.",
		date: "2026-09-12",
		startTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Downtown Main Street",
		category: "Volunteering",
		volunteersSignedUp: 11,
	},
	{
		id: 5,
		title: "Saturday Volunteering",
		description: "Monthly volunteering Saturday — come serve with the Bloom Outreach team.",
		date: "2026-10-10",
		startTime: "9:00 AM",
		endTime: "1:00 PM",
		location: "Bloom Outreach Center, 123 Hope Street",
		category: "Volunteering",
		volunteersSignedUp: 16,
	},
	{
		id: 6,
		title: "Saturday Volunteering",
		description:
			"Volunteer with us this Saturday. Gloves, bags, and a servant heart are all you need.",
		date: "2026-11-14",
		startTime: "8:00 AM",
		endTime: "12:00 PM",
		location: "Riverside Community Park",
		category: "Volunteering",
		volunteersSignedUp: 13,
	},
	{
		id: 7,
		title: "Saturday Volunteering",
		description: "Close out the year serving together on our final Saturday volunteering day.",
		date: "2026-12-12",
		startTime: "9:00 AM",
		endTime: "1:00 PM",
		location: "Lakeview Beach Parking Lot",
		category: "Volunteering",
		volunteersSignedUp: 7,
	},
] as const;

export type UpcomingEvent = (typeof upcomingEvents)[number];
export type EventCategory = UpcomingEvent["category"];

export type EventPhoto = {
	id: number;
	title: string;
	image: string;
	width: number;
	height: number;
	category: GalleryCategory;
};

export type EventVideo = {
	id: number;
	title: string;
	youtubeId: string;
	thumbnail: string;
	description: string;
	aspect: "video" | "tall";
	category: GalleryCategory;
};

export type EventMedia = {
	photos: EventPhoto[];
	videos: EventVideo[];
};

/** Photos and videos captured at past events (and previews for upcoming ones). */
export const eventMediaById: Record<number, EventMedia> = {
	1: {
		photos: [
			{
				id: 1,
				title: "Volunteer team gathering",
				category: "Volunteering",
				image: picsum(119, 800, 520),
				width: 800,
				height: 520,
			},
			{
				id: 2,
				title: "Cleaning the neighborhood",
				category: "Cleaning",
				image: picsum(160, 800, 640),
				width: 800,
				height: 640,
			},
			{
				id: 3,
				title: "Together for the community",
				category: "Volunteering",
				image: picsum(180, 800, 560),
				width: 800,
				height: 560,
			},
			{
				id: 4,
				title: "Sharing hope",
				category: "Spreading the Word",
				image: picsum(96, 800, 600),
				width: 800,
				height: 600,
			},
		],
		videos: [
			{
				id: 1,
				title: "Volunteer Day Recap",
				category: "Volunteering",
				youtubeId: "NGV9Qf629iY",
				thumbnail: picsum(119, 800, 450),
				description: "Highlights from our neighborhood volunteering day.",
				aspect: "video",
			},
			{
				id: 2,
				title: "Why We Volunteer",
				category: "Volunteering",
				youtubeId: "ZiP1lLSwwIs",
				thumbnail: picsum(106, 800, 450),
				description: "Volunteers share why they show up to serve.",
				aspect: "video",
			},
		],
	},
	2: {
		photos: [
			{
				id: 1,
				title: "Setting up for service",
				category: "Volunteering",
				image: picsum(106, 800, 480),
				width: 800,
				height: 480,
			},
			{
				id: 2,
				title: "Hands on deck",
				category: "Volunteering",
				image: picsum(139, 800, 720),
				width: 800,
				height: 720,
			},
			{
				id: 3,
				title: "Praying before we serve",
				category: "Spreading the Word",
				image: picsum(152, 800, 880),
				width: 800,
				height: 880,
			},
		],
		videos: [
			{
				id: 1,
				title: "Community Volunteer Day",
				category: "Volunteering",
				youtubeId: "M7lc1UVf-VE",
				thumbnail: picsum(180, 800, 450),
				description: "What a Saturday with Bloom Outreach looks like.",
				aspect: "video",
			},
		],
	},
	3: {
		photos: [
			{
				id: 1,
				title: "Riverside park morning",
				category: "Cleaning",
				image: picsum(318, 800, 1100),
				width: 800,
				height: 1100,
			},
			{
				id: 2,
				title: "Bags filled, hearts full",
				category: "Cleaning",
				image: picsum(225, 800, 1040),
				width: 800,
				height: 1040,
			},
			{
				id: 3,
				title: "Friendships forged in service",
				category: "Volunteering",
				image: picsum(146, 800, 760),
				width: 800,
				height: 760,
			},
		],
		videos: [
			{
				id: 1,
				title: "Park Restoration Project",
				category: "Cleaning",
				youtubeId: "uxsOYVbzCNY",
				thumbnail: picsum(160, 800, 450),
				description: "A full day of cleaning that transformed our local park.",
				aspect: "video",
			},
		],
	},
	4: {
		photos: [
			{
				id: 1,
				title: "Downtown clean-up crew",
				category: "Cleaning",
				image: picsum(139, 800, 720),
				width: 800,
				height: 720,
			},
			{
				id: 2,
				title: "Streets that shine",
				category: "Cleaning",
				image: picsum(160, 800, 640),
				width: 800,
				height: 640,
			},
		],
		videos: [
			{
				id: 1,
				title: "City-Wide Cleanup Day",
				category: "Cleaning",
				youtubeId: "Rk6HdHtC0Uk",
				thumbnail: picsum(139, 800, 450),
				description: "Volunteers cleaning neighborhoods across the city.",
				aspect: "video",
			},
		],
	},
	5: {
		photos: [
			{
				id: 1,
				title: "Bloom Outreach Center",
				category: "Volunteering",
				image: picsum(106, 800, 480),
				width: 800,
				height: 480,
			},
			{
				id: 2,
				title: "Volunteers in action",
				category: "Volunteering",
				image: picsum(119, 800, 520),
				width: 800,
				height: 520,
			},
			{
				id: 3,
				title: "Sharing the gospel",
				category: "Spreading the Word",
				image: picsum(164, 800, 960),
				width: 800,
				height: 960,
			},
		],
		videos: [
			{
				id: 1,
				title: "Faith in Action",
				category: "Spreading the Word",
				youtubeId: "nD0JobWPPNc",
				thumbnail: picsum(152, 800, 1067),
				description: "Showing the love of Jesus through service.",
				aspect: "tall",
			},
		],
	},
	6: {
		photos: [
			{
				id: 1,
				title: "Park clean-up",
				category: "Cleaning",
				image: picsum(225, 800, 1040),
				width: 800,
				height: 1040,
			},
			{
				id: 2,
				title: "Conversations of hope",
				category: "Spreading the Word",
				image: picsum(177, 800, 920),
				width: 800,
				height: 920,
			},
		],
		videos: [
			{
				id: 1,
				title: "Cleaning With Purpose",
				category: "Cleaning",
				youtubeId: "ysz5S6PUM-U",
				thumbnail: picsum(225, 800, 1067),
				description: "Every bag picked up is an act of love.",
				aspect: "tall",
			},
		],
	},
	7: {
		photos: [
			{
				id: 1,
				title: "Lakeview waterfront",
				category: "Cleaning",
				image: picsum(225, 800, 1040),
				width: 800,
				height: 1040,
			},
			{
				id: 2,
				title: "Year-end thanksgiving",
				category: "Volunteering",
				image: picsum(64, 800, 600),
				width: 800,
				height: 600,
			},
		],
		videos: [
			{
				id: 1,
				title: "Spreading the Gospel Together",
				category: "Spreading the Word",
				youtubeId: "j2u523cRdUt",
				thumbnail: picsum(164, 800, 1067),
				description: "Sharing the word of Jesus while we serve.",
				aspect: "tall",
			},
		],
	},
};

export function getEventMedia(eventId: number): EventMedia {
	return eventMediaById[eventId] ?? { photos: [], videos: [] };
}
