// VIEW: reusable card surface.
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hoverable?: boolean;
  accent?: boolean;
};

export default function Card({
  className,
  hoverable,
  accent,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        "p-6 border bg-card",
        accent ? "border-primary" : "border-border",
        hoverable && "hover:bg-muted/30 transition-colors",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
