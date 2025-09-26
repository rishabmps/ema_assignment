
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign } from "lucide-react";

interface BudgetCopilotWidgetProps {
  budget: number;
  currentCost: number;
}

export function BudgetCopilotWidget({ budget, currentCost }: BudgetCopilotWidgetProps) {
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const progress = (currentCost / budget) * 100;

  return (
    <div className="p-4 bg-background border-b">
      <Card className="bg-secondary/50">
        <CardContent className="p-3">
            <div className="flex justify-between items-center mb-1">
                <p className="flex items-center text-sm font-semibold">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Trip Budget
                </p>
                <p className="text-sm font-semibold">
                    {currencyFormatter.format(currentCost)} / <span className="text-muted-foreground">{currencyFormatter.format(budget)}</span>
                </p>
            </div>
            <Progress value={progress} />
        </CardContent>
      </Card>
    </div>
  );
}

    