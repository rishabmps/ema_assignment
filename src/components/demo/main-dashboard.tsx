"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TravelerExpenseFeed } from "@/components/demo/traveler-expense-feed";
import { TravelerBookingView } from "@/components/demo/traveler-booking-view";
import { FinanceDashboard } from "@/components/demo/finance-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, ChevronRight, Users, Plane, FileText } from "lucide-react";
import usersData from "@/lib/data/users.json";
import { Button } from "@/components/ui/button";
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
      setStep('demo');
    } else {
      setStep('act');
    }
  };

  const handleActSelect = (selectedAct: Act) => {
    setAct(selectedAct);
    setStep('demo');
  };

  const renderPersonaSelector = () => (
    <motion.div
      key="persona"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Step 1: Choose a Persona</h2>
        <p className="text-muted-foreground mt-1">Who are you in this story?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            onClick={() => handlePersonaSelect("traveler")}
            className="p-6 cursor-pointer hover:border-primary transition-all group border-2 border-transparent"
          >
              <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12"><AvatarFallback>{traveler?.initials}</AvatarFallback></Avatar>
                  <div>
                      <h3 className="font-semibold text-lg">{traveler?.name}</h3>
                      <p className="text-sm text-muted-foreground">{traveler?.title}</p>
                  </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">I'm on the go, making purchases and booking trips. I want everything to be fast and easy.</p>
              <div className="flex justify-end items-center mt-4">
                <span className="text-sm font-semibold text-primary group-hover:underline">Start as Traveler</span>
                <ChevronRight className="h-4 w-4 text-primary ml-1" />
              </div>
          </Card>
          <Card 
            onClick={() => handlePersonaSelect("finance")}
            className="p-6 cursor-pointer hover:border-primary transition-all group border-2 border-transparent"
          >
              <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12"><AvatarFallback>{finance?.initials}</AvatarFallback></Avatar>
                  <div>
                      <h3 className="font-semibold text-lg">{finance?.name}</h3>
                      <p className="text-sm text-muted-foreground">{finance?.title}</p>
                  </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">I oversee company spending, manage exceptions, and ensure policy compliance.</p>
              <div className="flex justify-end items-center mt-4">
                <span className="text-sm font-semibold text-primary group-hover:underline">Start as Finance</span>
                <ChevronRight className="h-4 w-4 text-primary ml-1" />
              </div>
          </Card>
      </div>
    </motion.div>
  );

  const renderActSelector = () => (
     <motion.div
      key="act"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Step 2: Choose a Demo</h2>
        <p className="text-muted-foreground mt-1">What would you like to see?</p>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            onClick={() => handleActSelect("expense")}
            className="p-6 cursor-pointer hover:border-primary transition-all group border-2 border-transparent"
          >
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">Act I: The Invisible Expense Report</h3>
              <p className="text-sm text-muted-foreground mt-2">See how AI turns a 20-minute chore into a 5-second task.</p>
               <div className="flex justify-end items-center mt-4">
                <span className="text-sm font-semibold text-primary group-hover:underline">Show Demo</span>
                <ChevronRight className="h-4 w-4 text-primary ml-1" />
              </div>
          </Card>
          <Card 
            onClick={() => handleActSelect("booking")}
            className="p-6 cursor-pointer hover:border-primary transition-all group border-2 border-transparent"
          >
              <Plane className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">Act II: The Conversational Trip</h3>
              <p className="text-sm text-muted-foreground mt-2">Book a fully compliant trip with a single sentence.</p>
               <div className="flex justify-end items-center mt-4">
                <span className="text-sm font-semibold text-primary group-hover:underline">Show Demo</span>
                <ChevronRight className="h-4 w-4 text-primary ml-1" />
              </div>
          </Card>
      </div>
    </motion.div>
  );

  const renderDemo = () => (
    <motion.div
      key="demo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {persona === "traveler" && (
         <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-2 shadow-2xl">
                <div className="aspect-[9/19] w-full rounded-xl bg-background overflow-hidden">
                    {act === 'expense' ? <TravelerExpenseFeed /> : <TravelerBookingView />}
                </div>
            </div>
        </div>
      )}
      {persona === "finance" && (
        <div className="flex justify-center">
          <div className="w-full max-w-6xl rounded-xl bg-gray-800 shadow-2xl p-2">
            <div className="h-10 bg-gray-700 rounded-t-lg flex items-center p-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-background overflow-y-auto" style={{ height: 'calc(80vh - 2.5rem)', maxHeight: '700px'}}>
              <FinanceDashboard />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )

  const getBreadcrumb = () => {
    if (step === 'persona') return "Select Persona";

    let path = <span className="cursor-pointer hover:underline" onClick={() => setStep('persona')}>Select Persona</span>;
    
    if (step === 'act' || (step === 'demo' && persona === 'traveler')) {
      path = <>{path} <ChevronRight className="h-4 w-4 inline-block mx-1" /> <span className="text-foreground">{traveler?.name}</span></>;
    }
    
    if (step === 'demo' && persona === 'finance') {
       path = <>{path} <ChevronRight className="h-4 w-4 inline-block mx-1" /> <span className="text-foreground">{finance?.name}</span></>;
    }

    if (step === 'act') {
        path = <>{path} <ChevronRight className="h-4 w-4 inline-block mx-1" /> <span className="text-foreground">Select Demo</span></>;
    }

    if (step === 'demo' && persona === 'traveler') {
        path = <>{path} <ChevronRight className="h-4 w-4 inline-block mx-1" /> <span className="cursor-pointer hover:underline" onClick={() => setStep('act')}>Select Demo</span></>;
        path = <>{path} <ChevronRight className="h-4 w-4 inline-block mx-1" /> <span className="text-foreground">{act === 'expense' ? 'Act I' : 'Act II'}</span></>;
    }
    
    return path;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
          <Bot className="h-10 w-10 text-primary" />
          Agentic T&E
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          The future of Travel & Expense management is invisible.
        </p>
      </header>

      <div className="mb-8 text-center text-muted-foreground text-sm">
        {getBreadcrumb()}
      </div>

      <AnimatePresence mode="wait">
        {step === "persona" && renderPersonaSelector()}
        {step === "act" && renderActSelector()}
        {step === "demo" && renderDemo()}
      </AnimatePresence>
    </div>
  );
}
