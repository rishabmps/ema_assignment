"use client";

import { motion } from "framer-motion";
import { Suspense, lazy, memo } from "react";
import { DemoLoadingSkeleton } from "@/components/ui/demo-loading-skeleton";
import { ToastContainer } from "@/components/ui/toast-container";
import { DemoContentProps } from "./types";

// Dynamic imports for code splitting
const TravelerExpenseFeed = lazy(() => 
  import("@/components/features/traveler/traveler-expense-feed").then(module => ({ default: module.TravelerExpenseFeed }))
);
const TravelerBookingView = lazy(() => 
  import("@/components/features/traveler/traveler-booking-view").then(module => ({ default: module.TravelerBookingView }))
);
const FinanceDashboard = lazy(() => 
  import("@/components/features/finance/finance-dashboard").then(module => ({ default: module.FinanceDashboard }))
);

export const DemoContent = memo(function DemoContent({
  step,
  persona,
  act,
  currentFinanceUrl,
  currentFinanceSection,
  onFinanceUrlChange,
  onFinanceSectionChange,
  demoRef
}: DemoContentProps) {
  if (step === "demo" && persona === "traveler" && act === "expense") {
    return (
      <motion.div
        key="traveler-expense"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full flex justify-center px-4 min-h-[80vh] items-center"
      >
        <div className="relative my-6">
          <div className="w-full max-w-sm relative mx-auto">
            <div className="absolute inset-0 bg-slate-900 rounded-[2rem] transform rotate-1 scale-105 opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-2.5 rounded-[2rem] shadow-2xl">
              <div 
                className="bg-black p-0.5 rounded-[1.5rem]"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-black rounded-b-xl z-20"></div>
                <div 
                  className="aspect-[9/19] w-full rounded-[1.25rem] bg-white overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                  <div className="h-full p-safe relative">
                    <ToastContainer />
                    <Suspense fallback={<DemoLoadingSkeleton type="mobile" />}>
                      <TravelerExpenseFeed hideInlineAgentActivity={true} />
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-white/20 rounded-full"></div>
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
    );
  }

  if (step === "demo" && persona === "traveler" && act === "booking") {
    return (
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
              <div 
                className="bg-black p-1 rounded-[2rem]"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20"></div>
                <div 
                  className="aspect-[9/18] w-full rounded-[1.75rem] bg-white overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/5 to-transparent z-10 pointer-events-none"></div>
                  <div className="h-full p-safe relative">
                    <ToastContainer />
                    <Suspense fallback={<DemoLoadingSkeleton type="chat" />}>
                      <TravelerBookingView hideInlineAgentActivity={true} />
                    </Suspense>
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
    );
  }

  if (step === "demo" && persona === "finance") {
    return (
      <motion.div
        key="finance-dashboard"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full flex justify-center px-4"
      >
        <div className="w-full max-w-[90vw] relative my-4 mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-slate-800 rounded-3xl transform rotate-1 scale-105 opacity-20 blur-2xl"></div>
            <div 
              className="relative bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="h-16 bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600 flex items-center px-8">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex-1 mx-8">
                  <div className="bg-slate-600 rounded-lg px-6 py-2 text-slate-300 text-sm font-mono flex items-center gap-2">
                    <div className="w-3 h-3 text-slate-400">🔒</div>
                    {currentFinanceUrl}
                  </div>
                </div>
              </div>
              <div 
                className="bg-white overflow-hidden" 
                style={{ height: '75vh', minHeight: '600px', maxHeight: '750px'}}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Suspense fallback={<DemoLoadingSkeleton type="dashboard" />}>
                  <FinanceDashboard 
                    onUrlChange={onFinanceUrlChange}
                    hideInlineAgentActivity={true}
                    onSectionChange={onFinanceSectionChange}
                    initialSection={currentFinanceSection}
                  />
                </Suspense>
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
    );
  }

  return null;
});
