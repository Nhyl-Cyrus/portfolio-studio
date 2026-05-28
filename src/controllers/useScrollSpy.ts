// CONTROLLER: tracks scroll position + active section id for nav highlighting.
import { useEffect, useState } from "react";

export function useScrollSpy(defaultId = "hero") {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(defaultId);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let current = defaultId;
      sections.forEach((s) => {
        const top = (s as HTMLElement).offsetTop - 90;
        if (window.scrollY >= top) current = s.id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [defaultId]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return { scrolled, activeId, scrollTo };
}
