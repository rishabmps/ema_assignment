import Link from "next/link";
import MainDashboard from "@/components/views/main-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Receipt, Shield, FileCheck, Calculator } from "lucide-react";

export const metadata = {
  title: "Agentic T&E Demo Studio",
  description:
    "Experience the agentic travel & expense platform through interactive personas, live agent activity, and guided walkthroughs.",
};

// Highlighted agents for the demo
const featuredAgents = [
  {
    name: "Receipt Concierge",
    description: "Intelligently captures and matches receipts to transactions",
    icon: Receipt,
    color: "from-purple-500 to-purple-600",
    status: "Processing 23 receipts"
  },
  {
    name: "Policy Engine", 
    description: "Enforces compliance rules and validates expense policies",
    icon: FileCheck,
    color: "from-blue-500 to-blue-600",
    status: "Monitoring 156 transactions"
  },
  {
    name: "Fraud Sentinel",
    description: "Detects suspicious patterns and protects against fraud",
    icon: Shield,
    color: "from-red-500 to-red-600",
    status: "Scanning for anomalies"
  },
  {
    name: "Budget Copilot",
    description: "Tracks spending and optimizes budget allocation",
    icon: Calculator,
    color: "from-emerald-500 to-emerald-600",
    status: "Analyzing budget variance"
  }
];

const agentCapabilities = [
  {
    title: "Real-time Processing",
    description: "All agents work simultaneously to process transactions as they happen",
    agents: ["Receipt Concierge", "Policy Engine", "Fraud Sentinel"]
  },
  {
    title: "Smart Decision Making",
    description: "AI agents collaborate to make optimal decisions about bookings and expenses",
    agents: ["Booking Orchestrator", "Budget Copilot", "CO2 Advisor"]
  },
  {
    title: "Compliance Automation",
    description: "Ensures every transaction meets company policies and regulatory requirements",
    agents: ["Policy Engine", "Compliance Guardian", "Expense Automator"]
  }
];

const trustSignals = ["SOC 2 Type II", "ISO 27001", "GDPR", "24/7 global support"];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Hero Section - Agent Focused */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 pb-16 pt-16 text-center">
        <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border border-blue-400/20">
          Live Demo • 8 AI Agents
        </Badge>
        <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Watch AI agents work in{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            real-time
          </span>
        </h1>
        <p className="max-w-3xl text-lg text-slate-300 sm:text-xl">
          Experience live agent orchestration as they process expenses, enforce policies, detect fraud, and optimize every decision—just like in production.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 shadow-lg" asChild>
            <Link href="#demo" className="flex items-center gap-2">
              Jump to live demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            asChild
          >
            <Link href="mailto:hello@agenticte.com?subject=Guided%20demo" className="flex items-center gap-2">
              Get guided walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          {trustSignals.map((signal) => (
            <span key={signal} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {signal}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Meet the agents you&apos;ll see in action
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            These AI agents work together seamlessly to handle every aspect of travel and expense management
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAgents.map((agent) => {
            const IconComponent = agent.icon;
            return (
              <div
                key={agent.name}
                className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:scale-105"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${agent.color} shadow-lg mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {agent.name}
                </h3>
                
                <p className="text-sm text-slate-300 mb-4">
                  {agent.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {agent.status}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Agent Capabilities Section */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {agentCapabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-6">
                <span className="text-lg font-bold text-white">{index + 1}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {capability.title}
              </h3>
              
              <p className="text-slate-300 mb-4">
                {capability.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {capability.agents.map((agentName) => (
                  <span
                    key={agentName}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-slate-200 border border-white/20"
                  >
                    {agentName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section - Seamlessly Integrated */}
      <section id="demo" className="mx-auto max-w-7xl px-6 pb-20">
        <MainDashboard />
      </section>

      {/* Quick Guide Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-500/20 p-8 sm:p-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              How to explore the demo
            </h2>
            <p className="text-slate-300">
              Follow these steps to get the most out of your demo experience
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-4">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Pick a persona</h3>
              <p className="text-sm text-slate-300">
                Switch between traveler and finance views to see how agents serve different roles
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-4">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Trigger actions</h3>
              <p className="text-sm text-slate-300">
                Upload receipts, book travel, or process expenses and watch agents respond
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg mb-4">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Inspect reasoning</h3>
              <p className="text-sm text-slate-300">
                View agent notes, policy citations, and decision logic behind every action
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}