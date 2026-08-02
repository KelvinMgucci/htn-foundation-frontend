import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-teal-soft">
        <li>
          <Link to="/" className="transition-colors hover:text-teal">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li aria-current="page" className="font-semibold text-teal">
          {current}
        </li>
      </ol>
    </nav>
  );
}
