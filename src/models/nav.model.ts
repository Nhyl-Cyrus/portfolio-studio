// MODEL: navigation + hero data
import type { NavLink, Stat } from "./types";

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
