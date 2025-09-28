"use client";

import { useState, useEffect, useMemo } from "react";
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
import { ExceptionDetailCard } from "@/components/features/finance/exception-detail-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction, User } from "@/types";
import transactionsData from "@/lib/data/transactions.json";
import usersData from "@/lib/data/users.json";
import policyExceptionsData from "@/lib/data/policy_exceptions.json";
import {
  Activity,
  BarChart,
  Clock,
  FileWarning,
  DollarSign,
  Search,
  ExternalLink,
  LayoutGrid,
  ListTodo,
  Lightbulb,
  HandCoins,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { VatReclaimView } from "@/components/features/finance/vat-reclaim-view";
import { PolicyInsightView } from "@/components/features/finance/policy-insight-view";
import { SustainabilityDashboard } from "@/components/features/finance/sustainability-dashboard";
import { InlineAgentActivity, useAgentActivity } from "@/components/features/agent-activity";

const users = usersData as User[];
const transactions = transactionsData as Transaction[];

const kpiData = [
  {
    title: "% Spend Automated",
    value: "95.2%",
    icon: Activity,
    description: "Last 30 Days",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100/50",
  },
  {
    title: "Avg. Time to Close",
    value: "2.1 Hours",
    icon: Clock,
    description: "From transaction to posting",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100/50",
  },
  {
    title: "Total Open Exceptions",
    value: transactions.filter((t) => t.status === "Exception").length.toString(),
    icon: FileWarning,
    description: "Items needing review",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100/50",
  },
  {
    title: "Productivity Savings",
    value: "$4,060",
    icon: DollarSign,
    description: "Based on 70 automated reports",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100/50",
  },
];

const vatReclaimable = transactions.reduce((acc, txn) => acc + (txn.vat_reclaimable_usd || 0), 0);
const policyInsightsCount = policyExceptionsData.recommendations.length;

export type FinanceSection =
  | "dashboard"
  | "exceptions"
  | "vat_reclaim"
  | "policy_insights"
  | "sustainability";

const SECTION_URL: Record<FinanceSection, string> = {
  dashboard: "agentic-te.demo/dashboard",
  exceptions: "agentic-te.demo/exceptions",
  vat_reclaim: "agentic-te.demo/vat-reclaim",
  policy_insights: "agentic-te.demo/policy-insights",
  sustainability: "agentic-te.demo/sustainability",
};

const NAV_ITEMS: { id: FinanceSection; label: string; icon: LucideIcon; description: string }[] = [
  { id: "dashboard", label: "Overview", icon: LayoutGrid, description: "KPIs & trends" },
  { id: "exceptions", label: "Exceptions", icon: ListTodo, description: "Queue & AI triage" },
  { id: "vat_reclaim", label: "VAT Reclaim", icon: HandCoins, description: "Tax automation" },
  { id: "policy_insights", label: "Policy Insights", icon: Lightbulb, description: "AI guidance" },
  { id: "sustainability", label: "Sustainability", icon: Leaf, description: "Carbon goals" },
];

interface FinanceDashboardProps {
  onUrlChange?: (url: string) => void;
  hideInlineAgentActivity?: boolean;
  onSectionChange?: (section: FinanceSection) => void;
}

export function FinanceDashboard({
  onUrlChange,
  hideInlineAgentActivity = false,
  onSectionChange,
}: FinanceDashboardProps) {
  const exceptionTransactions = useMemo(
    () => transactions.filter((t) => t.status === "Exception"),
    []
  );
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(
    exceptionTransactions[0] || null
  );
  const [activeSection, setActiveSection] = useState<FinanceSection>("dashboard");

  const { activities, simulateExceptionFlow } = useAgentActivity();

  const getUserForTxn = (txn: Transaction) => users.find((u) => u.id === txn.user_id);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleExportData = () => {
    const exportData = {
      kpiData: {
        spendAutomated: "95.2%",
        avgTimeToClose: "2.1 Hours",
        openExceptions: exceptionTransactions.length,
        productivitySavings: "$4,060",
      },
      transactions: transactions.length,
      vatReclaim: vatReclaimable,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finance-dashboard-export-${new Date()
      .toISOString()
      .split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTransactionSelect = (txn: Transaction) => {
    setSelectedTxn(txn);

    if (txn.status === "Exception" && txn.policy_check) {
      simulateExceptionFlow(txn.policy_check.violation);
    }
  };

  useEffect(() => {
    onUrlChange?.(SECTION_URL[activeSection]);
  }, [activeSection, onUrlChange]);

  useEffect(() => {
    onSectionChange?.(activeSection);
  }, [activeSection, onSectionChange]);

  useEffect(() => {
    if (activeSection === "exceptions" && !selectedTxn && exceptionTransactions.length) {
      setSelectedTxn(exceptionTransactions[0]);
    }
  }, [activeSection, exceptionTransactions, selectedTxn]);

  const renderDashboard = () => (
    <div className="space-y-8 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight">
          Finance Operations
        </h1>
        <p className="text-slate-600 text-base font-medium">Welcome back, Alex.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card
            key={kpi.title}
            className={`bg-gradient-to-br ${kpi.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden group cursor-pointer`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
            <div className="relative z-10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors leading-tight">
                  {kpi.title}
                </CardTitle>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${kpi.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform group-hover:shadow-xl`}
                >
                  <kpi.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-none">
                  {kpi.value}
                </div>
                <p className="text-sm text-slate-600 font-medium group-hover:text-slate-700 transition-colors leading-relaxed">
                  {kpi.description}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          className="bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100/40 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setActiveSection("vat_reclaim")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
              Automated VAT Reclaim
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <HandCoins className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-none">
              {currencyFormatter.format(vatReclaimable)}
            </div>
            <p className="text-sm text-slate-600 font-medium group-hover:text-slate-700 transition-colors leading-relaxed">
              Identified in the last 30 days
            </p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-white to-amber-50/30 border border-amber-100/40 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setActiveSection("policy_insights")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
              Policy Insights
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-none">
              {policyInsightsCount} New Recommendation
            </div>
            <p className="text-sm text-slate-600 font-medium group-hover:text-slate-700 transition-colors leading-relaxed">
              Data-driven suggestions to improve efficiency
            </p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-white to-green-50/30 border border-green-100/40 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setActiveSection("sustainability")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
              Sustainability Progress
            </CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Leaf className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-none">45.2 tons</div>
            <p className="text-sm text-slate-600 font-medium group-hover:text-slate-700 transition-colors leading-relaxed">
              Quarterly CO₂e on track to meet goal
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );

  const renderExceptions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-6">
      <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
        <CardHeader className="flex-shrink-0 pb-6">
          <CardTitle className="flex items-center gap-3 text-slate-900 text-lg font-semibold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <FileWarning className="h-5 w-5 text-white" />
            </div>
            Exception Queue
          </CardTitle>
          <CardDescription className="text-slate-600 text-base leading-relaxed">
            Transactions requiring manual review and approval.
          </CardDescription>
          <div className="relative pt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search exceptions..."
              className="pl-10 h-11 bg-white/50 border-slate-200/50 focus:border-blue-300 transition-colors text-base"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-700 text-base">
                    Employee
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-base">
                    Merchant
                  </TableHead>
                  <TableHead className="text-right font-semibold text-slate-700 text-base">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptionTransactions.map((txn) => (
                  <TableRow
                    key={txn.id}
                    onClick={() => handleTransactionSelect(txn)}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:bg-slate-50/80",
                      selectedTxn?.id === txn.id &&
                        "bg-blue-50/80 border-l-4 border-l-blue-500"
                    )}
                  >
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 ring-2 ring-white shadow-md">
                          <AvatarFallback className="bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold text-base">
                            {getUserForTxn(txn)?.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-base text-slate-800">
                            {getUserForTxn(txn)?.name}
                          </span>
                          <span className="text-sm text-slate-500 font-medium">
                            {getUserForTxn(txn)?.title}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-700 text-base py-5">
                      {txn.merchant}
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-800 text-lg py-5">
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
        <CardHeader className="flex-shrink-0 pb-6">
          <CardTitle className="flex items-center gap-3 text-slate-900 text-lg font-semibold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <BarChart className="h-5 w-5 text-white" />
            </div>
            Agent Analysis
          </CardTitle>
          <CardDescription className="text-slate-600 text-base leading-relaxed">
            AI-powered insights for the selected transaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          {!hideInlineAgentActivity && activities.length > 0 && (
            <div className="mb-4">
              <InlineAgentActivity activities={activities} compact={false} />
            </div>
          )}

          {selectedTxn ? (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div>
                <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200/50">
                  <p className="text-base text-slate-500 font-medium mb-2">
                    {format(new Date(selectedTxn.date), "EEEE, MMMM d, yyyy 'at' p")}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    {selectedTxn.merchant}
                  </h3>
                  <p className="text-4xl font-bold text-slate-900">
                    {currencyFormatter.format(selectedTxn.amount)}
                  </p>
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
              <div className="flex justify-end space-x-4 pt-8 border-t border-slate-200/50">
                <Button variant="outline" size="lg" className="font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 h-12 px-6">
                  Request Info
                </Button>
                <Button variant="destructive" size="lg" className="font-semibold text-base hover:shadow-lg transition-all duration-200 h-12 px-6">
                  Reject Expense
                </Button>
                <Button size="lg" className="font-semibold text-base bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg transition-all duration-200 h-12 px-6">
                  Approve Exception
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500 rounded-xl border-2 border-dashed border-slate-300/50 bg-slate-50/20">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <BarChart className="h-10 w-10 text-slate-400" />
                </div>
                <p className="font-semibold text-lg text-slate-700 mb-2">Select an exception to view details</p>
                <p className="text-base text-slate-500">
                  Click on a transaction above to see AI analysis
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "exceptions":
        return renderExceptions();
      case "vat_reclaim":
        return (
          <VatReclaimView
            onBack={() => setActiveSection("dashboard")}
            transactions={transactions}
            totalReclaimable={vatReclaimable}
          />
        );
      case "policy_insights":
        return (
          <PolicyInsightView
            onBack={() => setActiveSection("dashboard")}
            recommendations={policyExceptionsData.recommendations}
          />
        );
      case "sustainability":
        return <SustainabilityDashboard onBack={() => setActiveSection("dashboard")} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <nav className="flex-shrink-0 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">AT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">Agentic T&E</span>
              <span className="text-xs text-slate-500">Enterprise Finance</span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-1 justify-center min-w-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                    "border border-transparent shadow-sm",
                    isActive
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <item.icon className="h-3 w-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-xs"
              onClick={handleExportData}
              title="Export dashboard data as JSON file"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Export Data
            </Button>
            <div className="flex items-center gap-1.5">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-purple-100 text-purple-600 font-medium text-xs">
                  AJ
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-slate-700">Alex Johnson</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 h-full overflow-auto p-6 lg:p-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
