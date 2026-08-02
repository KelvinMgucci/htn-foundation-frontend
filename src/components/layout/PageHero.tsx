import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-sand pb-20 pt-12 md:pb-28 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[-8rem] size-[28rem] rounded-full bg-mint/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-t-[100%] bg-background"
      />
      <div className="shell relative">
        <Breadcrumbs current={breadcrumb} />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-1 mt-4">{title}</h1>
          <p className="lede mt-6">{description}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
