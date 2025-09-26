"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAgentDefinition } from './agent-definitions';
import type { AgentActivity } from './types';

interface InlineAgentActivityProps {
  activities: AgentActivity[];
  className?: string;
  compact?: boolean;
}

export function InlineAgentActivity({ activities, className, compact = false }: InlineAgentActivityProps) {
  const recentActivities = activities.slice(0, compact ? 3 : 5);
  
  if (recentActivities.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 p-4",
        compact && "p-3",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 bg-emerald-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Agents at Work
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {recentActivities.map((activity, index) => {
            const agentDef = getAgentDefinition(activity.agentType);
            const IconComponent = agentDef.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className={cn(
                  "flex-shrink-0 flex items-center justify-center rounded-lg",
                  compact ? "w-6 h-6" : "w-8 h-8",
                  activity.status === 'processing' ? "bg-blue-100" : 
                  activity.status === 'completed' ? "bg-emerald-100" : 
                  activity.status === 'error' ? "bg-red-100" : "bg-slate-100"
                )}>
                  <IconComponent className={cn(
                    compact ? "h-3 w-3" : "h-4 w-4",
                    activity.status === 'processing' ? "text-blue-600" : 
                    activity.status === 'completed' ? "text-emerald-600" : 
                    activity.status === 'error' ? "text-red-600" : "text-slate-600"
                  )} />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-semibold text-slate-700",
                      compact ? "text-xs" : "text-sm"
                    )}>
                      {agentDef.name}
                    </p>
                    {activity.status === 'processing' && (
                      <motion.div 
                        className="flex space-x-1"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      </motion.div>
                    )}
                  </div>
                  <p className={cn(
                    "text-slate-600 leading-relaxed",
                    compact ? "text-xs" : "text-sm"
                  )}>
                    {activity.message}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {activities.length > recentActivities.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 pt-3 border-t border-slate-200/50"
        >
          <p className="text-xs text-slate-500 font-medium text-center">
            + {activities.length - recentActivities.length} more agent{activities.length - recentActivities.length > 1 ? 's' : ''} working
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}