import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  CheckCircle2,
  XCircle,
  TrendingDown,
  ScanFace,
  FileCheck,
  Scale,
  Zap,
} from "lucide-react";

export function Infographic() {
  return (
    <section id="technology" className="border-b border-[#2A313C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#14D984]">
            Pillars of Sigil
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#F0F2F5] md:text-4xl">
            Scientific rigor. Regulatory alignment. Measurable risk reduction.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* A — Scientific */}
          <Card>
            <CardLabel icon={Brain}>Scientific Pillar</CardLabel>
            <h3 className="mt-3 text-xl font-bold text-[#F0F2F5]">Digital Armor</h3>
            <p className="mt-2 text-sm text-[#C5CCD9]">
              Sigil injects sub-perceptual perturbations that collapse the loss surface
              of generative facial models.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-lg border border-[#2A313C] bg-[#0B0E14] p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-[#C5CCD9]">
                    Unshielded Asset
                  </span>
                  <span className="flex items-center gap-1 text-[#ff6b6b]">
                    <ScanFace className="h-3.5 w-3.5" /> Recognized
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A313C]">
                  <div className="h-full w-[94%] bg-[#ff6b6b]" />
                </div>
                <div className="mt-1 text-right font-mono text-[10px] text-[#C5CCD9]">
                  AI confidence 94%
                </div>
              </div>
              <div className="rounded-lg border border-[#14D984]/40 bg-[#14D984]/5 p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-[#C5CCD9]">
                    Sigil-Shielded Asset
                  </span>
                  <span className="flex items-center gap-1 text-[#14D984]">
                    <Shield className="h-3.5 w-3.5" /> Cloaked
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A313C]">
                  <div className="h-full w-[6%] bg-gradient-to-r from-[#14D984] to-[#0BA86A]" />
                </div>
                <div className="mt-1 text-right font-mono text-[10px] text-[#C5CCD9]">
                  AI confidence 6%
                </div>
              </div>
            </div>
          </Card>

          {/* B — Compliance */}
          <Card id="legal">
            <CardLabel icon={Scale}>Compliance & ESG</CardLabel>
            <h3 className="mt-3 text-xl font-bold text-[#F0F2F5]">
              EU AI Act Compliance Ledger
            </h3>
            <p className="mt-2 text-sm text-[#C5CCD9]">
              Audited against Article 50 transparency obligations and Annex III
              high-risk system safeguards.
            </p>
            <div className="mt-6 divide-y divide-[#2A313C] rounded-lg border border-[#2A313C] bg-[#0B0E14]">
              {[
                { label: "Data Traceability", status: "compliant" },
                { label: "Fairness Audit", status: "compliant" },
                { label: "Transparency Log", status: "compliant" },
                { label: "On-Device Processing", status: "compliant" },
                { label: "Third-Party Telemetry", status: "absent" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3 text-sm"
                >
                  <span className="text-[#C5CCD9]">{row.label}</span>
                  {row.status === "compliant" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14D984]/30 bg-[#14D984]/10 px-2 py-0.5 text-xs font-medium text-[#14D984]">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2A313C] bg-[#10141C] px-2 py-0.5 text-xs font-medium text-[#C5CCD9]">
                      <XCircle className="h-3 w-3" /> None
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#C5CCD9]">
              <FileCheck className="h-4 w-4 text-[#14D984]" />
              Last conformity assessment: 2026-04-12
            </div>
          </Card>

          {/* C — B2B Impact */}
          <Card id="use-cases">
            <CardLabel icon={Zap}>B2B Impact</CardLabel>
            <h3 className="mt-3 text-xl font-bold text-[#F0F2F5]">
              Brand Identity Integrity Index
            </h3>
            <p className="mt-2 text-sm text-[#C5CCD9]">
              Quantified protection against synthetic-media attacks targeting
              executives and corporate assets.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat value="−87%" label="Deepfake exposure" trend />
              <Stat value="−62%" label="Reputational risk" trend />
              <Stat value="$4.2M" label="Avg. fraud avoided" />
              <Stat value="100%" label="On-device processing" />
            </div>

            <div className="mt-6 rounded-lg border border-[#2A313C] bg-[#0B0E14] p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-[#C5CCD9]">
                  Index Trend (12mo)
                </span>
                <span className="text-[#14D984]">+38 pts</span>
              </div>
              <Sparkline />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-[#2A313C] bg-[#10141C] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
    >
      {children}
    </motion.div>
  );
}

function CardLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-[#2A313C] bg-[#0B0E14] px-2.5 py-1">
      <Icon className="h-3.5 w-3.5 text-[#14D984]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C5CCD9]">
        {children}
      </span>
    </div>
  );
}

function Stat({
  value,
  label,
  trend,
}: {
  value: string;
  label: string;
  trend?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#2A313C] bg-[#0B0E14] p-4">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-[#F0F2F5]">{value}</span>
        {trend && <TrendingDown className="h-3.5 w-3.5 text-[#14D984]" />}
      </div>
      <div className="mt-1 text-xs text-[#C5CCD9]">{label}</div>
    </div>
  );
}

function Sparkline() {
  const points = [40, 38, 42, 36, 33, 28, 30, 24, 22, 18, 14, 10];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 240;
  const h = 56;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full">
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#14D984" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#14D984" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#spark)" />
      <path d={path} fill="none" stroke="#14D984" strokeWidth="1.5" />
    </svg>
  );
}
