
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { StatusTag } from "@/components/common/status-tag";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";
import {
  Bot,
  Building,
  CheckCircle,
  ChevronDown,
  Clock,
  Coffee,
  UtensilsCrossed,
  Plane,
  Receipt,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";

interface TransactionCardProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggleExpand: (transactionId: string) => void;
}

const getIcon = (logo: string) => {
  switch (logo) {
    case "coffee":
      return <Coffee className="h-6 w-6" />;
    case "cutlery":
      return <UtensilsCrossed className="h-6 w-6" />;
    case "building":
      return <Building className="h-6 w-6" />;
    case "plane":
      return <Plane className="h-6 w-6" />;
    default:
      return <Receipt className="h-6 w-6" />;
  }
};

const getAgentIcon = (agent?: string) => {
  switch (agent) {
    case "Receipt Concierge":
      return <Sparkles className="h-4 w-4 text-primary" />;
    case "Policy Engine":
      return <Bot className="h-4 w-4 text-primary" />;
    case "Fraud Sentinel":
      return <Bot className="h-4 w-4 text-primary" />;
    default:
      return <CheckCircle className="h-4 w-4 text-success" />;
  }
};

export function TransactionCard({
  transaction,
  isExpanded,
  onToggleExpand,
}: TransactionCardProps) {

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const cardIsClickable = transaction.status !== 'Needs Receipt';

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200/50 hover:shadow-xl hover:border-slate-300/50",
        isExpanded && "shadow-2xl ring-4 ring-blue-100/50",
        !cardIsClickable && "border-blue-300/70 ring-2 ring-blue-200/50 cursor-pointer hover:ring-blue-300/70"
      )}
      onClick={!cardIsClickable ? () => onToggleExpand(transaction.id) : undefined}
    >
      <CardContent className="p-0">
        <Accordion
          type="single"
          collapsible
          value={isExpanded ? "item-1" : ""}
          onValueChange={(value) => {
            if (cardIsClickable) {
              onToggleExpand(transaction.id)
            }
          }}
        >
          <AccordionItem value="item-1" className="border-b-0">
             <AccordionTrigger
                disabled={!cardIsClickable}
                className={cn(
                  "p-4 text-left hover:no-underline hover:bg-slate-50/50 transition-colors rounded-2xl",
                   !cardIsClickable && "cursor-pointer hover:bg-blue-50/50"
                )}
                aria-label="Toggle details"
              >
                <div className="flex items-center w-full">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-md">
                        {getIcon(transaction.merchant_logo)}
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold text-slate-800 text-base">{transaction.merchant}</p>
                        <p className="text-sm text-slate-500 font-medium">
                        {format(new Date(transaction.date), "MMMM d, yyyy")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-slate-900 mb-1">
                        {currencyFormatter.format(transaction.amount)}
                        </p>
                        <StatusTag status={transaction.status} />
                    </div>
                     <div className={cn(
                        "ml-3 w-auto p-1.5 text-slate-400 rounded-lg hover:bg-slate-100/50 transition-colors",
                        !cardIsClickable && "hidden"
                      )}>
                        <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                    </div>
                </div>
              </AccordionTrigger>
            <AccordionContent>
              <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 px-5 py-5 border-t border-slate-200/50">
                <h4 className="mb-4 text-sm font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  Automation Timeline
                </h4>
                <ul className="space-y-4">
                  {transaction.timeline.map((event, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-slate-100">
                        {getAgentIcon(event.agent)}
                      </div>
                      <div className="flex-1 bg-white/80 rounded-xl p-3 shadow-sm border border-slate-200/50">
                        <p className="text-sm font-semibold text-slate-800 mb-1">
                          {event.agent ? `${event.agent} says:` : "System Update"}
                        </p>
                        <p className="text-sm text-slate-600 mb-2 leading-relaxed">{event.status}</p>
                        <p className="flex items-center text-xs text-slate-400 font-medium">
                          <Clock className="mr-1.5 h-3 w-3" />
                          {format(new Date(event.time), "p")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
