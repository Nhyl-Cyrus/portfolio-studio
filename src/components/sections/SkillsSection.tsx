// VIEW: Skills section + private SkillBar/SkillTags subcomponents.
import { useEffect, useRef, useState } from "react";
import Section from "@/components/common/Section";
import Card from "@/components/common/Card";
import {
  LANGUAGE_SKILLS,
  SKILL_GROUPS,
  type Skill,
} from "@/models/portfolio.model";

function SkillBar({ skill }: { skill: Skill }) {
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setFilled(skill.weight), 200);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skill.weight]);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1">
        <span>{skill.name}</span>
        <span className="text-muted-foreground">{skill.weight}%</span>
      </div>
      <div className="h-1 bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${filled}%` }}
        />
      </div>
    </div>
  );
}

function SkillTagGroup({ title, tags }: { title: string; tags: string[] }) {
  return (
    <Card className="reveal">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1.5 border border-border bg-background"
          >
            {t}
          </span>
        ))}
      </div>
    </Card>
  );
}

export default function SkillsSection() {
  return (
    <Section id="skills" num="02" label="skills" alt>
      <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
        Technical <span className="text-primary">stack.</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="reveal">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            Languages
          </div>
          <div className="space-y-4">
            {LANGUAGE_SKILLS.map((s) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
        </Card>
        {SKILL_GROUPS.map((g) => (
          <SkillTagGroup key={g.title} title={g.title} tags={g.tags} />
        ))}
      </div>
    </Section>
  );
}
