import { Shield } from "lucide-react";

export function Nav() {
  const links = [
    { label: "Technology", href: "#technology" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Legal Framework", href: "#legal" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A313C] bg-[#0B0E14]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#14D984] to-[#0BA86A] shadow-[0_0_20px_rgba(20,217,132,0.35)]">
            <Shield className="h-4 w-4 text-[#0B0E14]" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold tracking-[0.18em] text-[#F0F2F5]">SIGIL</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#C5CCD9] transition-colors hover:text-[#F0F2F5]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#enterprise"
          className="rounded-md bg-gradient-to-r from-[#14D984] to-[#0BA86A] px-4 py-2 text-sm font-semibold text-[#0B0E14] shadow-[0_0_24px_rgba(20,217,132,0.25)] transition-transform hover:-translate-y-0.5"
        >
          Enterprise Access
        </a>
      </div>
    </header>
  );
}
