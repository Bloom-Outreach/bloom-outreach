import { picsum } from "./images";

export type VolunteerRole = "Volunteer" | "Clean" | "Spread the Word";

export const mockVolunteer = {
  id: "vol-001",
  firstName: "Sarah",
  lastName: "Mitchell",
  email: "sarah.mitchell@email.com",
  phone: "(555) 987-6543",
  bio: "I joined Bloom Outreach to serve my neighborhood for Jesus. Every cleanup is a chance to love my neighbors and share hope.",
  role: "Cleanup Volunteer" as const,
  focus: "Clean" as VolunteerRole,
  memberSince: "March 2025",
  avatar: picsum(64, 400, 400),
  stats: {
    eventsJoined: 12,
    cleanups: 8,
    hoursServed: 36,
  },
  upcomingEvents: [
    {
      id: 1,
      title: "Neighborhood Cleanup Day",
      date: "Jun 14, 2026",
      time: "8:00 AM – 12:00 PM",
      location: "Oakwood Neighborhood",
      category: "Cleaning" as const,
    },
    {
      id: 2,
      title: "Volunteer Orientation",
      date: "Jun 21, 2026",
      time: "10:00 AM – 11:30 AM",
      location: "Bloom Outreach Center",
      category: "Volunteering" as const,
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Joined Park Cleanup & Gospel Outreach",
      date: "May 28, 2026",
    },
    {
      id: 2,
      action: "Completed Neighborhood Cleanup Day",
      date: "May 14, 2026",
    },
    {
      id: 3,
      action: "Signed up as a Bloom volunteer",
      date: "Mar 10, 2025",
    },
  ],
  preferences: {
    emailEvents: true,
    emailReminders: true,
    emailNewsletter: false,
    smsReminders: true,
  },
} as const;

export const volunteerFocusOptions: VolunteerRole[] = [
  "Volunteer",
  "Clean",
  "Spread the Word",
];
