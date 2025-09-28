
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6 flex flex-col">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle className="text-sm text-slate-800">Quarterly Travel Emissions</CardTitle>
                    <CardDescription className="text-xs text-slate-600">On track to meet {budget}-ton CO2e quarterly budget.</CardDescription>
                  </div>
                  <Button size="sm">
                    <FileText className="mr-1 h-3 w-3" />
                    Export ESG Report
                  </Button>
              </CardHeader>
              <CardContent>
                  <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-slate-800">{totalEmissions.toFixed(1)} tons</p>
                      <p className="text-xs text-slate-600">/ {budget} tons CO2e</p>
                  </div>
                  <Progress value={progress} className="mt-2 h-2" />
              </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
              <CardHeader className="pb-3">
                  <CardTitle className='text-sm flex items-center justify-between text-slate-800'>
                      Emissions by Department
                      <Badge variant="outline" className='font-normal text-xs bg-background'>
                          Adoption Rate: {adoptionRate.toFixed(0)}%
                      </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600">Sales accounts for 65% of travel emissions but has the highest adoption rate of &apos;Greener Choice&apos; recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                   <ChartContainer config={chartConfig} className="h-32 w-full">
                      <BarChart data={chartData} accessibilityLayer>
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="department" tickLine={false} tickMargin={6} axisLine={false} fontSize={10} />
                          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}t`} fontSize={10} />
                           <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="emissions" radius={4} />
                      </BarChart>
                  </ChartContainer>
              </CardContent>
          </Card>
      </div>

      <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
          <CardHeader className="flex-shrink-0 pb-3">
              <CardTitle className="text-sm text-slate-800">Recommendation Impact</CardTitle>
              <CardDescription className="text-xs text-slate-600">Log of sustainable travel recommendations made by the CO2 Advisor agent.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
              <div className="h-full overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs font-semibold text-slate-700">Route</TableHead>
                        <TableHead className="text-xs font-semibold text-slate-700">CO2 Saved</TableHead>
                        <TableHead className="text-xs font-semibold text-slate-700">Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {recommendations.map((rec) => (
                        <TableRow key={rec.id} className="transition-all duration-200 hover:bg-slate-50/80">
                            <TableCell className="py-3">
                                <div className="text-xs font-medium text-slate-800">{rec.route}</div>
                                <div className="text-xs text-slate-600">{getUserById(rec.user_id)?.name} on {format(new Date(rec.date), "MMM d")}</div>
                            </TableCell>
                            <TableCell className="text-green-600 font-medium text-xs py-3">
                                {rec.co2_saved_kg} kg
                            </TableCell>
                            <TableCell className="py-3">
                                {rec.user_action === "Accepted" ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-muted-foreground" />
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
