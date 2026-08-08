import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ShieldCheck, LineChart, Users, Handshake, Quote } from "lucide-react";

import heroImage from "@/assets/hero-community-health.jpg";
import cliniciansImage from "@/assets/clinicians.png";
import { CtaLink } from "@/components/common/Cta";
import { ImpactRibbon } from "@/components/common/ImpactRibbon";
import { LogoMarquee } from "@/components/common/LogoMarquee";
import { ProgramCard } from "@/components/common/ProgramCard";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PARTNER_LOGOS, PROGRAMS, TESTIMONIALS } from "@/constants/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HTN Foundation — Healthy, Empowered, Resilient Communities" },
      {
        name: "description",
        content:
          "HTN Foundation delivers community outreach, health education, medical camps and emergency care support across Manyara Region, Tanzania.",
      },
      {
        property: "og:title",
        content: "HTN Foundation — Healthy, Empowered, Resilient Communities",
      },
      {
        property: "og:description",
        content:
          "A Tanzanian healthcare foundation expanding equitable access to primary care through evidence-based, partnership-led programmes.",
      },
    ],
  }),
  component: HomePage,
});

const featured = PROGRAMS.slice(0, 4);

const pillars = [
  {
    Icon: LineChart,
    title: "Evidence-Based",
    body: "Programmes are designed against national health guidelines, monitored continuously and adjusted on the basis of collected data rather than assumption.",
  },
  {
    Icon: Users,
    title: "Community Driven",
    body: "Ward committees, community health workers and local leaders shape priorities, so services reflect what households actually need.",
  },
  {
    Icon: Handshake,
    title: "Sustainable Partnerships",
    body: "We work through district health systems and academic partners to strengthen existing services instead of building parallel ones.",
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <ImpactRibbon />
      <FeaturedPrograms />
      <WhyHtn />
      <Testimonials />
      <PartnerStrip />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-sand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[32rem] rounded-full bg-mint/20 blur-3xl"
      />
      <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            <ShieldCheck className="size-3.5 text-mint" aria-hidden="true" />
            Babati · Manyara · Tanzania
          </span>

          <h1 className="display-1 mt-7">
            Healthy, Empowered,
            <span className="block text-teal-soft">Resilient Communities</span>
          </h1>

          <p className="lede mt-7 max-w-xl">
            HTN Foundation works alongside district health systems to expand
            equitable access to primary care. We invest in prevention,
            strengthen frontline capacity and build partnerships that keep
            services running long after a programme ends.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/donate" variant="donate" size="lg">
              Donate Now
            </CtaLink>
            <CtaLink to="/programs" variant="outline" size="lg">
              Explore Our Programs
            </CtaLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-4xl shadow-lift">
            <img
              src={heroImage}
              width={1600}
              height={1200}
              alt="A community health worker speaking with a mother and her child outside a rural clinic in Tanzania"
              className="aspect-4/3 size-full object-cover"
              fetchPriority="high"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-4 hidden max-w-[16rem] rounded-3xl border border-border bg-background/95 p-5 shadow-soft backdrop-blur sm:block"
          >
            <p className="font-display text-3xl text-teal">92%</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              of screened patients completed their referral follow-up in 2024*
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedPrograms() {
  return (
    <section
      className="shell py-20 md:py-28"
      aria-labelledby="featured-programs"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="featured-programs"
          eyebrow="What we do"
          title="Four programmes at the centre of our work"
          description="Each programme is delivered with district health authorities and measured against agreed clinical and community outcomes."
        />
        <Reveal delay={0.1}>
          <CtaLink to="/programs" variant="ghost" size="md">
            View all eight programmes
          </CtaLink>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <StaggerItem key={p.slug} className="h-full">
            <ProgramCard
              slug={p.slug}
              title={p.title}
              description={p.description}
              Icon={p.icon}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function WhyHtn() {
  return (
    <section className="bg-sand py-20 md:py-28" aria-labelledby="why-htn">
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <div className="overflow-hidden rounded-4xl shadow-soft">
            <img
              src={cliniciansImage}
              width={1408}
              height={1056}
              loading="lazy"
              alt="Two clinicians reviewing patient records inside a rural health facility"
              className="aspect-4/3 size-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="why-htn"
            eyebrow="Why HTN Foundation"
            title="A disciplined approach to community health"
          />
          <Stagger className="mt-10 space-y-8">
            {pillars.map(({ Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-2xl bg-background text-teal shadow-soft"
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="display-3 text-[1.3rem]">{title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="shell py-20 md:py-28" aria-labelledby="testimonials">
      <SectionHeading
        id="testimonials"
        eyebrow="In their words"
        title="What partners and communities tell us"
        align="center"
      />

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <StaggerItem key={t.name} className="h-full">
            <figure className="card-soft flex h-full flex-col p-8">
              <Quote className="size-7 text-mint" aria-hidden="true" />
              <blockquote className="mt-5 flex-1 font-display text-[1.15rem] leading-relaxed text-teal">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5 text-sm">
                <span className="block font-semibold text-teal">{t.name}</span>
                <span className="block text-muted-foreground">{t.org}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function PartnerStrip() {
  return (
    <section
      className="border-y border-border bg-sand-light py-14"
      aria-labelledby="partners-strip"
    >
      <div className="shell">
        <h2 id="partners-strip" className="eyebrow text-center">
          Working with government, academic and civil society institutions
        </h2>
        <LogoMarquee items={PARTNER_LOGOS} />
      </div>
    </section>
  );
}
