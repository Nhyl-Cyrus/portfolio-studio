// VIEW: Contact section. Uses controller hook for form state.
import Section from "@/components/common/Section";
import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";
import Loader from "@/components/common/Loader";
import { FormInput, FormTextarea } from "@/components/common/FormInput";
import { useContactForm } from "@/controllers/useContactForm";
import { CONTACT_ITEMS } from "@/models/portfolio.model";

export default function ContactSection() {
  const { formRef, sending, note, handleSubmit } = useContactForm();

  return (
    <Section id="contact" num="05" label="contact">
      <h2 className="reveal text-3xl md:text-4xl font-bold mb-4">
        Let's <span className="text-primary">connect.</span>
      </h2>
      <p className="reveal text-muted-foreground mb-10 max-w-xl">
        Open for collaborations, internship opportunities, or questions about my
        projects.
      </p>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="reveal grid sm:grid-cols-2 gap-3 content-start">
          {CONTACT_ITEMS.map((c) => {
            const Tag = (c.href ? "a" : "div") as "a" | "div";
            return (
              <Tag
                key={c.label}
                {...(c.href
                  ? { href: c.href, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex gap-3 p-4 border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <span className="text-primary text-lg">{c.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="text-xs mt-1 truncate">{c.value}</div>
                </div>
              </Tag>
            );
          })}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="reveal space-y-4">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="name"
            placeholder="your name"
            autoComplete="off"
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            label="email"
            placeholder="your@email.com"
            autoComplete="off"
          />
          <FormTextarea
            id="message"
            name="message"
            label="message"
            rows={5}
            placeholder="what's on your mind?"
          />
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={sending}>
              {sending ? "sending..." : "send message →"}
            </Button>
            {sending && <Loader label="sending" />}
          </div>
          {note && <Toast message={note.message} ok={note.ok} />}
        </form>
      </div>
    </Section>
  );
}
