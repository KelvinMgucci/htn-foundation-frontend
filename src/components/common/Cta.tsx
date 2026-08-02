import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        /* Coral is reserved for donation & urgent calls to action only. */
        donate:
          "bg-coral text-white shadow-[var(--shadow-coral)] hover:bg-coral-deep hover:-translate-y-0.5 active:translate-y-0",
        primary:
          "bg-teal text-sand-light hover:bg-teal-deep hover:-translate-y-0.5 active:translate-y-0",
        gold: "bg-gold text-teal-deep hover:brightness-105 hover:-translate-y-0.5",
        outline:
          "border border-teal/25 bg-transparent text-teal hover:border-mint hover:bg-mint-soft",
        ghost: "text-teal hover:bg-mint-soft",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = VariantProps<typeof ctaVariants> & { className?: string };

export function CtaButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & CtaProps) {
  return (
    <button
      className={cn(ctaVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function CtaLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & CtaProps) {
  return (
    <Link
      className={cn(ctaVariants({ variant, size }), className)}
      {...props}
    />
  );
}
