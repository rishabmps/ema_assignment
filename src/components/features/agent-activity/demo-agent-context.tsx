"use client";

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { AgentActivity } from '@/components/features/agent-activity/types';

interface DemoAgentContextType {
  activities: AgentActivity[];
  addActivity: (activity: Omit<AgentActivity, 'id' | 'timestamp'>) => void;
  updateActivity: (id: string, updates: Partial<AgentActivity>) => void;
  clearActivities: () => void;
  simulateExpenseFlow: () => void;
  simulateBookingFlow: () => void;
  simulateFinanceFlow: () => void;
}

const DemoAgentContext = createContext<DemoAgentContextType | null>(null);

type AgentAction =
  | { type: 'ADD_ACTIVITY'; activity: AgentActivity }
  | { type: 'UPDATE_ACTIVITY'; id: string; updates: Partial<AgentActivity> }
  | { type: 'CLEAR_ACTIVITIES' }
  | { type: 'SET_ACTIVITIES'; activities: AgentActivity[] };

function agentReducer(state: AgentActivity[], action: AgentAction): AgentActivity[] {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return [...state, action.activity];
    case 'UPDATE_ACTIVITY':
      return state.map(activity =>
        activity.id === action.id
          ? { ...activity, ...action.updates }
          : activity
      );
    case 'CLEAR_ACTIVITIES':
      return [];
    case 'SET_ACTIVITIES':
      return action.activities;
    default:
      return state;
  }
}

export function DemoAgentProvider({ children }: { children: React.ReactNode }) {
  const [activities, dispatch] = useReducer(agentReducer, []);

  const addActivity = useCallback((activityData: Omit<AgentActivity, 'id' | 'timestamp'>) => {
    const activity: AgentActivity = {
      ...activityData,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_ACTIVITY', activity });
  }, []);

  const updateActivity = useCallback((id: string, updates: Partial<AgentActivity>) => {
    dispatch({ type: 'UPDATE_ACTIVITY', id, updates });
  }, []);

  const clearActivities = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTIVITIES' });
  }, []);

  const simulateExpenseFlow = useCallback(() => {
    // Clear existing activities first
    dispatch({ type: 'CLEAR_ACTIVITIES' });
    
    // Receipt extraction
    const receiptActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const receiptActivity: AgentActivity = {
      id: receiptActivityId,
      agentType: 'receipt-concierge',
      message: 'Extracting receipt information...',
      status: 'processing',
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_ACTIVITY', activity: receiptActivity });

    setTimeout(() => {
      dispatch({ 
        type: 'UPDATE_ACTIVITY', 
        id: receiptActivityId, 
        updates: {
          message: 'Receipt data extracted successfully',
          status: 'completed'
        }
      });

      // Policy compliance
      const policyActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const policyActivity: AgentActivity = {
        id: policyActivityId,
        agentType: 'policy-engine',
        message: 'Checking policy compliance...',
        status: 'processing',
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_ACTIVITY', activity: policyActivity });

      setTimeout(() => {
        dispatch({ 
          type: 'UPDATE_ACTIVITY', 
          id: policyActivityId, 
          updates: {
            message: 'Expense approved - within policy limits',
            status: 'completed'
          }
        });

        // Categorization
        const categorizationActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const categorizationActivity: AgentActivity = {
          id: categorizationActivityId,
          agentType: 'expense-automator',
          message: 'Categorizing expense automatically...',
          status: 'processing',
          timestamp: new Date()
        };
        dispatch({ type: 'ADD_ACTIVITY', activity: categorizationActivity });

        setTimeout(() => {
          dispatch({ 
            type: 'UPDATE_ACTIVITY', 
            id: categorizationActivityId, 
            updates: {
              message: 'Categorized as "Client Entertainment"',
              status: 'completed'
            }
          });
        }, 1500);
      }, 1000);
    }, 2000);
  }, []);

  const simulateBookingFlow = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTIVITIES' });

    const travelActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const travelActivity: AgentActivity = {
      id: travelActivityId,
      agentType: 'booking-orchestrator',
      message: 'Finding optimal travel options...',
      status: 'processing',
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_ACTIVITY', activity: travelActivity });

    setTimeout(() => {
      dispatch({ 
        type: 'UPDATE_ACTIVITY', 
        id: travelActivityId, 
        updates: {
          message: 'Found 3 sustainable travel options',
          status: 'completed'
        }
      });

      const sustainabilityActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const sustainabilityActivity: AgentActivity = {
        id: sustainabilityActivityId,
        agentType: 'co2-advisor',
        message: 'Analyzing carbon footprint...',
        status: 'processing',
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_ACTIVITY', activity: sustainabilityActivity });

      setTimeout(() => {
        dispatch({ 
          type: 'UPDATE_ACTIVITY', 
          id: sustainabilityActivityId, 
          updates: {
            message: 'Recommended eco-friendly option saves 2.3 tons CO2e',
            status: 'completed'
          }
        });
      }, 2000);
    }, 1500);
  }, []);

  const simulateFinanceFlow = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTIVITIES' });

    // Create the first activity - VAT reclaim using budget-copilot
    const vatActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const vatActivity: AgentActivity = {
      id: vatActivityId,
      agentType: 'budget-copilot',
      message: 'Scanning transactions for VAT opportunities...',
      status: 'processing',
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_ACTIVITY', activity: vatActivity });

    setTimeout(() => {
      dispatch({ 
        type: 'UPDATE_ACTIVITY', 
        id: vatActivityId, 
        updates: {
          message: 'Found $115.83 in reclaimable VAT',
          status: 'completed'
        }
      });

      // Create the second activity - policy insights using policy-engine
      const insightsActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const insightsActivity: AgentActivity = {
        id: insightsActivityId,
        agentType: 'policy-engine',
        message: 'Analyzing spending patterns...',
        status: 'processing',
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_ACTIVITY', activity: insightsActivity });

      setTimeout(() => {
        dispatch({ 
          type: 'UPDATE_ACTIVITY', 
          id: insightsActivityId, 
          updates: {
            message: 'Generated 1 new policy recommendation',
            status: 'completed'
          }
        });
      }, 1800);
    }, 2500);
  }, []);

  const contextValue: DemoAgentContextType = {
    activities,
    addActivity,
    updateActivity,
    clearActivities,
    simulateExpenseFlow,
    simulateBookingFlow,
    simulateFinanceFlow
  };

  return (
    <DemoAgentContext.Provider value={contextValue}>
      {children}
    </DemoAgentContext.Provider>
  );
}

export function useDemoAgentContext() {
  const context = useContext(DemoAgentContext);
  if (!context) {
    throw new Error('useDemoAgentContext must be used within a DemoAgentProvider');
  }
  return context;
}