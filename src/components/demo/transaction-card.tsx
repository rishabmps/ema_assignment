"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { StatusTag } from "@/components/demo/status-tag";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";
import {
  Bot,
  Building,
  CheckCircle,
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
      return <Coffee className="h-6 w-6 text-muted-foreground" />;
    case "cutlery":
      return <UtensilsCrossed className="h-6 w-6 text-muted-foreground" />;
    case "building":
      return <Building className="h-6 w-6 text-muted-foreground" />;
    case "plane":
      return <Plane className="h-6 w-6 text-muted-foreground" />;
    default:
      return <Receipt className="h-6 w-6 text-muted-foreground" />;
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

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        isExpanded ? "shadow-md" : "hover:shadow-md",
        transaction.status === "Needs Receipt" ? "border-primary/50 ring-1 ring-primary/50 cursor-pointer" : ""
      )}
    >
      <CardContent className="p-0">
        <Accordion
          type="single"
          collapsible
          value={isExpanded ? "item-1" : ""}
          onValueChange={() => onToggleExpand(transaction.id)}
        >
          <AccordionItem value="item-1" className="border-b-0">
            <div className={cn("flex items-center p-4", transaction.status !== 'Needs Receipt' && "cursor-pointer")}>
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                {getIcon(transaction.merchant_logo)}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-foreground">{transaction.merchant}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "MMMM d, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">
                  {currencyFormatter.format(transaction.amount)}
                </p>
                <StatusTag status={transaction.status} />
              </div>
              <AccordionTrigger
                className={cn(
                  "ml-2 w-auto p-2 hover:no-underline [&[data-state=open]>svg]:rotate-180",
                  transaction.status === "Needs Receipt" && "hidden"
                  )}
                aria-label="Toggle details"
              />
            </div>
            <AccordionContent>
              <div className="bg-secondary/50 px-4 py-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Automation Timeline</h4>
                <ul className="space-y-3">
                  {transaction.timeline.map((event, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background">
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
