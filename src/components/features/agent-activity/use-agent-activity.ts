"use client";

import { useState, useCallback } from 'react';
import type { AgentActivity, AgentType, AutomationFlow } from './types';

interface UseAgentActivityReturn {
  activities: AgentActivity[];
  addActivity: (agentType: AgentType, message: string, status?: AgentActivity['status']) => void;
  updateActivity: (id: string, updates: Partial<AgentActivity>) => void;
  clearActivities: () => void;
  simulateExpenseFlow: (amount: number, merchant: string) => void;
  simulateExceptionFlow: (violationType: string) => void;
  simulateTripBookingFlow: (destination: string) => void;
}

export function useAgentActivity(): UseAgentActivityReturn {
  const [activities, setActivities] = useState<AgentActivity[]>([]);

  const addActivity = useCallback((
    agentType: AgentType, 
    message: string, 
    status: AgentActivity['status'] = 'active'
  ) => {
    const newActivity: AgentActivity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agentType,
      status,
      message,
      timestamp: new Date(),
      progress: status === 'processing' ? 0 : undefined
    };

    setActivities(prev => [newActivity, ...prev]);
    return newActivity.id;
  }, []);

  const updateActivity = useCallback((id: string, updates: Partial<AgentActivity>) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    ));
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const simulateExpenseFlow = useCallback(async (amount: number, merchant: string) => {
    clearActivities();
    
    // Step 1: Receipt processing
    const receiptId = addActivity(
      'receipt-concierge',
      `Processing receipt from ${merchant}...`,
      'processing'
    );
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      updateActivity(receiptId, { progress: i });
    }
    
    updateActivity(receiptId, {
      status: 'completed',
      message: `Receipt from ${merchant} successfully matched to transaction`,
      progress: undefined
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Policy check
    const policyId = addActivity(
      'policy-engine',
      'Verifying expense against company policies...',
      'processing'
    );

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (amount > 100) {
      updateActivity(policyId, {
        status: 'completed',
        message: 'Policy check passed - receipt required for amounts over $25'
      });

      // Step 3: Compliance check for high amounts
      await new Promise(resolve => setTimeout(resolve, 300));
      addActivity(
        'compliance-guardian', 
        'Verifying compliance for high-value expense...',
        'processing'
      );

      await new Promise(resolve => setTimeout(resolve, 1000));
      addActivity(
        'compliance-guardian',
        'Compliance verification complete - expense approved',
        'completed'
      );
    } else {
      updateActivity(policyId, {
        status: 'completed',
        message: 'Policy check passed - no receipt required under $25'
      });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: Final automation
    addActivity(
      'expense-automator',
      'Expense cleared for ERP posting. No further action needed.',
      'completed'
    );
  }, [addActivity, updateActivity, clearActivities]);

  const simulateExceptionFlow = useCallback(async (violationType: string) => {
    clearActivities();

    // Step 1: Policy violation detection
    const policyId = addActivity(
      'policy-engine',
      `Policy violation detected: ${violationType}`,
      'error'
    );

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Fraud analysis
    const fraudId = addActivity(
      'fraud-sentinel',
      'Analyzing transaction for potential fraud indicators...',
      'processing'
    );

    await new Promise(resolve => setTimeout(resolve, 2000));
    updateActivity(fraudId, {
      status: 'completed',
      message: 'No fraud indicators detected - flagged for policy review only'
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: Exception routing
    addActivity(
      'expense-automator',
      'Transaction routed to exception queue for manual review',
      'active'
    );

  }, [addActivity, updateActivity, clearActivities]);

  const simulateTripBookingFlow = useCallback(async (destination: string) => {
    clearActivities();

    // Step 1: Budget analysis
    const budgetId = addActivity(
      'budget-copilot',
      `Analyzing budget for trip to ${destination}...`,
      'processing'
    );

    await new Promise(resolve => setTimeout(resolve, 1000));
    updateActivity(budgetId, {
      status: 'completed',
      message: `Budget verified - $2,500 available for ${destination} trip`
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Booking orchestration
    const bookingId = addActivity(
      'booking-orchestrator',
      'Searching for compliant travel options...',
      'processing'
    );

    // Simulate booking progress
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 400));
      updateActivity(bookingId, { progress: i });
    }

    updateActivity(bookingId, {
      status: 'completed',
      message: 'Found 3 compliant booking options within policy',
      progress: undefined
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 3: CO2 analysis
    const co2Id = addActivity(
      'co2-advisor',
      'Calculating carbon footprint and suggesting greener alternatives...',
      'processing'
    );

    await new Promise(resolve => setTimeout(resolve, 1500));
    updateActivity(co2Id, {
      status: 'completed',
      message: 'Identified 15% CO2 reduction opportunity with train option'
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: Policy compliance
    addActivity(
      'policy-engine',
      'All bookings comply with travel policy - ready for selection',
      'completed'
    );
  }, [addActivity, updateActivity, clearActivities]);

  return {
    activities,
    addActivity,
    updateActivity,
    clearActivities,
    simulateExpenseFlow,
    simulateExceptionFlow,
    simulateTripBookingFlow
  };
}