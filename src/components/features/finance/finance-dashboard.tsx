
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
import { ExceptionDetailCard } from "@/components/features/finance/exception-detail-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction, User } from "@/types";
import transactionsData from "@/lib/data/transactions.json";
import usersData from "@/lib/data/users.json";
import policyExceptionsData from "@/lib/data/policy_exceptions.json";
import { Activity, BarChart, Clock, FileWarning, DollarSign, Search, ExternalLink, LayoutGrid, ListTodo, Lightbulb, HandCoins, Leaf, Bot } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { VatReclaimView } from "@/components/features/finance/vat-reclaim-view";
import { PolicyInsightView } from "@/components/features/finance/policy-insight-view";
import { SustainabilityDashboard } from "@/components/features/finance/sustainability-dashboard";
import { AgentActivityPanel, useAgentActivity } from "@/components/features/agent-activity";

const users = usersData as User[];
const transactions = transactionsData as Transaction[];

const kpiData = [
  {
    title: "% Spend Automated",
    value: "95.2%",
    icon: Activity,
    description: "Last 30 Days",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100/50"
  },
  {
    title: "Avg. Time to Close",
    value: "2.1 Hours",
    icon: Clock,
    description: "From transaction to posting",
    color: "from-blue-500 to-blue-600", 
    bgColor: "from-blue-50 to-blue-100/50"
  },
  {
    title: "Total Open Exceptions",
    value: transactions.filter((t) => t.status === "Exception").length.toString(),
    icon: FileWarning,
    description: "Items needing review",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100/50"
  },
  {
    title: "Productivity Savings",
    value: "$4,060",
    icon: DollarSign,
    description: "Based on 70 automated reports",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100/50"
  },
];

const vatReclaimable = transactions.reduce((acc, txn) => acc + (txn.vat_reclaimable_usd || 0), 0);
const policyInsightsCount = policyExceptionsData.recommendations.length;

export function FinanceDashboard() {
  const exceptionTransactions = transactions.filter((t) => t.status === "Exception");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(exceptionTransactions[0] || null);
  const [activeView, setActiveView] = useState("default");
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  const getUserForTxn = (txn: Transaction) => users.find(u => u.id === txn.user_id);
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  
  const { 
    activities, 
    simulateExpenseFlow, 
    simulateExceptionFlow, 
    clearActivities 
  } = useAgentActivity();

  const handleTransactionSelect = (txn: Transaction) => {
    setSelectedTxn(txn);
    
    // If it's an exception transaction, simulate the exception flow
    if (txn.status === "Exception" && txn.policy_check) {
      simulateExceptionFlow(txn.policy_check.violation);
      setShowAgentPanel(true);
    }
  };


  if (activeView === "vat_reclaim") {
    return <VatReclaimView onBack={() => setActiveView("default")} transactions={transactions} totalReclaimable={vatReclaimable} />
  }
  if (activeView === "policy_insights") {
    return <PolicyInsightView onBack={() => setActiveView("default")} recommendations={policyExceptionsData.recommendations} />
  }
  if (activeView === "sustainability") {
    return <SustainabilityDashboard onBack={() => setActiveView("default")} />
  }


  return (
    <div className="w-full space-y-6 p-6 md:p-8 flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <header className="flex-shrink-0 flex items-start justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Finance Operations</h1>
            <p className="text-slate-600 text-lg font-medium">Welcome back, Alex.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:bg-slate-50"
              onClick={() => setShowAgentPanel(true)}
            >
              <Bot className="h-4 w-4 mr-2 text-slate-600" />
              Agent Activity
              {activities.length > 0 && (
                <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              )}
            </Button>
          </div>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-6 flex flex-col flex-grow relative z-10">
        <div className="flex-shrink-0 flex justify-between items-center">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
                 <TabsTrigger value="dashboard" className="flex items-center gap-2 font-medium">
                    <LayoutGrid className="h-4 w-4" />
                    Dashboard
                </TabsTrigger>
                <TabsTrigger value="exceptions" className="flex items-center gap-2 font-medium">
                    <ListTodo className="h-4 w-4" />
                    Exception Queue
                </TabsTrigger>
            </TabsList>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:bg-white/90 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Export Data
            </Button>
        </div>
        
        <TabsContent value="dashboard" className="space-y-6 flex-grow">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <Card 
                key={kpi.title} 
                className={`bg-gradient-to-br ${kpi.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-700">{kpi.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${kpi.color} flex items-center justify-center shadow-lg`}>
                      <kpi.icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</div>
                    <p className="text-sm text-slate-600 font-medium">{kpi.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card 
                onClick={() => setActiveView('vat_reclaim')} 
                className="cursor-pointer hover:border-emerald-300 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-xl hover:scale-105 transform border-2 border-transparent backdrop-blur-sm group relative overflow-hidden col-span-1"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">Automated VAT Reclaim</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <HandCoins className="h-5 w-5 text-white"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800 mb-1">{currencyFormatter.format(vatReclaimable)}</div>
                        <p className="text-sm text-slate-600 font-medium">Identified in the last 30 days</p>
                    </CardContent>
                  </div>
              </Card>
              
              <Card 
                onClick={() => setActiveView('policy_insights')} 
                className="cursor-pointer hover:border-amber-300 transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-xl hover:scale-105 transform border-2 border-transparent backdrop-blur-sm group relative overflow-hidden col-span-1"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">Policy Insights</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Lightbulb className="h-5 w-5 text-white"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800 mb-1">{policyInsightsCount} New Recommendation</div>
                        <p className="text-sm text-slate-600 font-medium">Data-driven suggestions to improve efficiency</p>
                    </CardContent>
                  </div>
              </Card>
              
              <Card 
                onClick={() => setActiveView('sustainability')} 
                className="cursor-pointer hover:border-green-300 transition-all duration-300 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl hover:scale-105 transform border-2 border-transparent backdrop-blur-sm group relative overflow-hidden col-span-1"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-green-700 transition-colors">Sustainability</CardTitle>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Leaf className="h-5 w-5 text-white"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800 mb-1">45.2 tons</div>
                        <p className="text-sm text-slate-600 font-medium">Quarterly CO2e on track to meet goal</p>
                    </CardContent>
                  </div>
              </Card>
          </div>
        </TabsContent>

        <TabsContent value="exceptions" className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-grow">
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                    <FileWarning className="h-4 w-4 text-white" />
                  </div>
                  Exception Queue
                </CardTitle>
                <CardDescription className="text-slate-600">Transactions requiring manual review and approval.</CardDescription>
                <div className="relative pt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search exceptions..." className="pl-9 bg-white/50 border-slate-200/50 focus:border-blue-300 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold text-slate-700">Employee</TableHead>
                        <TableHead className="font-semibold text-slate-700">Merchant</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exceptionTransactions.map((txn) => (
                        <TableRow
                          key={txn.id}
                          onClick={() => handleTransactionSelect(txn)}
                          className={cn(
                            "cursor-pointer transition-all duration-200 hover:bg-slate-50/80",
                            selectedTxn?.id === txn.id && "bg-blue-50/80 border-l-4 border-l-blue-500"
                          )}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                                <AvatarFallback className="bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold">
                                  {getUserForTxn(txn)?.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                  <span className="font-semibold text-sm text-slate-800">{getUserForTxn(txn)?.name}</span>
                                  <span className="text-xs text-slate-500 font-medium">{getUserForTxn(txn)?.title}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-slate-700">{txn.merchant}</TableCell>
                          <TableCell className="text-right font-bold text-slate-800">
                            {currencyFormatter.format(txn.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <BarChart className="h-4 w-4 text-white"/>
                        </div>
                        Agent Analysis
                    </CardTitle>
                    <CardDescription className="text-slate-600">AI-powered insights for the selected transaction.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto">
                    {selectedTxn ? (
                        <div className="space-y-6 flex flex-col justify-between h-full">
                            <div>
                                <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/50">
                                    <p className="text-sm text-slate-500 font-medium mb-1">
                                        {format(new Date(selectedTxn.date), "EEEE, MMMM d, yyyy 'at' p")}
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedTxn.merchant}</h3>
                                    <p className="text-3xl font-bold text-slate-900">{currencyFormatter.format(selectedTxn.amount)}</p>
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
                            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200/50">
                                <Button variant="outline" className="font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">Request Info</Button>
                                <Button variant="destructive" className="font-medium hover:shadow-lg transition-all">Reject Expense</Button>
                                <Button className="font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg transition-all">Approve Exception</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500 rounded-lg border-2 border-dashed border-slate-300/50">
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <BarChart className="h-8 w-8 text-slate-400" />
                              </div>
                              <p className="font-medium">Select an exception to view details</p>
                              <p className="text-sm text-slate-400 mt-1">Click on a transaction above to see AI analysis</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Activity Panel */}
      <AgentActivityPanel
        activities={activities}
        isOpen={showAgentPanel}
        onClose={() => setShowAgentPanel(false)}
        title="Agent Activity"
        flow="exception"
        isMobile={false}
        compact={false}
      />
    </div>
  );
}
