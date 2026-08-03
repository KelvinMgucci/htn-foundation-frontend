import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Check, HandCoins, Heart, Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";

import { CtaButton } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ORG } from "@/constants/site";
import { postJson } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Fund Primary Care in Manyara | HTN Foundation" },
      {
        name: "description",
        content:
          "Make a one-time or monthly gift to HTN Foundation and fund community outreach, medical camps and prevention programmes in Manyara Region, Tanzania.",
      },
      {
        property: "og:title",
        content: "Donate — Fund Primary Care in Manyara | HTN Foundation",
      },
      {
        property: "og:description",
        content:
          "See exactly what your gift funds, choose a one-time or monthly amount, and support HTN Foundation's programmes.",
      },
    ],
  }),
  component: DonatePage,
});

const IMPACT_TIERS = [
  { amount: 25, label: "Funds one household screening and follow-up visit." },
  {
    amount: 50,
    label: "Funds a full day of village health education outreach.",
  },
  {
    amount: 100,
    label: "Covers referral transport and consultation for a family.",
  },
  { amount: 250, label: "Sponsors one day of a mobile medical camp." },
] as const;

const AMOUNTS = [25, 50, 100, 250, 500] as const;

function DonatePage() {
  return (
    <>
      <PageHero
        breadcrumb="Donate"
        eyebrow="Support our work"
        title="Every gift becomes a consultation, a screening, a referral"
        description="Choose an amount, one-time or monthly, and see exactly what it funds. We report openly on how donations are used each cycle."
      />

      <section className="shell py-16 md:py-24" aria-labelledby="donate-grid">
        <h2 id="donate-grid" className="sr-only">
          Ways to give and donation form
        </h2>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ImpactSidebar />
          <DonationForm />
        </div>
      </section>
    </>
  );
}

function ImpactSidebar() {
  return (
    <Reveal>
      <div className="rounded-4xl bg-sand p-8 md:p-10">
        <p className="eyebrow">Where it goes</p>
        <h3 className="display-3 mt-3">What your gift funds</h3>
        <ul className="mt-8 space-y-6">
          {IMPACT_TIERS.map((tier) => (
            <li key={tier.amount} className="flex gap-4">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-background text-teal shadow-soft"
              >
                <HandCoins className="size-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg text-teal">${tier.amount}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {tier.label}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-3xl border border-border bg-background p-7">
          <p className="eyebrow">Other ways to give</p>
          <h4 className="display-3 mt-2 text-[1.15rem]">
            Bank transfer or mobile money
          </h4>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
            Prefer to give another way? Email{" "}
            <a
              href={`mailto:${ORG.email}`}
              className="text-teal hover:underline"
            >
              {ORG.email}
            </a>{" "}
            for bank transfer or mobile money details.
          </p>
        </div>

        <div className="mt-8 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck
            className="mt-0.5 size-4 shrink-0 text-mint"
            aria-hidden="true"
          />
          <p>
            HTN Foundation publishes how donations are used every reporting
            cycle. See our{" "}
            <a href="/about" className="text-teal hover:underline">
              accountability commitments
            </a>
            .
          </p>
        </div>
      </div>
    </Reveal>
  );
}

const donorSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),
  phone: z.string().trim().max(30).optional(),
  paymentMethod: z.string().trim().min(1, "Please choose a payment method."),
  message: z.string().trim().max(500).optional(),
});

type DonorFields = z.infer<typeof donorSchema>;
const emptyDonor: DonorFields = { fullName: "", email: "", phone: undefined, paymentMethod: "", message: undefined };

const fieldBase =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-[0.98rem] text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-mint";

function DonationForm() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [values, setValues] = useState<DonorFields>(emptyDonor);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DonorFields, string>>
  >({});
  const [amountError, setAmountError] = useState<string | undefined>();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );

  const effectiveAmount = customAmount !== "" ? Number(customAmount) : amount;

  const set =
    (key: keyof DonorFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const label = useMemo(() => {
    const amountLabel =
      Number.isFinite(effectiveAmount) && effectiveAmount > 0
        ? `$${effectiveAmount.toLocaleString()}`
        : "$0";
    return frequency === "monthly"
      ? `Donate ${amountLabel} / month`
      : `Donate ${amountLabel} now`;
  }, [effectiveAmount, frequency]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!Number.isFinite(effectiveAmount) || effectiveAmount <= 0) {
      setAmountError("Please choose or enter an amount greater than zero.");
      return;
    }
    setAmountError(undefined);

    const parsed = donorSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof DonorFields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof DonorFields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setState("idle");
      return;
    }

    setState("sending");
    try {
      await postJson("/donations", {
        amount: effectiveAmount,
        currency: "USD",
        paymentMethod: values.paymentMethod,
        donorEmail: values.email,
        donorName: values.fullName,
        donorPhone: values.phone || undefined,
        message: values.message || undefined,
      });
      setState("sent");
      setValues(emptyDonor);
      setAmount(50);
      setCustomAmount("");
    } catch {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <Reveal delay={0.1}>
        <div className="flex h-full flex-col items-center justify-center rounded-4xl border border-border bg-background p-10 text-center shadow-soft md:p-14">
          <span
            aria-hidden="true"
            className="grid size-16 place-items-center rounded-full bg-mint-soft text-teal"
          >
            <Heart className="size-7" strokeWidth={1.8} />
          </span>
          <h3 className="display-3 mt-6">Thank you for your generosity</h3>
          <p className="lede mt-3 max-w-md">
            Your donation of {frequency === "monthly" ? "monthly " : ""}${effectiveAmount.toLocaleString()} has been recorded. Our team will follow up by email to confirm your gift and complete payment.
          </p>
          <CtaButton
            type="button"
            variant="outline"
            size="md"
            className="mt-8"
            onClick={() => setState("idle")}
          >
            Make another gift
          </CtaButton>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={0.1}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-4xl border border-border bg-background p-8 shadow-soft md:p-10"
      >
        <p className="eyebrow">Make a gift</p>
        <h3 className="display-3 mt-3">Choose an amount</h3>

        <div className="mt-7 inline-flex rounded-full border border-border bg-sand p-1">
          {(
            [
              { key: "once", label: "One-time" },
              { key: "monthly", label: "Monthly" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              aria-pressed={frequency === opt.key}
              onClick={() => setFrequency(opt.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                frequency === opt.key
                  ? "bg-teal text-sand-light"
                  : "text-teal/70 hover:text-teal",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={customAmount === "" && amount === value}
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
                setAmountError(undefined);
              }}
              className={cn(
                "rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors",
                customAmount === "" && amount === value
                  ? "border-teal bg-teal text-sand-light"
                  : "border-input bg-background text-teal hover:border-mint hover:bg-mint-soft",
              )}
            >
              ${value}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label
            htmlFor="custom-amount"
            className="text-sm font-semibold text-teal"
          >
            Or enter a custom amount (USD)
          </label>
          <input
            id="custom-amount"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="e.g. 75"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmountError(undefined);
            }}
            className={cn(
              fieldBase,
              "mt-2",
              amountError && "border-destructive",
            )}
          />
          {amountError ? (
            <p className="mt-1.5 text-xs text-destructive">{amountError}</p>
          ) : null}
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-teal"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={set("fullName")}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2",
                errors.fullName && "border-destructive",
              )}
            />
            {errors.fullName ? (
              <p
                id="fullName-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-semibold text-teal">
              Email
            </label>
            <input
              id="email"
              name="email"
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
            <label htmlFor="phone" className="text-sm font-semibold text-teal">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2",
                errors.phone && "border-destructive",
              )}
            />
            {errors.phone ? (
              <p id="phone-error" className="mt-1.5 text-xs text-destructive">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="paymentMethod"
              className="text-sm font-semibold text-teal"
            >
              Payment method
            </label>
            <select
              id="paymentMethod"
              required
              value={values.paymentMethod}
              onChange={set("paymentMethod")}
              aria-invalid={Boolean(errors.paymentMethod)}
              aria-describedby={errors.paymentMethod ? "paymentMethod-error" : undefined}
              className={cn(
                fieldBase,
                "mt-2",
                errors.paymentMethod && "border-destructive",
              )}
            >
              <option value="" disabled>
                Choose a payment method
              </option>
              <option value="MPESA_MANUAL">M-Pesa</option>
              <option value="NMB_MANUAL">NMB Bank</option>
            </select>
            {errors.paymentMethod ? (
              <p
                id="paymentMethod-error"
                className="mt-1.5 text-xs text-destructive"
              >
                {errors.paymentMethod}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-teal"
            >
              Dedication or message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={values.message}
              onChange={set("message")}
              className={cn(fieldBase, "mt-2 resize-y")}
            />
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <CtaButton
            type="submit"
            variant="donate"
            size="lg"
            disabled={state === "sending"}
            className="w-full sm:w-auto"
          >
            {state === "sending" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Check className="size-4" aria-hidden="true" />
            )}
            {state === "sending" ? "Processing…" : label}
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

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          *Your donation will be processed via your selected payment method.
          Our team will follow up by email to confirm your gift.
        </p>
      </form>
    </Reveal>
  );
}
