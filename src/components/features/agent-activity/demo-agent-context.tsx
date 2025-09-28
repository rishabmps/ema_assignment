"use client";

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { AgentActivity, AgentStatus } from '@/components/features/agent-activity/types';

type FinanceScenario =
  | 'finance-dashboard'
  | 'finance-exceptions'
  | 'finance-vat'
  | 'finance-policy'
  | 'finance-sustainability';

type TravelerScenario = 'traveler-expense' | 'traveler-booking';

interface DemoAgentContextType {
  activities: AgentActivity[];
  addActivity: (activity: Omit<AgentActivity, 'id' | 'timestamp'>) => void;
  updateActivity: (id: string, updates: Partial<AgentActivity>) => void;
  clearActivities: () => void;
  simulateExpenseFlow: () => void;
  simulateBookingFlow: () => void;
  simulateFinanceFlow: () => void;
  activateFinanceScenario: (scenario: FinanceScenario) => void;
  activateTravelerScenario: (scenario: TravelerScenario) => void;
  triggerTransactionReaction: (transactionType: 'expense' | 'booking', transactionData?: any) => void;
  clearTransactionReaction: () => void;
  resetToListeningMode: () => void;
  completeAgentProcessing: (transactionType: 'expense' | 'booking', transactionData?: any) => void;
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

  const makeActivity = useCallback(
    (agentType: AgentActivity['agentType'], message: string, status: AgentStatus = 'active') => ({
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentType,
      status,
      message,
      timestamp: new Date()
    }),
    []
  );

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
    // Don't clear activities here since we want to build upon initial activities
    
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

          // Final step - ERP posting
          const erpActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const erpActivity: AgentActivity = {
            id: erpActivityId,
            agentType: 'expense-automator',
            message: 'Posting to ERP system...',
            status: 'processing',
            timestamp: new Date()
          };
          dispatch({ type: 'ADD_ACTIVITY', activity: erpActivity });

          setTimeout(() => {
            dispatch({ 
              type: 'UPDATE_ACTIVITY', 
              id: erpActivityId, 
              updates: {
                message: 'Successfully posted to SAP - Expense #EXP-2024-001',
                status: 'completed'
              }
            });
          }, 1200);
        }, 1500);
      }, 1000);
    }, 2000);
  }, []);

  const simulateBookingFlow = useCallback(() => {
    // Don't clear activities here since we want to build upon initial activities

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

        // Final step - Booking confirmation
        const confirmationActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const confirmationActivity: AgentActivity = {
          id: confirmationActivityId,
          agentType: 'booking-orchestrator',
          message: 'Confirming booking with travel provider...',
          status: 'processing',
          timestamp: new Date()
        };
        dispatch({ type: 'ADD_ACTIVITY', activity: confirmationActivity });

        setTimeout(() => {
          dispatch({ 
            type: 'UPDATE_ACTIVITY', 
            id: confirmationActivityId, 
            updates: {
              message: 'Booking confirmed - Confirmation #BK-2024-001',
              status: 'completed'
            }
          });
        }, 1500);
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
          message: 'Found $115.83 in reclaimable VAT from 2 international transactions',
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
            message: 'Generated 3 new policy recommendations based on spending patterns',
            status: 'completed'
          }
        });
      }, 1800);
    }, 2500);
  }, []);

  const activateFinanceScenario = useCallback((scenario: FinanceScenario) => {
    const scenarioActivities: AgentActivity[] = (() => {
      switch (scenario) {
        case 'finance-dashboard':
          return [
            makeActivity('expense-automator', '95.2% of expenses auto-posted in the last 30 days', 'completed'),
            makeActivity('policy-engine', 'Monitoring policy drift across departments', 'processing'),
            makeActivity('budget-copilot', 'Surfacing $4,060 in productivity savings from 70 automated reports', 'active')
          ];
        case 'finance-exceptions':
          return [
            makeActivity('fraud-sentinel', 'Prioritizing 2 exception items by risk score (avg. 0.10)', 'processing'),
            makeActivity('policy-engine', 'Summarizing policy violations for reviewer context', 'active'),
            makeActivity('expense-automator', 'Routing cleared exceptions for ERP posting', 'completed')
          ];
        case 'finance-vat':
          return [
            makeActivity('budget-copilot', 'Identified $115.83 in reclaimable VAT from 2 international transactions', 'processing'),
            makeActivity('compliance-guardian', 'Validating supporting documents before submission', 'active')
          ];
        case 'finance-policy':
          return [
            makeActivity('policy-engine', 'Generated 3 new policy recommendations based on spending patterns', 'processing'),
            makeActivity('expense-automator', 'Auto-distributing recommended changes to policy owners', 'active')
          ];
        case 'finance-sustainability':
          return [
            makeActivity('co2-advisor', 'Modeling FY25 carbon trajectory vs target', 'processing'),
            makeActivity('budget-copilot', 'Forecasting cost impact of greener travel choices', 'active')
          ];
        default:
          return [];
      }
    })();

    dispatch({ type: 'SET_ACTIVITIES', activities: scenarioActivities });
  }, [makeActivity]);

  const activateTravelerScenario = useCallback((scenario: TravelerScenario) => {
    // Clear existing activities first
    dispatch({ type: 'CLEAR_ACTIVITIES' });
    
    // Set agents in listening mode - they'll react when transactions are added
    const listeningActivities: AgentActivity[] = (() => {
      switch (scenario) {
        case 'traveler-expense':
          return [
            makeActivity('receipt-concierge', 'Listening for receipt uploads...', 'active'),
            makeActivity('policy-engine', 'Monitoring for new transactions...', 'active'),
            makeActivity('fraud-sentinel', 'Standing by for anomaly detection...', 'active')
          ];
        case 'traveler-booking':
          return [
            makeActivity('booking-orchestrator', 'Ready to assist with travel requests...', 'active'),
            makeActivity('co2-advisor', 'Monitoring for booking opportunities...', 'active'),
            makeActivity('budget-copilot', 'Tracking travel budget allocations...', 'active')
          ];
        default:
          return [];
      }
    })();

    dispatch({ type: 'SET_ACTIVITIES', activities: listeningActivities });
  }, [makeActivity]);

  // Contextual reaction when transactions are added
  const triggerTransactionReaction = useCallback((transactionType: 'expense' | 'booking', transactionData?: any) => {
    if (transactionType === 'expense') {
      // Update existing agents to processing state
      const currentActivities = activities;
      const updatedActivities = currentActivities.map(activity => {
        if (activity.agentType === 'receipt-concierge') {
          return { ...activity, status: 'processing' as const, message: 'Processing uploaded receipt...' };
        }
        if (activity.agentType === 'policy-engine') {
          return { ...activity, status: 'processing' as const, message: 'Validating expense against policy...' };
        }
        if (activity.agentType === 'fraud-sentinel') {
          return { ...activity, status: 'processing' as const, message: 'Scanning for suspicious patterns...' };
        }
        return activity;
      });
      
      dispatch({ type: 'SET_ACTIVITIES', activities: updatedActivities });

      // Don't automatically complete - wait for transaction to be marked as cleared
      // The completion will be triggered by the transaction clearing process
    } else if (transactionType === 'booking') {
      // Update existing agents to processing state
      const currentActivities = activities;
      const updatedActivities = currentActivities.map(activity => {
        if (activity.agentType === 'booking-orchestrator') {
          return { ...activity, status: 'processing' as const, message: 'Searching for travel options...' };
        }
        if (activity.agentType === 'co2-advisor') {
          return { ...activity, status: 'processing' as const, message: 'Calculating carbon footprint...' };
        }
        if (activity.agentType === 'budget-copilot') {
          return { ...activity, status: 'processing' as const, message: 'Checking budget allocation...' };
        }
        return activity;
      });
      
      dispatch({ type: 'SET_ACTIVITIES', activities: updatedActivities });

      // Don't automatically complete - wait for booking confirmation
      // The completion will be triggered by the booking confirmation process
    }
  }, [activities]);

  // Complete agent processing when transaction is cleared
  const completeAgentProcessing = useCallback((transactionType: 'expense' | 'booking', transactionData?: any) => {
    const currentActivities = activities;
    const completedActivities = currentActivities.map(activity => {
      if (transactionType === 'expense') {
        if (activity.agentType === 'receipt-concierge') {
          const amount = transactionData?.amount ? `$${transactionData.amount.toFixed(2)}` : '$47.50';
          return { ...activity, status: 'completed' as const, message: `Receipt processed - ${amount} extracted` };
        }
        if (activity.agentType === 'policy-engine') {
          const merchant = transactionData?.merchant || 'restaurant';
          const amount = transactionData?.amount || 47.50;
          const limit = amount > 50 ? 'exceeds $50 limit' : 'within $50 limit';
          return { ...activity, status: 'completed' as const, message: `Policy compliant - ${limit}` };
        }
        if (activity.agentType === 'fraud-sentinel') {
          return { ...activity, status: 'completed' as const, message: 'No anomalies detected' };
        }
      } else if (transactionType === 'booking') {
        if (activity.agentType === 'booking-orchestrator') {
          const destination = transactionData?.destination || 'destination';
          return { ...activity, status: 'completed' as const, message: `Found 3 compliant options for ${destination}` };
        }
        if (activity.agentType === 'co2-advisor') {
          const co2Savings = transactionData?.co2Savings || '2.3';
          return { ...activity, status: 'completed' as const, message: `Train option saves ${co2Savings} tons CO2` };
        }
        if (activity.agentType === 'budget-copilot') {
          const budget = transactionData?.budget || 'Q4';
          return { ...activity, status: 'completed' as const, message: `Within ${budget} travel budget` };
        }
      }
      return activity;
    });
    dispatch({ type: 'SET_ACTIVITIES', activities: completedActivities });
  }, [activities]);

  // Reset agents to listening mode (only used when switching scenarios)
  const resetToListeningMode = useCallback(() => {
    const listeningActivities = activities.map(activity => ({
      ...activity,
      status: 'active' as const,
      message: activity.agentType === 'receipt-concierge' ? 'Listening for receipt uploads...' :
               activity.agentType === 'policy-engine' ? 'Monitoring for new transactions...' :
               activity.agentType === 'fraud-sentinel' ? 'Standing by for anomaly detection...' :
               activity.agentType === 'booking-orchestrator' ? 'Ready to assist with travel requests...' :
               activity.agentType === 'co2-advisor' ? 'Monitoring for booking opportunities...' :
               activity.agentType === 'budget-copilot' ? 'Tracking travel budget allocations...' :
               activity.message
    }));
    dispatch({ type: 'SET_ACTIVITIES', activities: listeningActivities });
  }, [activities]);

  // Clear transaction reaction - return to listening mode (deprecated - agents now stay completed)
  const clearTransactionReaction = useCallback(() => {
    // Agents now remain in completed state after processing
    // This function is kept for backward compatibility but does nothing
  }, []);

  const contextValue: DemoAgentContextType = {
    activities,
    addActivity,
    updateActivity,
    clearActivities,
    simulateExpenseFlow,
    simulateBookingFlow,
    simulateFinanceFlow,
    activateFinanceScenario,
    activateTravelerScenario,
    triggerTransactionReaction,
    clearTransactionReaction,
    resetToListeningMode,
    completeAgentProcessing
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