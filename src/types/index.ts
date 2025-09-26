export interface User {
  id: string;
  name: string;
  role: 'Traveler' | 'Finance Operations';
  title: string;
  initials: string;
}

export interface TimelineEvent {
  time: string;
  status: string;
  agent?: string;
}

interface PolicyCheck {
  violation: string;
  details: string;
  rule_id: string;
}

interface FraudCheck {
  alert: string;
  details: string;
  recommendation: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  merchant_logo: string;
  amount: number;
  date: string;
  user_id: string;
  status: 'Cleared' | 'Exception' | 'Needs Receipt' | 'Processing';
  category: string;
  timeline: TimelineEvent[];
  policy_check: PolicyCheck | null;
  fraud_check: FraudCheck | null;
  currency?: string;
  amount_usd?: number;
  vat_reclaimable_usd?: number;
  country_code?: string;
}

export interface Policy {
  meals: {
    daily_limit: number;
    alcohol: boolean;
    receipt_required_over: number;
  };
  airfare: {
    classes: {
      economy: boolean;
      business: string;
    };
    advance_purchase_min_days: number;
    max_fare_domestic: number;
  };
  hotels: {
    max_rate: {
      default: number;
      high_cost_cities: {
        [key: string]: number;
      };
    };
    preferred_brands: string[];
  };
}

export interface Flight {
  id: string;
  airline: string;
  airline_logo: string;
  flight_number: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  class: string;
  price: number;
  compliant: boolean;
  reason: string | null;
  co2_kg?: number;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  address: string;
  price_per_night: number;
  market_rate: number;
  preferred_brand: boolean;
  compliant: boolean;
  reason: string | null;
}

export interface Train {
  id: string;
  carrier: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  co2_kg: number;
}

export interface TripBudget {
    user_id: string;
    destination: string;
    purpose: string;
    budget_usd: number;
}

export interface PolicyRecommendation {
    id: string;
    rule_id: string;
    insight: string;
    recommendation: string;
    impact: string;
}
