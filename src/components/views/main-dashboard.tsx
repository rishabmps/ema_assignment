
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TravelerExpenseFeed } from "@/components/features/traveler/traveler-expense-feed";
import { TravelerBookingView } from "@/components/features/traveler/traveler-booking-view";
import { FinanceDashboard, type FinanceSection } from "@/components/features/finance/finance-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, ChevronRight, Plane, FileText, Sparkles, ShieldCheck, Check, Receipt } from "lucide-react";
import usersData from "@/lib/data/users.json";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingAgentDisplay } from "@/components/features/agent-activity";
import { DemoAgentProvider, useDemoAgentContext } from "@/components/features/agent-activity/demo-agent-context";

type Persona = "traveler" | "finance";
type Act = "expense" | "booking";
type Step = "persona" | "act" | "demo";

function MainDashboardContent() {
  const [persona, setPersona] = useState<Persona>("traveler");
  const [act, setAct] = useState<Act>("expense");
  const [step, setStep] = useState<Step>("persona");
  
  // Track current URL for finance dashboard
  const [currentFinanceUrl, setCurrentFinanceUrl] = useState("agentic-te.demo/dashboard");

  const demoRef = useRef<HTMLDivElement>(null);

  // Use the shared agent context
  const {
    activities,
    simulateFinanceFlow,
    activateFinanceScenario,
    activateTravelerScenario,
    clearActivities,
  } = useDemoAgentContext();

  const getFinanceScenario = useCallback((section: FinanceSection): Parameters<typeof activateFinanceScenario>[0] => {
    switch (section) {
      case "exceptions":
        return "finance-exceptions";
      case "vat_reclaim":
        return "finance-vat";
      case "policy_insights":
        return "finance-policy";
      case "sustainability":
        return "finance-sustainability";
      case "dashboard":
      default:
        return "finance-dashboard";
    }
  }, []);

  const getTravelerScenario = useCallback(
    (selectedAct: Act): Parameters<typeof activateTravelerScenario>[0] =>
      selectedAct === "expense" ? "traveler-expense" : "traveler-booking",
    []
  );

  const traveler = usersData.find(u => u.role === "Traveler");
  const finance = usersData.find(u => u.role === "Finance Operations");

  const scenarioDetails = useMemo(() => {
    if (step !== "demo") return null;

    if (persona === "traveler" && act === "expense") {
      return {
        label: "Traveler • Act I",
        headline: "Sarah captures a stack of receipts in seconds",
        description:
          "Trigger the Receipt Concierge agent from the mobile view. Watch it extract totals, match the corporate card swipe, and nudge Sarah only if something looks off.",
        callout: "Pro tip: tap “Simulate” to add a new expense and follow the floating agent feed as policies fire in sequence.",
        highlights: [
          "Full compliance reasoning for every approval inside the agent feed.",
          "Automated mileage, per diem, and VAT handling without manual edits.",
          "Real-time reimbursement status—no spreadsheets or email chains.",
        ],
        metrics: [
          { label: "Time to reimbursement", value: "35 seconds", sublabel: "from receipt capture to approval" },
          { label: "Policy confidence", value: "99.2%", sublabel: "based on configured travel program" },
        ],
      };
    }

    if (persona === "traveler" && act === "booking") {
      return {
        label: "Traveler • Act II",
        headline: "Sarah plans a climate-smart trip with concierge guidance",
        description:
          "Use the conversational panel to co-create an itinerary. Agents weigh CO₂ impact, traveler preferences, negotiated rates, and duty of care before presenting options.",
        callout: "Notice how the trip budget and carbon metrics update as you accept recommendations.",
        highlights: [
          "Door-to-door itineraries balanced between time, cost, and emissions.",
          "Automatic documentation of approvals and policy exceptions.",
          "Budget Copilot keeps stakeholders informed on spend impact.",
        ],
        metrics: [
          { label: "CO₂ reduction", value: "42%", sublabel: "versus the default itinerary" },
          { label: "Negotiated savings", value: "$1,280", sublabel: "captured before traveler checkout" },
        ],
      };
    }

    if (persona === "finance") {
      return {
        label: "Finance Ops",
        headline: "Alex oversees policy, cash, and risk in one console",
        description:
          "Navigate the laptop view to see Budget Copilot, Policy Engine, and Fraud Sentinel collaborate. Every decision is explainable, auditable, and export-ready.",
        callout: `Currently exploring: ${currentFinanceUrl}. Change sections in the nav to see agent scenarios adapt instantly.`,
        highlights: [
          "Exception queue prioritized by AI risk scoring and urgency.",
          "Policy playbooks trigger automated approvals with human-in-the-loop when thresholds are crossed.",
          "Real-time variance tracking ties directly into your ERP and forecasting models.",
        ],
        metrics: [
          { label: "Exceptions automated", value: "92%", sublabel: "with explainable outcomes" },
          { label: "Close acceleration", value: "7× faster", sublabel: "month-end close across pilots" },
        ],
      };
    }

    return null;
  }, [step, persona, act, currentFinanceUrl]);

  useEffect(() => {
    if (step === 'demo') {
      // Enhanced auto-scroll with multiple attempts and viewport consideration
      const scrollToDemo = () => {
        if (demoRef.current) {
          const rect = demoRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate optimal scroll position to center the demo content
          const scrollTop = window.pageYOffset + rect.top - (viewportHeight * 0.1);
          
          window.scrollTo({ 
            top: Math.max(0, scrollTop),
            behavior: 'smooth' 
          });
        }
      };

      // Initial scroll with delay for layout stabilization
      setTimeout(scrollToDemo, 150);
      
      // Additional scroll attempts to handle dynamic content loading
      setTimeout(scrollToDemo, 500);
      setTimeout(scrollToDemo, 1000);
    }
  }, [step, persona, act]);

  // Additional effect to ensure devices are always visible when content changes
  useEffect(() => {
    if (step === 'demo') {
      const observer = new ResizeObserver(() => {
        // Debounce to avoid too many scroll calls
        setTimeout(() => {
          if (demoRef.current) {
            const rect = demoRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Only scroll if demo content is not fully visible
            if (rect.top < 0 || rect.bottom > viewportHeight) {
              const scrollTop = window.pageYOffset + rect.top - (viewportHeight * 0.1);
              window.scrollTo({ 
                top: Math.max(0, scrollTop),
                behavior: 'smooth' 
              });
            }
          }
        }, 300);
      });

      if (demoRef.current) {
        observer.observe(demoRef.current);
      }

      return () => observer.disconnect();
    }
  }, [step, persona, act]);


  const handlePersonaSelect = (selectedPersona: Persona) => {
    setPersona(selectedPersona);
    if (selectedPersona === 'finance') {
      setAct('expense'); // Finance persona only has one main view for this demo
      setStep('demo');
      // Trigger finance flow simulation
      setTimeout(() => {
        simulateFinanceFlow();
      }, 1000);
    } else {
      setStep('act');
    }
  };

  const handleActSelect = (selectedAct: Act) => {
    setAct(selectedAct);
    setStep('demo');
  };

  useEffect(() => {
    if (step !== 'demo') {
      clearActivities();
      return;
    }

    if (persona === 'traveler') {
      activateTravelerScenario(getTravelerScenario(act));
    }
  }, [step, persona, act, activateTravelerScenario, clearActivities, getTravelerScenario]);

  useEffect(() => {
    if (step === 'demo' && persona === 'finance') {
      activateFinanceScenario(getFinanceScenario("dashboard"));
    }
  }, [step, persona, activateFinanceScenario, getFinanceScenario]);

  const handleFinanceSectionChange = useCallback((section: FinanceSection) => {
    activateFinanceScenario(getFinanceScenario(section));
  }, [activateFinanceScenario, getFinanceScenario]);
  
  const renderPersonaSelector = () => (
    <motion.div
      key="persona"
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
          Choose Your Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-xl max-w-2xl mx-auto"
        >
          Select a persona to experience AI-powered travel and expense management from their perspective
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            onClick={() => handlePersonaSelect("traveler")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5 border border-blue-500/10 p-1 hover:border-blue-500/30 transition-all duration-500 hover:scale-105"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-xl">
                      {traveler?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    👩‍💼 {traveler?.name}
                  </CardTitle>
                  <CardDescription className="text-blue-300 font-medium text-base">
                    {traveler?.title} • Mobile-First Experience
                  </CardDescription>
                </div>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                "I'm constantly traveling for deals. I need expense management that works as fast as I do—no friction, just results."
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-blue-300 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">Experience Sarah's Journey</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full group-hover:from-blue-600 group-hover:to-blue-700 transition-all transform group-hover:scale-110 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Start Demo</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
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
            onClick={() => handlePersonaSelect("finance")}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 border border-purple-500/10 p-1 hover:border-purple-500/30 transition-all duration-500 hover:scale-105"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 h-full">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-xl">
                      {finance?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                    🧑‍💼 {finance?.name}
                  </CardTitle>
                  <CardDescription className="text-purple-300 font-medium text-base">
                    {finance?.title} • Desktop Dashboard
                  </CardDescription>
                </div>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                "I oversee spend for 200+ employees. I need visibility, control, and automation that scales—with full audit trails."
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-300 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">Experience Alex's Dashboard</span>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full group-hover:from-purple-600 group-hover:to-purple-700 transition-all transform group-hover:scale-110 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Start Demo</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderActSelector = () => (
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
          Choose Sarah's Adventure
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
            onClick={() => handleActSelect("expense")}
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
                  <h4 className="text-white font-semibold mb-3">🪄 What you'll experience:</h4>
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
            onClick={() => handleActSelect("booking")}
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
                  <h4 className="text-white font-semibold mb-3">🧠 What you'll experience:</h4>
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
  
  const getBreadcrumb = () => {
    if (step === 'persona') return "Select Persona";

    let path = <span className="cursor-pointer hover:text-blue-300 transition-colors font-medium text-slate-400" onClick={() => setStep('persona')}>Select Persona</span>;
    
    if (step === 'act' || (step === 'demo' && persona === 'traveler')) {
      path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-500" /> <span className="text-slate-300 font-medium">{traveler?.name}</span></>;
    }
    
    if (step === 'demo' && persona === 'finance') {
       path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-500" /> <span className="text-slate-300 font-medium">{finance?.name}</span></>;
    }

    if (step === 'act') {
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-500" /> <span className="text-slate-300 font-medium">Select Demo</span></>;
    }

    if (step === 'demo' && persona === 'traveler') {
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-500" /> <span className="cursor-pointer hover:text-blue-300 transition-colors font-medium text-slate-400" onClick={() => setStep('act')}>Select Demo</span></>;
        let actName = '';
        if (act === 'expense') actName = 'Act I';
        if (act === 'booking') actName = 'Act II';
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-500" /> <span className="text-slate-300 font-medium">{actName}</span></>;
    }
    
    return path;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" style={{animationDelay: '2s'}}></div>
    </div>

      <div className="w-full py-8 relative z-10">
        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="relative">
              <Bot className="h-10 w-10 text-blue-400 animate-bounce-subtle" />
              <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-10 animate-pulse-ring"></div>
            </div>
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
              Interactive Demo Studio
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed"
          >
            Choose a persona and watch agents work in real-time. Every interaction is powered by the same AI that runs in production.
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700/50 shadow-lg text-slate-300 text-sm font-medium">
            {getBreadcrumb()}
          </div>
        </motion.div>

        {scenarioDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-7xl px-4"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
              <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-2xl backdrop-blur">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
                  <Sparkles className="h-4 w-4" /> {scenarioDetails.label}
                </span>
                <h2 className="mt-6 text-3xl font-bold text-white leading-tight">
                  {scenarioDetails.headline}
                </h2>
                <p className="mt-4 text-lg text-slate-300 leading-relaxed">{scenarioDetails.description}</p>
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 text-blue-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <p className="text-sm leading-relaxed">{scenarioDetails.callout}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-slate-300">
                  {scenarioDetails.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-6">
                {scenarioDetails.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col gap-3 rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur"
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      {metric.label}
                    </div>
                    <div className="text-4xl font-bold text-white">{metric.value}</div>
                    <div className="text-slate-300">{metric.sublabel}</div>
                  </div>
                ))}
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-emerald-300 shadow-xl">
                  <div className="flex items-center gap-3 text-emerald-300 mb-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold">Always-on agent transparency</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Follow the floating agent feed on the right to inspect decision rationale, supporting data, and escalation paths.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={demoRef} className="pb-16">
          <AnimatePresence mode="wait">
            {step === "persona" && (
              <motion.div key="persona-selector" className="w-full flex justify-center px-4">
                {renderPersonaSelector()}
              </motion.div>
            )}
            {step === "act" && (
              <motion.div key="act-selector" className="w-full flex justify-center px-4">
                {renderActSelector()}
              </motion.div>
            )}
            
            {step === "demo" && persona === "traveler" && act === "expense" && (
              <motion.div
                key="traveler-expense"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex justify-center px-4 min-h-[80vh] items-center"
              >
                <div className="relative my-8">
                  <div className="w-full max-w-sm relative mx-auto">
                    <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] transform rotate-1 scale-105 opacity-20 blur-xl"></div>
                    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-3 rounded-[2.5rem] shadow-2xl">
                      <div className="bg-black p-1 rounded-[2rem]">
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20"></div>
                        <div className="aspect-[9/19] w-full rounded-[1.75rem] bg-white overflow-hidden relative">
                          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                          <div className="h-full">
                            <TravelerExpenseFeed hideInlineAgentActivity={true} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                    </div>
                    <motion.div 
                      className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500 rounded-full opacity-20"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === "demo" && persona === "traveler" && act === "booking" && (
              <motion.div
                key="traveler-booking"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex justify-center px-4 min-h-[80vh] items-center"
              >
                <div className="relative my-8">
                  <div className="w-full max-w-sm relative mx-auto">
                    <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] transform rotate-1 scale-105 opacity-20 blur-xl"></div>
                    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-3 rounded-[2.5rem] shadow-2xl">
                      <div className="bg-black p-1 rounded-[2rem]">
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20"></div>
                        <div className="aspect-[9/19] w-full rounded-[1.75rem] bg-white overflow-hidden relative">
                          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                          <div className="h-full">
                            <TravelerBookingView hideInlineAgentActivity={true} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                    </div>
                    <motion.div 
                      className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500 rounded-full opacity-20"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === "demo" && persona === "finance" && (
              <motion.div
                key="finance-dashboard"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex justify-center px-4"
              >
                <div className="w-full max-w-7xl relative my-8">
                    <div className="relative mx-auto">
                      <div className="absolute inset-0 bg-slate-800 rounded-2xl transform rotate-1 scale-105 opacity-20 blur-2xl"></div>
                      <div className="relative bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600 flex items-center px-6">
                          <div className="flex space-x-3">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                          </div>
                          <div className="flex-1 mx-8">
                            <div className="bg-slate-600 rounded-lg px-4 py-1 text-slate-300 text-sm font-mono flex items-center gap-2">
                              <div className="w-3 h-3 text-slate-400">🔒</div>
                              {currentFinanceUrl}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white overflow-auto" style={{ height: 'calc(100vh - 8rem)', maxHeight: '800px'}}>
                          <FinanceDashboard 
                            onUrlChange={setCurrentFinanceUrl}
                            hideInlineAgentActivity={true}
                            onSectionChange={handleFinanceSectionChange}
                          />
                        </div>
                      </div>
                      <motion.div 
                        className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute -bottom-8 -left-8 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity }}
                      />
                    </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Agent Display - only shown during demos */}
      {step === 'demo' && (
        <FloatingAgentDisplay 
          activities={activities}
        />
      )}
    </div>
  );
}

export default function MainDashboard() {
  return (
    <DemoAgentProvider>
      <MainDashboardContent />
    </DemoAgentProvider>
  );
}
