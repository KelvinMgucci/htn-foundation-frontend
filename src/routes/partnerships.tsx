import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  BadgeCheck,
  BarChart3,
  Check,
  GraduationCap,
  Globe2,
  Handshake,
  Layers,
  Loader2,
  Repeat,
  Send,
} from "lucide-react";
import { z } from "zod";

import { CtaButton, CtaLink } from "@/components/common/Cta";
import { ImpactRibbon } from "@/components/common/ImpactRibbon";
import { LogoMarquee } from "@/components/common/LogoMarquee";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ORG, PARTNER_CATEGORIES, PARTNER_LOGOS } from "@/constants/site";
import { postJson } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships — Collaborate with HTN Foundation" },
      {
        name: "description",
        content:
          "HTN Foundation partners with government, hospitals, universities, NGOs, corporates, donors and community organisations to strengthen health systems in Tanzania.",
      },
      {
        property: "og:title",
        content: "Partnerships — Collaborate with HTN Foundation",
      },
      {
        property: "og:description",
        content:
          "Our partnership philosophy, categories of collaboration and what partners can expect from working with us.",
      },
    ],
  }),
  component: PartnershipsPage,
});

const benefits = [
  {
    Icon: BarChart3,
    title: "Transparent reporting",
    body: "Agreed indicators, quarterly narrative and financial reporting, and access to underlying programme data.",
  },
  {
    Icon: Layers,
    title: "Integrated delivery",
    body: "Activities run through district structures, avoiding parallel systems and duplicated coverage.",
  },
  {
    Icon: GraduationCap,
    title: "Research and teaching",
    body: "Field placements, operational research collaborations and co-authored evaluation outputs.",
  },
  {
    Icon: Globe2,
    title: "Local reach",
    body: "Established relationships with ward leadership across Manyara and neighbouring regions.",
  },
  {
    Icon: BadgeCheck,
    title: "Compliance ready",
    body: "Procurement, safeguarding and financial controls designed for institutional funder requirements.",
  },
  {
    Icon: Repeat,
    title: "Continuity",
    body: "Handover plans and local capacity building so services continue beyond the funding period.",
  },
];

function PartnershipsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Partnerships"
        eyebrow="Working together"
        title="Partnership is our delivery model, not an add-on"
        description="We do not build parallel health services. We contribute clinical capacity, community reach and data discipline to systems that already exist, and we structure every collaboration around outcomes both sides can verify."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <CtaLink to="/partnerships" hash="apply" variant="primary" size="lg">
            Become a Partner
          </CtaLink>
        </div>
      </PageHero>

      <section className="shell py-16 md:py-24" aria-labelledby="categories">
        <SectionHeading
          id="categories"
          eyebrow="Who we work with"
          title="Seven categories of partnership"
        />
        <Stagger className="mt-12 flex flex-wrap gap-4">
          {PARTNER_CATEGORIES.map((c) => (
            <StaggerItem key={c.title} className="max-w-md flex-1 basis-72">
              <div className="card-soft h-full p-6">
                <span className="inline-flex rounded-full bg-mint-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  {c.title}
                </span>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-sand py-20 md:py-28" aria-labelledby="benefits">
        <div className="shell">
          <SectionHeading
            id="benefits"
            eyebrow="What partners can expect"
            title="Practical commitments we make to every partner"
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <article className="card-soft group h-full p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-2xl bg-background text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-sand-light"
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="display-3 mt-6 text-[1.25rem]">{title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        className="shell py-16 md:py-20"
        aria-labelledby="current-partners"
      >
        <Reveal>
          <h2 id="current-partners" className="eyebrow text-center">
            A selection of institutions we collaborate with
          </h2>
          <LogoMarquee items={PARTNER_LOGOS} />
        </Reveal>
      </section>

      <section
        className="bg-sand py-20 md:py-28"
        aria-labelledby="apply-heading"
      >
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-2xl bg-background text-teal shadow-soft"
            >
              <Handshake className="size-6" strokeWidth={1.6} />
            </span>
            <p className="eyebrow mt-6">Get started</p>
            <h2 id="apply-heading" className="display-2 mt-3">
              Become a partner
            </h2>
            <p className="lede mt-5">
              Tell us about your organisation and what you'd like to work on. A
              member of our partnerships team will respond within two working
              days to schedule an introductory call.
            </p>
          </Reveal>
          <PartnerApplicationForm />
        </div>
      </section>

      <ImpactRibbon heading="What partnership has delivered" />
      <ClosingCta />
    </>
  );
}

const partnerSchema = z.object({
  organization: z
    .string()
    .trim()
    .min(2, "Please enter your organisation name.")
    .max(150),
  contactName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),
  category: z.string().trim().min(1, "Please choose a category."),
  message: z
    .string()
    .trim()
    .min(
      20,
      "Please describe the proposed collaboration in at least 20 characters.",
    )
    .max(1500),
});

type PartnerFields = z.infer<typeof partnerSchema>;
const emptyPartner: PartnerFields = {
  organization: "",
  contactName: "",
  email: "",
  category: "",
  message: "",
};

const fieldBase =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-[0.98rem] text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-mint";

function PartnerApplicationForm() {
  const [values, setValues] = useState<PartnerFields>(emptyPartner);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PartnerFields, string>>
  >({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const set =
    (key: keyof PartnerFields) => (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = partnerSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof PartnerFields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PartnerFields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setState("idle");
      return;
    }

    setState("sending");
    try {
      await postJson("/partnerships/apply", parsed.data);
      setState("sent");
      setValues(emptyPartner);
    } catch {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <Reveal delay={0.1}>
        <div
          id="apply"
          className="scroll-mt-28 rounded-4xl border border-border bg-background p-8 text-center shadow-soft md:p-14"
        >
          <span
            aria-hidden="true"
            className="mx-auto grid size-16 place-items-center rounded-full bg-mint-soft text-teal"
          >
            <Check className="size-7" strokeWidth={1.8} />
          </span>
          <h3 className="display-3 mt-6">Thank you for reaching out</h3>
          <p className="lede mx-auto mt-3 max-w-md">
            Your partnership enquiry has been received. Our team will follow up
            by email within two working days.
          </p>
          <CtaButton
            type="button"
            variant="outline"
            size="md"
            className="mt-8"
            onClick={() => setState("idle")}
          >
            Submit another enquiry
          </CtaButton>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={0.1}>
      <form
        id="apply"
        onSubmit={onSubmit}
        noValidate
        className="scroll-mt-28 rounded-4xl border border-border bg-background p-8 shadow-soft md:p-10"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="organization"
              className="text-sm font-semibold text-teal"
            >
              Organisation
            </label>
            <input
              id="organization"
              autoComplete="organization"
              required
              value={values.organization}
              onChange={set("organization")}
              aria-invalid={Boolean(errors.organization)}
              aria-describedby={
                errors.organization ? "organization-error" : undefined
              }
              className={cn(
                fieldBase,
                "mt-2",
                errors.organization && "border-destructive",
              )}
            />
            {errors.organization ? (
              <p
                id="organization-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.organization}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="contactName"
              className="text-sm font-semibold text-teal"
            >
              Contact name
            </label>
            <input
              id="contactName"
              autoComplete="name"
              required
              value={values.contactName}
              onChange={set("contactName")}
              aria-invalid={Boolean(errors.contactName)}
              aria-describedby={
                errors.contactName ? "contactName-error" : undefined
              }
              className={cn(
                fieldBase,
                "mt-2",
                errors.contactName && "border-destructive",
              )}
            />
            {errors.contactName ? (
              <p
                id="contactName-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.contactName}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold text-teal">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2",
                errors.email && "border-destructive",
              )}
            />
            {errors.email ? (
              <p id="email-error" className="mt-1.5 text-xs text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="category"
              className="text-sm font-semibold text-teal"
            >
              Partnership category
            </label>
            <select
              id="category"
              required
              value={values.category}
              onChange={set("category")}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? "category-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2",
                errors.category && "border-destructive",
              )}
            >
              <option value="" disabled>
                Choose a category
              </option>
              {PARTNER_CATEGORIES.map((c) => (
                <option key={c.title} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.category ? (
              <p
                id="category-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.category}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-teal"
            >
              Proposed collaboration
            </label>
            <textarea
              id="message"
              rows={5}
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
            disabled={state === "sending"}
          >
            {state === "sending" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {state === "sending" ? "Sending…" : "Submit enquiry"}
          </CtaButton>

          {state === "failed" ? (
            <p
              role="status"
              aria-live="polite"
              className="text-sm text-destructive"
            >
              Something went wrong. Please email {ORG.email} directly.
            </p>
          ) : null}
        </div>
      </form>
    </Reveal>
  );
}
