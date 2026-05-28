// VIEW: Projects section.
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import { PROJECTS } from "@/models/portfolio.model";

export default function ProjectsSection() {
  return (
    <Section id="projects" num="03" label="projects">
      <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
        Things I've <span className="text-primary">built.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <Card
            key={p.id}
            hoverable
            accent={p.featured}
            className={`reveal relative ${p.featured ? "md:col-span-2" : ""}`}
          >
            <div className="text-xs text-muted-foreground mb-3">{p.id}</div>
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className={`absolute top-6 right-6 text-[10px] uppercase tracking-wider px-2 py-1 ${
                p.status === "ongoing"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {p.status}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
