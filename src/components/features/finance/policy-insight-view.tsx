
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, TrendingUp } from "lucide-react";
import type { PolicyRecommendation } from "@/types";

interface PolicyInsightViewProps {
  onBack: () => void;
  recommendations: PolicyRecommendation[];
}

export function PolicyInsightView({ onBack, recommendations }: PolicyInsightViewProps) {
  return (
    <div className="w-full space-y-4 p-6 md:p-8 flex flex-col h-full bg-slate-50">
      <header className="flex-shrink-0 flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Policy Insights</h1>
          <p className="text-muted-foreground">Data-driven recommendations from your AI Policy Agent.</p>
        </div>
      </header>
      
      <div className="flex-grow overflow-y-auto space-y-6 -mr-6 pr-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Self-Healing Policy Recommendation
              </CardTitle>
              <CardDescription>{rec.rule_id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <h4 className="font-semibold mb-2">Insight</h4>
                      <p className="text-muted-foreground">{rec.insight}</p>
                  </div>
                   <div>
                      <h4 className="font-semibold mb-2">Recommendation</h4>
                      <p className="text-muted-foreground">{rec.recommendation}</p>
                  </div>
              </div>
              <Card className="bg-secondary/50">
                  <CardHeader>
                      <CardTitle className="text-md flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600"/>
                          Projected Impact
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-foreground font-medium">{rec.impact}</p>
                  </CardContent>
              </Card>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline">Dismiss</Button>
                  <Button>Accept & Update Policy</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
