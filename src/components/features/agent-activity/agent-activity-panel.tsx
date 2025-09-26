"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, ChevronRight, Bot, Sparkles } from 'lucide-react';
import { AgentActivityItem } from './agent-activity-item';
import type { AgentActivity, AutomationFlow } from './types';

interface AgentActivityPanelProps {
  activities: AgentActivity[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  flow?: AutomationFlow;
  isMobile?: boolean;
  compact?: boolean;
}

export function AgentActivityPanel({
  activities,
  isOpen,
  onClose,
  title = "Agent Activity",
  flow = "expense",
  isMobile = false,
  compact = false
}: AgentActivityPanelProps) {
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);

  // Auto-highlight the most recent active/processing activity
  useEffect(() => {
    const activeActivity = activities.find(a => a.status === 'active' || a.status === 'processing');
    if (activeActivity) {
      setCurrentActivityId(activeActivity.id);
    }
  }, [activities]);

  const flowLabels = {
    expense: "Expense Processing",
    exception: "Exception Handling", 
    trip: "Travel Booking"
  };

  const flowColors = {
    expense: "from-emerald-500 to-emerald-600",
    exception: "from-amber-500 to-amber-600",
    trip: "from-blue-500 to-blue-600"
  };

  const panelVariants = {
    hidden: isMobile 
      ? { y: "100%", opacity: 0 }
      : { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.5
      }
    },
    exit: isMobile 
      ? { y: "100%", opacity: 0, transition: { duration: 0.3 } }
      : { x: "100%", opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible" 
            exit="exit"
            className={cn(
              "fixed bg-white shadow-2xl z-50 flex flex-col",
              isMobile 
                ? "bottom-0 left-0 right-0 max-h-[80vh] rounded-t-3xl"
                : "top-0 right-0 w-96 h-full",
              compact && "w-80"
            )}
          >
            {/* Header */}
            <div className={cn(
              "flex-shrink-0 px-6 py-4 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/30",
              isMobile && "px-4"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={cn(
                      "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
                      flowColors[flow]
                    )}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
                    <p className="text-sm text-slate-500 font-medium">{flowLabels[flow]}</p>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              {/* Live indicator */}
              <div className="mt-3 flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Live Activity
                </span>
              </div>
            </div>

            {/* Activity List */}
            <div className="flex-grow overflow-y-auto">
              {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No agent activity yet</p>
                  <p className="text-sm text-slate-400 mt-1">Activities will appear here as agents work</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  <AnimatePresence>
                    {activities.map((activity) => (
                      <AgentActivityItem
                        key={activity.id}
                        activity={activity}
                        isActive={currentActivityId === activity.id}
                        compact={compact}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer - Summary */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-slate-100/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">
                    {activities.filter(a => a.status === 'completed').length} of {activities.length} completed
                  </span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-medium">
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}