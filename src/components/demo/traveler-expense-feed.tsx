"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface InAppNotification {
  id: string;
  title: React.ReactNode;
  description: string;
}

export function TravelerExpenseFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [receiptTxnId, setReceiptTxnId] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<InAppNotification | null>(null);

  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notificationTimer = useRef<NodeJS.Timeout>();

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
  
  useEffect(() => {
    if (notification) {
      notificationTimer.current = setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    return () => {
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, [notification]);

  const handleSimulateTransaction = () => {
    const newTransaction = allTransactions.find((t) => t.id === "txn_101");
    if (newTransaction && !transactions.find(t => t.id === "txn_101")) {
      setTransactions((prev) => [newTransaction, ...prev]);
      setNotification({
        id: newTransaction.id,
        title: (
          <div className="flex items-center gap-2 font-bold">
            <Receipt className="h-5 w-5" /> New Transaction
          </div>
        ),
        description: `The Capital Grille: $125.50. Tap to add receipt.`,
      });
    }
  };

  const handleReceiptNeededClick = (transactionId: string) => {
    setNotification(null);
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
    <div className="flex h-full flex-col bg-slate-100 relative overflow-hidden">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: "-150%" }}
              animate={{ y: 0 }}
              exit={{ y: "-150%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-4 left-4 right-4 z-10"
            >
              <div
                onClick={() => handleReceiptNeededClick(notification.id)}
                className="rounded-xl bg-background/80 backdrop-blur-md p-4 shadow-lg cursor-pointer border"
              >
                  <h4 className="text-sm text-primary">{notification.title}</h4>
                  <p className="text-sm text-foreground">{notification.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
