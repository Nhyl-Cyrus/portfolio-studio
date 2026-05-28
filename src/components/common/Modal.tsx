// VIEW: simple accessible modal dialog. Reusable across the app.
import { useEffect } from "react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-background border border-border p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
}
