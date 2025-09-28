
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
    <div className="grid grid-cols-1 gap-8 p-6">
      {recommendations.map((rec, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg flex items-center gap-3 text-slate-900 font-semibold">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                Self-Healing Policy Recommendation
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-medium">{rec.rule_id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-base font-semibold mb-3 text-slate-800">Insight</h4>
                    <p className="text-base text-slate-600 leading-relaxed">{rec.insight}</p>
                </div>
                 <div>
                    <h4 className="text-base font-semibold mb-3 text-slate-800">Recommendation</h4>
                    <p className="text-base text-slate-600 leading-relaxed">{rec.recommendation}</p>
                </div>
            </div>
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50/50 border border-green-200/50 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base flex items-center gap-2 text-emerald-700 font-semibold">
                        <TrendingUp className="h-5 w-5 text-emerald-600"/>
                        Projected Impact
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-base text-emerald-800 font-semibold leading-relaxed">{rec.impact}</p>
                </CardContent>
            </Card>
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <Button variant="outline" size="lg" className="font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 h-12 px-6">Dismiss</Button>
                <Button size="lg" className="font-semibold text-base bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 hover:shadow-lg transition-all duration-200 h-12 px-6">Accept & Update Policy</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
