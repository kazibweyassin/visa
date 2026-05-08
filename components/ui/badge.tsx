import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border-2)] bg-[var(--bg-3)] px-3 py-1 text-xs font-medium text-[var(--green)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
