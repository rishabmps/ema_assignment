"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ToggleContextType {
  isDemo: boolean;
  setIsDemo: (value: boolean) => void;
  handleToggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export function ToggleProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);

  const handleToggle = () => {
    setIsDemo(!isDemo);
  };

  return (
    <ToggleContext.Provider value={{ isDemo, setIsDemo, handleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
}
