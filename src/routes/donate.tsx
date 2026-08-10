import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Smartphone, Building2, Copy, Check, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ORG } from "@/constants/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Fund Primary Care in Manyara | HTN Foundation" },
      {
        name: "description",
        content:
          "Support HTN Foundation's community outreach, medical camps and prevention programmes in Manyara Region, Tanzania.",
      },
      {
        property: "og:title",
        content: "Donate — Fund Primary Care in Manyara | HTN Foundation",
      },
      {
        property: "og:description",
        content:
          "View our collection accounts and support HTN Foundation's programmes.",
      },
    ],
  }),
  component: DonatePage,
});

interface PaymentOption {
  method: string;
  displayName: string;
  accountNumber: string;
  accountName: string;
  instructions: string;
}

function DonatePage() {
  return (
    <>
      <PageHero
        breadcrumb="Donate"
        eyebrow="Support our work"
        title="Support our mission to provide primary care in Manyara"
        description="Use any of the collection accounts below to make your donation. Every contribution helps fund community outreach, medical camps, and prevention programmes."
      />

      <section className="shell py-16 md:py-24" aria-labelledby="payment-accounts">
        <h2 id="payment-accounts" className="sr-only">
          Payment collection accounts
        </h2>
        <CollectionAccounts />
      </section>
    </>
  );
}

function CollectionAccounts() {
  const paymentMethods: PaymentOption[] = [
    {
      method: "MPESA_MANUAL",
      displayName: "M-Pesa",
      accountNumber: "0768477893",
      accountName: "Kelvin Lingo",
      instructions: "Send funds to 0768477893",
    },
    {
      method: "NMB_MANUAL",
      displayName: "NMB Bank",
      accountNumber: "1234567890",
      accountName: "Kelvin Lingo",
      instructions: "Transfer to NMB Bank Account 1234567890",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <div className="mb-8 text-center">
          <h3 className="display-3">Collection Accounts</h3>
          <p className="lede mt-3 text-muted-foreground">
            Choose your preferred payment method and send your donation to the account below
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {paymentMethods.map((option, index) => (
          <Reveal key={option.method} delay={index * 0.1}>
            <AccountCard
              icon={option.method === "MPESA_MANUAL" ? <Smartphone className="size-6" strokeWidth={1.6} /> : <Building2 className="size-6" strokeWidth={1.6} />}
              option={option}
              accentColor={option.method === "MPESA_MANUAL" ? "teal" : "mint"}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="mt-10 rounded-3xl border border-border bg-sand p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 size-5 shrink-0 text-teal"
              aria-hidden="true"
            />
            <div>
              <h4 className="font-display text-lg font-semibold text-teal">
                Transparency & Accountability
              </h4>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                HTN Foundation publishes how donations are used every reporting cycle. 
                See our{" "}
                <a href="/about" className="text-teal hover:underline">
                  accountability commitments
                </a>
                . For questions, email{" "}
                <a
                  href={`mailto:${ORG.email}`}
                  className="text-teal hover:underline"
                >
                  {ORG.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function AccountCard({
  icon,
  option,
  accentColor,
}: Readonly<{
  icon: React.ReactNode;
  option: PaymentOption;
  accentColor: string;
}>) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-4xl border border-border bg-background p-8 shadow-soft transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl",
            accentColor === "teal" ? "bg-teal text-sand-light" : "bg-mint text-teal"
          )}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-xl font-semibold text-teal">
            {option.displayName}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">{option.method}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Account Number
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="font-mono text-lg font-semibold text-foreground">
              {option.accountNumber}
            </p>
            <button
              type="button"
              onClick={() => copyToClipboard(option.accountNumber)}
              className="rounded-lg p-2 text-teal transition-colors hover:bg-mint-soft"
              aria-label="Copy account number"
            >
              {copied ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Account Name
          </p>
          <p className="mt-1.5 text-base font-medium text-foreground">
            {option.accountName}
          </p>
        </div>

        <div className="rounded-2xl bg-sand p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Instructions
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            {option.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}
