"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, Sparkles, Home, Play } from "lucide-react";
import { useToggle } from "@/components/layout/toggle-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isDemo, handleToggle } = useToggle();
  
  const handleToggleWithAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Add a small delay for the animation to complete
    setTimeout(() => {
      handleToggle();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 text-slate-200">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            AT
          </span>
          <span className="text-lg">Agentic T&E</span>
        </Link>

        {/* Smooth Sliding Gradient Toggle */}
        <div className="hidden md:flex items-center">
          <div className="relative bg-slate-900/80 rounded-full p-1 border border-slate-700/60 backdrop-blur-sm">
            <button
              onClick={handleToggleWithAnimation}
              disabled={isAnimating}
              className="relative flex items-center"
            >
              {/* Sliding Background */}
              <div 
                className="absolute top-0 bottom-0 w-1/2 rounded-full transition-all duration-500 ease-out shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  transform: isDemo ? 'translateX(100%)' : 'translateX(0)',
                }}
              />
              
              {/* Home Option */}
              <div className={cn(
                "relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full min-w-[80px] justify-center transition-all duration-500 ease-out",
                !isDemo ? "text-white" : "text-slate-300 hover:text-white"
              )}>
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Home</span>
              </div>
              
              {/* Demo Option */}
              <div className={cn(
                "relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full min-w-[80px] justify-center transition-all duration-500 ease-out",
                isDemo ? "text-white" : "text-slate-300 hover:text-white"
              )}>
                <Play className="h-4 w-4" />
                <span className="text-sm font-medium">Demo</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] overflow-y-auto">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation menu with page toggle and links
              </SheetDescription>
              <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Agentic T&E
              </div>
              
              {/* Mobile Smooth Sliding Gradient Toggle */}
              <div className="mt-6">
                <div className="relative bg-slate-200/80 rounded-full p-1 border border-slate-300/60 backdrop-blur-sm">
                  <button
                    onClick={() => {
                      handleToggleWithAnimation();
                      setOpen(false);
                    }}
                    disabled={isAnimating}
                    className="relative flex items-center w-full"
                  >
                    {/* Sliding Background */}
                    <div 
                      className="absolute top-0 bottom-0 w-1/2 rounded-full transition-all duration-500 ease-out shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{
                        transform: isDemo ? 'translateX(100%)' : 'translateX(0)',
                      }}
                    />
                    
                    {/* Home Option */}
                    <div className={cn(
                      "relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full flex-1 justify-center min-w-[80px] transition-all duration-500 ease-out",
                      !isDemo ? "text-white" : "text-slate-600 hover:text-slate-800"
                    )}>
                      <Home className="h-4 w-4" />
                      <span className="text-sm font-medium">Home</span>
                    </div>
                    
                    {/* Demo Option */}
                    <div className={cn(
                      "relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full flex-1 justify-center min-w-[80px] transition-all duration-500 ease-out",
                      isDemo ? "text-white" : "text-slate-600 hover:text-slate-800"
                    )}>
                      <Play className="h-4 w-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </div>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;