import { ScenarioDetails, Persona, Act } from "./types";

export const getScenarioDetails = (
  step: string,
  persona: Persona,
  act: Act,
  currentFinanceUrl: string
): ScenarioDetails | null => {
  if (step !== "demo") return null;

  if (persona === "traveler" && act === "expense") {
    return {
      label: "TRAVELER • ACT I",
      headline: "Receipt Magic: From Photo to Payment in 35 Seconds",
      description:
        "Watch Sarah's Receipt Concierge AI instantly extract data, validate policies, and approve expenses. No more manual data entry or approval delays—just seamless expense management.",
      callout: "💡 Try it: Tap 'Simulate Client Lunch Purchase' to see the AI process a new expense in real-time.",
      highlights: [
        "AI-powered OCR extracts merchant, amount, and date with 99.2% accuracy",
        "Smart policy engine validates compliance and flags exceptions instantly", 
        "Automated approval workflow reduces processing time from hours to seconds",
      ],
      metrics: [
        { label: "Processing Speed", value: "35 sec", sublabel: "from photo to approval" },
        { label: "Accuracy Rate", value: "99.2%", sublabel: "OCR extraction confidence" },
      ],
    };
  }

  if (persona === "traveler" && act === "booking") {
    return {
      label: "TRAVELER • ACT II", 
      headline: "Smart Booking: AI-Powered Trip Planning That Saves Money & Carbon",
      description:
        "Experience conversational trip planning where AI agents optimize for cost, sustainability, and traveler preferences. Watch real-time budget and carbon tracking as you build your itinerary.",
      callout: "🌱 Interactive: Type your trip details to see AI agents negotiate rates and suggest eco-friendly alternatives.",
      highlights: [
        "Conversational AI builds optimal itineraries balancing cost, time, and emissions",
        "Real-time carbon footprint tracking with sustainable alternatives",
        "Automated rate negotiation saves money before you even book",
      ],
      metrics: [
        { label: "Carbon Savings", value: "42%", sublabel: "vs. default itinerary" },
        { label: "Cost Savings", value: "$1,280", sublabel: "negotiated before booking" },
      ],
    };
  }

  if (persona === "finance") {
    // Dynamic content based on current finance section
    const section = currentFinanceUrl.replace('agentic-te.demo/', '');
    
    if (section === 'dashboard') {
      return {
        label: "FINANCE • DASHBOARD",
        headline: "Real-Time Finance Operations Dashboard",
        description:
          "Monitor live financial metrics, automated spend tracking, and productivity savings. Watch AI agents optimize cash flow and identify opportunities in real-time.",
        callout: "📊 Live Data: All metrics update in real-time as transactions are processed and approved.",
        highlights: [
          "Live spend automation tracking with 95.2% automated processing",
          "Real-time productivity savings calculation based on automated reports",
          "Dynamic variance tracking with ERP integration and forecasting",
        ],
        metrics: [
          { label: "Process Efficiency", value: "95.2%", sublabel: "automated vs. manual processing" },
          { label: "Speed Improvement", value: "7× faster", sublabel: "vs. traditional close cycles" },
        ],
      };
    }
    
    if (section === 'exceptions') {
      return {
        label: "FINANCE • EXCEPTIONS",
        headline: "AI-Powered Exception Management & Risk Scoring",
        description:
          "Navigate the intelligent exception queue where AI agents prioritize items by risk score and urgency. Watch automated resolution workflows in action.",
        callout: "🚨 Interactive: Click on exception items to see AI reasoning and automated resolution workflows.",
        highlights: [
          "AI-prioritized exception queue with intelligent risk scoring",
          "Automated resolution workflows with human-in-the-loop escalation",
          "Real-time policy compliance checking and violation detection",
        ],
        metrics: [
          { label: "Automation Success", value: "92%", sublabel: "resolved without human intervention" },
          { label: "Risk Accuracy", value: "98.5%", sublabel: "AI confidence vs. manual review" },
        ],
      };
    }
    
    if (section === 'vat-reclaim') {
      return {
        label: "FINANCE • VAT RECLAIM",
        headline: "Automated VAT Recovery & Compliance Optimization",
        description:
          "Watch AI agents automatically identify VAT reclaim opportunities across transactions. See real-time compliance optimization and recovery tracking.",
        callout: "💰 Smart Recovery: AI automatically identifies and processes VAT reclaim opportunities across all transactions.",
        highlights: [
          "Automated VAT identification across all transaction types",
          "Real-time compliance optimization with country-specific rules",
          "Intelligent recovery tracking with audit-ready documentation",
        ],
        metrics: [
          { label: "Recovery Opportunity", value: "85% More", sublabel: "identified vs. manual processes" },
          { label: "Success Rate", value: "94%", sublabel: "vs. traditional reclaim methods" },
        ],
      };
    }
    
    if (section === 'policy-insights') {
      return {
        label: "FINANCE • POLICY INSIGHTS",
        headline: "AI-Driven Policy Optimization & Compliance Intelligence",
        description:
          "Explore data-driven policy recommendations and compliance insights. Watch AI analyze spending patterns to suggest policy improvements.",
        callout: "🧠 Smart Insights: AI analyzes spending patterns to recommend policy optimizations and compliance improvements.",
        highlights: [
          "Data-driven policy recommendations based on spending analysis",
          "Compliance intelligence with automated drift detection",
          "Predictive insights for policy optimization and cost reduction",
        ],
        metrics: [
          { label: "Policy Optimization", value: "3× More", sublabel: "insights vs. manual analysis" },
          { label: "Compliance Excellence", value: "98.7%", sublabel: "vs. industry benchmark" },
        ],
      };
    }
    
    if (section === 'sustainability') {
      return {
        label: "FINANCE • SUSTAINABILITY",
        headline: "Carbon Footprint Tracking & ESG Compliance",
        description:
          "Monitor sustainability metrics and ESG compliance in real-time. Watch AI agents track carbon emissions and optimize for environmental goals.",
        callout: "🌱 Green Finance: AI tracks carbon emissions and optimizes spending for environmental sustainability goals.",
        highlights: [
          "Real-time carbon footprint tracking across all transactions",
          "ESG compliance monitoring with automated reporting",
          "Sustainability optimization with environmental impact scoring",
        ],
        metrics: [
          { label: "Carbon Reduction", value: "42%", sublabel: "vs. industry average" },
          { label: "ESG Compliance", value: "A+ Rating", sublabel: "sustainability leadership" },
        ],
      };
    }
    
    // Default fallback
    return {
      label: "FINANCE • COMMAND CENTER",
      headline: "AI-Powered Finance Operations: 92% Automation, 7× Faster Close",
      description:
        "Navigate Alex's intelligent finance dashboard where AI agents handle exceptions, optimize cash flow, and ensure compliance. Every decision is transparent, auditable, and export-ready.",
      callout: `🎯 Explore: Switch between Dashboard, Exceptions, VAT Reclaim, and Policy Insights to see different AI workflows in action.`,
      highlights: [
        "AI-prioritized exception queue with risk scoring and automated resolution",
        "Policy playbooks trigger smart approvals with human oversight when needed",
        "Real-time variance tracking connects directly to ERP and forecasting systems",
      ],
      metrics: [
        { label: "Automation Rate", value: "92%", sublabel: "exceptions handled automatically" },
        { label: "Close Speed", value: "7× faster", sublabel: "month-end close acceleration" },
      ],
    };
  }

  return null;
};
