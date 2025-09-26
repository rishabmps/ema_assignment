
"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TravelerExpenseFeed } from "@/components/features/traveler/traveler-expense-feed";
import { TravelerBookingView } from "@/components/features/traveler/traveler-booking-view";
import { FinanceDashboard } from "@/components/features/finance/finance-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, ChevronRight, Plane, FileText } from "lucide-react";
import usersData from "@/lib/data/users.json";
import { AnimatePresence, motion } from "framer-motion";

type Persona = "traveler" | "finance";
type Act = "expense" | "booking";
type Step = "persona" | "act" | "demo";

export default function MainDashboard() {
  const [persona, setPersona] = useState<Persona>("traveler");
  const [act, setAct] = useState<Act>("expense");
  const [step, setStep] = useState<Step>("persona");

  const traveler = usersData.find(u => u.role === "Traveler");
  const finance = usersData.find(u => u.role === "Finance Operations");

  const handlePersonaSelect = (selectedPersona: Persona) => {
    setPersona(selectedPersona);
    if (selectedPersona === 'finance') {
      setAct('expense'); // Finance persona only has one main view for this demo
      setStep('demo');
    } else {
      setStep('act');
    }
  };

  const handleActSelect = (selectedAct: Act) => {
    setAct(selectedAct);
    setStep('demo');
  };
  
  const handleBack = () => {
    if (step === 'demo') {
      if (persona === 'traveler') {
        setStep('act');
      } else {
        setStep('persona');
      }
    } else if (step === 'act') {
      setStep('persona');
    }
  }

  const renderPersonaSelector = () => (
    <motion.div
      key="persona"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl w-full mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-slate-800 mb-4"
        >
          Step 1: Choose a Persona
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-lg"
        >
          Who are you in this story?
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card 
              onClick={() => handlePersonaSelect("traveler")}
              className="p-8 cursor-pointer hover:border-blue-300 transition-all duration-300 group border-2 border-transparent bg-gradient-to-br from-white to-blue-50/50 hover:shadow-2xl hover:scale-105 transform backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg">
                          {traveler?.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                          {traveler?.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500 font-medium">
                          {traveler?.title}
                        </CardDescription>
                    </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  I'm on the go, making purchases and booking trips. I want everything to be fast and easy.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm font-semibold">Experience as Sarah</span>
                  </div>
                  <div className="flex justify-end items-center bg-blue-600 text-white px-4 py-2 rounded-full group-hover:bg-blue-700 transition-all transform group-hover:scale-110">
                    <span className="text-sm font-semibold mr-2">Start Journey</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card 
              onClick={() => handlePersonaSelect("finance")}
              className="p-8 cursor-pointer hover:border-purple-300 transition-all duration-300 group border-2 border-transparent bg-gradient-to-br from-white to-purple-50/50 hover:shadow-2xl hover:scale-105 transform backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-lg">
                          {finance?.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                          {finance?.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500 font-medium">
                          {finance?.title}
                        </CardDescription>
                    </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  I oversee company spending, manage exceptions, and ensure policy compliance.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm font-semibold">Experience as Alex</span>
                  </div>
                  <div className="flex justify-end items-center bg-purple-600 text-white px-4 py-2 rounded-full group-hover:bg-purple-700 transition-all transform group-hover:scale-110">
                    <span className="text-sm font-semibold mr-2">Start Journey</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
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
      className="max-w-5xl w-full mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-slate-800 mb-4"
        >
          Step 2: Choose a Demo
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-lg"
        >
          What would you like to see?
        </motion.p>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card 
              onClick={() => handleActSelect("expense")}
              className="p-8 cursor-pointer hover:border-emerald-300 transition-all duration-300 group border-2 border-transparent bg-gradient-to-br from-white to-emerald-50/50 hover:shadow-2xl hover:scale-105 transform backdrop-blur-sm relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">
                      Act I: The Invisible Expense Report
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-slate-500 font-medium">Interactive Demo</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed flex-grow mb-6">
                  See how AI turns a 20-minute chore into a 5-second task. Experience the magic of automatic expense categorization and receipt matching.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm font-semibold">Try the AI magic</span>
                  </div>
                  <div className="flex justify-end items-center bg-emerald-600 text-white px-4 py-2 rounded-full group-hover:bg-emerald-700 transition-all transform group-hover:scale-110">
                    <span className="text-sm font-semibold mr-2">Start Demo</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card 
              onClick={() => handleActSelect("booking")}
              className="p-8 cursor-pointer hover:border-sky-300 transition-all duration-300 group border-2 border-transparent bg-gradient-to-br from-white to-sky-50/50 hover:shadow-2xl hover:scale-105 transform backdrop-blur-sm relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Plane className="h-8 w-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-sky-700 transition-colors mb-1">
                      Act II: The Intelligent & Guided Trip
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-sky-500 rounded-full"></div>
                      <span className="text-sm text-slate-500 font-medium">Conversational AI</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed flex-grow mb-6">
                  Book a trip conversationally and see how the agent guides you to smarter, sustainable choices. Experience AI-powered travel optimization.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className="text-sm font-semibold">Chat with AI agent</span>
                  </div>
                  <div className="flex justify-end items-center bg-sky-600 text-white px-4 py-2 rounded-full group-hover:bg-sky-700 transition-all transform group-hover:scale-110">
                    <span className="text-sm font-semibold mr-2">Start Demo</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
      </div>
    </motion.div>
  );
  
  const getBreadcrumb = () => {
    if (step === 'persona') return "Select Persona";

    let path = <span className="cursor-pointer hover:text-blue-600 transition-colors font-medium" onClick={() => setStep('persona')}>Select Persona</span>;
    
    if (step === 'act' || (step === 'demo' && persona === 'traveler')) {
      path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-400" /> <span className="text-slate-700 font-medium">{traveler?.name}</span></>;
    }
    
    if (step === 'demo' && persona === 'finance') {
       path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-400" /> <span className="text-slate-700 font-medium">{finance?.name}</span></>;
    }

    if (step === 'act') {
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-400" /> <span className="text-slate-700 font-medium">Select Demo</span></>;
    }

    if (step === 'demo' && persona === 'traveler') {
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-400" /> <span className="cursor-pointer hover:text-blue-600 transition-colors font-medium" onClick={() => setStep('act')}>Select Demo</span></>;
        let actName = '';
        if (act === 'expense') actName = 'Act I';
        if (act === 'booking') actName = 'Act II';
        path = <>{path} <ChevronRight className="h-3 w-3 inline-block mx-2 text-slate-400" /> <span className="text-slate-700 font-medium">{actName}</span></>;
    }
    
    return path;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="w-full py-8 px-4 relative z-10">
        <header className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="relative">
              <Bot className="h-12 w-12 text-blue-600 animate-bounce-subtle" />
              <div className="absolute -inset-1 bg-blue-600 rounded-full opacity-20 animate-pulse-ring"></div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x">
              Agentic T&E
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            The future of Travel & Expense management is invisible.
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 shadow-lg text-slate-600 text-sm font-medium">
            {getBreadcrumb()}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "persona" && renderPersonaSelector()}
          {step === "act" && renderActSelector()}

          {step === "demo" && persona === "traveler" && act === "expense" && (
            <motion.div
              key="traveler-expense"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex justify-center"
            >
              <div className="relative">
                <div className="w-full max-w-sm relative">
                  <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] transform rotate-1 scale-105 opacity-20 blur-xl"></div>
                  <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-3 rounded-[2.5rem] shadow-2xl">
                    <div className="bg-black p-1 rounded-[2rem]">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20"></div>
                      <div className="aspect-[9/19] w-full rounded-[1.75rem] bg-white overflow-hidden relative">
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                        <div className="h-full">
                          <TravelerExpenseFeed />
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
              className="w-full flex justify-center"
            >
              <div className="relative">
                <div className="w-full max-w-sm relative">
                  <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] transform rotate-1 scale-105 opacity-20 blur-xl"></div>
                  <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-3 rounded-[2.5rem] shadow-2xl">
                    <div className="bg-black p-1 rounded-[2rem]">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20"></div>
                      <div className="aspect-[9/19] w-full rounded-[1.75rem] bg-white overflow-hidden relative">
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                        <div className="h-full">
                          <TravelerBookingView />
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
              className="w-full flex justify-center"
            >
               <div className="w-full max-w-7xl relative">
                  <div className="relative">
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
                            agentic-te.demo/dashboard
                          </div>
                        </div>
                      </div>
                      <div className="bg-white" style={{ height: 'calc(100vh - 8rem)', maxHeight: '800px'}}>
                        <FinanceDashboard />
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
  );
}
