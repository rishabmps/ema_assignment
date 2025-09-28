"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface MobileToastProps {
  title: string;
  description: string;
  type?: "success" | "info" | "calendar" | "itinerary";
  duration?: number;
  id?: string;
  onRemove?: (id: string) => void;
}

interface ToastContextType {
  showToast: (toast: Omit<MobileToastProps, 'id' | 'onRemove'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  toasts: Array<MobileToastProps & { id: string }>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<MobileToastProps & { id: string }>>([]);
  const [lastToastTime, setLastToastTime] = useState<number>(0);
  const [lastToastContent, setLastToastContent] = useState<string>('');

  const showToast = useCallback((toast: Omit<MobileToastProps, 'id' | 'onRemove'>) => {
    const now = Date.now();
    const toastContent = `${toast.title}-${toast.description}`;
    
    // Prevent duplicate toasts within 5 seconds with same content
    if (now - lastToastTime < 5000 && lastToastContent === toastContent) {
      console.log('🚫 Preventing duplicate toast:', toastContent);
      return;
    }
    
    console.log('🔔 showToast called:', {
      title: toast.title,
      description: toast.description,
      timestamp: new Date().toISOString()
    });
    
    setLastToastTime(now);
    setLastToastContent(toastContent);
    
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Use functional update with duplicate prevention
    setToasts(prev => {
      // Check if a toast with the same content already exists
      const existingToast = prev.find(t => 
        t.title === toast.title && t.description === toast.description
      );
      
      if (existingToast) {
        console.log('🚫 Preventing duplicate toast in array:', toastContent);
        return prev; // Return existing array without changes
      }
      
      const newToasts = [...prev, { ...toast, id }];
      console.log('📊 Toast array updated:', {
        totalToasts: newToasts.length,
        toastIds: newToasts.map(t => t.id),
        currentToast: { id, title: toast.title }
      });
      return newToasts;
    });
  }, [lastToastTime, lastToastContent]);

  const removeToast = useCallback((id: string) => {
    console.log('🗑️ Removing toast:', id);
    setToasts(prev => {
      // Check if toast still exists before removing
      const toastExists = prev.some(toast => toast.id === id);
      if (!toastExists) {
        console.log('🚫 Toast already removed:', id);
        return prev; // Return existing array without changes
      }
      
      const newToasts = prev.filter(toast => toast.id !== id);
      console.log('📊 Toast array after removal:', {
        totalToasts: newToasts.length,
        remainingIds: newToasts.map(t => t.id)
      });
      return newToasts;
    });
  }, []);

  const clearAllToasts = useCallback(() => {
    console.log('🧹 Clearing all toasts');
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, clearAllToasts, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
