import Link from "next/link";
import MainDashboard from "@/components/views/main-dashboard";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Demo Studio – Live Experience",
  description:
    "Experience live agent orchestration as Sarah (Traveler) and Alex (Finance Ops) through immersive demo acts. No slides, just software.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Single unified demo section */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-24">
        <MainDashboard />
      </section>
    </main>
  );
}