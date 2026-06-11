import { media, picsum } from "./images";

export const siteConfig = {
  name: "Bloom Outreach",
  motto: "Love. Serve. Transform.",
  tagline: "Volunteering, cleaning, and spreading the word of Jesus",
  description:
    "Bloom Outreach is a faith-driven community service — we volunteer together, clean our neighborhoods, and spread the gospel of Jesus Christ.",
  email: "hello@bloomoutreach.org",
  phone: "(555) 123-4567",
  address: "123 Hope Street, Community City, ST 12345",
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
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/calendar", label: "Events" },
  { href: "/support-us", label: "Support Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
] as const;

export const pillars = [
  {
    title: "Volunteer",
    description:
      "We show up together. Whether it's your first time or your hundredth, there's a place for you on our team — all you need is a willing heart.",
    icon: "users" as const,
    verse: "For we are God's fellow workers. You are God's field, God's building.",
    reference: "1 Corinthians 3:9",
  },
  {
    title: "Clean",
    description:
      "We clean neighborhoods, parks, streets, and public spaces — caring for our community through hands-on service that makes a visible difference.",
    icon: "brush" as const,
    verse: "Whatever you do, work heartily, as for the Lord and not for men.",
    reference: "Colossians 3:23",
  },
  {
    title: "Spread the Word",
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
    description:
      "Join our team at cleanup days and outreach events. No experience needed — just come ready to serve.",
    cta: "Sign Up to Volunteer",
    image: media.involvement.volunteer,
  },
  {
    title: "Clean",
    description:
      "Help us beautify our community. Grab gloves and join us as we clean streets, parks, and neighborhoods together.",
    cta: "Join a Cleanup",
    image: media.involvement.clean,
  },
  {
    title: "Spread the Word",
    description:
      "Share the gospel of Jesus with us — through prayer, conversation, and inviting others to come serve alongside Bloom Outreach.",
    cta: "Get Involved",
    image: media.involvement.spreadTheWord,
  },
] as const;

export const galleryCategories = [
  "All",
  "Volunteering",
  "Cleaning",
  "Spreading the Word",
] as const;

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
    quote:
      "I came to pick up trash and left knowing I'd been part of something bigger — serving Jesus by serving my neighborhood.",
    name: "Sarah Mitchell",
    role: "Cleanup Volunteer",
  },
  {
    quote:
      "Bloom Outreach showed me that cleaning a street and sharing the gospel go hand in hand. Simple acts, eternal impact.",
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
    title: "Neighborhood Cleanup Day",
    description:
      "Bring gloves and a willing heart. We'll clean streets, sidewalks, and common areas together.",
    date: "2026-06-14",
    startTime: "8:00 AM",
    endTime: "12:00 PM",
    location: "Oakwood Neighborhood — meet at corner of 5th & Elm",
    category: "Volunteering",
    volunteersSignedUp: 14,
  },
  {
    id: 2,
    title: "Volunteer Orientation",
    description:
      "New to Bloom Outreach? Come learn how we volunteer, clean, and spread the word as a team.",
    date: "2026-06-21",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Bloom Outreach Center, 123 Hope Street",
    category: "Volunteering",
    volunteersSignedUp: 9,
  },
  {
    id: 3,
    title: "Park Cleanup & Gospel Outreach",
    description:
      "Clean the park, then share the love of Jesus with passersby through prayer and conversation.",
    date: "2026-06-28",
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    location: "Riverside Community Park",
    category: "Volunteering",
    volunteersSignedUp: 18,
  },
  {
    id: 4,
    title: "City Block Cleanup",
    description:
      "Join volunteers as we clean a full city block — bags, gloves, and supplies provided.",
    date: "2026-07-05",
    startTime: "8:00 AM",
    endTime: "12:00 PM",
    location: "Downtown Main Street",
    category: "Volunteering",
    volunteersSignedUp: 11,
  },
  {
    id: 5,
    title: "Community Volunteer Day",
    description:
      "All hands on deck — volunteer, clean, and spread the word together in one united day of service.",
    date: "2026-07-12",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    location: "Bloom Outreach Center, 123 Hope Street",
    category: "Volunteering",
    volunteersSignedUp: 22,
  },
  {
    id: 6,
    title: "Open Air Gospel Share",
    description:
      "After a morning cleanup, we gather to worship, testify, and share the gospel with our community.",
    date: "2026-07-19",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    location: "Riverside Community Park",
    category: "Volunteering",
    volunteersSignedUp: 16,
  },
  {
    id: 7,
    title: "Beach & Waterfront Cleanup",
    description:
      "Help us clean the waterfront. A great opportunity to serve creation and share Christ's love.",
    date: "2026-07-26",
    startTime: "7:00 AM",
    endTime: "11:00 AM",
    location: "Lakeview Beach Parking Lot",
    category: "Volunteering",
    volunteersSignedUp: 13,
  },
  {
    id: 8,
    title: "Volunteer & Witness Training",
    description:
      "Learn practical ways to share your faith while serving — cleaning, volunteering, and spreading the word.",
    date: "2026-08-02",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "Grace Community Church, Room 101",
    category: "Volunteering",
    volunteersSignedUp: 7,
  },
] as const;

export type UpcomingEvent = (typeof upcomingEvents)[number];
export type EventCategory = UpcomingEvent["category"];
