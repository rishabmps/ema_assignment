import Link from "next/link";
import MainDashboard from "@/components/views/main-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Briefcase, Receipt, Plane, BarChart3, Shield, Zap, Leaf } from "lucide-react";

export const metadata = {
  title: "Demo Studio – Live Experience",
  description:
    "Experience live agent orchestration as Sarah (Traveler) and Alex (Finance Ops) through immersive demo acts. No slides, just software.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white font-semibold">Demo Studio</span>
          </div>
          <Button size="sm" asChild>
            <Link href="#demo" className="flex items-center gap-2">
              Try Live
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-16 text-center">
        <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border border-blue-400/20 mb-6">
          Live Demo Studio
        </Badge>
        <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          Welcome to the Agentic T&E{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Demo Studio
          </span>
        </h1>
        <p className="max-w-4xl mx-auto text-lg text-slate-300 sm:text-xl leading-relaxed">
          Leave the marketing behind—step into the product. Experience how real AI agents orchestrate and automate travel and expense management in the shoes of <strong>Sarah</strong> (a busy traveler) and <strong>Alex</strong> (a finance operations lead).
        </p>
        <p className="max-w-4xl mx-auto text-lg text-slate-400 mt-4">
          Choose your journey, trigger actions, and watch agents work in real-time—no slides, just software.
        </p>
      </section>

      {/* Persona Selection Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Choose a Persona</h2>
          <p className="text-lg text-slate-300">Who are you in this story?</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sarah - Traveler */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">👩‍💼 Sarah – Traveler</h3>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Act I */}
              <div className="border-l-2 border-blue-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="h-5 w-5 text-blue-400" />
                  <h4 className="text-lg font-semibold text-white">Act I: The Receipt Rush</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  Sarah lands after a trip, her phone full of receipts.
                </p>
                <p className="text-sm text-slate-400 italic mb-2">
                  *Trigger the Receipt Concierge by snapping a stack of receipts. Watch as it extracts totals, matches to card transactions, and only pings Sarah if something looks off.*
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-emerald-400 font-medium">Time to reimbursement: 35 seconds</span>
                  <span className="text-blue-400 font-medium">Policy confidence: 99.2%</span>
                </div>
              </div>

              {/* Act II */}
              <div className="border-l-2 border-emerald-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="h-5 w-5 text-emerald-400" />
                  <h4 className="text-lg font-semibold text-white">Act II: The Smart Booking</h4>
                </div>
                <p className="text-slate-300 mb-3">
                  A new project awaits. Sarah opens the booking panel.
                </p>
                <p className="text-sm text-slate-400 italic mb-2">
                  *Co-create an itinerary with the agent. See how it weighs CO₂ impact, preferences, rates, and duty of care before surfacing options.*
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-emerald-400 font-medium">CO₂ reduction: 42%</span>
                  <span className="text-blue-400 font-medium">Negotiated savings: $1,280</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alex - Finance Ops */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">🧑‍💼 Alex – Finance Ops</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Act I */}
              <div className="border-l-2 border-red-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <h4 className="text-md font-semibold text-white">Act I: Exception Handling</h4>
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  Alex reviews the dashboard as exception queues update in real time.
                </p>
                <p className="text-xs text-slate-400 italic mb-1">
                  *See how the Policy Engine and Fraud Sentinel prioritize exceptions by AI scoring and urgency.*
                </p>
                <span className="text-xs text-red-400 font-medium">Exceptions automated: 92%</span>
              </div>

              {/* Act II */}
              <div className="border-l-2 border-yellow-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                  <h4 className="text-md font-semibold text-white">Act II: VAT Reclaim</h4>
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  Alex heads to the VAT Reclaim tab for end-of-quarter close.
                </p>
                <p className="text-xs text-slate-400 italic mb-1">
                  *The agents automatically surface reclaimable VAT from transactions worldwide.*
                </p>
                <span className="text-xs text-yellow-400 font-medium">Average reclaim per quarter: $4,060</span>
              </div>

              {/* Act III */}
              <div className="border-l-2 border-blue-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <h4 className="text-md font-semibold text-white">Act III: Policy Insights & Improvement</h4>
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  Alex consults the Policy Insights panel.
                </p>
                <p className="text-xs text-slate-400 italic mb-1">
                  *The Policy Engine analyzes spending patterns, surfacing real recommendations for improving policy effectiveness.*
                </p>
                <span className="text-xs text-blue-400 font-medium">1+ new policy recommendations per review</span>
              </div>

              {/* Act IV */}
              <div className="border-l-2 border-emerald-400 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <h4 className="text-md font-semibold text-white">Act IV: Sustainability Monitoring</h4>
                </div>
                <p className="text-sm text-slate-300 mb-1">
                  Alex checks the Sustainability Dashboard.
                </p>
                <p className="text-xs text-slate-400 italic mb-1">
                  *Monitor CO₂ emissions across bookings, surface climate-friendly alternatives, and generate compliance reports.*
                </p>
                <span className="text-xs text-emerald-400 font-medium">CO₂ tracking coverage: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Explore Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How to Explore the Demo</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-4">
              <span className="text-lg font-bold text-white">1</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Pick a persona</h3>
            <p className="text-sm text-slate-300">
              Start as Sarah or Alex.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-4">
              <span className="text-lg font-bold text-white">2</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Trigger actions</h3>
            <p className="text-sm text-slate-300">
              Upload receipts, book travel, process expenses, review exceptions, reclaim VAT, improve policies, or explore dashboards.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg mb-4">
              <span className="text-lg font-bold text-white">3</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Inspect reasoning</h3>
            <p className="text-sm text-slate-300">
              See agent notes, policy citations, and decision logic for every action.
            </p>
          </div>
        </div>
      </section>

      {/* Try it Live Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-500/20 p-8 sm:p-12 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Try it Live</h2>
          <p className="text-xl text-slate-300 mb-6">Jump to live demo</p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 shadow-lg mb-4" asChild>
            <Link href="#demo" className="flex items-center gap-2">
              Start Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-slate-400 italic">
            (Or select a persona above)
          </p>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Live Demo Experience</h2>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto mb-2">
            Every interaction here is powered by the same AI that runs in production. No mockups—just real agent workflows.
          </p>
        </div>
        <MainDashboard />
      </section>
    </main>
  );
}