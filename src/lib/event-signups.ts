import { parseEventDate } from "./date-utils";

export const EVENT_TOOL_OPTIONS = [
  { id: "shovel", label: "Shovel" },
  { id: "rake", label: "Rake" },
  { id: "waste-bags", label: "Waste Bags" },
  { id: "gloves", label: "Gloves" },
  { id: "face-mask", label: "Face Mask" },
  { id: "first-aid", label: "First Aid Kit" },
  { id: "none", label: "None / I'll work with what's available" },
] as const;

export type EventToolId = (typeof EVENT_TOOL_OPTIONS)[number]["id"];

export const EVENT_ROLE_OPTIONS = [
  "General Volunteer",
  "Photographer/Documenter",
  "First Aid",
  "Team Lead Support",
  "Other",
] as const;

export type EventRole = (typeof EVENT_ROLE_OPTIONS)[number];

export type EventSignup = {
  eventId: number;
  name: string;
  phone: string;
  email: string;
  bringingGuests: boolean;
  guestCount: number;
  tools: EventToolId[];
  role?: EventRole;
  hearAbout?: string;
  signedUpAt: string;
};

const SIGNUPS_KEY = "bloom-event-signups";
const VOLUNTEER_EMAIL_KEY = "bloom-volunteer-email";

function readSignups(): EventSignup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SIGNUPS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EventSignup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSignups(signups: EventSignup[]) {
  localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));
}

export function getSignupsForEvent(eventId: number): EventSignup[] {
  return readSignups().filter((signup) => signup.eventId === eventId);
}

export function getStoredVolunteerEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(VOLUNTEER_EMAIL_KEY);
}

export function getSignupForEvent(
  eventId: number,
  email: string
): EventSignup | undefined {
  const normalized = email.trim().toLowerCase();
  return getSignupsForEvent(eventId).find(
    (signup) => signup.email.toLowerCase() === normalized
  );
}

/** Headcount from local sign-ups (volunteer + any guests they're bringing). */
export function getLocalAttendanceCount(eventId: number): number {
  return getSignupsForEvent(eventId).reduce(
    (total, signup) => total + 1 + (signup.bringingGuests ? signup.guestCount : 0),
    0
  );
}

/** Volunteers cannot cancel on the day before the event or on the event day. */
export function canCancelSignup(eventDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDay = parseEventDate(eventDate);
  eventDay.setHours(0, 0, 0, 0);

  const dayBeforeEvent = new Date(eventDay);
  dayBeforeEvent.setDate(dayBeforeEvent.getDate() - 1);

  return today < dayBeforeEvent;
}

export function addEventSignup(
  signup: Omit<EventSignup, "signedUpAt">
): EventSignup {
  const signups = readSignups();
  const normalized = signup.email.trim().toLowerCase();
  const existing = signups.find(
    (entry) =>
      entry.eventId === signup.eventId && entry.email.toLowerCase() === normalized
  );
  if (existing) return existing;

  const newSignup: EventSignup = {
    ...signup,
    email: normalized,
    signedUpAt: new Date().toISOString(),
  };
  signups.push(newSignup);
  writeSignups(signups);
  localStorage.setItem(VOLUNTEER_EMAIL_KEY, normalized);
  return newSignup;
}

export function removeEventSignup(eventId: number, email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const signups = readSignups();
  const next = signups.filter(
    (entry) =>
      entry.eventId !== eventId || entry.email.toLowerCase() !== normalized
  );
  if (next.length === signups.length) return false;
  writeSignups(next);
  return true;
}
