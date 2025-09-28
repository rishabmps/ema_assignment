"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "confirm" | "success";
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function DemoModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel"
}: DemoModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full mx-4 transform transition-all duration-200 scale-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-slate-600 mb-6 leading-relaxed">{message}</p>
          
          <div className="flex justify-end gap-3">
            {type === "confirm" && (
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-4 py-2"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={type === "confirm" ? handleConfirm : handleCancel}
              className={`px-4 py-2 ${
                type === "success" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : type === "confirm"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
