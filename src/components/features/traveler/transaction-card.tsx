
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
        "overflow-hidden transition-all duration-300 rounded-xl bg-background shadow-sm",
        isExpanded && "shadow-lg",
        !cardIsClickable && "border-primary/50 ring-1 ring-primary/50 cursor-pointer"
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
                  "p-3 text-left hover:no-underline",
                   !cardIsClickable && "cursor-pointer"
                )}
                aria-label="Toggle details"
              >
                <div className="flex items-center w-full">
                    <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                        {getIcon(transaction.merchant_logo)}
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-foreground">{transaction.merchant}</p>
                        <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "MMMM d, yyyy")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                        {currencyFormatter.format(transaction.amount)}
                        </p>
                        <StatusTag status={transaction.status} />
                    </div>
                     <div className={cn(
                        "ml-2 w-auto p-1 text-muted-foreground rounded-md",
                        !cardIsClickable && "hidden"
                      )}>
                        <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                    </div>
                </div>
              </AccordionTrigger>
            <AccordionContent>
              <div className="bg-secondary/50 px-4 py-4 border-t">
                <h4 className="mb-3 text-sm font-semibold text-foreground">Automation Timeline</h4>
                <ul className="space-y-4">
                  {transaction.timeline.map((event, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-1 ring-border">
                        {getAgentIcon(event.agent)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {event.agent ? `${event.agent} says:` : "System Update"}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.status}</p>
                        <p className="mt-0.5 flex items-center text-xs text-muted-foreground/80">
                          <Clock className="mr-1 h-3 w-3" />
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
