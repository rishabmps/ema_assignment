"use client";

import { useState, useEffect } from "react";
import { TransactionCard } from "@/components/demo/transaction-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/types";
import allTransactions from "@/lib/data/transactions.json";
import { Receipt } from "lucide-react";

export function TravelerExpenseFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Show only transactions relevant to the "happy path" demo initially
    const initialTransactions = allTransactions.filter(
      (t) => !t.id.startsWith("txn_101")
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(initialTransactions);
  }, []);

  const handleSimulateTransaction = () => {
    const newTransaction = allTransactions.find((t) => t.id === "txn_101");
    if (newTransaction) {
      setTransactions((prev) => [newTransaction, ...prev]);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" /> New Transaction
          </div>
        ),
        description: `The Capital Grille: $125.50. Tap to add receipt.`,
      });
    }
  };

  const handleReceiptNeededClick = (transactionId: string) => {
    toast({
      title: "Receipt Uploaded",
      description: "Receipt Concierge is on it!",
    });
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === transactionId) {
          return {
            ...t,
            status: "Processing",
            timeline: [
              ...t.timeline,
              { time: new Date().toISOString(), status: "Receipt image received." },
              {
                time: new Date(Date.now() + 2000).toISOString(),
                agent: "Receipt Concierge",
                status: "Matched receipt and extracted merchant, date, and amount.",
              },
            ],
          };
        }
        return t;
      })
    );

    // Continue the simulation
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === transactionId && t.status === "Processing") {
            return {
              ...t,
              status: "Processing",
              timeline: [
                ...t.timeline,
                {
                  time: new Date(Date.now() + 4000).toISOString(),
                  agent: "Policy Engine",
                  status: "Verified the expense is within the 'Client Meal' limit.",
                },
              ],
            };
          }
          return t;
        })
      );
    }, 2000);

    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === transactionId && t.status === "Processing") {
            return {
              ...t,
              status: "Cleared",
              timeline: [
                ...t.timeline,
                {
                  time: new Date(Date.now() + 6000).toISOString(),
                  status: "Expense cleared for ERP posting. No further action needed.",
                },
              ],
            };
          }
          return t;
        })
      );
    }, 4000);
  };
  
  const handleToggleExpand = (transactionId: string) => {
    setExpandedId(currentId => currentId === transactionId ? null : transactionId);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <Button onClick={handleSimulateTransaction} className="w-full">
          Simulate Client Lunch Purchase
        </Button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4 pt-0">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onReceiptNeededClick={handleReceiptNeededClick}
            isExpanded={expandedId === transaction.id}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>
    </div>
  );
}
