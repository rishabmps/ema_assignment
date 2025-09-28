"use client";

import { motion } from "framer-motion";
import { Sparkles, Receipt, Plane, ShieldCheck, Check, Bot } from "lucide-react";
import { DemoSelectorProps } from "./types";
import { memo } from "react";

export const DemoSelector = memo(function DemoSelector({ onPersonaSelect, onActSelect }: DemoSelectorProps) {
  return (
    <motion.div
      key="demo-selector"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl w-full"
    >
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
        >
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">Live AI Agent Demo</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
        >
          AI Agents in Action
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto"
        >
          Jump into live workflows. Watch real AI agents automate expenses, bookings, and finance operations.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receipt Magic Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            onClick={() => {
              onPersonaSelect("traveler");
              onActSelect("expense");
            }}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-purple-500/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 h-[480px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Receipt className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    📸 Receipt Magic
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-sm font-medium">LIVE • Sarah&apos;s Mobile</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-base mb-4 leading-relaxed">
                Watch AI agents instantly capture receipts, match transactions, and approve expenses in 35 seconds.
              </p>

              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Instant receipt capture & extraction</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Auto policy compliance checking</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Real-time approval workflow</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
                  ⚡ 35 sec approval
                </div>
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20">
                  🎯 99.2% accuracy
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all text-center font-semibold text-sm">
                Experience Receipt Magic →
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Booking Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            onClick={() => {
              onPersonaSelect("traveler");
              onActSelect("booking");
            }}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/5 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:scale-105 h-[480px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    ✈️ Smart Booking
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-300 text-sm font-medium">LIVE • AI Conversation</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-base mb-4 leading-relaxed">
                Co-create optimal itineraries with AI that balances cost, time, compliance, and sustainability.
              </p>

              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Natural conversation with booking AI</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Policy & sustainability optimization</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Negotiated rate discovery</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
                  🌱 42% CO₂ saved
                </div>
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20">
                  💰 $1,280 saved
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-2xl group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all text-center font-semibold text-sm">
                Experience Smart Booking →
              </div>
            </div>
          </div>
        </motion.div>

        {/* Finance Command Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            onClick={() => {
              onPersonaSelect("finance");
              onActSelect("expense");
            }}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-pink-500/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 h-[480px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    💼 Finance Command
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-300 text-sm font-medium">LIVE • Alex&apos;s Dashboard</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-base mb-4 leading-relaxed">
                Navigate the strategic finance hub with AI-powered exception handling, VAT reclaim, and policy insights.
              </p>

              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>AI-prioritized exception queue</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Automated VAT reclaim identification</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Real-time compliance monitoring</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
                  🚀 92% automated
                </div>
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20">
                  ⚡ 7× faster close
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-2xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all text-center font-semibold text-sm">
                Experience Finance Command →
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
