
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
    <div className="grid grid-cols-1 gap-6">
      {recommendations.map((rec, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Self-Healing Policy Recommendation
            </CardTitle>
            <CardDescription className="text-xs text-slate-600">{rec.rule_id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-xs font-semibold mb-1 text-slate-700">Insight</h4>
                    <p className="text-xs text-slate-600">{rec.insight}</p>
                </div>
                 <div>
                    <h4 className="text-xs font-semibold mb-1 text-slate-700">Recommendation</h4>
                    <p className="text-xs text-slate-600">{rec.recommendation}</p>
                </div>
            </div>
            <Card className="bg-green-50/50 border-green-200/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs flex items-center gap-2 text-green-700">
                        <TrendingUp className="h-3 w-3 text-green-600"/>
                        Projected Impact
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-xs text-green-800 font-medium">{rec.impact}</p>
                </CardContent>
            </Card>
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <Button variant="outline" size="sm" className="text-xs">Dismiss</Button>
                <Button size="sm" className="text-xs">Accept & Update Policy</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
