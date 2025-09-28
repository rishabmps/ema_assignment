
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, FileText, XCircle } from "lucide-react";
import type { RecommendationLogEntry } from "@/types";
import recommendationLog from "@/lib/data/recommendation_log.json";
import sustainabilityTargets from "@/lib/data/sustainability_targets.json";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { format } from "date-fns";
import users from '@/lib/data/users.json';


const recommendations = recommendationLog.recommendations as RecommendationLogEntry[];
const targets = sustainabilityTargets;

const chartData = [
  { department: 'Sales', emissions: 29.3, fill: "var(--color-sales)" },
  { department: 'Marketing', emissions: 8.2, fill: "var(--color-marketing)" },
  { department: 'Engineering', emissions: 7.7, fill: "var(--color-engineering)" },
]

const chartConfig = {
  emissions: {
    label: "CO2e (tons)",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-2))",
  },
  engineering: {
    label: "Engineering",
    color: "hsl(var(--chart-3))",
  },
}

const totalEmissions = chartData.reduce((acc, item) => acc + item.emissions, 0);
const budget = targets.company_wide.quarterly_co2e_ton_budget;
const progress = (totalEmissions / budget) * 100;
const adoptionRate = (recommendations.filter(r => r.user_action === 'Accepted').length / recommendations.length) * 100;

const getUserById = (id: string) => users.find(u => u.id === id);


export function SustainabilityDashboard({ onBack }: { onBack: () => void }) {
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      <div className="lg:col-span-2 space-y-8 flex flex-col">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                  <div>
                    <CardTitle className="text-lg text-slate-900 font-semibold">Quarterly Travel Emissions</CardTitle>
                    <CardDescription className="text-base text-slate-600 leading-relaxed">On track to meet {budget}-ton CO2e quarterly budget.</CardDescription>
                  </div>
                  <Button size="lg" className="font-semibold text-base h-12 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all duration-200">
                    <FileText className="mr-2 h-5 w-5" />
                    Export ESG Report
                  </Button>
              </CardHeader>
              <CardContent>
                  <div className="flex items-baseline gap-3 mb-4">
                      <p className="text-4xl font-bold text-slate-900">{totalEmissions.toFixed(1)} tons</p>
                      <p className="text-base text-slate-600 font-medium">/ {budget} tons CO2e</p>
                  </div>
                  <Progress value={progress} className="mt-4 h-3" />
              </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
              <CardHeader className="pb-6">
                  <CardTitle className='text-lg flex items-center justify-between text-slate-900 font-semibold'>
                      Emissions by Department
                      <Badge variant="outline" className='font-semibold text-base bg-background px-4 py-2'>
                          Adoption Rate: {adoptionRate.toFixed(0)}%
                      </Badge>
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600 leading-relaxed">Sales accounts for 65% of travel emissions but has the highest adoption rate of &apos;Greener Choice&apos; recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                   <ChartContainer config={chartConfig} className="h-48 w-full">
                      <BarChart data={chartData} accessibilityLayer>
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="department" tickLine={false} tickMargin={8} axisLine={false} fontSize={12} />
                          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}t`} fontSize={12} />
                           <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="emissions" radius={6} />
                      </BarChart>
                  </ChartContainer>
              </CardContent>
          </Card>
      </div>

      <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
          <CardHeader className="flex-shrink-0 pb-6">
              <CardTitle className="text-lg text-slate-900 font-semibold">Recommendation Impact</CardTitle>
              <CardDescription className="text-base text-slate-600 leading-relaxed">Log of sustainable travel recommendations made by the CO2 Advisor agent.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
              <div className="h-full overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-base font-semibold text-slate-700">Route</TableHead>
                        <TableHead className="text-base font-semibold text-slate-700">CO2 Saved</TableHead>
                        <TableHead className="text-base font-semibold text-slate-700">Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {recommendations.map((rec) => (
                        <TableRow key={rec.id} className="transition-all duration-200 hover:bg-slate-50/80">
                            <TableCell className="py-4">
                                <div className="text-base font-semibold text-slate-800">{rec.route}</div>
                                <div className="text-sm text-slate-600 font-medium">{getUserById(rec.user_id)?.name} on {format(new Date(rec.date), "MMM d")}</div>
                            </TableCell>
                            <TableCell className="text-emerald-600 font-bold text-lg py-4">
                                {rec.co2_saved_kg} kg
                            </TableCell>
                            <TableCell className="py-4">
                                {rec.user_action === "Accepted" ? (
                                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-slate-400" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
