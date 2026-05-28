// VIEW: reusable form input + textarea.
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const FIELD =
  "w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors";

const LABEL = "text-[10px] uppercase tracking-wider text-muted-foreground block mb-1";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function FormInput({ label, id, className, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <input id={id} className={cn(FIELD, className)} {...rest} />
    </div>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

export function FormTextarea({ label, id, className, ...rest }: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <textarea id={id} className={cn(FIELD, "resize-none", className)} {...rest} />
    </div>
  );
}
