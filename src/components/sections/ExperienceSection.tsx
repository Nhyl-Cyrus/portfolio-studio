// VIEW: Experience timeline section.
import Section from "@/components/common/Section";
import { EXPERIENCE } from "@/models/portfolio.model";

export default function ExperienceSection() {
  return (
    <Section id="experience" num="04" label="experience" alt>
      <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
        Where I've <span className="text-primary">been.</span>
      </h2>
      <div className="relative space-y-8 md:pl-8 md:before:absolute md:before:left-2 md:before:top-2 md:before:bottom-2 md:before:w-px md:before:bg-border">
        {EXPERIENCE.map((t) => (
          <div key={t.title} className="reveal relative">
            <div className="hidden md:block absolute -left-8 top-2 w-3 h-3 bg-primary" />
            <div className="text-xs text-primary mb-1">{t.date}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              {t.type}
            </div>
            <h3 className="text-xl font-bold mb-1">{t.title}</h3>
            <div className="text-sm text-muted-foreground mb-3">{t.org}</div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-2xl">
              {t.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
