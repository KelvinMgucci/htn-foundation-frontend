import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, ORG } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-teal-deep text-sand-light">
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl text-sand-light">
            {ORG.name}
          </span>
          <p className="mt-3 max-w-sm text-sm text-sand-light/70">
            {ORG.tagline}
          </p>
        </div>

        <div>
          <p className="eyebrow text-sand-light/60">Navigate</p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-sand-light/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-sand-light/60">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-sand-light/80">
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-gold"
                aria-hidden="true"
              />
              <span>
                {ORG.address.street}, {ORG.address.city}, {ORG.address.region},{" "}
                {ORG.address.country}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={`tel:${ORG.phone.replace(/\s+/g, "")}`}
                className="hover:text-gold"
              >
                {ORG.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${ORG.email}`} className="hover:text-gold">
                {ORG.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-light/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-sand-light/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {ORG.legalName}. All rights reserved.
          </p>
          <p>{ORG.hours}</p>
        </div>
      </div>
    </footer>
  );
}
