// VIEW: small inline loader / spinner.
import { cn } from "@/lib/utils";

export default function Loader({
  label = "loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-xs text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="w-3 h-3 border border-border border-t-primary rounded-full animate-spin" />
      <span>{label}</span>
    </div>
  );
}
