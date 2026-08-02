import { CtaLink } from "@/components/common/Cta";
import { Reveal } from "@/components/common/Reveal";

export function ClosingCta() {
  return (
    <section className="shell py-20 md:py-28">
      <Reveal className="grain relative overflow-hidden rounded-4xl bg-sand px-7 py-16 md:px-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-gold/20 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <p className="eyebrow">Support our work</p>
          <h2 className="display-2 mt-3">
            Every contribution becomes a consultation, a screening, a referral.
          </h2>
          <p className="lede mt-5">
            Whether you fund a programme, co-deliver services or bring technical
            expertise, we structure partnerships around measurable outcomes and
            open reporting.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaLink to="/donate" variant="donate" size="lg">
              Donate Now
            </CtaLink>
            <CtaLink
              to="/partnerships"
              hash="apply"
              variant="outline"
              size="lg"
            >
              Partner with us
            </CtaLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
