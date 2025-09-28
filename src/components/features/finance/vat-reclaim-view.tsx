
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-900 font-semibold">
              <HandCoins className="h-6 w-6 text-emerald-600"/>
              Total Identified
          </CardTitle>
          <CardDescription className="text-slate-600 text-base leading-relaxed">Value-Added Tax identified for reclaim by the Tax & Compliance Bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-slate-900 mb-3">{currencyFormatter.format(totalReclaimable)}</p>
          <p className="text-base text-slate-600 font-medium mb-6">From {reclaimableTransactions.length} international transactions.</p>
          <Button size="lg" className="font-semibold text-base h-12 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg transition-all duration-200">
            <FileUp className="mr-2 h-5 w-5" />
            Export for Filing
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg flex flex-col">
        <CardHeader className="flex-shrink-0 pb-6">
          <CardTitle className="text-lg text-slate-900 font-semibold">Reclaimable Transactions</CardTitle>
          <CardDescription className="text-base text-slate-600 leading-relaxed">International expenses with identified reclaimable VAT.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-base font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="text-base font-semibold text-slate-700">Merchant</TableHead>
                  <TableHead className="text-base font-semibold text-slate-700">Country</TableHead>
                  <TableHead className="text-right text-base font-semibold text-slate-700">Total Amount (USD)</TableHead>
                  <TableHead className="text-right text-base font-semibold text-slate-700">Reclaimable VAT (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reclaimableTransactions.map((txn) => (
                  <TableRow key={txn.id} className="transition-all duration-200 hover:bg-slate-50/80">
                    <TableCell className="text-base py-5 text-slate-700 font-medium">{format(new Date(txn.date), "MMM dd")}</TableCell>
                    <TableCell className="font-semibold text-base py-5 text-slate-800">{txn.merchant}</TableCell>
                    <TableCell className="text-base py-5 text-slate-700 font-medium">{txn.country_code || 'N/A'}</TableCell>
                    <TableCell className="text-right text-base py-5 font-semibold text-slate-800">{currencyFormatter.format(txn.amount_usd || txn.amount)}</TableCell>
                    <TableCell className="text-right font-bold text-emerald-600 text-lg py-5">{currencyFormatter.format(txn.vat_reclaimable_usd || 0)}</TableCell>
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
