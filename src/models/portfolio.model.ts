// MODEL: data & business types for the portfolio.
// Centralizes all content so views remain presentation-only.

export type NavLink = { id: string; label: string };

export type Stat = { value: string; label: string };

export type Skill = { name: string; weight: number };

export type TagGroup = { title: string; tags: string[] };

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "completed" | "ongoing";
  featured?: boolean;
};

export type ExperienceItem = {
  date: string;
  type: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
};

export type ContactItem = {
  icon: string;
  label: string;
  value: string;
  href?: string;
};

export type InfoCard = { title: string; value: string; subtitle: string };

export const ROLES = [
  "IT Student",
  "Software Developer",
  "Problem Solver",
  "System Builder",
];

export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

export const HERO_STATS: Stat[] = [
  { value: "3+", label: "projects" },
  { value: "80h", label: "internship" },
  { value: "BS IT", label: "degree" },
];

export const ABOUT_TAGS = ["Java", "Web Systems", "Database", "Cloud", "System Design"];

export const ABOUT_CARDS: InfoCard[] = [
  { title: "Education", value: "BS Information Technology", subtitle: "STI College San Jose del Monte" },
  { title: "Location", value: "San Jose del Monte", subtitle: "Bulacan, Philippines" },
  { title: "Focus", value: "Software Development", subtitle: "Data Encoding · Computer Systems" },
];

export const LANGUAGE_SKILLS: Skill[] = [
  { name: "Java", weight: 80 },
  { name: "HTML / CSS", weight: 75 },
  { name: "JavaScript", weight: 60 },
  { name: "SQL", weight: 70 },
];

export const SKILL_GROUPS: TagGroup[] = [
  {
    title: "Domains",
    tags: [
      "System Design",
      "Database Management",
      "Web Development",
      "Cloud Computing",
      "Project Management",
      "Data Encoding",
    ],
  },
  {
    title: "Tools & Platforms",
    tags: ["Git / GitHub", "Cloud Services", "IDE Tools", "Database GUI"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "I.D Processing System",
    description:
      "A system designed to manage and automate the process of creating and issuing identification cards, streamlining administrative workflows.",
    tech: ["Java", "Database", "System Design"],
    status: "completed",
  },
  {
    id: "02",
    title: "Alumni Management System",
    description:
      "A platform used to manage alumni records, events, and communication between graduates and the institution — centralizing data and engagement.",
    tech: ["Web System", "Database"],
    status: "completed",
  },
  {
    id: "03",
    title: "Cloud Construction Operations System",
    description:
      "A cloud-based system designed to manage construction workflows, proposals, and project operations — built for scale and remote access.",
    tech: ["Cloud", "Project Management"],
    status: "ongoing",
    featured: true,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: "2026",
    type: "internship",
    title: "Engineering Department Assistant",
    org: "San Jose del Monte City Hall",
    description:
      "Completed 80 hours of on-the-job training within the Engineering Department. Gained hands-on experience in technology applications within local government operations.",
    tags: ["80 Hours OJT", "Government Tech"],
  },
  {
    date: "2022–2026",
    type: "education",
    title: "BS Information Technology",
    org: "STI College San Jose del Monte",
    description:
      "Four-year degree program with focus on software development, database management, system design, and cloud computing. Developed multiple real-world systems as academic projects.",
    tags: ["Systems Development", "Database", "Cloud"],
  },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "✉",
    label: "email",
    value: "nhylcyrusgervasio@example.com",
    href: "mailto:nhylcyrusgervasio@example.com",
  },
  { icon: "☎", label: "phone", value: "+63 912 345 6789" },
  { icon: "◎", label: "location", value: "San Jose del Monte, Bulacan, PH" },
  {
    icon: "⌥",
    label: "github",
    value: "github.com/Nhyl-Cyrus",
    href: "https://github.com/Nhyl-Cyrus",
  },
];

// Business logic: validate + simulate sending contact message.
export type ContactPayload = { name: string; email: string; message: string };
export type SendResult = { ok: boolean; message: string };

export async function sendContactMessage(payload: ContactPayload): Promise<SendResult> {
  const { name, email, message } = payload;
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, message: "// Please fill in all fields." };
  }
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true, message: "// Message sent! I'll get back to you soon." };
}
