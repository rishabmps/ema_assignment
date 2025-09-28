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
      {/* Simplified breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-2">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>

      {/* Streamlined Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">Live AI Agent Demo</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          AI Agents in Action
        </h1>
        
        <p className="text-lg text-slate-300 leading-relaxed mb-8">
          Jump into live workflows. Watch real AI agents automate expenses, bookings, and finance operations.
        </p>

        <div className="inline-flex items-center gap-2 text-slate-400 mb-8">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Demo Environment</span>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-24">
        <MainDashboard />
      </section>
    </main>
  );
}