## Sigil — Adversarial Image Cloaking Engine

A single-page enterprise security landing site with a working interactive cloaking terminal that uploads images to your Replit API and downloads the protected asset.

### Visual System
- Background `#0B0E14`, borders `#2A313C`, primary emerald `#14D984` → `#0BA86A`, text silvers `#C5CCD9` / `#F0F2F5`
- Inter typography, solid cards (no glassmorphism), metallic borders, diffused emerald glows
- Framer Motion for hover lifts, sectional fade/slide-ins, scan-line processing overlay
- Lucide icons throughout (Shield, ScanLine, CheckCircle2, Upload, etc.)

### Page Sections

**1. Top Nav + Hero**
- Sticky nav: SIGIL wordmark + Technology / Use Cases / Legal Framework / Enterprise Access (emerald CTA)
- Headline: "Neutralize Deepfake Aggression. Shield Your Identity at the Source."
- Sub + emerald "Launch Local Terminal" button (smooth-scrolls to terminal)
- Ambient grid/scan-line backdrop

**2. Cloaking Terminal (interactive)**
Three-panel layout inside one organized terminal frame:
- **Ingest**: drag-drop card, file picker fallback, image preview thumbnail
- **Configure**: Shield Intensity slider 0–100, fidelity copy, "Enact Neural Shield" emerald button
- **Process / Result**: canvas preview with animated sweeping green scanner line + pixel jitter while request is in flight; on success swaps to a result card (green check, "Asset Shielded. Digital Provenance Verified.", Status: Deepfake Resistant, Method: Adversarial Matrix Perturbation, "Download Protected Asset")

**API wiring**
- On click: `POST` FormData (`file` field, plus `intensity`) to  
  `https://e228bc17-3450-4ab5-a4de-e08fa08a3395-00-130ob3r959u1j.picard.replit.dev/api/cloak`
- Response handled as `blob()` → `URL.createObjectURL` → triggers `<a download="sigil-shielded-{filename}">` click
- Error toast on failure, reset button to run again

**3. Infographic (3-column data cards)**
- A. Digital Armor: stylized diagram (shielded image vs. shattered AI model glyph)
- B. EU AI Act Compliance Ledger: report-card rows (Data Traceability ✓, Fairness Audit ✓, Transparency Log ✓, On-Device Processing ✓) with status pills
- C. Brand Identity Integrity Index: stat tiles (e.g. −87% deepfake exposure, −62% reputational risk, 100% on-device)

**4. Footer**
- Columns: Data Sovereignty Manifesto, AI Law Compliance Center, Whitepapers, Contact
- Badge row: GDPR Zero-Knowledge · ISO 27001 Certified · Digital Rights Advocate
- Fine print + © Sigil

### Technical Notes
- TanStack Start (project's stack) — single route at `src/routes/index.tsx` replacing the placeholder, plus small components in `src/components/sigil/` (Nav, Hero, Terminal, Infographic, Footer)
- Tailwind v4 via existing `src/styles.css` — colors used as arbitrary values per spec; Inter loaded via Google Fonts link in `__root.tsx` head
- Add `framer-motion` and `lucide-react` (lucide may already be present; will verify and only add if missing)
- All API logic client-side in the Terminal component — no server function needed
- Existing shadcn `sonner` used for error toasts

After approval I'll implement everything in one pass.