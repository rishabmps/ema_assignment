"use client";

import { motion } from "framer-motion";
import { Receipt, Plane, Sparkles, ChevronRight, Bot } from "lucide-react";
import { ActSelectorProps } from "./types";
import { memo } from "react";

export const ActSelector = memo(function ActSelector({ onActSelect }: ActSelectorProps) {
  return (
    <motion.div
      key="act"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl w-full"
    >
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Choose Sarah&apos;s Adventure
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-xl max-w-2xl mx-auto"
        >
          Experience different aspects of AI-powered travel and expense management
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            onClick={() => onActSelect("expense")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 border border-blue-500/10 p-1 hover:border-blue-500/30 transition-all duration-500 hover:scale-105"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Receipt className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    Act I: The Receipt Rush
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-sm font-medium uppercase tracking-wide">Mobile Experience</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sarah just landed from a client trip with a phone full of receipts. Watch the Receipt Concierge work its magic.
                </p>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h4 className="text-white font-semibold mb-3">🪄 What you&apos;ll experience:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      Instant receipt capture and text extraction
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      Smart matching to corporate card transactions
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      Automated policy compliance and approval
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
                    ⚡ 35 seconds to reimbursement
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
                    🎯 99.2% policy confidence
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all transform group-hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  <span className="font-bold text-lg">Experience the Magic</span>
                  <ChevronRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            onClick={() => onActSelect("booking")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 border border-emerald-500/10 p-1 hover:border-emerald-500/30 transition-all duration-500 hover:scale-105"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Plane className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    Act II: The Smart Booking
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-300 text-sm font-medium uppercase tracking-wide">Conversational AI</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sarah needs to book a complex multi-city trip. Watch her collaborate with AI for optimal outcomes.
                </p>
                
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h4 className="text-white font-semibold mb-3">🧠 What you&apos;ll experience:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Natural conversation with booking AI
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Smart optimization for time, cost, and sustainability
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Duty of care and compliance checks
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
                    🌱 42% CO₂ reduction
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
                    💰 $1,280 saved
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all transform group-hover:scale-105 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <Bot className="h-6 w-6" />
                  <span className="font-bold text-lg">Chat with AI Agent</span>
                  <ChevronRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
