"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Calendar, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./toast-context";

interface MobileToastProps {
  title: string;
  description: string;
  type?: "success" | "info" | "calendar" | "itinerary";
  duration?: number;
  id?: string;
  onRemove?: (id: string) => void;
}

export function MobileToast({ title, description, type = "success", duration = 3000, id, onRemove }: MobileToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Remove from parent array after animation completes
      if (id && onRemove) {
        setTimeout(() => onRemove(id), 300); // Wait for exit animation
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onRemove]);

  const getIcon = () => {
    switch (type) {
      case "calendar":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "itinerary":
        return <FileText className="h-5 w-5 text-green-600" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "calendar":
        return "text-blue-600";
      case "itinerary":
        return "text-green-600";
      case "success":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-20 left-4 right-4 z-50"
        >
          <div className="rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 pointer-events-auto">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${getTitleColor()} leading-tight`}>
                  {title}
                </h4>
                <p className="text-sm text-slate-700 font-medium mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('X button clicked, removing toast:', id);
                  setIsVisible(false);
                  if (id && onRemove) {
                    setTimeout(() => onRemove(id), 300); // Wait for exit animation
                  }
                }}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing mobile toasts
export function useMobileToast() {
  const { showToast, removeToast, clearAllToasts, toasts } = useToast();

  const ToastContainer = () => (
    <div className="absolute inset-0 pointer-events-none z-50">
      {toasts.map((toast) => (
        <MobileToast
          key={toast.id}
          {...toast}
          duration={toast.duration || 3000}
          onRemove={removeToast}
        />
      ))}
    </div>
  );

  return { showToast, removeToast, clearAllToasts, ToastContainer };
}
