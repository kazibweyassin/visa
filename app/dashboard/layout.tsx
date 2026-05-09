import Link from "next/link";
import { LayoutDashboard, FilePlus2, MessageCircle, UserCircle2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New application", href: "/dashboard/applications/new", icon: FilePlus2 },
  { label: "Support", href: "https://wa.me/256704833021", icon: MessageCircle, external: true },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-2)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border-2)] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-baseline gap-2 select-none">
            <span className="text-2xl font-black tracking-[-0.04em] text-[var(--text-1)]">
              Ailes<span className="text-[var(--green)]">.</span>
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-3)]">
              Global
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const common = "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors";
              const linkClass = "border-[var(--border-2)] bg-white text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-4)]";

              if (item.external) {
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={`${common} ${linkClass}`}>
                    <Icon className="h-4 w-4 text-[var(--green)]" />
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={`${common} ${linkClass}`}>
                  <Icon className="h-4 w-4 text-[var(--green)]" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
