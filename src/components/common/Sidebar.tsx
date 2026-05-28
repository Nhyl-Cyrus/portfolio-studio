// VIEW: mobile slide-out sidebar (used as mobile nav).
import type { NavLink } from "@/models/portfolio.model";

type Props = {
  open: boolean;
  links: NavLink[];
  onNavigate: (id: string) => void;
};

export default function Sidebar({ open, links, onNavigate }: Props) {
  if (!open) return null;
  return (
    <aside className="fixed top-16 inset-x-0 z-40 md:hidden bg-background border-b border-border flex flex-col">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(l.id);
          }}
          className="px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card border-t border-border"
        >
          {l.label}
        </a>
      ))}
    </aside>
  );
}
