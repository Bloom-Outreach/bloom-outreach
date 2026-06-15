import type { AuthUser } from "@/lib/auth-session";
import { upcomingEvents } from "@/lib/constants";
import { parseEventDate } from "@/lib/date-utils";
import { mockVolunteer } from "@/lib/mock-volunteer";
import {
	getEarnedTierIds,
	getTierForStreak,
	getTierProgress,
	type TierId,
} from "@/lib/streak-utils";

export type AttendanceStatus = "attended" | "missed";

export type AttendanceRecord = {
	id: string;
	date: string;
	eventName: string;
	status: AttendanceStatus;
};

export type MerchItem = {
	itemName: string;
	tierId: TierId;
	tierName: string;
	status: "pending" | "dispatched";
};

export type DashboardNextEvent = {
	id: number;
	title: string;
	date: string;
	location: string;
};

export type VolunteerDashboardData = {
	firstName: string;
	lastName: string;
	email: string;
	streakMonths: number;
	currentTierId: TierId;
	earnedTierIds: TierId[];
	outreachesAttended: number;
	badgesEarned: number;
	attendanceHistory: AttendanceRecord[];
	merch: MerchItem | null;
	nextEvent: DashboardNextEvent | null;
	progressPercent: number;
	monthsToNext: number;
	nextTierName: string | null;
};

const sarahAttendanceHistory: AttendanceRecord[] = [
	{
		id: "att-1",
		date: "2026-06-13",
		eventName: "Neighborhood Volunteering Day",
		status: "attended",
	},
	{
		id: "att-2",
		date: "2026-05-09",
		eventName: "Saturday Volunteering",
		status: "attended",
	},
	{
		id: "att-3",
		date: "2026-04-11",
		eventName: "Community Volunteer Day",
		status: "attended",
	},
	{
		id: "att-4",
		date: "2026-03-14",
		eventName: "Saturday Volunteering",
		status: "missed",
	},
	{
		id: "att-5",
		date: "2026-02-14",
		eventName: "Park Cleanup & Gospel Outreach",
		status: "attended",
	},
	{
		id: "att-6",
		date: "2026-01-10",
		eventName: "New Year Volunteering Day",
		status: "attended",
	},
];

const newVolunteerAttendance: AttendanceRecord[] = [];

function getNextUpcomingEvent(): DashboardNextEvent | null {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const next = upcomingEvents
		.filter((event) => {
			const eventDate = parseEventDate(event.date);
			eventDate.setHours(0, 0, 0, 0);
			return eventDate >= today;
		})
		.sort(
			(a, b) =>
				parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime(),
		)[0];

	if (!next) return null;

	return {
		id: next.id,
		title: next.title,
		date: next.date,
		location: next.location,
	};
}

function buildDashboardData(
	user: Pick<AuthUser, "firstName" | "lastName" | "email">,
	overrides: Partial<
		Pick<
			VolunteerDashboardData,
			| "streakMonths"
			| "outreachesAttended"
			| "attendanceHistory"
			| "merch"
		>
	> = {},
): VolunteerDashboardData {
	const streakMonths = overrides.streakMonths ?? 3;
	const attendanceHistory = overrides.attendanceHistory ?? sarahAttendanceHistory;
	const outreachesAttended =
		overrides.outreachesAttended ??
		attendanceHistory.filter((entry) => entry.status === "attended").length;
	const earnedTierIds = getEarnedTierIds(streakMonths);
	const currentTierId = getTierForStreak(streakMonths);
	const { progressPercent, monthsToNext, nextTier } = getTierProgress(streakMonths);

	const defaultMerch: MerchItem | null =
		earnedTierIds.includes("bloomer")
			? {
					itemName: "Bloom Tote Bag",
					tierId: "bloomer",
					tierName: "Bloomer",
					status: "pending",
				}
			: earnedTierIds.includes("seedling")
				? {
						itemName: "Welcome Kit (Pen + Badge)",
						tierId: "seedling",
						tierName: "Seedling",
						status: "dispatched",
					}
				: null;

	return {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		streakMonths,
		currentTierId,
		earnedTierIds,
		outreachesAttended,
		badgesEarned: earnedTierIds.length,
		attendanceHistory,
		merch: overrides.merch !== undefined ? overrides.merch : defaultMerch,
		nextEvent: getNextUpcomingEvent(),
		progressPercent,
		monthsToNext,
		nextTierName: nextTier?.name ?? null,
	};
}

/** Demo-rich dashboard for returning volunteers; lighter data for brand-new sign-ups. */
export function getVolunteerDashboardData(
	user: AuthUser,
	options?: { isNewVolunteer?: boolean },
): VolunteerDashboardData {
	if (options?.isNewVolunteer) {
		return buildDashboardData(user, {
			streakMonths: 0,
			outreachesAttended: 0,
			attendanceHistory: newVolunteerAttendance,
			merch: null,
		});
	}

	const useSarahDemo =
		user.email.toLowerCase() === mockVolunteer.email.toLowerCase() ||
		user.id === mockVolunteer.id;

	if (useSarahDemo) {
		return buildDashboardData({
			firstName: mockVolunteer.firstName,
			lastName: mockVolunteer.lastName,
			email: user.email,
		});
	}

	return buildDashboardData(user);
}
