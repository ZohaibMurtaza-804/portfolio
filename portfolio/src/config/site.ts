/**
 * ============================================================
 *  EDIT THIS FILE to change the text on your portfolio.
 *  Everything here is either information you provided or a
 *  clearly marked placeholder. Nothing is invented.
 * ============================================================
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  github: { username: string; url: string };
  location: string;
  education: string;
  /** Public email. Leave "" to hide it from the Contact section. */
  email: string;
  /** Full LinkedIn profile URL. Leave "" to hide it. */
  linkedin: string;
  interests: string[];
  /** Optional form endpoint (e.g. Formspree). Leave "" to hide the form. */
  contactEndpoint: string;
    profileImage: string;
}

export const siteConfig: SiteConfig = {
  name: "Zohaib Murtaza",
  shortName: "ZM",
  title: "Zohaib Murtaza | Developer Portfolio",
  description:
    "Portfolio of Zohaib Murtaza, an Information Technology student from Pakistan building practical software. Explore projects and live GitHub activity.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  github: {
    username: "ZohaibMurtaza-804",
    url: "https://github.com/ZohaibMurtaza-804",
  },
  location: "Pakistan",
  education: "BS Information Technology",
  email: "zohaib1683mg@gmail.com", // e.g. "you@example.com"
  linkedin: "https://www.linkedin.com/in/zohaib-murtaza-869055306/?isSelfProfile=true", // e.g. "https://www.linkedin.com/in/your-handle"
  interests: [
    "Web development",
    "Software development",
    "Cloud computing",
    "AI-related projects",
    "Video Editing",
  ],
  contactEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
    profileImage: "/profile.png", // e.g. "/profile.jpg"
};

export interface WebsiteItem {
  name: string;
  url: string;
  description: string;
  label?: string;
  image?: string;
}

export const websites: WebsiteItem[] = [
  // {
  //   name: "Website ka naam",
  //   url: "https://aapki-website.com",
  //   description: "Ek saaf jumla: yeh kya hai aur aapne kya kiya.",
  //   label: "Client project",
  //   image: "/sites/website-ka-naam.png",
  // },
];

const allNavItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "websites", label: "Websites" },
  { id: "github", label: "GitHub" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export const navItems = allNavItems.filter(
  (item) => item.id !== "websites" || websites.length > 0
); 

/**
 * Optional per-repository overrides, keyed by the exact repo name.
 * Use this to write a proper description, add tags, or add a live demo link.
 */
export interface ProjectOverride {
  description?: string;
  tags?: string[];
  /** Only set this if a real live demo exists. */
  demo?: string;
}

export const projectOverrides: Record<string, ProjectOverride> = {
  // The CLOUDSENTINEL repo currently has no README or real description on GitHub,
  // so this is a placeholder. Replace it with a real summary once you have one.
  CLOUDSENTINEL: {
    description:
      "Public repository on GitHub. A full write-up is coming soon. (Edit this text in src/config/site.ts.)",
    // tags: ["Python", "AWS"],   // add ONLY technologies you actually used
    // demo: "https://...",       // add ONLY if a live demo exists
  },
};

/**
 * Repo names to feature, in order. Leave empty to show all of your own
 * (non-fork) repositories, most recently updated first.
 */
export const featuredRepos: string[] = [];

/**
 * Optional hand-written skill groups. Leave empty until you want to add some.
 * Only list technologies you have genuinely used. Example:
 *
 *   { title: "Frontend Development", items: ["HTML", "CSS", "JavaScript"] },
 */
export const skillGroups: { title: string; items: string[] }[] = [];

export interface JourneyItem {
  date: string;
  title: string;
  description: string;
  /** true = clearly marked editable placeholder */
  placeholder?: boolean;
}

export const journey: JourneyItem[] = [
  {
    date: "Add your dates",
    title: "BS Information Technology",
    description: "Studying Information Technology in Pakistan.",
    placeholder: true,
  },
  {
    date: "Add a date",
    title: "CLOUDSENTINEL on GitHub",
    description: "Published my first public repository, CLOUDSENTINEL.",
    placeholder: true,
  },
  {
    date: "Your next step",
    title: "Add a milestone",
    description:
      "A course, certification, internship, or new project. Edit src/config/site.ts.",
    placeholder: true,
  },
];
