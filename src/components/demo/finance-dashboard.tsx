"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExceptionDetailCard } from "@/components/demo/exception-detail-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction, User } from "@/types";
import transactionsData from "@/lib/data/transactions.json";
import usersData from "@/lib/data/users.json";
import policyExceptionsData from "@/lib/data/policy_exceptions.json";
import { Activity, BarChart, Clock, FileWarning, DollarSign, Search, ExternalLink, LayoutGrid, ListTodo, Lightbulb, TrendingUp, HandCoins } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { VatReclaimView } from "@/components/demo/vat-reclaim-view";
import { PolicyInsightView } from "./policy-insight-view";

const users = usersData as User[];
const transactions = transactionsData as Transaction[];

const kpiData = [
  {
    title: "% Spend Automated",
    value: "95.2%",
    icon: Activity,
    description: "Last 30 Days",
  },
  {
    title: "Avg. Time to Close",
    value: "2.1 Hours",
    icon: Clock,
    description: "From transaction to posting",
  },
  {
    title: "Total Open Exceptions",
    value: transactions.filter((t) => t.status === "Exception").length.toString(),
    icon: FileWarning,
    description: "Items needing review",
  },
  {
    title: "Productivity Savings",
    value: "$4,060",
    icon: DollarSign,
    description: "Based on 70 automated reports",
  },
];

const vatReclaimable = transactions.reduce((acc, txn) => acc + (txn.vat_reclaimable_usd || 0), 0);
const policyInsightsCount = policyExceptionsData.recommendations.length;

export function FinanceDashboard() {
  const exceptionTransactions = transactions.filter((t) => t.status === "Exception");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(exceptionTransactions[0] || null);
  const [activeView, setActiveView] = useState("default");

  const getUserForTxn = (txn: Transaction) => users.find(u => u.id === txn.user_id);
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });


  if (activeView === "vat_reclaim") {
    return <VatReclaimView onBack={() => setActiveView("default")} transactions={transactions} totalReclaimable={vatReclaimable} />
  }
  if (activeView === "policy_insights") {
    return <PolicyInsightView onBack={() => setActiveView("default")} recommendations={policyExceptionsData.recommendations} />
  }

  return (
    <div className="w-full space-y-4 p-6 md:p-8 flex flex-col h-full">
       <header className="flex-shrink-0 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Finance Operations</h1>
            <p className="text-muted-foreground">Welcome back, Alex.</p>
          </div>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-4 flex flex-col flex-grow">
        <div className="flex-shrink-0 flex justify-between items-center">
            <TabsList>
                 <TabsTrigger value="dashboard">
                    <LayoutGrid />
                    Dashboard
                </TabsTrigger>
                <TabsTrigger value="exceptions">
                    <ListTodo />
                    Exception Queue
                </TabsTrigger>
            </TabsList>
            <Button variant="outline">
              <ExternalLink />
              Export Data
            </Button>
        </div>
        
        <TabsContent value="dashboard" className="space-y-4 flex-grow">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
              <Card key={kpi.title} className="bg-background">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card onClick={() => setActiveView('vat_reclaim')} className="cursor-pointer hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Automated VAT Reclaim</CardTitle>
                      <HandCoins className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{currencyFormatter.format(vatReclaimable)}</div>
                      <p className="text-xs text-muted-foreground">Identified in the last 30 days</p>
                  </CardContent>
              </Card>
               <Card onClick={() => setActiveView('policy_insights')} className="cursor-pointer hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Policy Insights</CardTitle>
                      <Lightbulb className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{policyInsightsCount} New Recommendation</div>
                      <p className="text-xs text-muted-foreground">Data-driven suggestions to improve efficiency</p>
                  </CardContent>
              </Card>
          </div>
        </TabsContent>

        <TabsContent value="exceptions" className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-grow">
            <Card className="lg:col-span-2 bg-background flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <FileWarning className="h-5 w-5 text-destructive" />
                  Exception Queue
                </CardTitle>
                <CardDescription>Transactions requiring manual review and approval.</CardDescription>
                <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search exceptions..." className="pl-9 bg-secondary" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exceptionTransactions.map((txn) => (
                        <TableRow
                          key={txn.id}
                          onClick={() => setSelectedTxn(txn)}
                          className={cn(
                            "cursor-pointer",
                            selectedTxn?.id === txn.id && "bg-secondary"
                          )}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{getUserForTxn(txn)?.initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                  <span className="font-medium text-sm">{getUserForTxn(txn)?.name}</span>
                                  <span className="text-xs text-muted-foreground">{getUserForTxn(txn)?.title}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{txn.merchant}</TableCell>
                          <TableCell className="text-right font-medium">
                            {currencyFormatter.format(txn.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3 bg-background flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-primary"/>
                        Agent Analysis
                    </CardTitle>
                    <CardDescription>AI-powered insights for the selected transaction.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto">
                    {selectedTxn ? (
                        <div className="space-y-6 flex flex-col justify-between h-full">
                            <div>
                                <div className="mb-6">
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(selectedTxn.date), "EEEE, MMMM d, yyyy 'at' p")}
                                    </p>
                                    <h3 className="text-xl font-semibold">{selectedTxn.merchant}</h3>
                                    <p className="text-3xl font-bold mt-1">{currencyFormatter.format(selectedTxn.amount)}</p>
                                </div>
                                <div className="space-y-4">
                                  {selectedTxn.policy_check && (
                                      <ExceptionDetailCard 
                                          type="policy"
                                          title="Policy Engine Finding"
                                          details={selectedTxn.policy_check.details}
                                          reference={selectedTxn.policy_check.rule_id}
                                      />
                                  )}
                                  {selectedTxn.fraud_check && (
                                      <ExceptionDetailCard
                                          type="fraud"
                                          title="Fraud Sentinel Finding"
                                          details={selectedTxn.fraud_check.details}
                                          reference={selectedTxn.fraud_check.recommendation}
                                      />
                                  )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-4 border-t">
                                <Button variant="outline">Request Info</Button>
                                <Button variant="destructive">Reject Expense</Button>
                                <Button>Approve Exception</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground rounded-lg border-2 border-dashed">
                            <p>Select an exception to view details</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
