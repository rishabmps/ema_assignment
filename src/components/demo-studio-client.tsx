"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Briefcase, Receipt, Plane, BarChart3, Shield, Zap, Leaf, Play, Smartphone, Monitor, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TravelerExpenseFeed } from "@/components/features/traveler/traveler-expense-feed";
import { TravelerBookingView } from "@/components/features/traveler/traveler-booking-view";
import { FinanceDashboard } from "@/components/features/finance/finance-dashboard";
import { DemoAgentProvider, useDemoAgentContext } from "@/components/features/agent-activity/demo-agent-context";
import { FloatingAgentDisplay } from "@/components/features/agent-activity";

type Persona = "sarah" | "alex" | null;
type SarahAct = "receipt-rush" | "smart-booking" | null;
type AlexAct = "exceptions" | "vat-reclaim" | "policy-insights" | "sustainability" | null;

function DemoStudioClientContent() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(null);
  const [selectedSarahAct, setSelectedSarahAct] = useState<SarahAct>(null);
  const [selectedAlexAct, setSelectedAlexAct] = useState<AlexAct>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Get activities from the demo agent context
  const { activities } = useDemoAgentContext();

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setSelectedSarahAct(null);
    setSelectedAlexAct(null);
    // Scroll to demo section
    setTimeout(() => {
      demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSarahActSelect = (act: SarahAct) => {
    setSelectedSarahAct(act);
  };

  const handleAlexActSelect = (act: AlexAct) => {
    setSelectedAlexAct(act);
  };

  const renderSarahDemo = () => {
    switch (selectedSarahAct) {
      case "receipt-rush":
        return (
          <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Receipt className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Act I: The Receipt Rush</h3>
                <p className="text-slate-400 text-sm">Mobile Experience • Live Agent Orchestration</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Mobile UI Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-slate-950 rounded-3xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Sarah's Phone</span>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4">
                    <TravelerExpenseFeed hideInlineAgentActivity={true} />
                  </div>
                </div>
              </div>
              
              {/* Agent Panel */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Agentic AI at Work</h4>
                      <p className="text-xs text-slate-400">Receipt Concierge • Policy Engine • Fraud Sentinel</p>
                    </div>
                  </div>
                  <FloatingAgentDisplay activities={activities} />
                </div>
              </div>
            </div>
          </div>
        );
      case "smart-booking":
        return (
          <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Act II: The Smart Booking</h3>
                <p className="text-slate-400 text-sm">Mobile Experience • Conversational AI</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Mobile UI Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-slate-950 rounded-3xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Sarah's Phone</span>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4">
                    <TravelerBookingView />
                  </div>
                </div>
              </div>
              
              {/* Agent Panel */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Agentic AI at Work</h4>
                      <p className="text-xs text-slate-400">Travel Concierge • Budget Copilot • Carbon Monitor</p>
                    </div>
                  </div>
                  <FloatingAgentDisplay activities={activities} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAlexDemo = () => {
    const sectionMap = {
      "exceptions": "exceptions" as const,
      "vat-reclaim": "vat_reclaim" as const,
      "policy-insights": "policy_insights" as const,
      "sustainability": "sustainability" as const,
    };

    const section = selectedAlexAct ? sectionMap[selectedAlexAct] : undefined;
    if (!section) return null;

    const actTitles = {
      "exceptions": "Exception Handling",
      "vat-reclaim": "VAT Reclaim",
      "policy-insights": "Policy Insights & Improvement", 
      "sustainability": "Sustainability Monitoring",
    };

    const actIcons = {
      "exceptions": Shield,
      "vat-reclaim": BarChart3,
      "policy-insights": Zap,
      "sustainability": Leaf,
    };

    const Icon = actIcons[selectedAlexAct];

    return (
      <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Act: {actTitles[selectedAlexAct]}</h3>
            <p className="text-slate-400 text-sm">Finance Dashboard • Live Agent Orchestration</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Desktop UI */}
          <div className="lg:col-span-1">
            <div className="bg-slate-950 rounded-3xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">Alex's Dashboard</span>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 max-h-96 overflow-y-auto">
                <FinanceDashboard defaultSection={section} />
              </div>
            </div>
          </div>
          
          {/* Agent Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Agentic AI at Work</h4>
                  <p className="text-xs text-slate-400">Policy Engine • Budget Copilot • Fraud Sentinel</p>
                </div>
              </div>
              <FloatingAgentDisplay activities={activities} />
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              <Link href="#experience" className="flex items-center gap-2">
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
            Leave the marketing behind—step into the product. Experience how real AI agents orchestrate and automate travel and expense management through immersive storytelling.
          </p>
          <p className="max-w-4xl mx-auto text-lg text-slate-400 mt-4">
            Choose a persona, select an act, and watch agents work in real-time with mobile skeleton and agent overlay—no slides, just software.
          </p>
        </section>

        {/* Persona Selection Section */}
        <section id="experience" ref={demoRef} className="mx-auto max-w-6xl px-6 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Story</h2>
            <p className="text-lg text-slate-300">Step into the shoes of Sarah or Alex and experience live agent orchestration</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Sarah - Traveler */}
            <motion.div 
              className={`group rounded-3xl border p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                selectedPersona === 'sarah' 
                  ? 'border-blue-400/50 bg-gradient-to-b from-blue-500/20 to-blue-600/10 scale-105' 
                  : 'border-white/10 bg-gradient-to-b from-white/10 to-white/5 hover:border-white/20 hover:scale-105'
              }`}
              onClick={() => handlePersonaSelect('sarah')}
              whileHover={{ scale: selectedPersona === 'sarah' ? 1.05 : 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">👩‍💼 Sarah – Traveler</h3>
                  <p className="text-slate-400">Mobile-First Experience</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Act I */}
                <motion.div 
                  className={`border-l-2 border-blue-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedSarahAct === 'receipt-rush' ? 'bg-blue-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'sarah') {
                      handleSarahActSelect(selectedSarahAct === 'receipt-rush' ? null : 'receipt-rush');
                    } else {
                      handlePersonaSelect('sarah');
                      handleSarahActSelect('receipt-rush');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Receipt className="h-5 w-5 text-blue-400" />
                    <h4 className="text-lg font-semibold text-white">Act I: The Receipt Rush</h4>
                    {selectedPersona === 'sarah' && <Play className="h-4 w-4 text-blue-400 ml-auto" />}
                  </div>
                  <p className="text-slate-300 mb-3">
                    Sarah lands after a trip, her phone full of receipts. Watch the Receipt Concierge extract totals, match transactions, and handle policy checks automatically.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-emerald-400 font-medium">Time to reimbursement: 35 seconds</span>
                    <span className="text-blue-400 font-medium">Policy confidence: 99.2%</span>
                  </div>
                </motion.div>

                {/* Act II */}
                <motion.div 
                  className={`border-l-2 border-emerald-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedSarahAct === 'smart-booking' ? 'bg-emerald-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'sarah') {
                      handleSarahActSelect(selectedSarahAct === 'smart-booking' ? null : 'smart-booking');
                    } else {
                      handlePersonaSelect('sarah');
                      handleSarahActSelect('smart-booking');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-lg font-semibold text-white">Act II: The Smart Booking</h4>
                    {selectedPersona === 'sarah' && <Play className="h-4 w-4 text-emerald-400 ml-auto" />}
                  </div>
                  <p className="text-slate-300 mb-3">
                    A new project awaits. Sarah opens the booking panel and co-creates an itinerary with AI, balancing CO₂ impact, preferences, and compliance.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-emerald-400 font-medium">CO₂ reduction: 42%</span>
                    <span className="text-blue-400 font-medium">Negotiated savings: $1,280</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Alex - Finance Ops */}
            <motion.div 
              className={`group rounded-3xl border p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                selectedPersona === 'alex' 
                  ? 'border-purple-400/50 bg-gradient-to-b from-purple-500/20 to-purple-600/10 scale-105' 
                  : 'border-white/10 bg-gradient-to-b from-white/10 to-white/5 hover:border-white/20 hover:scale-105'
              }`}
              onClick={() => handlePersonaSelect('alex')}
              whileHover={{ scale: selectedPersona === 'alex' ? 1.05 : 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">🧑‍💼 Alex – Finance Ops</h3>
                  <p className="text-slate-400">Dashboard Experience</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Act I */}
                <motion.div 
                  className={`border-l-2 border-red-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedAlexAct === 'exceptions' ? 'bg-red-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'alex') {
                      handleAlexActSelect(selectedAlexAct === 'exceptions' ? null : 'exceptions');
                    } else {
                      handlePersonaSelect('alex');
                      handleAlexActSelect('exceptions');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    <h4 className="text-md font-semibold text-white">Act I: Exception Handling</h4>
                    {selectedPersona === 'alex' && <Play className="h-4 w-4 text-red-400 ml-auto" />}
                  </div>
                  <p className="text-sm text-slate-300 mb-1">
                    Alex reviews live exception queues. See Policy Engine and Fraud Sentinel prioritize by AI scoring.
                  </p>
                  <span className="text-xs text-red-400 font-medium">Exceptions automated: 92%</span>
                </motion.div>

                {/* Act II */}
                <motion.div 
                  className={`border-l-2 border-yellow-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedAlexAct === 'vat-reclaim' ? 'bg-yellow-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'alex') {
                      handleAlexActSelect(selectedAlexAct === 'vat-reclaim' ? null : 'vat-reclaim');
                    } else {
                      handlePersonaSelect('alex');
                      handleAlexActSelect('vat-reclaim');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-md font-semibold text-white">Act II: VAT Reclaim</h4>
                    {selectedPersona === 'alex' && <Play className="h-4 w-4 text-yellow-400 ml-auto" />}
                  </div>
                  <p className="text-sm text-slate-300 mb-1">
                    Quarter-end VAT processing. Agents automatically surface reclaimable VAT worldwide.
                  </p>
                  <span className="text-xs text-yellow-400 font-medium">Average reclaim: $4,060/quarter</span>
                </motion.div>

                {/* Act III */}
                <motion.div 
                  className={`border-l-2 border-blue-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedAlexAct === 'policy-insights' ? 'bg-blue-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'alex') {
                      handleAlexActSelect(selectedAlexAct === 'policy-insights' ? null : 'policy-insights');
                    } else {
                      handlePersonaSelect('alex');
                      handleAlexActSelect('policy-insights');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <h4 className="text-md font-semibold text-white">Act III: Policy Insights</h4>
                    {selectedPersona === 'alex' && <Play className="h-4 w-4 text-blue-400 ml-auto" />}
                  </div>
                  <p className="text-sm text-slate-300 mb-1">
                    Policy Engine analyzes spending patterns and surfaces improvement recommendations.
                  </p>
                  <span className="text-xs text-blue-400 font-medium">1+ recommendations per review</span>
                </motion.div>

                {/* Act IV */}
                <motion.div 
                  className={`border-l-2 border-emerald-400 pl-4 cursor-pointer transition-all duration-300 ${
                    selectedAlexAct === 'sustainability' ? 'bg-emerald-400/10 -ml-2 pl-6 rounded-r-lg py-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPersona === 'alex') {
                      handleAlexActSelect(selectedAlexAct === 'sustainability' ? null : 'sustainability');
                    } else {
                      handlePersonaSelect('alex');
                      handleAlexActSelect('sustainability');
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-md font-semibold text-white">Act IV: Sustainability</h4>
                    {selectedPersona === 'alex' && <Play className="h-4 w-4 text-emerald-400 ml-auto" />}
                  </div>
                  <p className="text-sm text-slate-300 mb-1">
                    Monitor CO₂ emissions, surface climate alternatives, generate compliance reports.
                  </p>
                  <span className="text-xs text-emerald-400 font-medium">CO₂ tracking: 100%</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Live Demo Experience */}
          <AnimatePresence>
            {(selectedSarahAct || selectedAlexAct) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Live Agent Experience</h2>
                  <p className="text-lg text-slate-300">
                    Watch real AI agents orchestrate and explain their reasoning in real-time
                  </p>
                </div>
                {selectedPersona === 'sarah' && renderSarahDemo()}
                {selectedPersona === 'alex' && renderAlexDemo()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions when persona selected but no act */}
          {selectedPersona && !selectedSarahAct && !selectedAlexAct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Great choice! Now select an act above to see the live demo
              </h3>
              <p className="text-slate-300">
                Each act shows you the mobile/desktop interface alongside live agent activity explaining every decision
              </p>
            </motion.div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-500/20 p-8 sm:p-12 backdrop-blur-sm text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-xl text-slate-300 mb-6">
              {!selectedPersona 
                ? "Choose a persona above to start your journey" 
                : !selectedSarahAct && !selectedAlexAct
                ? "Select an act to see live agent orchestration"
                : "Experiencing live agent workflows—try different acts to see more!"
              }
            </p>
            {selectedPersona && (selectedSarahAct || selectedAlexAct) && (
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedPersona(null);
                  setSelectedSarahAct(null);
                  setSelectedAlexAct(null);
                }}
              >
                Try Different Persona
              </Button>
            )}
          </div>
        </section>
      </main>
  );
}

export function DemoStudioClient() {
  return (
    <DemoAgentProvider>
      <DemoStudioClientContent />
    </DemoAgentProvider>
  );
}