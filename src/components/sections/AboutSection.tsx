// VIEW: About section.
import Section from "@/components/common/Section";
import List from "@/components/common/List";
import { ABOUT_CARDS, ABOUT_TAGS } from "@/models/portfolio.model";

export default function AboutSection() {
  return (
    <Section id="about" num="01" label="about">
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            A developer who{" "}
            <span className="text-primary">builds with intent.</span>
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            I'm a BS Information Technology student at STI College San Jose del
            Monte with hands-on project experience across Java applications, web
            systems, and cloud platforms. My internship at San Jose del Monte
            City Hall's Engineering Department gave me real-world exposure to
            tech in governance contexts.
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            I approach every project with clarity and methodical thinking — from
            systems design to implementation and deployment.
          </p>
          <div className="flex flex-wrap gap-2">
            {ABOUT_TAGS.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 border border-border bg-card"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <List
          items={ABOUT_CARDS.map((c) => ({
            key: c.title,
            icon: "◈",
            label: c.title,
            primary: c.value,
            secondary: c.subtitle,
          }))}
        />
      </div>
    </Section>
  );
}
