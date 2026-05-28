// VIEW: top navigation bar. Pure presentation – receives state via props.
import type { NavLink } from "@/models/portfolio.model";

type Props = {
  brand: string;
  links: NavLink[];
  activeId: string;
  scrolled: boolean;
  theme: "dark" | "light";
  menuOpen: boolean;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavigate: (id: string) => void;
};

export default function Navbar({
  brand,
  links,
  activeId,
  scrolled,
  theme,
  menuOpen,
  onToggleTheme,
  onToggleMenu,
  onNavigate,
}: Props) {
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-16 bg-background border-b border-border transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center gap-8">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="font-bold text-sm tracking-tight"
        >
          <span className="text-primary">[</span>
          {brand}
          <span className="text-primary">]</span>
        </a>

        <ul className="hidden md:flex ml-auto gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => handleClick(e, l.id)}
                className={`text-xs px-3 py-2 transition-colors ${
                  activeId === l.id
                    ? "text-foreground bg-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={onToggleTheme}
          className="ml-auto md:ml-0 w-9 h-9 flex items-center justify-center border border-border text-foreground hover:bg-card transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "○" : "◑"}
        </button>

        <button
          onClick={onToggleMenu}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 border border-border"
          aria-label="Toggle menu"
        >
          <span className="w-4 h-px bg-foreground" />
          <span className="w-4 h-px bg-foreground" />
          <span className="w-4 h-px bg-foreground" />
        </button>
      </div>
    </nav>
  );
}
