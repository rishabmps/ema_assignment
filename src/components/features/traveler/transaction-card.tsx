
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

  const cardIsClickable = true; // All transactions are now clickable for expand/collapse

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 rounded-xl bg-white/95 backdrop-blur-sm shadow-md border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50",
        isExpanded && "shadow-xl ring-2 ring-blue-100/50"
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
             <AccordionTrigger
                className="p-2.5 text-left hover:no-underline hover:bg-slate-50/50 transition-colors rounded-xl"
                aria-label="Toggle details"
              >
                <div className="flex items-center w-full gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-sm flex-shrink-0">
                        {getIcon(transaction.merchant_logo)}
                    </div>
                    <div className="flex-grow min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{transaction.merchant}</p>
                        <p className="text-xs text-slate-500 font-medium">
                        {format(new Date(transaction.date), "MMM d")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">
                            {currencyFormatter.format(transaction.amount)}
                            </p>
                            <StatusTag status={transaction.status} />
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center text-slate-400 hover:bg-slate-100/50 rounded-lg transition-colors">
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                    </div>
                </div>
              </AccordionTrigger>
            <AccordionContent>
              <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 px-3 py-2.5 border-t border-slate-200/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Bot className="h-1.5 w-1.5 text-white" />
                    </div>
                    AI Processing
                  </h4>
                  <div className="text-xs text-slate-500 font-medium">
                    {format(new Date(transaction.timeline[transaction.timeline.length - 1]?.time || transaction.date), "p")}
                  </div>
                </div>
                
                {/* Compact Timeline with Icons */}
                <div className="space-y-1.5">
                  {transaction.status === 'Exception' ? (
                    // Exception-specific timeline
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">📥</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-600 truncate">
                            Transaction received from card provider
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">🔍</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-purple-600 truncate">
                            Receipt automatically matched via OCR
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">⚠️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-orange-600 truncate">
                            Policy compliance check failed
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">👤</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-red-600 truncate">
                            Flagged for manual review
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Cleared transaction timeline
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">📥</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-600 truncate">
                            Transaction received from card provider
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">🔍</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-purple-600 truncate">
                            Receipt automatically matched via OCR
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">✅</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-blue-600 truncate">
                            Policy compliance check passed
                          </p>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                          <span className="text-xs">✨</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-green-600 truncate">
                            Transaction approved and cleared
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Status Summary */}
                <div className="mt-2 pt-2 border-t border-slate-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {transaction.status === 'Exception' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="text-xs font-semibold text-orange-700">Requires Review</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs font-semibold text-green-700">Completed</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      4 steps
                    </span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
