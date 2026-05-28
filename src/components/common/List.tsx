// VIEW: simple vertical list / "table" of labelled items.
import type { ReactNode } from "react";

type Item = {
  key: string;
  icon?: ReactNode;
  label: string;
  primary: ReactNode;
  secondary?: ReactNode;
};

type Props = { items: Item[]; className?: string };

export default function List({ items, className = "" }: Props) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <div
          key={it.key}
          className="reveal flex gap-4 p-4 border border-border bg-card"
        >
          {it.icon && <span className="text-primary text-lg">{it.icon}</span>}
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {it.label}
            </div>
            <div className="font-semibold mt-0.5">{it.primary}</div>
            {it.secondary && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {it.secondary}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
