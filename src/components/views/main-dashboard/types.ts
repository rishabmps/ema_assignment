export type Persona = "traveler" | "finance";
export type Act = "expense" | "booking";
export type Step = "persona" | "act" | "demo";

export interface ScenarioDetails {
  label: string;
  headline: string;
  description: string;
  callout: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}

export interface DemoSelectorProps {
  onPersonaSelect: (persona: Persona) => void;
  onActSelect: (act: Act) => void;
}

export interface ActSelectorProps {
  onActSelect: (act: Act) => void;
}

export interface ScenarioDetailsProps {
  scenarioDetails: ScenarioDetails | null;
}

export interface BreadcrumbNavigationProps {
  step: Step;
  persona: Persona;
  act: Act;
  currentFinanceSection: string;
  onStepChange: (step: Step) => void;
  onPersonaChange: (persona: Persona) => void;
  onActChange: (act: Act) => void;
  onFinanceSectionChange: (section: string) => void;
  demoRef: React.RefObject<HTMLDivElement>;
}

export interface DemoContentProps {
  step: Step;
  persona: Persona;
  act: Act;
  currentFinanceUrl: string;
  currentFinanceSection: string;
  onFinanceUrlChange: (url: string) => void;
  onFinanceSectionChange: (section: string) => void;
  demoRef: React.RefObject<HTMLDivElement>;
}
