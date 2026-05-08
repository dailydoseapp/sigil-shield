import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sigil/Nav";
import { Hero } from "@/components/sigil/Hero";
import { Terminal } from "@/components/sigil/Terminal";
import { Infographic } from "@/components/sigil/Infographic";
import { Footer } from "@/components/sigil/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0B0E14] font-[Inter,system-ui,sans-serif] text-[#F0F2F5] antialiased">
      <Nav />
      <main>
        <Hero />
        <Terminal />
        <Infographic />
      </main>
      <Footer />
    </div>
  );
}
