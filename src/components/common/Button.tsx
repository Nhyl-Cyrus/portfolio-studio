// VIEW: reusable button with variants.
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const BASE = "px-5 py-3 text-sm transition-colors disabled:opacity-50";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-border text-foreground hover:bg-card",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}
