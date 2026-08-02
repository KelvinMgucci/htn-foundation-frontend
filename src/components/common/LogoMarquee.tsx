import { useReducedMotion } from "motion/react";

const itemClass =
  "shrink-0 whitespace-nowrap text-center font-display text-[0.95rem] leading-tight text-teal/45 grayscale transition-all duration-300 hover:text-teal hover:grayscale-0";

export function LogoMarquee({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Real list for assistive tech; the visual marquee below is decorative. */}
      <ul className="sr-only">
        {items.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {reduce ? (
        <ul
          aria-hidden="true"
          className="mt-9 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {items.map((name) => (
            <li key={name} className={itemClass}>
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-hidden="true"
          className="relative mt-9 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="marquee flex w-max items-center gap-16 hover:[animation-play-state:paused]">
            {[...items, ...items].map((name, i) => (
              <span key={`${name}-${i}`} className={itemClass}>
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
