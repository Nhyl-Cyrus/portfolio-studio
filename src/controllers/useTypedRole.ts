// CONTROLLER: typewriter animation for role list.
import { useEffect, useState } from "react";

export function useTypedRole(roles: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;

    const tick = () => {
      const role = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        setText(role.slice(0, charIdx));
        if (charIdx === role.length) {
          deleting = true;
          t = setTimeout(tick, 1600);
          return;
        }
        t = setTimeout(tick, 80);
      } else {
        charIdx--;
        setText(role.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          t = setTimeout(tick, 400);
          return;
        }
        t = setTimeout(tick, 45);
      }
    };
    t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [roles]);

  return text;
}
