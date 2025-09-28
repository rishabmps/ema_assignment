"use client";

import { useToast } from "./toast-context";
import { MobileToast } from "./mobile-toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
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
}
