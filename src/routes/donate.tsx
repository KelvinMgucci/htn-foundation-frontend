import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Smartphone, Building2, Copy, Check, Loader2, ShieldCheck } from "lucide-react";

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
  isActive: boolean;
}

interface PaymentMethods {
  stripe?: PaymentOption;
  mpesa?: PaymentOption;
  nmb?: PaymentOption;
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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/donations/payment-methods");
        if (!response.ok) throw new Error("Failed to fetch payment methods");
        const data = await response.json();
        setPaymentMethods(data);
      } catch (err) {
        setError("Unable to load payment methods. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-teal" aria-hidden="true" />
        <span className="sr-only">Loading payment methods...</span>
      </div>
    );
  }

  if (error || !paymentMethods) {
    return (
      <div className="mx-auto max-w-2xl rounded-4xl border border-border bg-background p-10 text-center">
        <p className="text-muted-foreground">{error || "No payment methods available."}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Please contact us at{" "}
          <a href={`mailto:${ORG.email}`} className="text-teal hover:underline">
            {ORG.email}
          </a>{" "}
          for donation information.
        </p>
      </div>
    );
  }

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
        {paymentMethods.mpesa && paymentMethods.mpesa.isActive && (
          <Reveal delay={0.1}>
            <AccountCard
              icon={<Smartphone className="size-6" strokeWidth={1.6} />}
              option={paymentMethods.mpesa}
              accentColor="teal"
            />
          </Reveal>
        )}

        {paymentMethods.nmb && paymentMethods.nmb.isActive && (
          <Reveal delay={0.2}>
            <AccountCard
              icon={<Building2 className="size-6" strokeWidth={1.6} />}
              option={paymentMethods.nmb}
              accentColor="mint"
            />
          </Reveal>
        )}
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
