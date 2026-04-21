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
    "bg-[linear-gradient(135deg,var(--gold),var(--secondary))] text-[var(--foreground)] shadow-lg shadow-[var(--gold)]/15 hover:-translate-y-0.5",
  secondary: "border border-[var(--muted)] bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--secondary)]/10",
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
