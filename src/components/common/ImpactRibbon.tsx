import { IMPACT_FOOTNOTE, IMPACT_STATS } from "@/constants/site";
import { Counter } from "./Counter";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * Signature impact ribbon — reused across major pages.
 */
export function ImpactRibbon({
  heading = "Measured impact, openly reported",
}: {
  heading?: string;
}) {
  return (
    <section
      aria-labelledby="impact-heading"
      className="grain relative overflow-hidden bg-teal py-20 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-mint/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="shell relative">
        <p className="eyebrow text-mint">Our reach</p>
        <h2
          id="impact-heading"
          className="display-2 mt-3 max-w-2xl text-sand-light"
        >
          {heading}
        </h2>

        <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="border-t border-sand-light/20 pt-6">
                <p className="font-display text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none text-gold">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-lg font-semibold text-sand-light">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-sand-light/70">
                  {stat.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-sand-light/60">
          {IMPACT_FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
