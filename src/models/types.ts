// MODEL: shared TypeScript types for the portfolio domain.
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

export type ContactPayload = { name: string; email: string; message: string };
export type SendResult = { ok: boolean; message: string };
