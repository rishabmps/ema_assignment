
"use client";

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
import { ArrowLeft, FileUp, HandCoins } from "lucide-react";
import type { Transaction } from "@/types";
import { format } from "date-fns";

interface VatReclaimViewProps {
  onBack: () => void;
  transactions: Transaction[];
  totalReclaimable: number;
}

export function VatReclaimView({ onBack, transactions, totalReclaimable }: VatReclaimViewProps) {
  const reclaimableTransactions = transactions.filter(t => t.vat_reclaimable_usd && t.vat_reclaimable_usd > 0);
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="w-full space-y-4 p-6 md:p-8 flex flex-col h-full bg-slate-50">
      <header className="flex-shrink-0 flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-4">
            <ArrowLeft className="mr-2" /> Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Automated VAT Reclaim</h1>
          <p className="text-muted-foreground">Value-Added Tax identified for reclaim by the Tax & Compliance Bot.</p>
        </div>
        <Button>
          <FileUp className="mr-2" />
          Export for Filing
        </Button>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
              <HandCoins className="h-5 w-5 text-primary"/>
              Total Identified
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{currencyFormatter.format(totalReclaimable)}</p>
          <p className="text-muted-foreground">From {reclaimableTransactions.length} international transactions.</p>
        </CardContent>
      </Card>

      <Card className="flex-grow flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Reclaimable Transactions</CardTitle>
          <CardDescription>International expenses with identified reclaimable VAT.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Total Amount (USD)</TableHead>
                  <TableHead className="text-right">Reclaimable VAT (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reclaimableTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{format(new Date(txn.date), "PPP")}</TableCell>
                    <TableCell className="font-medium">{txn.merchant}</TableCell>
                    <TableCell>{txn.country_code || 'N/A'}</TableCell>
                    <TableCell className="text-right">{currencyFormatter.format(txn.amount_usd || txn.amount)}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">{currencyFormatter.format(txn.vat_reclaimable_usd || 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
