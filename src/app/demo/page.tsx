import Link from "next/link";
import MainDashboard from "@/components/views/main-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Agentic T&E Demo Studio",
  description:
    "Experience the agentic travel & expense platform through interactive personas, live agent activity, and guided walkthroughs.",
};

const quickSteps = [
  { label: "1. Pick a persona", detail: "Switch views in the left rail to see buyer or seller flows." },
  { label: "2. Trigger an action", detail: "Approve, rebook, or reconcile directly inside the studio." },
  { label: "3. Inspect reasoning", detail: "Open notes to read every agent citation and policy callout." },
];

const personaTips = [
  {
    title: "Finance buyer view",
    detail: "Budget Copilot surfaces live variance and drafts audit-ready entries for you to approve.",
  },
  {
    title: "Travel seller view",
    detail: "Traveler Concierge balances experience, sustainability, and policy with one click nudges.",
  },
  {
    title: "Shared ledger",
    detail: "Every action syncs to the same finance-grade ledger so teams stay aligned in seconds.",
  },
];

const trustSignals = ["SOC 2 Type II", "ISO 27001", "GDPR", "24/7 global support"];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 pb-12 pt-16 text-center">
        <Badge className="bg-blue-500/20 text-blue-100">Demo studio</Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Drive the real Agentic T&E product
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          Everything below is production logic—switch personas, fire workflows, and read every agent note without waiting on our team.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200" asChild>
            <Link href="#studio" className="flex items-center gap-2">
              Jump to the studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            asChild
          >
            <Link href="mailto:hello@agenticte.com?subject=Guided%20demo" className="flex items-center gap-2">
              Need a guided run?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {trustSignals.map((signal) => (
            <span key={signal} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {signal}
            </span>
          ))}
        </div>
        <div className="mt-8 w-full" id="studio">
          <div className="rounded-[30px] border border-white/12 bg-slate-950/70 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.5)] sm:p-6">
            <MainDashboard />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          <div className="grid gap-6 sm:grid-cols-3">
            {quickSteps.map((step) => (
              <div key={step.label} className="space-y-2 text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">{step.label}</p>
                <p className="text-sm text-slate-300">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {personaTips.map((tip) => (
            <div key={tip.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.42)]">
              <h2 className="text-sm font-semibold text-white">{tip.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{tip.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
