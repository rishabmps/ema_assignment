
"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingAgentDisplay } from "@/components/features/agent-activity";
import { DemoAgentProvider, useDemoAgentContext } from "@/components/features/agent-activity/demo-agent-context";
import type { FinanceSection } from "@/components/features/finance/finance-dashboard";

// Import extracted components
import { DemoSelector } from "./main-dashboard/demo-selector";
import { ActSelector } from "./main-dashboard/act-selector";
import { ScenarioDetails } from "./main-dashboard/scenario-details";
import { BreadcrumbNavigation } from "./main-dashboard/breadcrumb-navigation";
import { DemoContent } from "./main-dashboard/demo-content";
import { getScenarioDetails } from "./main-dashboard/scenario-utils";
import { Persona, Act, Step } from "./main-dashboard/types";
import usersData from "@/lib/data/users.json";


const MainDashboardContent = memo(function MainDashboardContent() {
  const [persona, setPersona] = useState<Persona>("traveler");
  const [act, setAct] = useState<Act>("expense");
  const [step, setStep] = useState<Step>("persona");
  
  // Track current URL for finance dashboard
  const [currentFinanceUrl, setCurrentFinanceUrl] = useState("agentic-te.demo/dashboard");
  const [currentFinanceSection, setCurrentFinanceSection] = useState<FinanceSection>("dashboard");

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

  const traveler = useMemo(() => usersData.find(u => u.role === "Traveler"), []);
  const finance = useMemo(() => usersData.find(u => u.role === "Finance Operations"), []);

  const scenarioDetails = useMemo(() => {
    return getScenarioDetails(step, persona, act, currentFinanceUrl);
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


  const handlePersonaSelect = useCallback((selectedPersona: Persona) => {
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
  }, [simulateFinanceFlow]);

  const handleActSelect = useCallback((selectedAct: Act) => {
    setAct(selectedAct);
    setStep('demo');
    // Auto-trigger demo after brief delay for smooth transition
    setTimeout(() => {
      activateTravelerScenario(getTravelerScenario(selectedAct));
    }, 500);
  }, [activateTravelerScenario, getTravelerScenario]);
  
  useEffect(() => {
    if (step !== 'demo') {
      clearActivities();
      return;
    }

    if (persona === 'traveler') {
      activateTravelerScenario(getTravelerScenario(act));
    }
  }, [step, persona, act, activateTravelerScenario, getTravelerScenario, clearActivities]);

  useEffect(() => {
    if (step === 'demo' && persona === 'finance') {
      activateFinanceScenario(getFinanceScenario("dashboard"));
    }
  }, [step, persona, activateFinanceScenario, getFinanceScenario]);

  const handleFinanceSectionChange = useCallback((section: FinanceSection) => {
    setCurrentFinanceSection(section);
    activateFinanceScenario(getFinanceScenario(section));
  }, [activateFinanceScenario, getFinanceScenario]);
  
  const handleFinanceSectionChangeWrapper = useCallback((section: string) => {
    handleFinanceSectionChange(section as FinanceSection);
  }, [handleFinanceSectionChange]);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="w-full py-8 relative z-10">

        {/* Enhanced breadcrumb navigation with dropdowns - only show when not on initial persona selection */}
        <BreadcrumbNavigation
          step={step}
          persona={persona}
          act={act}
          currentFinanceSection={currentFinanceSection}
          onStepChange={setStep}
          onPersonaChange={setPersona}
          onActChange={setAct}
          onFinanceSectionChange={handleFinanceSectionChangeWrapper}
          demoRef={demoRef}
        />

        <ScenarioDetails scenarioDetails={scenarioDetails} />

        <div ref={demoRef} className="pb-16">
          <AnimatePresence mode="wait">
            {step === "persona" && (
              <motion.div key="demo-selector" className="w-full flex justify-center px-4">
                <DemoSelector 
                  onPersonaSelect={handlePersonaSelect}
                  onActSelect={handleActSelect}
                />
              </motion.div>
            )}
            
            {step === "act" && (
              <motion.div key="act-selector" className="w-full flex justify-center px-4">
                <ActSelector onActSelect={handleActSelect} />
              </motion.div>
            )}

            {step === "demo" && (
              <DemoContent
                step={step}
                persona={persona}
                act={act}
                currentFinanceUrl={currentFinanceUrl}
                currentFinanceSection={currentFinanceSection}
                onFinanceUrlChange={setCurrentFinanceUrl}
                onFinanceSectionChange={handleFinanceSectionChangeWrapper}
                demoRef={demoRef}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Agent Display - only shown during demos */}
      {step === 'demo' && (
        <FloatingAgentDisplay 
          activities={activities}
          context={{
            persona: persona === 'finance' ? 'alex' : 'sarah',
            demoType: persona === 'finance' ? 'finance' : act,
            section: persona === 'finance' ? currentFinanceSection : undefined
          }}
        />
      )}
    </div>
  );
});

export default function MainDashboard() {
  return (
    <DemoAgentProvider>
      <MainDashboardContent />
    </DemoAgentProvider>
  );
}
