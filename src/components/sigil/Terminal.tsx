import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  CheckCircle2,
  Download,
  RotateCcw,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

const API_URL =
  "https://e228bc17-3450-4ab5-a4de-e08fa08a3395-00-130ob3r959u1j.picard.replit.dev/api/cloak";

type Phase = "idle" | "processing" | "done";

export function Terminal() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(72);
  const [phase, setPhase] = useState<Phase>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("sigil-shielded.png");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Only image assets are accepted.");
      return;
    }
    setFile(f);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
    setPhase("idle");
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFile(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enactShield = async () => {
    if (!file) {
      toast.error("Ingest an image asset first.");
      return;
    }
    setPhase("processing");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("intensity", String(intensity));
      const res = await fetch(API_URL, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const ext = file.name.includes(".") ? file.name.split(".").pop() : "png";
      const base = file.name.replace(/\.[^.]+$/, "");
      setDownloadName(`sigil-shielded-${base}.${ext}`);
      setDownloadUrl(url);
      setPhase("done");
      toast.success("Asset shielded successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Cloaking failed. Verify network and retry.");
      setPhase("idle");
    }
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setPhase("idle");
  };

  return (
    <section id="terminal" className="relative border-b border-[#2A313C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#14D984]">
            Local Cloaking Terminal
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#F0F2F5] md:text-4xl">
            Encrypt your likeness in three deterministic steps.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#C5CCD9]">
            Every transformation runs in an isolated session. No telemetry. No retention.
          </p>
        </div>

        {/* Terminal frame */}
        <div className="overflow-hidden rounded-2xl border border-[#2A313C] bg-[#0E121A] shadow-[0_30px_80px_-30px_rgba(20,217,132,0.25)]">
          {/* chrome */}
          <div className="flex items-center justify-between border-b border-[#2A313C] bg-[#10141C] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A313C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2A313C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#14D984] shadow-[0_0_8px_#14D984]" />
              <span className="ml-3 font-mono text-xs text-[#C5CCD9]">
                sigil@local ~ /cloak
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#C5CCD9]">SESSION: ENCRYPTED</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Step 1 — Ingest */}
            <div className="border-b border-[#2A313C] p-6 lg:border-b-0 lg:border-r">
              <StepHeader index={1} icon={Upload} title="Ingest" />
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                className={`mt-4 flex h-56 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-all ${
                  dragActive
                    ? "border-[#14D984] bg-[#14D984]/5"
                    : "border-[#2A313C] bg-[#0B0E14] hover:border-[#3a4250]"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {previewUrl ? (
                  <div className="relative h-full w-full p-3">
                    <img
                      src={previewUrl}
                      alt="ingested asset"
                      className="h-full w-full rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="mb-3 h-8 w-8 text-[#14D984]" />
                    <div className="text-sm font-semibold text-[#F0F2F5]">
                      Drop Image Asset
                    </div>
                    <div className="mt-1 text-xs text-[#C5CCD9]">
                      PNG · JPG · WEBP up to 25 MB
                    </div>
                  </>
                )}
              </label>
              {file && (
                <div className="mt-3 flex items-center justify-between rounded-md border border-[#2A313C] bg-[#0B0E14] px-3 py-2 text-xs">
                  <span className="truncate text-[#C5CCD9]">{file.name}</span>
                  <span className="font-mono text-[#14D984]">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
              )}
            </div>

            {/* Step 2 — Configure */}
            <div className="border-b border-[#2A313C] p-6 lg:border-b-0 lg:border-r">
              <StepHeader index={2} icon={Sliders} title="Configure" />
              <div className="mt-4 rounded-lg border border-[#2A313C] bg-[#0B0E14] p-5">
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[#F0F2F5]">
                    Shield Intensity
                  </label>
                  <span className="font-mono text-2xl font-bold text-[#14D984]">
                    {intensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="sigil-slider mt-4 w-full"
                  style={{
                    background: `linear-gradient(to right, #14D984 0%, #0BA86A ${intensity}%, #2A313C ${intensity}%, #2A313C 100%)`,
                  }}
                />
                <p className="mt-4 text-xs leading-relaxed text-[#C5CCD9]">
                  Visual fidelity remains identical while mathematical entropy increases.
                </p>
              </div>
              <button
                onClick={enactShield}
                disabled={!file || phase === "processing"}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#14D984] to-[#0BA86A] px-5 py-3 text-sm font-semibold text-[#0B0E14] shadow-[0_0_28px_rgba(20,217,132,0.3)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {phase === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Cloaking…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Enact Neural Shield
                  </>
                )}
              </button>
            </div>

            {/* Step 3/4 — Process / Result */}
            <div className="p-6">
              <StepHeader
                index={phase === "done" ? 4 : 3}
                icon={phase === "done" ? CheckCircle2 : ShieldCheck}
                title={phase === "done" ? "Verified" : "Process"}
              />
              <div className="relative mt-4 h-56 overflow-hidden rounded-lg border border-[#2A313C] bg-[#0B0E14]">
                <AnimatePresence mode="wait">
                  {phase === "done" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full flex-col items-center justify-center px-4 text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#14D984] to-[#0BA86A] shadow-[0_0_24px_rgba(20,217,132,0.4)]">
                        <CheckCircle2 className="h-6 w-6 text-[#0B0E14]" strokeWidth={2.5} />
                      </div>
                      <div className="mt-3 text-sm font-semibold text-[#F0F2F5]">
                        Asset Shielded.
                      </div>
                      <div className="text-xs text-[#C5CCD9]">
                        Digital Provenance Verified.
                      </div>
                    </motion.div>
                  ) : previewUrl ? (
                    <motion.div
                      key="canvas"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src={previewUrl}
                        alt="processing"
                        className={`h-full w-full object-contain p-3 ${
                          phase === "processing" ? "animate-pulse" : ""
                        }`}
                      />
                      {phase === "processing" && (
                        <>
                          <div className="pointer-events-none absolute inset-0 sigil-scanline" />
                          <div className="pointer-events-none absolute inset-0 mix-blend-screen sigil-jitter" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-md border border-[#2A313C] bg-[#0B0E14]/90 px-2 py-1 font-mono text-[10px] text-[#14D984]">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>computing adversarial matrix · entropy {intensity}%</span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      className="flex h-full items-center justify-center text-xs text-[#C5CCD9]"
                    >
                      Awaiting asset…
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {phase === "done" && (
                <div className="mt-4 space-y-2">
                  <ResultRow label="Status" value="Deepfake Resistant" />
                  <ResultRow label="Method" value="Adversarial Matrix Perturbation" />
                  <ResultRow label="Entropy" value={`${intensity}%`} />
                  <div className="mt-3 flex gap-2">
                    <a
                      href={downloadUrl ?? "#"}
                      download={downloadName}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#14D984] to-[#0BA86A] px-4 py-2.5 text-sm font-semibold text-[#0B0E14] transition-transform hover:-translate-y-0.5"
                    >
                      <Download className="h-4 w-4" /> Download Protected Asset
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center rounded-md border border-[#2A313C] bg-[#10141C] p-2.5 text-[#C5CCD9] transition-colors hover:border-[#3a4250] hover:text-[#F0F2F5]"
                      aria-label="Reset"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeader({
  index,
  icon: Icon,
  title,
}: {
  index: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#2A313C] bg-[#0B0E14] font-mono text-xs font-bold text-[#14D984]">
        0{index}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#C5CCD9]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-[#F0F2F5]">
          {title}
        </span>
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-[#2A313C] bg-[#0B0E14] px-3 py-2 text-xs">
      <span className="font-mono uppercase tracking-wider text-[#C5CCD9]">{label}</span>
      <span className="font-semibold text-[#F0F2F5]">{value}</span>
    </div>
  );
}
