
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionCard } from "@/components/features/traveler/transaction-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/types";
import allTransactions from "@/lib/data/transactions.json";
import { Camera, Receipt, Settings, Bell, PlusCircle, Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AgentActivityPanel, useAgentActivity } from "@/components/features/agent-activity";

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
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notificationTimer = useRef<NodeJS.Timeout>();
  
  const { 
    activities, 
    simulateExpenseFlow, 
    simulateExceptionFlow, 
    clearActivities 
  } = useAgentActivity();

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

    // Find the transaction details for agent simulation
    const transaction = transactions.find(t => t.id === receiptTxnId);
    if (transaction) {
      // Simulate agent activity for expense processing
      simulateExpenseFlow(transaction.amount, transaction.merchant);
      // Also show the agent panel
      setShowAgentPanel(true);
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
    }, 5000);
  };
  
  const handleToggleExpand = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction?.status === 'Needs Receipt') {
      handleReceiptNeededClick(transactionId);
    } else {
      setExpandedId(currentId => currentId === transactionId ? null : transactionId);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-4 w-12 h-12 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <header className="p-4 bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm relative z-10">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-blue-100">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">SC</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold text-slate-800">Sarah Chen</p>
                    <p className="text-xs text-slate-500 font-medium">Sales Director</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-slate-100/80 transition-colors relative"
                  onClick={() => setShowAgentPanel(true)}
                >
                  <Bot className="h-5 w-5 text-slate-600" />
                  {activities.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100/80 transition-colors">
                  <Bell className="h-5 w-5 text-slate-600" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100/80 transition-colors">
                  <Settings className="h-5 w-5 text-slate-600" />
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
            className="absolute top-20 left-4 right-4 z-20"
          >
            <div
              onClick={() => handleReceiptNeededClick(notification.id)}
              className="rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-xl cursor-pointer border border-blue-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
                <h4 className="text-sm text-blue-600 font-semibold">{notification.title}</h4>
                <p className="text-sm text-slate-700 font-medium">{notification.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 flex-shrink-0 relative z-10">
        <Button 
          onClick={handleSimulateTransaction} 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Simulate Client Lunch Purchase
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 pt-0 pb-4 relative z-10">
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
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-slate-800 font-bold">Capture Receipt</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <div className="absolute inset-4 border-4 border-dashed border-white/70 rounded-xl" />
                <div className="absolute top-4 left-4 right-4 bottom-4 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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

      {/* Agent Activity Panel */}
      <AgentActivityPanel
        activities={activities}
        isOpen={showAgentPanel}
        onClose={() => setShowAgentPanel(false)}
        title="Agent Activity"
        flow="expense"
        isMobile={true}
        compact={true}
      />
    </div>
  );
}
