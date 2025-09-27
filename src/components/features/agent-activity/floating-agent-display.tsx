"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AgentActivityItem } from './agent-activity-item';
import { getAgentDefinition } from './agent-definitions';
import type { AgentActivity } from './types';

interface FloatingAgentDisplayProps {
  activities: AgentActivity[];
  className?: string;
}

export function FloatingAgentDisplay({ activities, className }: FloatingAgentDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);

  // Auto-cycle through activities when there are active ones
  useEffect(() => {
    const activeActivities = activities.filter(a => a.status === 'active' || a.status === 'processing');
    if (activeActivities.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setCurrentActivityId(activeActivities[index].id);
        index = (index + 1) % activeActivities.length;
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setCurrentActivityId(null);
    }
  }, [activities]);

  const activeAgents = activities.filter(a => a.status === 'active' || a.status === 'processing');
  const completedAgents = activities.filter(a => a.status === 'completed');
  const hasActivity = activities.length > 0;

  if (!hasActivity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40",
        "bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl",
        "w-80 max-h-[80vh] overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={activeAgents.length > 0 ? { 
                scale: [1, 1.2, 1], 
                rotate: [0, 180, 360] 
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: activeAgents.length > 0 ? Infinity : 0,
                ease: "easeInOut" 
              }}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <Bot className="h-4 w-4" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-sm">AI Agents</h3>
              <p className="text-xs text-blue-100">
                {activeAgents.length > 0 ? `${activeAgents.length} working` : `${completedAgents.length} completed`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-96 overflow-y-auto"
          >
            {/* Active Agents */}
            {activeAgents.length > 0 && (
              <div className="p-4 border-b border-slate-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 text-blue-500" />
                  </motion.div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Currently Active
                  </span>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {activeAgents.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "transition-all duration-200",
                          currentActivityId === activity.id && "ring-2 ring-blue-200 rounded-lg"
                        )}
                      >
                        <AgentActivityItem
                          activity={activity}
                          isActive={currentActivityId === activity.id}
                          compact={true}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Completed Agents */}
            {completedAgents.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Completed
                  </span>
                </div>
                <div className="space-y-1">
                  {completedAgents.slice(-3).map((activity) => {
                    const agentDef = getAgentDefinition(activity.agentType);
                    return (
                      <div key={activity.id} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50">
                        <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center">
                          <agentDef.icon className="h-3 w-3 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">{agentDef.name}</p>
                          <p className="text-xs text-slate-500 truncate">{activity.action}</p>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary Footer */}
            <div className="bg-slate-50/50 p-3 border-t border-slate-200/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  Total Activities: {activities.length}
                </span>
                <span className="text-slate-500">
                  {activeAgents.length > 0 ? 'Processing...' : 'All Complete'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal collapsed view */}
      {!isExpanded && activeAgents.length > 0 && (
        <div className="p-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
            <span className="text-xs font-medium text-slate-700">
              {activeAgents.length} agent{activeAgents.length !== 1 ? 's' : ''} working...
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}