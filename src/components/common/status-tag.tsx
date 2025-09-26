"use client";

import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types";
import { cn } from "@/lib/utils";

type Status = Transaction['status'];

interface StatusTagProps {
  status: Status;
  className?: string;
}

export function StatusTag({ status, className }: StatusTagProps) {
  const statusConfig = {
    "Cleared": "bg-success hover:bg-success text-success-foreground",
    "Needs Receipt": "bg-warning hover:bg-warning text-warning-foreground",
    "Processing": "bg-warning/80 hover:bg-warning/80 text-warning-foreground",
    "Exception": "bg-destructive hover:bg-destructive text-destructive-foreground",
  };

  return (
    <Badge
      className={cn(
        "rounded-md",
        statusConfig[status],
        className
      )}
    >
      {status}
    </Badge>
  );
}
