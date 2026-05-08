import { Shield, Lock, Award, Scale } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "Framework",
      links: ["Data Sovereignty Manifesto", "AI Law Compliance Center", "Whitepapers", "Threat Model"],
    },
    {
      title: "Product",
      links: ["Cloaking Engine", "SDK / API", "Enterprise Deploy", "Changelog"],
    },
    {
      title: "Contact",
      links: ["enterprise@sigil.io", "press@sigil.io", "security@sigil.io", "Schedule Briefing"],
    },
  ];

  return (
    <footer id="enterprise" className="bg-[#0B0E14]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#14D984] to-[#0BA86A]">
                <Shield className="h-4 w-4 text-[#0B0E14]" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-bold tracking-[0.18em] text-[#F0F2F5]">
                SIGIL
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[#C5CCD9]">
              Adversarial cloaking for sovereign identities. Built for enterprises
              that refuse to be a dataset.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F0F2F5]">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-[#C5CCD9] transition-colors hover:text-[#14D984]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[#2A313C] pt-8 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Badge icon={Lock}>GDPR Zero-Knowledge</Badge>
            <Badge icon={Award}>ISO 27001 Certified</Badge>
            <Badge icon={Scale}>Digital Rights Advocate</Badge>
          </div>
          <div className="text-xs text-[#C5CCD9]">
            © {new Date().getFullYear()} Sigil Systems. All adversarial rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Badge({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#2A313C] bg-[#10141C] px-3 py-1.5 text-xs font-medium text-[#C5CCD9]">
      <Icon className="h-3.5 w-3.5 text-[#14D984]" />
      {children}
    </span>
  );
}
