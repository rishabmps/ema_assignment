"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExceptionDetailCard } from "@/components/demo/exception-detail-card";
import { StatusTag } from "@/components/demo/status-tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction, User } from "@/types";
import transactionsData from "@/lib/data/transactions.json";
import usersData from "@/lib/data/users.json";
import { Activity, AlertCircle, BarChart, CheckCircle, Clock, FileWarning, DollarSign, ShieldAlert } from "lucide-react";
import { format } from "date-fns";

const users = usersData as User[];
const transactions = transactionsData as Transaction[];

const kpiData = [
  {
    title: "% Spend Automated",
    value: "95%",
    icon: Activity,
    description: "Last 30 Days",
  },
  {
    title: "Avg. Time to Close",
    value: "2 Hours",
    icon: Clock,
    description: "From transaction to posting",
  },
  {
    title: "Total Open Exceptions",
    value: transactions.filter((t) => t.status === "Exception").length.toString(),
    icon: AlertCircle,
    description: "Items needing review",
  },
  {
    title: "Productivity Savings",
    value: "$4,060",
    icon: DollarSign,
    description: "Based on 70 automated reports",
  },
];

export function FinanceDashboard() {
  const exceptionTransactions = transactions.filter((t) => t.status === "Exception");
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(exceptionTransactions[0] || null);

  const getUserForTxn = (txn: Transaction) => users.find(u => u.id === txn.user_id);
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });


  return (
    <div className="w-full space-y-6 p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-destructive" />
              Exception Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
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
                        <span className="font-medium">{getUserForTxn(txn)?.name}</span>
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
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary"/>
                    Agent Analysis
                </CardTitle>
            </CardHeader>
            <CardContent>
                {selectedTxn ? (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold">{selectedTxn.merchant}</h3>
                            <p className="text-muted-foreground">
                                {format(new Date(selectedTxn.date), "MMMM d, yyyy 'at' p")}
                            </p>
                            <p className="text-2xl font-bold mt-2">{currencyFormatter.format(selectedTxn.amount)}</p>
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
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline">Request Info</Button>
                            <Button variant="destructive">Reject Expense</Button>
                            <Button>Approve Exception</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-64 items-center justify-center text-muted-foreground">
                        <p>Select an exception to view details</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
