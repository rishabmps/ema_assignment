"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert } from "lucide-react";

interface ExceptionDetailCardProps {
  title: string;
  details: string;
  type: "policy" | "fraud";
  reference?: string;
}

export function ExceptionDetailCard({
  title,
  details,
  type,
  reference,
}: ExceptionDetailCardProps) {
  const Icon = type === "policy" ? AlertTriangle : ShieldAlert;

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <Icon className="h-6 w-6 text-destructive" />
        <CardTitle className="text-lg font-semibold text-destructive">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground">{details}</p>
        {reference && (
          <p className="mt-2 text-xs text-muted-foreground">
            Reference: <code className="rounded bg-muted px-1 py-0.5 font-mono">{reference}</code>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
