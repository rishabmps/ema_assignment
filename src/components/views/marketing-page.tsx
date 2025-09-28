"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Receipt, Shield, MapPin, FileCheck, Calculator, Trees, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { value: "95%", label: "expenses automated" },
  { value: "8", label: "AI agents working" },
  { value: "90%", label: "faster processing" },
];

// Agent showcase data
const agentShowcase = [
  {
    name: "Receipt Concierge",
    description: "Captures & matches receipts instantly",
    icon: Receipt,
    color: "from-purple-500 to-purple-600",
    demo: "Auto-matched 247 receipts this week"
  },
  {
    name: "Policy Engine", 
    description: "Enforces compliance in real-time",
    icon: FileCheck,
    color: "from-blue-500 to-blue-600",
    demo: "Prevented 12 policy violations today"
  },
  {
    name: "Fraud Sentinel",
    description: "Detects suspicious patterns instantly",
    icon: Shield,
    color: "from-red-500 to-red-600", 
    demo: "Flagged 3 anomalies for review"
  },
  {
    name: "Booking Orchestrator",
    description: "Manages travel seamlessly",
    icon: MapPin,
    color: "from-teal-500 to-teal-600",
    demo: "Booked 89 compliant trips this month"
  },
  {
    name: "Budget Copilot",
    description: "Optimizes spend allocation",
    icon: Calculator,
    color: "from-emerald-500 to-emerald-600",
    demo: "Saved $24K through smart recommendations"
  },
  {
    name: "CO2 Advisor",
    description: "Promotes sustainable choices", 
    icon: Trees,
    color: "from-green-500 to-green-600",
    demo: "Reduced carbon footprint by 18%"
  }
];

export function MarketingPage() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative">
      {/* Persistent Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          href="/demo"
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Watch Demo</span>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
      {/* Hero Section - Agent Focused */}
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border border-blue-400/20">
            8 AI Agents • Infinite Possibilities
          </Badge>
          <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Meet your AI workforce for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              travel & expense
            </span>
          </h1>
          <p className="max-w-3xl text-lg text-slate-300 sm:text-xl">
            Watch AI agents handle receipts, enforce policies, detect fraud, and optimize every transaction—while you focus on what matters.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 shadow-lg" asChild>
            <Link href="/demo" className="flex items-center gap-2">
              Watch agents in action
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
          <Link
            href="mailto:hello@agenticte.com?subject=Product%20session"
            className="inline-flex items-center gap-2 text-base font-medium text-blue-200 transition-colors hover:text-white"
          >
            Talk with a specialist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.dl 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 text-center backdrop-blur-sm"
            >
              <dt className="text-3xl font-bold text-white">{metric.value}</dt>
              <dd className="mt-2 text-sm uppercase tracking-wide text-slate-400">{metric.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </header>

      {/* Agent Showcase Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Your AI workforce is always on
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Meet the intelligent agents that transform every aspect of travel and expense management
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agentShowcase.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-3xl" 
                     style={{ backgroundImage: `linear-gradient(135deg, ${agent.color.split(' ')[1]}, ${agent.color.split(' ')[3]})` }} />
                
                <div className="relative z-10">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.color} shadow-lg`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {agent.name}
                  </h3>
                  
                  <p className="mt-3 text-slate-300">
                    {agent.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {agent.demo}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 sm:p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Finance teams and travelers, finally in sync
            </h2>
            <p className="text-lg text-slate-300">
              One platform, shared visibility, zero friction
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">For Finance Teams</h3>
                  <p className="text-sm text-slate-300 mt-1">95% automation • Real-time compliance • Audit-ready ledger</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">For Travelers</h3>
                  <p className="text-sm text-slate-300 mt-1">Instant approvals • Smart bookings • Zero paperwork</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-800/50 p-4 border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-2">Live example</div>
                <div className="text-white font-medium">Receipt uploaded → Policy checked → Approved → Posted</div>
                <div className="text-xs text-emerald-400 mt-1">Completed in 2.3 seconds</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Social Proof with ROI Metrics */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Proven ROI. Real Results. Scale Fast.
          </h2>
          <p className="text-slate-300 text-lg">
            Join forward-thinking finance teams already seeing transformational results
          </p>
        </motion.div>

        {/* ROI Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-3 mb-16"
        >
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-emerald-400 mb-2">$847K</div>
            <div className="text-sm text-slate-300">Average annual savings per 500 employees</div>
          </div>
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-400 mb-2">68%</div>
            <div className="text-sm text-slate-300">Reduction in finance team manual work</div>
          </div>
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-purple-400 mb-2">3 weeks</div>
            <div className="text-sm text-slate-300">Typical implementation timeline</div>
          </div>
        </motion.div>
        
        <div className="relative">
          {/* Rotating Social Proof Carousel */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -100, -200, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 min-w-full">
                  <div className="flex-1 min-w-[300px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm">
                    <p className="text-lg text-slate-100 mb-6">
                      &ldquo;Exception backlog dropped 90% and investors loved the clarity.&rdquo;
                    </p>
                    <footer className="text-sm text-slate-400">
                      <strong className="text-white">Priya Desai</strong>, VP Finance • Series B SaaS
                    </footer>
                  </div>
                  
                  <div className="flex-1 min-w-[300px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm">
                    <p className="text-lg text-slate-100 mb-6">
                      &ldquo;Finance close went from 8 days to 2 days. Game changer.&rdquo;
                    </p>
                    <footer className="text-sm text-slate-400">
                      <strong className="text-white">Marcus Leung</strong>, Corporate Controller • 1,200 employees
                    </footer>
                  </div>
                  
                  <div className="flex-1 min-w-[300px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm">
                    <p className="text-lg text-slate-100 mb-6">
                      &ldquo;Our travelers love it. Zero expense report complaints.&rdquo;
                    </p>
                    <footer className="text-sm text-slate-400">
                      <strong className="text-white">Sarah Chen</strong>, Head of People • Remote-first
                    </footer>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Differentiation Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 sm:p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Beyond traditional T&E platforms
            </h2>
            <p className="text-lg text-slate-300">
              See why finance teams choose us over legacy solutions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Traditional platforms (SAP Concur, Navan)</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Manual exception handling</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Limited policy automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Basic sustainability insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Reactive compliance monitoring</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Agentic T&E Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">AI-powered exception resolution (92% automated)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Deep policy engine with real-time learning</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Carbon optimization in every booking decision</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Proactive fraud detection & prevention</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 p-8 sm:p-12 text-center backdrop-blur-sm"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to see your agents in action?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Jump into the live demo and watch 8 AI agents transform your travel & expense workflow in real-time.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg" asChild>
              <Link href="/demo" className="flex items-center gap-2">
                Watch agents in action
                <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              asChild
            >
              <Link href="mailto:hello@agenticte.com?subject=Product%20session" className="flex items-center gap-2">
                Book a product session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default MarketingPage;