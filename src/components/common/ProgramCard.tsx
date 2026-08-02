import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProgramCard({
  number,
  title,
  description,
  Icon,
  slug,
  id,
}: {
  number?: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  slug: string;
  id?: string;
}) {
  return (
    <Link
      to="/programs/$slug"
      params={{ slug }}
      id={id}
      className="card-soft group flex h-full scroll-mt-28 flex-col p-7 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-2xl bg-mint-soft text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-sand-light"
        >
          <Icon className="size-5.5" strokeWidth={1.6} />
        </span>
        {number ? (
          <span className="font-display text-2xl text-gold" aria-hidden="true">
            {number}
          </span>
        ) : null}
      </div>

      <h3 className="display-3 mt-6 text-[1.35rem]">{title}</h3>
      <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-muted-foreground">
        {description}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">
        Learn more
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
