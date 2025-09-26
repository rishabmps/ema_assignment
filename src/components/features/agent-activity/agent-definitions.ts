import { 
  Bot, 
  Receipt, 
  Shield, 
  MapPin, 
  DollarSign, 
  Leaf, 
  Zap, 
  FileCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Calculator,
  Trees
} from 'lucide-react';
import type { AgentDefinition, AgentType } from './types';

export const AGENT_DEFINITIONS: Record<AgentType, AgentDefinition> = {
  'receipt-concierge': {
    type: 'receipt-concierge',
    name: 'Receipt Concierge',
    description: 'Intelligently captures and matches receipts to transactions',
    icon: Receipt,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100/50'
  },
  'policy-engine': {
    type: 'policy-engine', 
    name: 'Policy Engine',
    description: 'Enforces compliance rules and validates expense policies',
    icon: FileCheck,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100/50'
  },
  'fraud-sentinel': {
    type: 'fraud-sentinel',
    name: 'Fraud Sentinel',
    description: 'Detects suspicious patterns and protects against fraud',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-100/50'
  },
  'booking-orchestrator': {
    type: 'booking-orchestrator',
    name: 'Booking Orchestrator',
    description: 'Seamlessly manages travel bookings and itineraries',
    icon: MapPin,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'from-teal-50 to-teal-100/50'
  },
  'budget-copilot': {
    type: 'budget-copilot',
    name: 'Budget Copilot',
    description: 'Tracks spending and optimizes budget allocation',
    icon: Calculator,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'from-emerald-50 to-emerald-100/50'
  },
  'co2-advisor': {
    type: 'co2-advisor',
    name: 'CO2 Advisor',
    description: 'Promotes sustainable choices and tracks carbon footprint',
    icon: Trees,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100/50'
  },
  'expense-automator': {
    type: 'expense-automator',
    name: 'Expense Automator',
    description: 'Streamlines expense report creation and processing',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'from-yellow-50 to-yellow-100/50'
  },
  'compliance-guardian': {
    type: 'compliance-guardian',
    name: 'Compliance Guardian',
    description: 'Ensures regulatory compliance across all transactions',
    icon: CheckCircle2,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100/50'
  }
};

export const getAgentDefinition = (agentType: AgentType): AgentDefinition => {
  return AGENT_DEFINITIONS[agentType];
};