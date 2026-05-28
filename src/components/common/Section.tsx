// VIEW: section shell – wraps a page section with consistent spacing + title.
import type { ReactNode } from "react";
import SectionTitle from "./SectionTitle";

type Props = {
  id: string;
  num: string;
  label: string;
  alt?: boolean;
  children: ReactNode;
};

export default function Section({ id, num, label, alt, children }: Props) {
  return (
    <section id={id} className={`py-20 px-6 ${alt ? "bg-muted/20" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle num={num} label={label} />
        {children}
      </div>
    </section>
  );
}
