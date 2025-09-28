"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ShieldCheck } from "lucide-react";
import { ScenarioDetailsProps } from "./types";

export const ScenarioDetails = ({ scenarioDetails }: ScenarioDetailsProps) => {
  if (!scenarioDetails) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-16 max-w-7xl px-4"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 shadow-2xl backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300 shadow-lg">
              <Sparkles className="h-4 w-4" /> {scenarioDetails.label}
            </span>
            <h2 className="mt-6 text-4xl font-bold text-white leading-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text">
              {scenarioDetails.headline}
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">{scenarioDetails.description}</p>
            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 text-blue-200 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm leading-relaxed font-medium">{scenarioDetails.callout}</p>
              </div>
            </div>
            <ul className="mt-8 space-y-4 text-slate-300">
              {scenarioDetails.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-6">
          {scenarioDetails.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 shadow-xl backdrop-blur hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {metric.label}
              </div>
              <div className="text-5xl font-bold text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text">{metric.value}</div>
              <div className="text-slate-300 font-medium">{metric.sublabel}</div>
            </div>
          ))}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 p-6 text-emerald-200 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-200 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Always-on agent transparency</span>
            </div>
            <p className="text-sm leading-relaxed">
              Follow the floating agent feed on the right to inspect decision rationale, supporting data, and escalation paths.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
