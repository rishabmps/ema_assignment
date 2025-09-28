
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionCard } from "@/components/features/traveler/transaction-card";
import { Button } from "@/components/ui/button";
import { useMobileToast } from "@/components/ui/mobile-toast";
import type { Transaction } from "@/types";
import allTransactions from "@/lib/data/transactions.json";
import { Camera, Receipt, Settings, Bell, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InlineAgentActivity, useAgentActivity } from "@/components/features/agent-activity";
import { useDemoAgentContext } from "@/components/features/agent-activity/demo-agent-context";

interface InAppNotification {
  id: string;
  title: React.ReactNode;
  description: string;
}

interface TravelerExpenseFeedProps {
  hideInlineAgentActivity?: boolean;
}

const allowedStatuses = ["Needs Receipt", "Cleared", "Exception", "Processing"] as const;
type AllowedStatus = (typeof allowedStatuses)[number];

const isAllowedStatus = (status: string): status is AllowedStatus =>
  (allowedStatuses as readonly string[]).includes(status);

export function TravelerExpenseFeed({ hideInlineAgentActivity = false }: TravelerExpenseFeedProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [receiptTxnId, setReceiptTxnId] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<InAppNotification | null>(null);

  const { showToast, removeToast, clearAllToasts } = useMobileToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notificationTimer = useRef<NodeJS.Timeout>();
  
  const { 
    activities, 
    simulateExpenseFlow: simulateExpenseFlowLocal
  } = useAgentActivity();

  const { triggerTransactionReaction, clearTransactionReaction, completeAgentProcessing } = useDemoAgentContext();

  useEffect(() => {
    const initialTransactions = allTransactions
      .filter((t) => !t.id.startsWith("txn_101"))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((t) => ({
        ...t,
        status: isAllowedStatus(t.status) ? t.status : "Needs Receipt"
      }) as Transaction);
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
      setTransactions((prev) => [
        {
          ...newTransaction,
          status: isAllowedStatus(newTransaction.status) ? newTransaction.status : "Needs Receipt"
        } as Transaction,
        ...prev
      ]);
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
    
    // Prevent multiple camera sessions for the same transaction
    if (receiptTxnId === transactionId && showCamera) {
      return;
    }
    
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
    
    // Show toast - duplicate prevention is handled globally in useMobileToast
    showToast({
      title: "Receipt Uploaded",
      description: "Receipt Concierge is analyzing it...",
      type: "success",
      duration: 2000,
    });

    // Find the transaction details for agent simulation
    const transaction = transactions.find(t => t.id === receiptTxnId);
    if (transaction) {
      // Trigger contextual agent reaction with actual transaction data
      triggerTransactionReaction('expense', {
        amount: transaction.amount,
        merchant: transaction.merchant,
        category: transaction.category,
        date: transaction.date
      });
    }

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
      
      // Complete agent processing when transaction is cleared
      const transaction = transactions.find(t => t.id === receiptTxnId);
      if (transaction) {
        completeAgentProcessing('expense', {
          amount: transaction.amount,
          merchant: transaction.merchant,
          category: transaction.category,
          date: transaction.date
        });
      }
    }, 5000);
  };
  
  const handleToggleExpand = (transactionId: string) => {
    // Always just toggle expand/collapse, don't trigger receipt upload
    setExpandedId(currentId => currentId === transactionId ? null : transactionId);
    
    // Clear any existing notifications when toggling expand/collapse
    if (notification) {
      setNotification(null);
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    }
    
    // Clear all toast notifications
    clearAllToasts();
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-4 w-12 h-12 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <header className="px-3 py-2 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm relative z-10">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Avatar className="ring-2 ring-blue-100 h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-xs">SC</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold text-slate-800">Sarah Chen</p>
                    <p className="text-xs text-slate-500 font-medium">Sales Director</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-100/80 transition-colors">
                  <Bell className="h-3 w-3 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-100/80 transition-colors">
                  <Settings className="h-3 w-3 text-slate-600" />
                </Button>
            </div>
        </div>
      </header>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-16 left-3 right-3 z-20"
          >
            <div
              onClick={() => handleReceiptNeededClick(notification.id)}
              className="rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-lg cursor-pointer border border-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
                <h4 className="text-sm text-blue-600 font-semibold">{notification.title}</h4>
                <p className="text-xs text-slate-700 font-medium mt-1">{notification.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-3 py-1.5 flex-shrink-0 relative z-10">
        <Button 
          onClick={handleSimulateTransaction} 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-xs"
        >
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
          Simulate Client Lunch Purchase
        </Button>
      </div>

      {/* Inline Agent Activity - only show if not in full device view */}
      {activities.length > 0 && !hideInlineAgentActivity && (
        <div className="px-3 pb-2">
          <InlineAgentActivity 
            activities={activities} 
            compact={true}
          />
        </div>
      )}

      <div className="flex-1 space-y-1.5 overflow-y-auto px-3 pt-0 pb-3 relative z-10">
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
        <DialogContent className="max-w-sm p-0 bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-2xl">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-slate-800 font-bold text-base">Capture Receipt</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-3">
            <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-inner">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <div className="absolute inset-3 border-2 border-dashed border-white/70 rounded-lg" />
                <div className="absolute top-3 left-3 right-3 bottom-3 rounded-lg bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertTitle className="text-red-800 font-semibold">Camera Access Denied</AlertTitle>
                    <AlertDescription className="text-red-700">
                        Please enable camera permissions in your browser settings.
                    </AlertDescription>
                </Alert>
            )}
            <Button 
              onClick={handleCaptureReceipt} 
              disabled={!hasCameraPermission} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Camera className="mr-2 h-5 w-5" />
              Capture Receipt
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
