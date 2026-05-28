// VIEW: small inline toast / notification.
import { cn } from "@/lib/utils";

type Props = { message: string; ok?: boolean; className?: string };

export default function Toast({ message, ok = true, className }: Props) {
  return (
    <div
      role="status"
      className={cn(
        "text-xs",
        ok ? "text-primary" : "text-destructive",
        className,
      )}
    >
      {message}
    </div>
  );
}
