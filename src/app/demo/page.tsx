import Link from "next/link";
import MainDashboard from "@/components/views/main-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Briefcase, Receipt, Plane, BarChart3, Shield, Zap, Leaf, Sparkles } from "lucide-react";

export const metadata = {
  title: "Demo Studio – Live Experience",
  description:
    "Experience live agent orchestration as Sarah (Traveler) and Alex (Finance Ops) through immersive demo acts. No slides, just software.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                ← Home
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <span className="text-white font-semibold text-lg">Demo Studio</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Live Experience
            </Badge>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">No slides, just software</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Step into real AI agent workflows as <strong className="text-blue-300">Sarah</strong> (traveler) 
            or <strong className="text-purple-300">Alex</strong> (finance ops). Watch intelligent automation 
            transform travel and expense management in real-time.
          </p>
        </div>
      </section>

      {/* Persona & Act Selection */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Sarah - Traveler */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 border border-blue-500/10 p-1">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
                {/* Persona Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">👩‍💼 Sarah Chen</h2>
                    <p className="text-blue-300 font-medium">Sales Director • Always Traveling</p>
                  </div>
                </div>

                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  "I'm constantly on the road closing deals. I need expense management that works as fast as I do—no friction, just results."
                </p>

                {/* Acts */}
                <div className="space-y-6">
                  {/* Act I */}
                  <div className="group/act bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:bg-blue-500/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Receipt className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Act I: The Receipt Rush</h3>
                        <p className="text-slate-300 mb-3">
                          Back from a client trip, Sarah's phone is full of receipts that need processing before the weekend.
                        </p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <p className="text-slate-400 italic text-sm mb-4">
                        Watch the Receipt Concierge extract totals, match card transactions, and handle policy compliance—all while Sarah grabs coffee.
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          ⚡ 35s to reimbursement
                        </div>
                        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                          🎯 99.2% policy confidence
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Act II */}
                  <div className="group/act bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:bg-emerald-500/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Plane className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Act II: The Smart Booking</h3>
                        <p className="text-slate-300 mb-3">
                          A new enterprise deal requires travel to three cities. Sarah needs options that balance time, cost, and sustainability.
                        </p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <p className="text-slate-400 italic text-sm mb-4">
                        Co-create an intelligent itinerary that weighs CO₂ impact, preferences, rates, and duty of care before presenting optimized options.
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          🌱 42% CO₂ reduction
                        </div>
                        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                          💰 $1,280 saved
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alex - Finance Ops */}
          <div className="group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 border border-purple-500/10 p-1">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
                {/* Persona Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Briefcase className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">🧑‍💼 Alex Johnson</h2>
                    <p className="text-purple-300 font-medium">Finance Controller • Policy Guardian</p>
                  </div>
                </div>

                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  "I manage spend across 200+ employees. I need visibility, control, and automation that scales—with full audit trails for compliance."
                </p>

                {/* Acts */}
                <div className="space-y-4">
                  {/* Act I */}
                  <div className="group/act bg-gradient-to-r from-red-500/5 to-transparent border border-red-500/10 rounded-2xl p-5 hover:border-red-500/30 transition-all duration-300 hover:bg-red-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Act I: Exception Handling</h3>
                        <p className="text-slate-400 text-sm mb-2">
                          Real-time exception queue with AI-powered risk scoring and automated resolution.
                        </p>
                        <div className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs border border-red-500/20 inline-block">
                          92% automated
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Act II */}
                  <div className="group/act bg-gradient-to-r from-yellow-500/5 to-transparent border border-yellow-500/10 rounded-2xl p-5 hover:border-yellow-500/30 transition-all duration-300 hover:bg-yellow-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Act II: VAT Reclaim</h3>
                        <p className="text-slate-400 text-sm mb-2">
                          Automated discovery and processing of reclaimable VAT across global transactions.
                        </p>
                        <div className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500/20 inline-block">
                          $4,060/quarter
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Act III */}
                  <div className="group/act bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 hover:bg-blue-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Act III: Policy Insights</h3>
                        <p className="text-slate-400 text-sm mb-2">
                          AI-driven analysis of spend patterns with actionable policy recommendations.
                        </p>
                        <div className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/20 inline-block">
                          Smart recommendations
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Act IV */}
                  <div className="group/act bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:bg-emerald-500/10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Leaf className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Act IV: Sustainability Tracking</h3>
                        <p className="text-slate-400 text-sm mb-2">
                          Comprehensive CO₂ monitoring with automated compliance reporting.
                        </p>
                        <div className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/20 inline-block">
                          100% coverage
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 border border-white/10 p-1">
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience AI in Action?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Every interaction below is powered by the same AI that runs in production. No mockups—just real agent workflows.
            </p>
            <div className="inline-flex items-center gap-2 text-slate-400 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Demo Environment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-24">
        <MainDashboard />
      </section>
    </main>
  );
}