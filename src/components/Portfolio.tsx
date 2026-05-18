import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/kermit-gradpic.webp";

const ROLES = ["IT Student", "Software Developer", "Problem Solver", "System Builder"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 60);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTypedRole() {
  const [text, setText] = useState("");
  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const role = ROLES[roleIdx];
      if (!deleting) {
        charIdx++;
        setText(role.slice(0, charIdx));
        if (charIdx === role.length) {
          deleting = true;
          t = setTimeout(tick, 1600);
          return;
        }
        t = setTimeout(tick, 80);
      } else {
        charIdx--;
        setText(role.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
          t = setTimeout(tick, 400);
          return;
        }
        t = setTimeout(tick, 45);
      }
    };
    t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, []);
  return text;
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formNote, setFormNote] = useState<{ msg: string; ok: boolean } | null>(null);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const typed = useTypedRole();
  useReveal();

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      sections.forEach((s) => {
        const top = (s as HTMLElement).offsetTop - 90;
        if (window.scrollY >= top) current = s.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["about", "skills", "projects", "experience", "contact"];

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setFormNote({ msg: "// Please fill in all fields.", ok: false });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setFormNote({ msg: "// Message sent! I'll get back to you soon.", ok: true });
      form.reset();
      setSending(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* NAV */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 h-16 bg-background border-b border-border transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center gap-8">
          <a href="#hero" onClick={(e) => handleNav(e, "hero")} className="font-bold text-sm tracking-tight">
            <span className="text-primary">[</span>NCG<span className="text-primary">]</span>
          </a>
          <ul className="hidden md:flex ml-auto gap-1">
            {navLinks.map((l) => (
              <li key={l}>
                <a
                  href={`#${l}`}
                  onClick={(e) => handleNav(e, l)}
                  className={`text-xs px-3 py-2 transition-colors ${
                    activeId === l
                      ? "text-foreground bg-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-auto md:ml-0 w-9 h-9 flex items-center justify-center border border-border text-foreground hover:bg-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "○" : "◑"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 border border-border"
            aria-label="Toggle menu"
          >
            <span className="w-4 h-px bg-foreground" />
            <span className="w-4 h-px bg-foreground" />
            <span className="w-4 h-px bg-foreground" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                onClick={(e) => handleNav(e, l)}
                className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card border-t border-border"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
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
              <span className="block">Nhyl Cyrus</span>
              <span className="block">J. Gervasio</span>
            </h1>
            <div className="reveal text-lg md:text-xl text-muted-foreground mb-6 flex items-center gap-2">
              <span className="text-primary">_</span>
              <span>{typed}</span>
              <span className="animate-pulse text-primary">|</span>
            </div>
            <p className="reveal text-muted-foreground max-w-xl leading-relaxed mb-8">
              Motivated IT student seeking entry-level opportunities in software development,
              data encoding, and computer systems. Skilled in programming fundamentals,
              organization, and problem-solving.
            </p>
            <div className="reveal flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => handleNav(e, "projects")}
                className="px-5 py-3 text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                view projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNav(e, "contact")}
                className="px-5 py-3 text-sm border border-border text-foreground hover:bg-card transition-colors"
              >
                get in touch
              </a>
            </div>
          </div>
          <div className="reveal">
            <div className="relative aspect-square bg-card border border-border">
              <img src={heroImg} alt="Nhyl Cyrus J. Gervasio" className="w-full h-full object-cover" />
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span
                  key={c}
                  className={`absolute w-4 h-4 border-primary ${
                    c === "tl" ? "top-[-1px] left-[-1px] border-t-2 border-l-2" :
                    c === "tr" ? "top-[-1px] right-[-1px] border-t-2 border-r-2" :
                    c === "bl" ? "bottom-[-1px] left-[-1px] border-b-2 border-l-2" :
                    "bottom-[-1px] right-[-1px] border-b-2 border-r-2"
                  }`}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 mt-4 border border-border">
              {[
                { n: "3+", l: "projects" },
                { n: "80h", l: "internship" },
                { n: "BS IT", l: "degree" },
              ].map((s, i) => (
                <div key={s.l} className={`p-4 text-center ${i < 2 ? "border-r border-border" : ""}`}>
                  <div className="text-xl font-bold text-primary">{s.n}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" num="01" label="about">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A developer who <span className="text-primary">builds with intent.</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I'm a BS Information Technology student at STI College San Jose del Monte with
              hands-on project experience across Java applications, web systems, and cloud
              platforms. My internship at San Jose del Monte City Hall's Engineering Department
              gave me real-world exposure to tech in governance contexts.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I approach every project with clarity and methodical thinking — from systems
              design to implementation and deployment.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Java", "Web Systems", "Database", "Cloud", "System Design"].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 border border-border bg-card">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[
              { t: "Education", v: "BS Information Technology", s: "STI College San Jose del Monte" },
              { t: "Location", v: "San Jose del Monte", s: "Bulacan, Philippines" },
              { t: "Focus", v: "Software Development", s: "Data Encoding · Computer Systems" },
            ].map((c) => (
              <div key={c.t} className="reveal flex gap-4 p-4 border border-border bg-card">
                <span className="text-primary text-lg">◈</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.t}</div>
                  <div className="font-semibold mt-0.5">{c.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" num="02" label="skills" alt>
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
          Technical <span className="text-primary">stack.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="reveal p-6 border border-border bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Languages</div>
            <div className="space-y-4">
              {[
                { n: "Java", w: 80 },
                { n: "HTML / CSS", w: 75 },
                { n: "JavaScript", w: 60 },
                { n: "SQL", w: 70 },
              ].map((s) => <SkillBar key={s.n} {...s} />)}
            </div>
          </div>
          <SkillTags title="Domains" tags={["System Design", "Database Management", "Web Development", "Cloud Computing", "Project Management", "Data Encoding"]} />
          <SkillTags title="Tools & Platforms" tags={["Git / GitHub", "Cloud Services", "IDE Tools", "Database GUI"]} />
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" num="03" label="projects">
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
          Things I've <span className="text-primary">built.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { n: "01", title: "I.D Processing System", desc: "A system designed to manage and automate the process of creating and issuing identification cards, streamlining administrative workflows.", tech: ["Java", "Database", "System Design"], status: "completed" },
            { n: "02", title: "Alumni Management System", desc: "A platform used to manage alumni records, events, and communication between graduates and the institution — centralizing data and engagement.", tech: ["Web System", "Database"], status: "completed" },
            { n: "03", title: "Cloud Construction Operations System", desc: "A cloud-based system designed to manage construction workflows, proposals, and project operations — built for scale and remote access.", tech: ["Cloud", "Project Management"], status: "ongoing", featured: true },
          ].map((p) => (
            <article key={p.n} className={`reveal relative p-6 border border-border bg-card hover:bg-muted/30 transition-colors ${p.featured ? "md:col-span-2 border-primary" : ""}`}>
              <div className="text-xs text-muted-foreground mb-3">{p.n}</div>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border">{t}</span>
                ))}
              </div>
              <div className={`absolute top-6 right-6 text-[10px] uppercase tracking-wider px-2 py-1 ${
                p.status === "ongoing" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
              }`}>{p.status}</div>
            </article>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" num="04" label="experience" alt>
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-10">
          Where I've <span className="text-primary">been.</span>
        </h2>
        <div className="relative space-y-8 md:pl-8 md:before:absolute md:before:left-2 md:before:top-2 md:before:bottom-2 md:before:w-px md:before:bg-border">
          {[
            { date: "2026", type: "internship", title: "Engineering Department Assistant", org: "San Jose del Monte City Hall", desc: "Completed 80 hours of on-the-job training within the Engineering Department. Gained hands-on experience in technology applications within local government operations.", tags: ["80 Hours OJT", "Government Tech"] },
            { date: "2022–2026", type: "education", title: "BS Information Technology", org: "STI College San Jose del Monte", desc: "Four-year degree program with focus on software development, database management, system design, and cloud computing. Developed multiple real-world systems as academic projects.", tags: ["Systems Development", "Database", "Cloud"] },
          ].map((t) => (
            <div key={t.title} className="reveal relative">
              <div className="hidden md:block absolute -left-8 top-2 w-3 h-3 bg-primary" />
              <div className="text-xs text-primary mb-1">{t.date}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{t.type}</div>
              <h3 className="text-xl font-bold mb-1">{t.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">{t.org}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-2xl">{t.desc}</p>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" num="05" label="contact">
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-4">
          Let's <span className="text-primary">connect.</span>
        </h2>
        <p className="reveal text-muted-foreground mb-10 max-w-xl">
          Open for collaborations, internship opportunities, or questions about my projects.
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="reveal grid sm:grid-cols-2 gap-3 content-start">
            {[
              { icon: "✉", label: "email", val: "nhylcyrusgervasio@example.com", href: "mailto:nhylcyrusgervasio@example.com" },
              { icon: "☎", label: "phone", val: "+63 912 345 6789" },
              { icon: "◎", label: "location", val: "San Jose del Monte, Bulacan, PH" },
              { icon: "⌥", label: "github", val: "github.com/Nhyl-Cyrus", href: "https://github.com/Nhyl-Cyrus" },
            ].map((c) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Tag key={c.label} {...(c.href ? { href: c.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="flex gap-3 p-4 border border-border bg-card hover:bg-muted/30 transition-colors">
                  <span className="text-primary text-lg">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="text-xs mt-1 truncate">{c.val}</div>
                  </div>
                </Tag>
              );
            })}
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="reveal space-y-4">
            {(["name", "email"] as const).map((f) => (
              <div key={f}>
                <label htmlFor={f} className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">{f}</label>
                <input
                  id={f}
                  name={f}
                  type={f === "email" ? "email" : "text"}
                  placeholder={f === "email" ? "your@email.com" : "your name"}
                  autoComplete="off"
                  className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="what's on your mind?"
                className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="px-5 py-3 text-sm bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {sending ? "sending..." : "send message →"}
            </button>
            {formNote && (
              <div className={`text-xs ${formNote.ok ? "text-primary" : "text-destructive"}`}>{formNote.msg}</div>
            )}
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="font-bold text-foreground">
            <span className="text-primary">[</span>NCG<span className="text-primary">]</span>
          </div>
          <p>© 2026 Nhyl Cyrus J. Gervasio. Built with React & Tailwind.</p>
          <a href="https://github.com/Nhyl-Cyrus" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            github
          </a>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, num, label, alt, children }: { id: string; num: string; label: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 px-6 ${alt ? "bg-muted/20" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-8 text-xs uppercase tracking-wider">
          <span className="text-primary">{num}</span>
          <span className="w-8 h-px bg-border" />
          <span className="text-muted-foreground">{label}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

function SkillBar({ n, w }: { n: string; w: number }) {
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setFilled(w), 200);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [w]);
  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-1">
        <span>{n}</span>
        <span className="text-muted-foreground">{w}%</span>
      </div>
      <div className="h-1 bg-muted overflow-hidden">
        <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${filled}%` }} />
      </div>
    </div>
  );
}

function SkillTags({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div className="reveal p-6 border border-border bg-card">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{title}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs px-3 py-1.5 border border-border bg-background">{t}</span>
        ))}
      </div>
    </div>
  );
}
