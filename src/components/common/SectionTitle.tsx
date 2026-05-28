// VIEW: numbered section title used at the top of each main section.
type Props = { num: string; label: string };

export default function SectionTitle({ num, label }: Props) {
  return (
    <div className="reveal flex items-center gap-3 mb-8 text-xs uppercase tracking-wider">
      <span className="text-primary">{num}</span>
      <span className="w-8 h-px bg-border" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
