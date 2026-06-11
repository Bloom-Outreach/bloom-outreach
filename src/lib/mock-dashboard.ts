import { picsum } from "./images";

/**
 * Mock org-wide data powering the admin dashboard and the volunteer
 * dashboard charts. Shaped to be easy to swap for Supabase queries later.
 */

export type EventCategory = "Cleaning" | "Volunteering" | "Spreading the Word";

export const orgStats = {
	activeVolunteers: 248,
	volunteersChange: "+18 this month",
	eventsHeld: 64,
	eventsChange: "12 scheduled next month",
	hoursServed: 3120,
	hoursChange: "+340 this month",
	neighborhoodsServed: 17,
	neighborhoodsChange: "2 new this quarter",
} as const;

/** Last 12 months of org engagement (Jul 2025 – Jun 2026). */
export const monthlyEngagement = [
	{ month: "Jul", volunteers: 112, hours: 168 },
	{ month: "Aug", volunteers: 126, hours: 195 },
	{ month: "Sep", volunteers: 138, hours: 221 },
	{ month: "Oct", volunteers: 151, hours: 240 },
	{ month: "Nov", volunteers: 144, hours: 212 },
	{ month: "Dec", volunteers: 132, hours: 188 },
	{ month: "Jan", volunteers: 158, hours: 246 },
	{ month: "Feb", volunteers: 171, hours: 268 },
	{ month: "Mar", volunteers: 189, hours: 297 },
	{ month: "Apr", volunteers: 204, hours: 318 },
	{ month: "May", volunteers: 226, hours: 352 },
	{ month: "Jun", volunteers: 248, hours: 340 },
];

/** Events held per month, by pillar. */
export const eventsByMonth = [
	{ month: "Jan", cleaning: 3, volunteering: 2, spreading: 1 },
	{ month: "Feb", cleaning: 4, volunteering: 2, spreading: 2 },
	{ month: "Mar", cleaning: 4, volunteering: 3, spreading: 2 },
	{ month: "Apr", cleaning: 5, volunteering: 3, spreading: 2 },
	{ month: "May", cleaning: 6, volunteering: 3, spreading: 3 },
	{ month: "Jun", cleaning: 5, volunteering: 4, spreading: 3 },
];

/** How active volunteers split across the three pillars. */
export const focusBreakdown = [
	{ focus: "cleaning", volunteers: 118, fill: "var(--color-cleaning)" },
	{ focus: "volunteering", volunteers: 82, fill: "var(--color-volunteering)" },
	{ focus: "spreading", volunteers: 48, fill: "var(--color-spreading)" },
];

export const recentSignups = [
	{
		id: "vol-241",
		name: "Marcus Bell",
		email: "marcus.bell@email.com",
		focus: "Cleaning" as EventCategory,
		joined: "Jun 7, 2026",
		avatar: picsum(101, 80, 80),
	},
	{
		id: "vol-240",
		name: "Priya Anand",
		email: "priya.anand@email.com",
		focus: "Spreading the Word" as EventCategory,
		joined: "Jun 5, 2026",
		avatar: picsum(102, 80, 80),
	},
	{
		id: "vol-239",
		name: "Jonah Reyes",
		email: "jonah.reyes@email.com",
		focus: "Volunteering" as EventCategory,
		joined: "Jun 3, 2026",
		avatar: picsum(103, 80, 80),
	},
	{
		id: "vol-238",
		name: "Grace Okafor",
		email: "grace.okafor@email.com",
		focus: "Cleaning" as EventCategory,
		joined: "May 30, 2026",
		avatar: picsum(104, 80, 80),
	},
	{
		id: "vol-237",
		name: "Daniel Kim",
		email: "daniel.kim@email.com",
		focus: "Volunteering" as EventCategory,
		joined: "May 28, 2026",
		avatar: picsum(105, 80, 80),
	},
];

export const topVolunteers = [
	{
		id: "vol-014",
		name: "Hannah Brooks",
		focus: "Cleaning" as EventCategory,
		events: 22,
		hours: 86,
	},
	{
		id: "vol-008",
		name: "Elijah Carter",
		focus: "Volunteering" as EventCategory,
		events: 19,
		hours: 74,
	},
	{
		id: "vol-031",
		name: "Naomi Flores",
		focus: "Spreading the Word" as EventCategory,
		events: 17,
		hours: 63,
	},
	{
		id: "vol-001",
		name: "Sarah Mitchell",
		focus: "Cleaning" as EventCategory,
		events: 12,
		hours: 36,
	},
	{
		id: "vol-022",
		name: "Caleb Nguyen",
		focus: "Volunteering" as EventCategory,
		events: 11,
		hours: 41,
	},
];

/** Sarah's (mock volunteer) service hours over the last 6 months. */
export const volunteerMonthlyHours = [
	{ month: "Jan", hours: 4 },
	{ month: "Feb", hours: 6 },
	{ month: "Mar", hours: 5 },
	{ month: "Apr", hours: 8 },
	{ month: "May", hours: 9 },
	{ month: "Jun", hours: 4 },
];

/** Volunteering schedule — one Saturday per month, 12 events per year. */
export const volunteerScheduleConfig = {
	annualEventCount: 12,
	eventWeekday: "Saturday" as const,
	nextEventDate: "2026-07-25",
} as const;

/** Sarah's volunteering attendance for each Saturday event this year. */
export const volunteerYearAttendance = [
	{ month: "Jan", date: "2026-01-10", label: "Jan 10", attended: 1, isNextEvent: false },
	{ month: "Feb", date: "2026-02-14", label: "Feb 14", attended: 1, isNextEvent: false },
	{ month: "Mar", date: "2026-03-14", label: "Mar 14", attended: 1, isNextEvent: false },
	{ month: "Apr", date: "2026-04-11", label: "Apr 11", attended: 1, isNextEvent: false },
	{ month: "May", date: "2026-05-09", label: "May 9", attended: 1, isNextEvent: false },
	{ month: "Jun", date: "2026-06-13", label: "Jun 13", attended: 1, isNextEvent: false },
	{
		month: "Jul",
		date: volunteerScheduleConfig.nextEventDate,
		label: "Jul 25",
		attended: 0,
		isNextEvent: true,
	},
	{ month: "Aug", date: "2026-08-08", label: "Aug 8", attended: 0, isNextEvent: false },
	{ month: "Sep", date: "2026-09-12", label: "Sep 12", attended: 0, isNextEvent: false },
	{ month: "Oct", date: "2026-10-10", label: "Oct 10", attended: 0, isNextEvent: false },
	{ month: "Nov", date: "2026-11-14", label: "Nov 14", attended: 0, isNextEvent: false },
	{ month: "Dec", date: "2026-12-12", label: "Dec 12", attended: 0, isNextEvent: false },
];

const volunteeredCount = volunteerYearAttendance.reduce(
	(total, event) => total + event.attended,
	0,
);

/** Volunteering attendance split for the profile donut chart. */
export const volunteerFocusSplit = [
	{
		focus: "volunteering",
		events: volunteeredCount,
		fill: "var(--color-volunteering)",
	},
	{
		focus: "remaining",
		events: volunteerScheduleConfig.annualEventCount - volunteeredCount,
		fill: "var(--color-remaining)",
	},
];
