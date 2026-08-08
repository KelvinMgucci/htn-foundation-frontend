import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Check,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Scale,
  ScrollText,
  Users,
} from "lucide-react";

import educationImage from "@/assets/health-education.jpg";
import { ImpactRibbon } from "@/components/common/ImpactRibbon";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { LEADERSHIP, OBJECTIVES, TIMELINE, VALUES } from "@/constants/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HTN Foundation — Mission, Values & Leadership" },
      {
        name: "description",
        content:
          "Our mission, vision, core values, objectives, milestones and leadership team at HTN Foundation in Babati, Manyara, Tanzania.",
      },
      {
        property: "og:title",
        content: "About HTN Foundation — Mission, Values & Leadership",
      },
      {
        property: "og:description",
        content:
          "How HTN Foundation is organised, what we stand for and the people accountable for our programmes.",
      },
    ],
  }),
  component: AboutPage,
});

const valueIcons = [
  HeartHandshake,
  ScrollText,
  Award,
  Scale,
  Check,
  Lightbulb,
  Users,
];

function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who we are"
        title="Health to the Needs Foundation"
        description="Established in Babati, Manyara, HTN Foundation is a Tanzanian healthcare organisation working with government, academic and community partners to make primary health care reachable for households that the system reaches last."
      />

      <section
        className="shell py-16 md:py-24"
        aria-labelledby="mission-vision"
      >
        <h2 id="mission-vision" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-4xl bg-teal p-9 text-sand-light/85 md:p-12">
              <p className="eyebrow text-mint">Mission</p>
              <p className="display-3 mt-4 text-sand-light">
                To improve access to quality, affordable healthcare for
                underserved communities through prevention, education, clinical
                outreach and durable partnerships.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-4xl border border-border bg-sand p-9 md:p-12">
              <p className="eyebrow">Vision</p>
              <p className="display-3 mt-4">
                Communities in Tanzania that are healthy, well informed and
                resilient — where distance, income and awareness no longer
                determine health outcomes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28" aria-labelledby="values">
        <div className="shell">
          <SectionHeading
            id="values"
            eyebrow="Core values"
            title="Seven commitments that govern how we work"
            description="These are operating standards, not slogans. They shape recruitment, programme design and how we report results."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <StaggerItem key={value.title} className="h-full">
                  <article className="card-soft group h-full p-7">
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-2xl bg-mint-soft text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-sand-light"
                    >
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="display-3 mt-6 text-[1.25rem]">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="shell py-20 md:py-28" aria-labelledby="objectives">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading
              id="objectives"
              eyebrow="Objectives"
              title="Six objectives guiding the current strategy"
            />
            <Stagger className="mt-10">
              <ol className="space-y-6">
                {OBJECTIVES.map((objective, i) => (
                  <StaggerItem key={objective}>
                    <li className="flex gap-5">
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-mint bg-mint-soft text-teal"
                      >
                        <Check className="size-4" strokeWidth={2.2} />
                      </span>
                      <p className="min-w-0 pt-1 leading-relaxed">
                        <span className="mr-2 font-display text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {objective}
                      </p>
                    </li>
                  </StaggerItem>
                ))}
              </ol>
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-4xl shadow-soft">
              <img
                src={educationImage}
                width={1408}
                height={1008}
                loading="lazy"
                alt="Community members attending a health education session in a village hall"
                className="aspect-3/4 size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28" aria-labelledby="timeline">
        <div className="shell">
          <SectionHeading
            id="timeline"
            eyebrow="Our history"
            title="Milestones since 2016"
          />
          <Stagger className="mt-14">
            <ol className="relative border-l border-border pl-8 md:pl-12">
              {TIMELINE.map((item) => (
                <StaggerItem key={item.year}>
                  <li className="relative pb-12 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[2.55rem] top-1.5 size-3 rounded-full bg-gold ring-4 ring-sand md:-left-[3.55rem]"
                    />
                    <p className="font-display text-2xl text-gold">
                      {item.year}
                    </p>
                    <h3 className="display-3 mt-1 text-[1.3rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>
        </div>
      </section>

      <section className="shell py-20 md:py-28" aria-labelledby="leadership">
        <SectionHeading
          id="leadership"
          eyebrow="Leadership"
          title="Accountable, clinically grounded governance"
          description="Placeholder profiles shown for design purposes; final biographies and photographs will be supplied by the Foundation."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP.map((person) => (
            <StaggerItem key={person.name} className="h-full">
              <article className="card-soft h-full overflow-hidden">
                {"photo" in person && person.photo ? (
                  <img
                    src={person.photo}
                    width={640}
                    height={480}
                    loading="lazy"
                    alt={`${person.name}, ${person.role} at HTN Foundation`}
                    className="aspect-4/3 w-full object-cover object-[center_20%]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid aspect-4/3 place-items-center bg-linear-to-br from-mint-soft to-sand"
                  >
                    <span className="font-display text-4xl text-teal/40">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div className="p-7">
                  <h3 className="display-3 text-[1.2rem]">{person.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-teal-soft">
                    {person.role}
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ImpactRibbon heading="Accountability in numbers" />
      <ClosingCta />
    </>
  );
}
