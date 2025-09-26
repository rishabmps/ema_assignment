
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
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
import { ArrowLeft, ArrowUpRight, CheckCircle, FileText, Leaf, XCircle } from "lucide-react";
import type { RecommendationLogEntry } from "@/types";
import recommendationLog from "@/lib/data/recommendation_log.json";
import sustainabilityTargets from "@/lib/data/sustainability_targets.json";
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { ChartContainer } from '../ui/chart';
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
    <div className="w-full space-y-4 p-6 md:p-8 flex flex-col h-full bg-secondary/50">
      <header className="flex-shrink-0 flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Sustainability Command Center</h1>
          <p className="text-muted-foreground">Manage and report on your company's travel emissions with the CO2 Advisor.</p>
        </div>
        <Button>
          <FileText className="mr-2" />
          Export ESG Report
        </Button>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quarterly Travel Emissions</CardTitle>
                    <CardDescription>On track to meet {budget}-ton CO2e quarterly budget.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold">{totalEmissions.toFixed(1)} tons</p>
                        <p className="text-muted-foreground">/ {budget} tons CO2e</p>
                    </div>
                    <Progress value={progress} className="mt-2" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center justify-between'>
                        Emissions by Department
                        <Badge variant="outline" className='font-normal text-sm'>
                            Adoption Rate: {adoptionRate.toFixed(0)}%
                        </Badge>
                    </CardTitle>
                    <CardDescription>Sales accounts for 65% of travel emissions but has the highest adoption rate of 'Greener Choice' recommendations.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="h-64 w-full">
                        <BarChart data={chartData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="department" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}t`} />
                             <RechartsTooltip cursor={false} content={<div className='rounded-md bg-background/80 backdrop-blur-sm border px-3 py-2 text-sm'>Custom Tooltip</div>} />
                            <Bar dataKey="emissions" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="lg:col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle>Recommendation Impact</CardTitle>
                <CardDescription>Log of sustainable travel recommendations made by the CO2 Advisor agent.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                        <TableRow>
                            <TableHead>Route</TableHead>
                            <TableHead>CO2 Saved</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {recommendations.map((rec) => (
                            <TableRow key={rec.id}>
                                <TableCell>
                                    <div className="font-medium">{rec.route}</div>
                                    <div className="text-xs text-muted-foreground">{getUserById(rec.user_id)?.name} on {format(new Date(rec.date), "MMM d")}</div>
                                </TableCell>
                                <TableCell className="text-green-600 font-medium">
                                    {rec.co2_saved_kg} kg
                                </TableCell>
                                <TableCell>
                                    {rec.user_action === "Accepted" ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-muted-foreground" />
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
    </div>
  );
}

    