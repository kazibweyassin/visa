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
    "bg-[linear-gradient(135deg,#F4C15D,#E8A949)] text-slate-950 shadow-lg shadow-[#F4C15D]/25 hover:-translate-y-0.5",
  secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
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
