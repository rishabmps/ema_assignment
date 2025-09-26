export type AgentType = 
  | 'receipt-concierge'
  | 'policy-engine'
  | 'fraud-sentinel'
  | 'booking-orchestrator'
  | 'budget-copilot'
  | 'co2-advisor'
  | 'expense-automator'
  | 'compliance-guardian';

export type AgentStatus = 'idle' | 'active' | 'processing' | 'completed' | 'error';

export type AutomationFlow = 'expense' | 'exception' | 'trip';

export interface AgentActivity {
  id: string;
  agentType: AgentType;
  status: AgentStatus;
  message: string;
  timestamp: Date;
  duration?: number;
  progress?: number;
}

export interface AgentDefinition {
  type: AgentType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}