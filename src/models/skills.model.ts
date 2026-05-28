// MODEL: skills data
import type { Skill, TagGroup } from "./types";

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
