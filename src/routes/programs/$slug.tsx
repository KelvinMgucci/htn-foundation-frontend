import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Counter } from "@/components/common/Counter";
import { CtaLink } from "@/components/common/Cta";
import { ImpactRibbon } from "@/components/common/ImpactRibbon";
import { ProgramCard } from "@/components/common/ProgramCard";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PROGRAMS } from "@/constants/site";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = PROGRAMS.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return program;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | HTN Foundation Programmes` },
          { name: "description", content: loaderData.description },
          {
            property: "og:title",
            content: `${loaderData.title} | HTN Foundation Programmes`,
          },
          { property: "og:description", content: loaderData.description },
        ]
      : [],
  }),
  component: ProgramDetailPage,
});

function ProgramDetailPage() {
  const program = Route.useLoaderData();
  const Icon = program.icon;
  const related = PROGRAMS.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumb={program.title}
        eyebrow={`Programme ${program.number}`}
        title={program.title}
        description={program.overview}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <CtaLink to="/donate" variant="donate" size="md">
            Support this programme
          </CtaLink>
          <CtaLink to="/programs" variant="outline" size="md">
            All programmes
          </CtaLink>
        </div>
      </PageHero>

      <section
        className="shell py-16 md:py-24"
        aria-labelledby="program-overview"
      >
        <h2 id="program-overview" className="sr-only">
          {program.title} overview
        </h2>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-4xl shadow-soft">
              <img
                src={program.image}
                width={1408}
                height={1056}
                loading="lazy"
                alt={`${program.title} — HTN Foundation programme in Manyara, Tanzania`}
                className="aspect-4/3 size-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-2xl bg-mint-soft text-teal"
            >
              <Icon className="size-6" strokeWidth={1.6} />
            </span>
            <p className="lede mt-6">{program.overview}</p>

            <div className="mt-9 inline-flex items-baseline gap-3 border-t border-border pt-6">
              <p className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none text-gold">
                <Counter
                  value={program.stat.value}
                  suffix={program.stat.suffix}
                />
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-teal-soft">
                {program.stat.label}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="bg-sand py-20 md:py-28"
        aria-labelledby="key-activities"
      >
        <div className="shell grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="key-activities"
              eyebrow="How we deliver it"
              title="Key activities"
            />
            <Stagger className="mt-10">
              <ol className="space-y-6">
                {program.activities.map((activity, i) => (
                  <StaggerItem key={activity}>
                    <li className="flex gap-5">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-mint bg-mint-soft text-teal"
                      >
                        <span className="font-display text-sm text-teal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <p className="min-w-0 pt-1 leading-relaxed">{activity}</p>
                    </li>
                  </StaggerItem>
                ))}
              </ol>
            </Stagger>
          </div>

          <div>
            <SectionHeading eyebrow="What changes" title="Outcomes we track" />
            <Stagger className="mt-10 space-y-4">
              {program.outcomes.map((outcome) => (
                <StaggerItem key={outcome}>
                  <div className="card-soft flex gap-4 p-6">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-teal"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed text-muted-foreground">
                      {outcome}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section
        className="shell py-20 md:py-28"
        aria-labelledby="related-programs"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="related-programs"
            eyebrow="Explore more"
            title="Other programmes in the continuum"
          />
          <Reveal delay={0.1}>
            <CtaLink to="/programs" variant="ghost" size="md">
              View all eight programmes
              <ArrowRight className="size-4" aria-hidden="true" />
            </CtaLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProgramCard
                slug={p.slug}
                number={p.number}
                title={p.title}
                description={p.description}
                Icon={p.icon}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ImpactRibbon heading={`${program.title} results to date`} />
      <ClosingCta />
    </>
  );
}
