"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

const metrics = [
  { value: "95%", label: "zero-touch expenses" },
  { value: "$4.2M", label: "avg. annual savings" },
  { value: "7x", label: "faster close" },
];

const personas = [
  {
    title: "For finance buyers",
    blurb: "Command spend, audit fast, and forecast with confidence.",
    bullets: ["Autopilot approvals", "Live variance radar", "Audit-ready ledger"],
  },
  {
    title: "For travel sellers",
    blurb: "Deliver premium journeys that stay inside policy every time.",
    bullets: ["Conversational booking", "Instant reimbursements", "Sustainability nudges"],
  },
];

const flow = [
  { title: "Connect", detail: "Plug ERP, cards, and HRIS in minutes." },
  { title: "Configure", detail: "Import policy guardrails and budgets." },
  { title: "Go live", detail: "Invite teams and track value in real time." },
];

const quotes = [
  {
    text: "Exception backlog dropped 90% and investors loved the clarity.",
    author: "Priya Desai, VP Finance",
  },
  {
    text: "Travelers rave while controllers get instant context.",
    author: "Marcus Leung, Corporate Controller",
  },
];

export function MarketingPage() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-16 pt-16 text-center sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Badge className="bg-blue-500/20 text-blue-100">Agentic travel & expense</Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            One operating system for buyers and sellers of spend control
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            We pair policy-aware copilots with a finance-grade ledger so the people buying travel and the people delivering it stay in sync.
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-3 sm:flex-row">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200" asChild>
            <Link href="/demo" className="flex items-center gap-2">
              Launch demo studio
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="mailto:hello@agenticte.com?subject=Product%20session"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition-colors hover:text-white"
          >
            Talk with a product specialist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <dl className="grid gap-4 text-left sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.value}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.35)]"
            >
              <dt className="text-2xl font-semibold text-white">{metric.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-slate-400">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section id="personas" className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {personas.map((persona) => (
            <div key={persona.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.35)]">
              <h2 className="text-lg font-semibold text-white">{persona.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{persona.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {persona.bullets.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="text-blue-200">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {flow.map((step, index) => (
              <div key={step.title} className="flex-1 space-y-2 text-sm text-slate-300">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {quotes.map((quote) => (
            <blockquote key={quote.text} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.4)]">
              <p className="text-base text-slate-100">“{quote.text}”</p>
              <footer className="mt-4 text-xs uppercase tracking-wide text-slate-400">{quote.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 p-8 text-center shadow-[0_32px_80px_rgba(15,23,42,0.55)]">
          <h2 className="text-3xl font-semibold text-white">Ready to see it live?</h2>
          <p className="mt-2 text-sm text-white/80">Jump straight into the demo studio or loop in our product team for a tailored walkthrough.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/demo" className="flex items-center gap-2">
                Launch demo studio
                <ChevronRight className="h-4 w-4" />
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
        </div>
      </section>
    </div>
  );
}

export default MarketingPage;
