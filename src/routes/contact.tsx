import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";

import { CtaButton, CtaLink } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ORG } from "@/constants/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HTN Foundation — Babati, Manyara, Tanzania" },
      {
        name: "description",
        content:
          "Reach the HTN Foundation team in Babati, Manyara, Tanzania. Enquiries from donors, partners, hospitals, universities and media are welcome.",
      },
      {
        property: "og:title",
        content: "Contact HTN Foundation — Babati, Manyara, Tanzania",
      },
      {
        property: "og:description",
        content:
          "Office address, phone, email, opening hours and an enquiry form.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (v) => v === "" || /^[+0-9()\-\s]{7,}$/.test(v),
      "Please enter a valid phone number.",
    ),
  organization: z.string().trim().max(120),
  subject: z.string().trim().min(3, "Please add a short subject.").max(150),
  message: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters.")
    .max(1500),
});

type Fields = z.infer<typeof schema>;
const empty: Fields = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
};

const fieldBase =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-[0.98rem] text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-mint";

function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Get in touch"
        title="Talk to the team in Babati"
        description="We welcome enquiries from donors, government and academic partners, hospitals, corporate sponsors and media. We aim to respond within two working days."
      />

      <section className="shell py-16 md:py-24" aria-labelledby="contact-grid">
        <h2 id="contact-grid" className="sr-only">
          Contact details and enquiry form
        </h2>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactDetails />
          <ContactForm />
        </div>
      </section>

      <section className="shell pb-24" aria-labelledby="map-heading">
        <Reveal>
          <h2 id="map-heading" className="eyebrow">
            Find us
          </h2>
          <div className="mt-5 overflow-hidden rounded-4xl border border-border shadow-soft">
            <iframe
              title="Map showing HTN Foundation offices in Babati, Manyara, Tanzania"
              src="https://www.openstreetmap.org/export/embed.html?bbox=35.68%2C-4.28%2C35.82%2C-4.16&layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 grayscale-[0.35]"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            *Map location shown for design purposes and will be replaced with
            the verified office pin.
          </p>
        </Reveal>
      </section>
    </>
  );
}

function ContactDetails() {
  const items = [
    {
      Icon: MapPin,
      label: "Office",
      value: (
        <>
          {ORG.address.street}
          <br />
          {ORG.address.city}, {ORG.address.region}
          <br />
          {ORG.address.country}
        </>
      ),
    },
    {
      Icon: Phone,
      label: "Phone",
      value: (
        <a
          className="hover:text-teal"
          href={`tel:${ORG.phone.replace(/\s/g, "")}`}
        >
          {ORG.phone}
        </a>
      ),
    },
    {
      Icon: Mail,
      label: "Email",
      value: (
        <a className="hover:text-teal" href={`mailto:${ORG.email}`}>
          {ORG.email}
        </a>
      ),
    },
    { Icon: Clock, label: "Office hours", value: ORG.hours },
  ];

  return (
    <Reveal>
      <div className="rounded-4xl bg-sand p-8 md:p-10">
        <p className="eyebrow">Head office</p>
        <h3 className="display-3 mt-3">Health to the Needs Foundation</h3>
        <ul className="mt-9 space-y-7">
          {items.map(({ Icon, label, value }) => (
            <li key={label} className="flex gap-4">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-background text-teal shadow-soft"
              >
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-soft">
                  {label}
                </p>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-3xl border border-border bg-background p-7">
          <p className="eyebrow">Donations</p>
          <h4 className="display-3 mt-2 text-[1.25rem]">
            Fund a programme cycle
          </h4>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
            See exactly what your gift funds and give online in a few minutes.
          </p>
          <CtaLink
            to="/donate"
            variant="donate"
            size="md"
            className="mt-6 w-full sm:w-auto"
          >
            Donate Now
          </CtaLink>
        </div>
      </div>
    </Reveal>
  );
}

function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [state, setState] = useState<"idle" | "sent">(
    "idle",
  );

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    // Build email body
    const emailBody = `Name: ${parsed.data.fullName}
Email: ${parsed.data.email}
${parsed.data.phone ? `Phone: ${parsed.data.phone}\n` : ""}${parsed.data.organization ? `Organization: ${parsed.data.organization}\n` : ""}\nMessage:\n${parsed.data.message}`;
    
    // Open email client
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(parsed.data.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    setState("sent");
    setValues(empty);
  };

  const field = (
    key: keyof Fields,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={key} className="text-sm font-semibold text-teal">
        {label}
      </label>
      <input
        id={key}
        name={key}
        value={values[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className={cn(fieldBase, "mt-2", errors[key] && "border-destructive")}
        {...props}
      />
      {errors[key] ? (
        <p id={`${key}-error`} className="mt-1.5 text-xs text-destructive">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <Reveal delay={0.1}>
      <form
        id="enquiry"
        onSubmit={onSubmit}
        noValidate
        className="scroll-mt-28 rounded-4xl border border-border bg-background p-8 shadow-soft md:p-10"
      >
        <p className="eyebrow">Send a message</p>
        <h3 className="display-3 mt-3">How can we help?</h3>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          {field("fullName", "Full name", {
            autoComplete: "name",
            required: true,
          })}
          {field("email", "Email", {
            type: "email",
            autoComplete: "email",
            required: true,
          })}
          {field("phone", "Phone (optional)", {
            type: "tel",
            autoComplete: "tel",
          })}
          {field("organization", "Organisation (optional)", {
            autoComplete: "organization",
          })}
          <div className="sm:col-span-2">
            {field("subject", "Subject", { required: true })}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-teal"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={set("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2 resize-y",
                errors.message && "border-destructive",
              )}
            />
            {errors.message ? (
              <p id="message-error" className="mt-1.5 text-xs text-destructive">
                {errors.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <CtaButton
            type="submit"
            variant="primary"
            size="lg"
          >
            <Send className="size-4" aria-hidden="true" />
            Send via Email
          </CtaButton>

          <p role="status" aria-live="polite" className="text-sm">
            {state === "sent" ? (
              <span className="text-teal">
                Opening your email client...
              </span>
            ) : null}
          </p>
        </div>
      </form>
    </Reveal>
  );
}
