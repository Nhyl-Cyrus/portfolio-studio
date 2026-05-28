// MODEL: projects data
import type { Project } from "./types";

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
