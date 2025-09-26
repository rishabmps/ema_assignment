"use client";

import { useState, useEffect, useRef } from "react";
import { TransactionCard } from "@/components/demo/transaction-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/types";
import allTransactions from "@/lib/data/transactions.json";
import { Camera, Receipt, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function TravelerExpenseFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [receiptTxnId, setReceiptTxnId] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initialTransactions = allTransactions
      .filter((t) => !t.id.startsWith("txn_101"))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(initialTransactions);
  }, []);

  useEffect(() => {
    if (!showCamera) {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
    
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    }
  }, [showCamera]);

  const handleSimulateTransaction = () => {
    const newTransaction = allTransactions.find((t) => t.id === "txn_101");
    if (newTransaction) {
      setTransactions((prev) => [newTransaction, ...prev]);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" /> New Transaction
          </div>
        ),
        description: `The Capital Grille: $125.50. Tap to add receipt.`,
        duration: 5000,
      });
    }
  };

  const handleReceiptNeededClick = (transactionId: string) => {
    setReceiptTxnId(transactionId);
    setShowCamera(true);
  };
  
  const handleCaptureReceipt = () => {
    if (!videoRef.current || !canvasRef.current || !receiptTxnId) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    // Simulate processing the captured image
    setShowCamera(false);
    
    toast({
      title: "Receipt Uploaded",
      description: "Receipt Concierge is analyzing it...",
      duration: 2000,
    });

    setTransactions((prev) =>
      prev.map((t) => (t.id === receiptTxnId ? { ...t, status: "Processing" } : t))
    );
    
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === receiptTxnId) {
            return {
              ...t,
              timeline: [
                ...t.timeline,
                { time: new Date().toISOString(), status: "Receipt image received." },
                {
                  time: new Date(Date.now() + 2000).toISOString(),
                  agent: "Receipt Concierge",
                  status: "Matched receipt and extracted merchant, date, and amount.",
                },
              ],
            };
          }
          return t;
        })
      );
    }, 1000);

    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === receiptTxnId) {
            return {
              ...t,
              timeline: [
                ...t.timeline,
                {
                  time: new Date(Date.now() + 4000).toISOString(),
                  agent: "Policy Engine",
                  status: "Verified the expense is within the 'Client Meal' limit.",
                },
              ],
            };
          }
          return t;
        })
      );
    }, 3000);

    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === receiptTxnId && t.status === "Processing") {
            return {
              ...t,
              status: "Cleared",
              timeline: [
                ...t.timeline,
                {
                  time: new Date(Date.now() + 6000).toISOString(),
                  status: "Expense cleared for ERP posting. No further action needed.",
                },
              ],
            };
          }
          return t;
        })
      );
      setReceiptTxnId(null);
    }, 5000);
  };
  
  const handleToggleExpand = (transactionId: string) => {
    if (transactions.find(t => t.id === transactionId && t.status === 'Needs Receipt')) {
      handleReceiptNeededClick(transactionId);
    } else {
      setExpandedId(currentId => currentId === transactionId ? null : transactionId);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <Button onClick={handleSimulateTransaction} className="w-full">
          Simulate Client Lunch Purchase
        </Button>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4 pt-0">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onToggleExpand={handleToggleExpand}
            isExpanded={expandedId === transaction.id}
          />
        ))}
      </div>

      <Dialog open={showCamera} onOpenChange={setShowCamera}>
        <DialogContent className="max-w-sm p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Capture Receipt</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-md" />
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>
                        Please enable camera permissions in your browser settings.
                    </AlertDescription>
                </Alert>
            )}
            <Button onClick={handleCaptureReceipt} disabled={!hasCameraPermission} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
