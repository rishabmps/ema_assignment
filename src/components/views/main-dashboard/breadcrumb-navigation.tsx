"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, Receipt, Plane, FileText, ShieldCheck, Check, Sparkles, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import usersData from "@/lib/data/users.json";
import { BreadcrumbNavigationProps } from "./types";
import type { FinanceSection } from "@/components/features/finance/finance-dashboard";

export const BreadcrumbNavigation = ({
  step,
  persona,
  act,
  currentFinanceSection,
  onStepChange,
  onPersonaChange,
  onActChange,
  onFinanceSectionChange,
  demoRef
}: BreadcrumbNavigationProps) => {
  const traveler = usersData.find(u => u.role === "Traveler");
  const finance = usersData.find(u => u.role === "Finance Operations");

  if (step === 'persona') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16 text-center"
    >
      <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700/50 shadow-lg text-slate-300 text-sm font-medium">
        <span 
          className="cursor-pointer hover:text-blue-300 transition-colors font-medium text-slate-400" 
          onClick={() => onStepChange('persona')}
        >
          Select Demo
        </span>
        
        {step === 'demo' && (
          <>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            
            {/* Persona Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-blue-300 transition-colors font-medium text-slate-300 focus:outline-none">
                  {persona === 'traveler' ? traveler?.name : finance?.name}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem 
                  onClick={() => {
                    onPersonaChange('traveler');
                    onActChange('expense'); // Default to Act I (Receipt Rush)
                    onStepChange('demo');
                  }}
                  className="text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        {traveler?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{traveler?.name}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    onPersonaChange('finance');
                    onStepChange('demo');
                  }}
                  className="text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        {finance?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{finance?.name}</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {persona === 'traveler' && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-500" />
                
                {/* Act Dropdown for Traveler */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 hover:text-blue-300 transition-colors font-medium text-slate-400 focus:outline-none">
                      {act === 'expense' ? 'Act I: Receipt Magic' : 'Act II: Smart Booking'}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem 
                      onClick={() => {
                        onActChange('expense');
                        onStepChange('demo');
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-blue-400" />
                        <span>Act I: Receipt Magic</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        onActChange('booking');
                        onStepChange('demo');
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-emerald-400" />
                        <span>Act II: Smart Booking</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {persona === 'finance' && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-500" />
                
                {/* Section Dropdown for Finance */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 hover:text-blue-300 transition-colors font-medium text-slate-400 focus:outline-none">
                      {currentFinanceSection === 'dashboard' ? 'Dashboard' : 
                       currentFinanceSection === 'exceptions' ? 'Exceptions' :
                       currentFinanceSection === 'vat_reclaim' ? 'VAT Reclaim' :
                       currentFinanceSection === 'policy_insights' ? 'Policy Insights' :
                       currentFinanceSection === 'sustainability' ? 'Sustainability' : 'Dashboard'}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem 
                      onClick={() => {
                        onFinanceSectionChange('dashboard');
                        // Scroll to finance dashboard after a brief delay
                        setTimeout(() => {
                          demoRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'center'
                          });
                        }, 100);
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span>Dashboard</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        onFinanceSectionChange('exceptions');
                        // Scroll to finance dashboard after a brief delay
                        setTimeout(() => {
                          demoRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'center'
                          });
                        }, 100);
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-orange-400" />
                        <span>Exceptions</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        onFinanceSectionChange('vat_reclaim');
                        // Scroll to finance dashboard after a brief delay
                        setTimeout(() => {
                          demoRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'center'
                          });
                        }, 100);
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span>VAT Reclaim</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        onFinanceSectionChange('policy_insights');
                        // Scroll to finance dashboard after a brief delay
                        setTimeout(() => {
                          demoRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'center'
                          });
                        }, 100);
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span>Policy Insights</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        onFinanceSectionChange('sustainability');
                        // Scroll to finance dashboard after a brief delay
                        setTimeout(() => {
                          demoRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'center'
                          });
                        }, 100);
                      }}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-emerald-400" />
                        <span>Sustainability</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};
