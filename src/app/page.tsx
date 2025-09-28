"use client";

import MarketingPage from "@/components/views/marketing-page";
import MainDashboard from "@/components/views/main-dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "@/components/layout/toggle-context";
import { memo, useState, useEffect } from "react";

const Home = memo(function Home() {
  const { isDemo } = useToggle();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [isDemo]);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background overlay to prevent white flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />
      
      <AnimatePresence mode="popLayout">
        {!isDemo ? (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: -20,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            className="w-full relative z-10"
          >
            <MarketingPage />
          </motion.div>
        ) : (
          <motion.div
            key="demo"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: -20,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            className="min-h-screen w-full relative z-10"
          >
            <section className="mx-auto max-w-7xl px-6 pt-8 pb-24">
              <MainDashboard />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Transition overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white z-20 pointer-events-none"
        />
      )}
    </main>
  );
});

export default Home;
