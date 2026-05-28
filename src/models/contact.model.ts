// MODEL: contact data + business logic (validation + send simulation)
import type { ContactItem, ContactPayload, SendResult } from "./types";

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "✉",
    label: "email",
    value: "nhylcyrusgervasio@example.com",
    href: "mailto:nhylcyrusgervasio@example.com",
  },
  { icon: "☎", label: "phone", value: "+63 912 345 6789" },
  { icon: "◎", label: "location", value: "San Jose del Monte, Bulacan, PH" },
  {
    icon: "⌥",
    label: "github",
    value: "github.com/Nhyl-Cyrus",
    href: "https://github.com/Nhyl-Cyrus",
  },
];

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<SendResult> {
  const { name, email, message } = payload;
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, message: "// Please fill in all fields." };
  }
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true, message: "// Message sent! I'll get back to you soon." };
}
