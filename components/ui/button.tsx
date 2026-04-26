import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--secondary)]",
  secondary: "border border-[var(--muted)] bg-[var(--muted)] text-[var(--primary)] hover:opacity-95",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex h-14 items-center justify-center rounded-full px-6 text-sm font-semibold transition",
        variantClasses[variant],
        className,
      )}
    />
  );
}
