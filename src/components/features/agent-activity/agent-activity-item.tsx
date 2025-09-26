"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAgentDefinition } from './agent-definitions';
import type { AgentActivity, AutomationFlow } from './types';

interface AgentActivityItemProps {
  activity: AgentActivity;
  isActive?: boolean;
  compact?: boolean;
}

export function AgentActivityItem({ activity, isActive = false, compact = false }: AgentActivityItemProps) {
  const agentDef = getAgentDefinition(activity.agentType);
  const IconComponent = agentDef.icon;
  
  const statusColors = {
    idle: 'text-slate-400',
    active: 'text-blue-600', 
    processing: 'text-yellow-600',
    completed: 'text-emerald-600',
    error: 'text-red-600'
  };

  const statusBgColors = {
    idle: 'bg-slate-100',
    active: 'bg-blue-100',
    processing: 'bg-yellow-100', 
    completed: 'bg-emerald-100',
    error: 'bg-red-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl transition-all duration-300",
        isActive && "bg-gradient-to-r from-slate-50 to-blue-50/30 ring-2 ring-blue-100",
        compact ? "p-3" : "p-4"
      )}
    >
      {/* Agent Icon */}
      <motion.div 
        className={cn(
          "flex-shrink-0 flex items-center justify-center rounded-lg",
          compact ? "w-8 h-8" : "w-10 h-10",
          statusBgColors[activity.status]
        )}
        animate={activity.status === 'processing' ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: activity.status === 'processing' ? Infinity : 0 }}
      >
        <IconComponent className={cn(
          statusColors[activity.status],
          compact ? "h-4 w-4" : "h-5 w-5"
        )} />
      </motion.div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <h4 className={cn(
            "font-semibold text-slate-800",
            compact ? "text-sm" : "text-base"
          )}>
            {agentDef.name}
          </h4>
          {activity.timestamp && (
            <time className={cn(
              "text-slate-500 font-medium",
              compact ? "text-xs" : "text-sm"
            )}>
              {activity.timestamp.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </time>
          )}
        </div>
        
        <p className={cn(
          "text-slate-600 leading-relaxed",
          compact ? "text-xs mt-1" : "text-sm mt-2"
        )}>
          {activity.message}
        </p>

        {/* Progress bar for processing states */}
        {activity.status === 'processing' && activity.progress !== undefined && (
          <div className="mt-3">
            <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${activity.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}