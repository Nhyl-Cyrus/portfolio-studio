// VIEW: site footer.
type Props = { brand: string; copyright: string; githubUrl: string };

export default function Footer({ brand, copyright, githubUrl }: Props) {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="font-bold text-foreground">
          <span className="text-primary">[</span>
          {brand}
          <span className="text-primary">]</span>
        </div>
        <p>{copyright}</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          github
        </a>
      </div>
    </footer>
  );
}
