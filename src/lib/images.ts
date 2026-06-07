/** Reliable placeholder images — swap for your own photos in public/images/ */

export function picsum(id: number, width: number, height: number) {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}

export const siteImages = {
  hero: {
    src: picsum(318, 1600, 1200),
    alt: "Volunteers cleaning their community together",
    width: 1600,
    height: 1200,
  },
  mission: {
    src: picsum(119, 1200, 900),
    alt: "Volunteers serving together in the community",
    width: 1200,
    height: 900,
  },
  cta: {
    src: picsum(152, 1600, 900),
    alt: "Community volunteers gathered to serve",
    width: 1600,
    height: 900,
  },
  aboutStory: {
    src: picsum(160, 1200, 900),
    alt: "Volunteers cleaning a community space",
    width: 1200,
    height: 900,
  },
  aboutCommunity: {
    src: picsum(106, 1200, 800),
    alt: "Team of volunteers working together",
    width: 1200,
    height: 800,
  },
  pageHeaders: {
    about: picsum(139, 1600, 900),
    getInvolved: picsum(318, 1600, 900),
    support: picsum(96, 1600, 900),
    gallery: picsum(160, 1600, 900),
    videos: picsum(152, 1600, 900),
    contact: picsum(225, 1600, 900),
    calendar: picsum(180, 1600, 900),
    profile: picsum(106, 1600, 900),
    default: picsum(318, 1600, 900),
  },
  pillars: {
    volunteer: picsum(119, 800, 600),
    clean: picsum(318, 800, 600),
    spreadTheWord: picsum(164, 800, 600),
  },
} as const;

export const media = {
  involvement: {
    volunteer: picsum(119, 800, 600),
    clean: picsum(318, 800, 600),
    spreadTheWord: picsum(164, 800, 600),
  },
  support: {
    oneTime: picsum(96, 800, 600),
    monthly: picsum(146, 800, 600),
    supplies: picsum(160, 800, 600),
    church: picsum(152, 800, 600),
  },
} as const;
