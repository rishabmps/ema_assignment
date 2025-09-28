
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
              <HandCoins className="h-4 w-4 text-primary"/>
              Total Identified
          </CardTitle>
          <CardDescription className="text-slate-600 text-xs">Value-Added Tax identified for reclaim by the Tax & Compliance Bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-slate-800">{currencyFormatter.format(totalReclaimable)}</p>
          <p className="text-xs text-slate-600 font-medium">From {reclaimableTransactions.length} international transactions.</p>
          <Button size="sm" className="mt-3">
            <FileUp className="mr-1 h-3 w-3" />
            Export for Filing
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-sm text-slate-800">Reclaimable Transactions</CardTitle>
          <CardDescription className="text-xs text-slate-600">International expenses with identified reclaimable VAT.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Merchant</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-700">Country</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700">Total Amount (USD)</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-700">Reclaimable VAT (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reclaimableTransactions.map((txn) => (
                  <TableRow key={txn.id} className="transition-all duration-200 hover:bg-slate-50/80">
                    <TableCell className="text-xs py-3 text-slate-700">{format(new Date(txn.date), "MMM dd")}</TableCell>
                    <TableCell className="font-medium text-xs py-3 text-slate-800">{txn.merchant}</TableCell>
                    <TableCell className="text-xs py-3 text-slate-700">{txn.country_code || 'N/A'}</TableCell>
                    <TableCell className="text-right text-xs py-3 font-medium text-slate-800">{currencyFormatter.format(txn.amount_usd || txn.amount)}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600 text-xs py-3">{currencyFormatter.format(txn.vat_reclaimable_usd || 0)}</TableCell>
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
