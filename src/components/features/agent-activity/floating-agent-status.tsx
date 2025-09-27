"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAgentDefinition } from './agent-definitions';
import type { AgentActivity } from './types';
import { Bot, ChevronRight, Activity, Sparkles } from 'lucide-react';

interface FloatingAgentStatusProps {
  activities: AgentActivity[];
  className?: string;
  side?: 'left' | 'right';
}

export function FloatingAgentStatus({ 
  activities, 
  className, 
  side = 'right' 
}: FloatingAgentStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeActivities = activities.filter(a => a.status === 'processing');
  const completedActivities = activities.filter(a => a.status === 'completed');
  
  if (activities.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "fixed top-1/2 -translate-y-1/2 z-50",
      side === 'right' ? "right-6" : "left-6",
      className
    )}>
      {/* Main floating indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Pulse ring for active agents */}
        {activeActivities.length > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500 opacity-20"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Main status circle */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
            activeActivities.length > 0 
              ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
              : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="h-6 w-6 text-white" />
          
          {/* Activity counter */}
          {activities.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-xs text-white font-bold">
                {Math.min(activities.length, 9)}
              </span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Expanded agent list */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: side === 'right' ? 20 : -20 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              x: side === 'right' ? 20 : -20 
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute top-0 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6",
              side === 'right' ? "-translate-x-full -translate-x-6" : "translate-x-full translate-x-6"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-800">Agent Activity</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className={cn(
                  "h-4 w-4 text-slate-400 transition-transform",
                  side === 'right' ? "rotate-0" : "rotate-180"
                )} />
              </button>
            </div>

            {/* Active agents */}
            {activeActivities.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div 
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm font-semibold text-slate-700">Currently Working</span>
                </div>
                <div className="space-y-2">
                  {activeActivities.map((activity, index) => {
                    const agentDef = getAgentDefinition(activity.agentType);
                    const IconComponent = agentDef.icon;
                    
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{agentDef.name}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{activity.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <motion.div 
                              className="flex space-x-1"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            </motion.div>
                            <span className="text-xs text-blue-600 ml-1">Processing...</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Completed agents */}
            {completedActivities.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-sm font-semibold text-slate-700">Recently Completed</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {completedActivities.slice(0, 3).map((activity, index) => {
                    const agentDef = getAgentDefinition(activity.agentType);
                    const IconComponent = agentDef.icon;
                    
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (activeActivities.length + index) * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/50"
                      >
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{agentDef.name}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{activity.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Activity className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs text-emerald-600">Completed</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer stats */}
            <div className="mt-4 pt-4 border-t border-slate-200/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Tasks:</span>
                <span className="font-semibold text-slate-800">{activities.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-slate-600">Success Rate:</span>
                <span className="font-semibold text-emerald-600">
                  {Math.round((completedActivities.length / Math.max(activities.length, 1)) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini activity indicators floating around */}
      <AnimatePresence>
        {!isExpanded && activeActivities.slice(0, 3).map((activity, index) => {
          const agentDef = getAgentDefinition(activity.agentType);
          const IconComponent = agentDef.icon;
          const angle = (index * 120) * (Math.PI / 180); // 120 degrees apart
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8, 
                scale: 1,
                x: x,
                y: y
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.5
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center"
            >
              <IconComponent className="h-4 w-4 text-blue-500" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}