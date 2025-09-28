
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
    <div className="w-full space-y-4 p-4 md:p-6 bg-slate-50 min-h-full">
      <header className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-1 -ml-4 text-sm">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold text-foreground">Automated VAT Reclaim</h1>
          <p className="text-sm text-muted-foreground">Value-Added Tax identified for reclaim by the Tax & Compliance Bot.</p>
        </div>
        <Button size="sm">
          <FileUp className="mr-1 h-3 w-3" />
          Export for Filing
        </Button>
      </header>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
              <HandCoins className="h-4 w-4 text-primary"/>
              Total Identified
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{currencyFormatter.format(totalReclaimable)}</p>
          <p className="text-xs text-muted-foreground">From {reclaimableTransactions.length} international transactions.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Reclaimable Transactions</CardTitle>
          <CardDescription className="text-xs">International expenses with identified reclaimable VAT.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 max-h-72 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <TableRow>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Merchant</TableHead>
                  <TableHead className="text-xs">Country</TableHead>
                  <TableHead className="text-right text-xs">Total Amount (USD)</TableHead>
                  <TableHead className="text-right text-xs">Reclaimable VAT (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reclaimableTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="text-xs py-2">{format(new Date(txn.date), "MMM dd")}</TableCell>
                    <TableCell className="font-medium text-xs py-2">{txn.merchant}</TableCell>
                    <TableCell className="text-xs py-2">{txn.country_code || 'N/A'}</TableCell>
                    <TableCell className="text-right text-xs py-2">{currencyFormatter.format(txn.amount_usd || txn.amount)}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600 text-xs py-2">{currencyFormatter.format(txn.vat_reclaimable_usd || 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
