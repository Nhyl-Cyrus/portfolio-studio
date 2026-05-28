// CONTROLLER: contact form state + submission flow (delegates to model).
import { useRef, useState } from "react";
import { sendContactMessage, type SendResult } from "@/models/portfolio.model";

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState<SendResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    setSending(true);
    const result = await sendContactMessage(payload);
    setNote(result);
    setSending(false);
    if (result.ok) form.reset();
  };

  return { formRef, sending, note, handleSubmit };
}
