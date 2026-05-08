import { motion } from "framer-motion";
import { ArrowRight, Lock, Cpu, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#2A313C]">
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(#1a2230 1px, transparent 1px), linear-gradient(90deg, #1a2230 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Emerald glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #14D984 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A313C] bg-[#10141C] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14D984] shadow-[0_0_8px_#14D984]" />
            <span className="text-xs font-medium tracking-wide text-[#C5CCD9]">
              Adversarial Image Cloaking Engine — v3.2
            </span>
          </div>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#F0F2F5] md:text-6xl lg:text-7xl">
            Neutralize Deepfake Aggression.{" "}
            <span className="bg-gradient-to-r from-[#14D984] to-[#7CFFC0] bg-clip-text text-transparent">
              Shield Your Identity at the Source.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-[#C5CCD9] md:text-lg">
            Adversarial mathematical cloaking. Invisible armor for critical imagery.
            100% on-device. Absolute provenance.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#terminal"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#14D984] to-[#0BA86A] px-6 py-3 text-sm font-semibold text-[#0B0E14] shadow-[0_0_36px_rgba(20,217,132,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Launch Local Terminal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#technology"
              className="inline-flex items-center gap-2 rounded-md border border-[#2A313C] bg-[#10141C] px-6 py-3 text-sm font-semibold text-[#F0F2F5] transition-colors hover:border-[#3a4250]"
            >
              View Technology
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Lock, label: "Zero Data Egress", sub: "On-device perturbation" },
              { icon: Cpu, label: "Adversarial Matrix", sub: "Sub-pixel entropy" },
              { icon: ShieldCheck, label: "Provenance Locked", sub: "C2PA signed" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-lg border border-[#2A313C] bg-[#10141C] px-4 py-3 text-left"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#2A313C] bg-[#0B0E14]">
                  <f.icon className="h-4 w-4 text-[#14D984]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F0F2F5]">{f.label}</div>
                  <div className="text-xs text-[#C5CCD9]">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
