import { createFileRoute } from "@tanstack/react-router";

import campImage from "@/assets/medical-camp.png";
import { ImpactRibbon } from "@/components/common/ImpactRibbon";
import { ProgramCard } from "@/components/common/ProgramCard";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PROGRAMS } from "@/constants/site";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — Community Health Delivery | HTN Foundation" },
      {
        name: "description",
        content:
          "Eight HTN Foundation programmes: community outreach, health education, medical camps, emergency care, NCD prevention, infectious disease control, WASH and research.",
      },
      {
        property: "og:title",
        content: "Programs — Community Health Delivery | HTN Foundation",
      },
      {
        property: "og:description",
        content:
          "How HTN Foundation delivers primary healthcare, prevention and training across Manyara Region, Tanzania.",
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Programs"
        eyebrow="Our programmes"
        title="Eight programmes, one continuum of care"
        description="From prevention in the village to referral at the district hospital, our programmes are designed to connect rather than duplicate. Each one has defined outcomes, a delivery partner and a reporting cycle."
      />

      <section className="shell py-16 md:py-24" aria-labelledby="programs-grid">
        <h2 id="programs-grid" className="sr-only">
          Programme directory
        </h2>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <StaggerItem key={program.slug} className="h-full">
              <ProgramCard
                id={program.slug}
                slug={program.slug}
                number={program.number}
                title={program.title}
                description={program.description}
                Icon={program.icon}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section
        className="bg-sand py-20 md:py-28"
        aria-labelledby="delivery-model"
      >
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-4xl shadow-soft">
              <img
                src={campImage}
                width={1408}
                height={1008}
                loading="lazy"
                alt="Clinicians screening patients at an outdoor medical camp in rural Tanzania"
                className="aspect-4/3 size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Delivery model</p>
            <h2 className="display-2 mt-3">
              Designed with districts, delivered with communities
            </h2>
            <p className="lede mt-5">
              Every programme cycle begins with a joint planning session with
              district health management, followed by community mobilisation
              through ward committees. Clinical activity is documented in the
              national reporting format so results remain usable after we leave.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                [
                  "Joint planning",
                  "Priorities agreed with district health management teams.",
                ],
                [
                  "Local delivery",
                  "Community health workers lead mobilisation and follow-up.",
                ],
                [
                  "Shared data",
                  "Records entered into national health information systems.",
                ],
                [
                  "Open reporting",
                  "Results published to partners and funders each cycle.",
                ],
              ].map(([term, def]) => (
                <div key={term} className="border-t border-border pt-4">
                  <dt className="font-semibold text-teal">{term}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {def}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <ImpactRibbon heading="Programme results to date" />
      <ClosingCta />
    </>
  );
}
