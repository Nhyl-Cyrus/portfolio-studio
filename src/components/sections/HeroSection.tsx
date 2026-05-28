// VIEW: Hero section.
import heroImg from "@/assets/kermit-gradpic.webp";
import Button from "@/components/common/Button";
import type { Stat } from "@/models/portfolio.model";

type Props = {
  name: string[];
  typedRole: string;
  description: string;
  stats: Stat[];
  onNavigate: (id: string) => void;
};

export default function HeroSection({
  name,
  typedRole,
  description,
  stats,
  onNavigate,
}: Props) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 px-6 min-h-screen flex items-center"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <div className="reveal inline-flex items-center gap-2 text-xs text-muted-foreground border border-border px-3 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            available for opportunities
          </div>
          <h1 className="reveal text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            {name.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <div className="reveal text-lg md:text-xl text-muted-foreground mb-6 flex items-center gap-2">
            <span className="text-primary">_</span>
            <span>{typedRole}</span>
            <span className="animate-pulse text-primary">|</span>
          </div>
          <p className="reveal text-muted-foreground max-w-xl leading-relaxed mb-8">
            {description}
          </p>
          <div className="reveal flex flex-wrap gap-3">
            <Button onClick={() => onNavigate("projects")}>view projects</Button>
            <Button variant="outline" onClick={() => onNavigate("contact")}>
              get in touch
            </Button>
          </div>
        </div>

        <div className="reveal">
          <div className="relative aspect-square bg-card border border-border">
            <img
              src={heroImg}
              alt={name.join(" ")}
              className="w-full h-full object-cover"
            />
            {(["tl", "tr", "bl", "br"] as const).map((c) => (
              <span
                key={c}
                className={`absolute w-4 h-4 border-primary ${
                  c === "tl"
                    ? "-top-px -left-px border-t-2 border-l-2"
                    : c === "tr"
                      ? "-top-px -right-px border-t-2 border-r-2"
                      : c === "bl"
                        ? "-bottom-px -left-px border-b-2 border-l-2"
                        : "-bottom-px -right-px border-b-2 border-r-2"
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 mt-4 border border-border">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-4 text-center ${i < stats.length - 1 ? "border-r border-border" : ""}`}
              >
                <div className="text-xl font-bold text-primary">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
