
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Receipt, Shield, MapPin, FileCheck, Calculator, Trees, Sparkles, CheckCircle2, Zap, CreditCard, Database, Cloud, Users, TrendingUp, Clock, DollarSign, Smartphone, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToggle } from "@/components/layout/toggle-context";
import { SpotifyLogo, AirbnbLogo, ShopifyLogo } from "@/components/ui/company-logos";
import { InfiniteLogoCarousel } from "@/components/features/infinite-logo-carousel";
import { Suspense, useState, useEffect, useCallback, useRef, memo } from "react";
import { ANIMATION_CONFIGS, HOVER_ANIMATIONS, LOADING_ANIMATIONS } from "@/lib/animations";
import { performanceUtils } from "@/lib/performance";

const metrics = [
  { value: "95%", label: "expenses automated", icon: TrendingUp },
  { value: "6", label: "AI agents working", icon: Users },
  { value: "90%", label: "faster processing", icon: Clock },
];

// Company data for logo carousels
const erpCompanies = [
  { name: "SAP", domain: "sap.com", color: "text-blue-600", hoverColor: "text-blue-300" },
  { name: "Oracle", domain: "oracle.com", color: "text-blue-600", hoverColor: "text-blue-300" },
  { name: "NetSuite", domain: "netsuite.com", color: "text-blue-600", hoverColor: "text-blue-300" },
  { name: "Workday", domain: "workday.com", color: "text-blue-600", hoverColor: "text-blue-300" },
  { name: "Microsoft Dynamics", domain: "microsoft.com", color: "text-blue-600", hoverColor: "text-blue-300" },
  { name: "Infor", domain: "infor.com", color: "text-blue-600", hoverColor: "text-blue-300" }
];

const travelCompanies = [
  { name: "Amadeus", domain: "amadeus.com", color: "text-emerald-600", hoverColor: "text-emerald-300" },
  { name: "Sabre", domain: "sabre.com", color: "text-emerald-600", hoverColor: "text-emerald-300" },
  { name: "Travelport", domain: "travelport.com", color: "text-emerald-600", hoverColor: "text-emerald-300" },
  { name: "Expedia", domain: "expedia.com", color: "text-emerald-600", hoverColor: "text-emerald-300" },
  { name: "Booking.com", domain: "booking.com", color: "text-emerald-600", hoverColor: "text-emerald-300" },
  { name: "TripActions", domain: "tripactions.com", color: "text-emerald-600", hoverColor: "text-emerald-300" }
];

const paymentCompanies = [
  { name: "Stripe", domain: "stripe.com", color: "text-purple-600", hoverColor: "text-purple-300" },
  { name: "PayPal", domain: "paypal.com", color: "text-purple-600", hoverColor: "text-purple-300" },
  { name: "Chase", domain: "chase.com", color: "text-purple-600", hoverColor: "text-purple-300" },
  { name: "Amex", domain: "americanexpress.com", color: "text-purple-600", hoverColor: "text-purple-300" },
  { name: "Visa", domain: "visa.com", color: "text-purple-600", hoverColor: "text-purple-300" },
  { name: "Mastercard", domain: "mastercard.com", color: "text-purple-600", hoverColor: "text-purple-300" }
];

const cloudCompanies = [
  { name: "AWS", domain: "amazon.com", color: "text-orange-600", hoverColor: "text-orange-300" },
  { name: "Azure", domain: "microsoft.com", color: "text-orange-600", hoverColor: "text-orange-300" },
  { name: "Google Cloud", domain: "google.com", color: "text-orange-600", hoverColor: "text-orange-300" },
  { name: "Salesforce", domain: "salesforce.com", color: "text-orange-600", hoverColor: "text-orange-300" },
  { name: "Slack", domain: "slack.com", color: "text-orange-600", hoverColor: "text-orange-300" },
  { name: "Microsoft 365", domain: "microsoft.com", color: "text-orange-600", hoverColor: "text-orange-300" }
];

// Agent showcase data
const agentShowcase = [
  {
    name: "Receipt Concierge",
    description: "Captures & matches receipts instantly",
    icon: Receipt,
    color: "from-purple-500 to-purple-600",
    demo: "Eliminates manual data entry forever"
  },
  {
    name: "Policy Engine", 
    description: "Enforces compliance in real-time",
    icon: FileCheck,
    color: "from-blue-500 to-blue-600",
    demo: "Prevents costly violations automatically"
  },
  {
    name: "Fraud Sentinel",
    description: "Detects suspicious patterns instantly",
    icon: Shield,
    color: "from-red-500 to-red-600", 
    demo: "Protects your organization 24/7"
  },
  {
    name: "Booking Orchestrator",
    description: "Manages travel seamlessly",
    icon: MapPin,
    color: "from-teal-500 to-teal-600",
    demo: "Ensures policy-compliant bookings"
  },
  {
    name: "Budget Copilot",
    description: "Optimizes spend allocation",
    icon: Calculator,
    color: "from-emerald-500 to-emerald-600",
    demo: "Maximizes ROI on every dollar"
  },
  {
    name: "CO2 Advisor",
    description: "Promotes sustainable choices", 
    icon: Trees,
    color: "from-green-500 to-green-600",
    demo: "Reduces environmental impact"
  }
];

// Demo content components - memoized for performance
const ReceiptUploadDemo = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="text-center"
  >
    <div className="relative w-40 h-24 mx-auto mb-4">
      {/* Multi-receipt upload simulation */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Receipt className="h-8 w-8 text-slate-600" />
      </motion.div>
      
      {/* Floating additional receipts */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-8 bg-emerald-100 rounded shadow-sm flex items-center justify-center"
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <Cloud className="h-3 w-3 text-emerald-600" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-5 h-7 bg-blue-100 rounded shadow-sm flex items-center justify-center"
        animate={{ 
          y: [0, -3, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
      >
        <Smartphone className="h-2 w-2 text-blue-600" />
      </motion.div>
    </div>
    
    <div className="space-y-2">
      <motion.div
        className="h-2 bg-emerald-400 rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <p className="text-emerald-400 text-sm font-medium">$2,847 expense captured</p>
      <p className="text-slate-400 text-xs">Client dinner • 4 receipts • Policy compliant</p>
      <motion.div
        className="flex justify-center space-x-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
      </motion.div>
    </div>
  </motion.div>
));

const AIProcessingDemo = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="text-center"
  >
    <div className="relative w-40 h-24 mx-auto mb-4">
      {/* AI Brain with multiple processing indicators */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FileCheck className="h-8 w-8 text-white" />
      </motion.div>
      
      {/* Policy validation indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Shield className="h-3 w-3 text-white" />
      </motion.div>
      
      {/* Fraud detection indicator */}
      <motion.div
        className="absolute -bottom-2 -left-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
      >
        <CheckCircle2 className="h-2 w-2 text-white" />
      </motion.div>
      
      {/* Data extraction indicator */}
      <motion.div
        className="absolute top-1 -left-3 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
      >
        <Server className="h-2 w-2 text-white" />
      </motion.div>
    </div>
    
    <div className="space-y-2">
      <motion.div
        className="h-2 bg-blue-400 rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <p className="text-blue-400 text-sm font-medium">AI validated & approved</p>
      <p className="text-slate-400 text-xs">Policy check ✓ Fraud scan ✓ Data extracted ✓</p>
      <motion.div
        className="flex justify-center space-x-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-xs text-emerald-400 font-medium">$2,847</div>
        <div className="text-xs text-slate-400">→</div>
        <div className="text-xs text-blue-400 font-medium">Approved</div>
      </motion.div>
    </div>
  </motion.div>
));

const AutoApprovalDemo = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="text-center"
  >
    <div className="relative w-40 h-24 mx-auto mb-4">
      {/* Success indicator with business impact */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center"
        animate={{ 
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 10px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CheckCircle2 className="h-8 w-8 text-white" />
      </motion.div>
      
      {/* ERP integration indicator */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Database className="h-2 w-2 text-emerald-500" />
      </motion.div>
      
      {/* Notification sent indicator */}
      <motion.div
        className="absolute -bottom-1 -left-1 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <CreditCard className="h-2 w-2 text-white" />
      </motion.div>
      
      {/* Time saved indicator */}
      <motion.div
        className="absolute top-1 -left-3 w-6 h-4 bg-purple-400 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
      >
        <div className="text-xs text-white font-bold">2.3s</div>
      </motion.div>
    </div>
    
    <div className="space-y-2">
      <motion.div
        className="h-2 bg-purple-400 rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <p className="text-purple-400 text-sm font-medium">Posted to ERP & reimbursed</p>
      <p className="text-slate-400 text-xs">SAP updated • Employee notified • Payment queued</p>
      <motion.div
        className="flex justify-center space-x-3 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-xs text-emerald-400 font-medium">✓ ERP</div>
        <div className="text-xs text-blue-400 font-medium">✓ Notify</div>
        <div className="text-xs text-purple-400 font-medium">✓ Pay</div>
      </motion.div>
    </div>
  </motion.div>
));

// Move demoSteps outside component to prevent recreation
const DEMO_STEPS = ['receipt', 'ai', 'approval'] as const;

export function MarketingPage() {
  const { setIsDemo } = useToggle();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-animation effect
  useEffect(() => {
    if (!isAutoAnimating || !isPlaying) return;

    // Set initial step immediately
    setCurrentStepIndex(0);
    setActiveDemo(DEMO_STEPS[0]);

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const nextIndex = (prev + 1) % DEMO_STEPS.length;
        setActiveDemo(DEMO_STEPS[nextIndex]);
        return nextIndex;
      });
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoAnimating, isPlaying]);

  // Scroll tracking effect - optimized with throttling
  useEffect(() => {
    const handleScroll = performanceUtils.throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ['hero', 'demo', 'agents', 'roi', 'testimonials', 'comparison', 'partners', 'cta'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollTop + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = useCallback(() => {
    setIsDemo(true);
  }, [setIsDemo]);

  const handleStepClick = useCallback((step: string) => {
    setIsAutoAnimating(false); // Stop auto-animation when user clicks
    setActiveDemo(step);
  }, []);

  const resetAutoAnimation = useCallback(() => {
    setIsAutoAnimating(false);
    // Small delay to ensure state is reset
    setTimeout(() => {
      setIsAutoAnimating(true);
      setCurrentStepIndex(0);
      setActiveDemo(DEMO_STEPS[0]);
    }, 100);
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
      <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-blue-500/20 rounded-full"
            animate={{
              y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
            duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
          className="absolute top-40 right-20 w-16 h-16 border border-purple-500/20 rounded-lg"
            animate={{
            y: [0, 15, 0],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 border border-emerald-500/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-60 right-1/3 w-8 h-8 border border-yellow-500/20 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        
        {/* Particle effects */}
        {isClient && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            delay: 3
            }}
          />
        </div>

      {/* Sticky Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Agentic T&E</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'demo', label: 'Demo' },
                { id: 'agents', label: 'Agents' },
                { id: 'roi', label: 'ROI' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'cta', label: 'Get Started' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              onClick={handleDemoClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Persistent Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <button
          onClick={handleDemoClick}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-sm sm:text-base">Watch Demo</span>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollProgress > 20 ? 1 : 0, 
          scale: scrollProgress > 20 ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-12 h-12 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="h-5 w-5 text-white rotate-[-90deg] group-hover:text-blue-400 transition-colors" />
        </motion.div>
      </motion.button>
      {/* Hero Section - Agent Focused */}
      <header id="hero" className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-12 px-4 sm:px-6 pb-16 sm:pb-20 pt-16 sm:pt-20 text-center">
        <motion.div 
          {...ANIMATION_CONFIGS.fadeInUp}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border border-blue-400/20">
            🚀 Trusted by 500+ Finance Teams • 95% Automation Rate
          </Badge>
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white">
            Stop losing{" "}
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              $2.4M annually
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-200 mb-6">
            on manual expense processing
          </h2>
          <p className="max-w-3xl text-base sm:text-lg lg:text-xl text-slate-300 px-4 sm:px-0 mb-4">
            Our AI workforce processes 50,000+ expenses monthly, cuts month-end close from 5 days to 18 hours, and prevents $2.3M+ in policy violations—all while your team sleeps.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>95% automation rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>500+ finance teams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>340% ROI in first year</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-slate-900 hover:bg-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden" 
              onClick={handleDemoClick}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="flex items-center gap-2 relative z-10">
                <motion.span
                  animate={{ rotate: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.span>
              Watch agents in action
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
              <ChevronRight className="h-5 w-5" />
                </motion.div>
            </span>
          </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
          <Link
            href="mailto:hello@agenticte.com?subject=Product%20session"
              className="inline-flex items-center gap-2 text-base font-medium text-blue-200 transition-all duration-300 hover:text-white hover:bg-blue-500/10 px-4 py-2 rounded-lg group"
          >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
            Talk with a specialist
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4 group-hover:text-blue-300" />
              </motion.div>
          </Link>
          </motion.div>
        </motion.div>

        <motion.dl 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 text-center backdrop-blur-sm"
            >
              <div className="flex justify-center mb-3">
                <metric.icon className="h-6 w-6 text-emerald-400" />
                  </div>
              <dt className="text-3xl font-bold text-white">{metric.value}</dt>
              <dd className="mt-2 text-sm uppercase tracking-wide text-slate-400">{metric.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </header>

      {/* Interactive Feature Showcase */}
      <section id="demo" className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4 sm:px-0">
            Watch how our AI agents transform expense management in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-8 backdrop-blur-sm mb-16"
        >
            <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                
                {/* Progress indicator and controls */}
                <div className="ml-auto flex items-center gap-3">
                  <div className="flex gap-1">
                    {DEMO_STEPS.map((step, index) => (
                      <motion.div
                        key={step}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentStepIndex ? 'bg-blue-400' : 'bg-slate-600'
                        }`}
                        animate={{
                          scale: index === currentStepIndex ? [1, 1.2, 1] : 1,
                          opacity: index === currentStepIndex ? [1, 0.7, 1] : 0.5
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ))}
                  </div>
                  
                  {/* Play/Pause controls */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                        </motion.div>
                      ) : (
                        <div className="w-0 h-0 border-l-[6px] border-l-blue-400 border-y-[4px] border-y-transparent ml-0.5"></div>
                      )}
                    </motion.button>
                    
                {!isAutoAnimating && (
                  <button
                    onClick={resetAutoAnimation}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Auto-play →
                  </button>
                )}
                  </div>
                </div>
              </div>
              

              <div className="space-y-4">
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-500 ${
                    activeDemo === 'receipt' 
                      ? 'bg-emerald-500/20 border-emerald-400/50 shadow-lg shadow-emerald-500/20' 
                      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                  }`}
                  onClick={() => handleStepClick('receipt')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    scale: activeDemo === 'receipt' ? 1.02 : 1,
                    y: activeDemo === 'receipt' ? -2 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      activeDemo === 'receipt' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                    animate={{
                      scale: activeDemo === 'receipt' ? [1, 1.2, 1] : 1,
                      opacity: activeDemo === 'receipt' ? [1, 0.7, 1] : 0.6
                    }}
                    transition={{ 
                      duration: activeDemo === 'receipt' ? 1.5 : 0.3,
                      repeat: activeDemo === 'receipt' ? Infinity : 0
                    }}
                  ></motion.div>
                  <span className={`font-medium transition-colors duration-300 ${
                    activeDemo === 'receipt' ? 'text-emerald-100' : 'text-white'
                  }`}>Multi-receipt expense captured instantly</span>
                  <span className="text-xs text-emerald-400 ml-auto">+0.2s</span>
                </motion.div>
                
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-500 ${
                    activeDemo === 'ai' 
                      ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20' 
                      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                  }`}
                  onClick={() => handleStepClick('ai')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    scale: activeDemo === 'ai' ? 1.02 : 1,
                    y: activeDemo === 'ai' ? -2 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      activeDemo === 'ai' ? 'bg-blue-400' : 'bg-slate-500'
                    }`}
                    animate={{
                      scale: activeDemo === 'ai' ? [1, 1.2, 1] : 1,
                      opacity: activeDemo === 'ai' ? [1, 0.7, 1] : 0.6
                    }}
                    transition={{ 
                      duration: activeDemo === 'ai' ? 1.5 : 0.3,
                      repeat: activeDemo === 'ai' ? Infinity : 0
                    }}
                  ></motion.div>
                  <span className={`font-medium transition-colors duration-300 ${
                    activeDemo === 'ai' ? 'text-blue-100' : 'text-white'
                  }`}>AI validates policy & detects fraud</span>
                  <span className="text-xs text-blue-400 ml-auto">+1.8s</span>
                </motion.div>
                
                <motion.div 
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-500 ${
                    activeDemo === 'approval' 
                      ? 'bg-purple-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20' 
                      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                  }`}
                  onClick={() => handleStepClick('approval')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    scale: activeDemo === 'approval' ? 1.02 : 1,
                    y: activeDemo === 'approval' ? -2 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      activeDemo === 'approval' ? 'bg-purple-400' : 'bg-slate-500'
                    }`}
                    animate={{
                      scale: activeDemo === 'approval' ? [1, 1.2, 1] : 1,
                      opacity: activeDemo === 'approval' ? [1, 0.7, 1] : 0.6
                    }}
                    transition={{ 
                      duration: activeDemo === 'approval' ? 1.5 : 0.3,
                      repeat: activeDemo === 'approval' ? Infinity : 0
                    }}
                  ></motion.div>
                  <span className={`font-medium transition-colors duration-300 ${
                    activeDemo === 'approval' ? 'text-purple-100' : 'text-white'
                  }`}>Posted to ERP & employee reimbursed</span>
                  <span className="text-xs text-purple-400 ml-auto">+2.3s</span>
                </motion.div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer" onClick={handleDemoClick}>
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                <AnimatePresence mode="wait">
                  {activeDemo === 'receipt' ? (
                    <ReceiptUploadDemo key="receipt" />
                  ) : activeDemo === 'ai' ? (
                    <AIProcessingDemo key="ai" />
                  ) : activeDemo === 'approval' ? (
                    <AutoApprovalDemo key="approval" />
                  ) : (
                    <div key="default" className="text-center relative z-10">
                      <motion.div 
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 shadow-2xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      <motion.p 
                        className="text-white font-medium mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Interactive Demo
                      </motion.p>
                      
                      <motion.p 
                        className="text-slate-400 text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        {isAutoAnimating ? 'Watch the process flow automatically' : 'Click a step above to see it in action'}
                      </motion.p>
                      
                      {/* Hover indicator */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                      >
                        <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                          Click to start demo →
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-6 left-8 w-1 h-1 bg-emerald-400 rounded-full opacity-60"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-60"
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.2
                    }}
                  />
                </div>
                
                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-blue-500/30"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
            </div>
          </div>
          </div>
        </motion.div>
      </section>

      {/* Agent Showcase Section */}
      <section id="agents" className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Your AI workforce is always on
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Meet the intelligent agents that transform every aspect of travel and expense management
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agentShowcase.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5
                }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-3xl" 
                     style={{ backgroundImage: `linear-gradient(135deg, ${agent.color.split(' ')[1]}, ${agent.color.split(' ')[3]})` }} />
                  
                  <div className="relative z-10">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.color} shadow-lg`}>
                    <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    
                  <h3 className="mt-6 text-xl font-semibold text-white">
                      {agent.name}
                    </h3>
                    
                  <p className="mt-3 text-slate-300">
                      {agent.description}
                    </p>
                    
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {agent.demo}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* Enhanced Social Proof with ROI Metrics */}
      <section id="roi" className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Proven ROI. Real Results. Scale Fast.
          </h2>
          <p className="text-slate-300 text-lg">
            Join forward-thinking finance teams already seeing transformational results
          </p>
        </motion.div>

        {/* Enhanced ROI Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-3 mb-16"
        >
          {/* Cost Savings Metric */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-emerald-500/5 p-8 text-center backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 mb-6 shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
                <DollarSign className="h-8 w-8 text-white" />
                </div>
              <div className="text-4xl font-bold text-emerald-400 mb-3 group-hover:text-emerald-300 transition-colors">
                $2.4M
              </div>
              <div className="text-base text-slate-200 font-medium mb-2">
                Average annual cost savings
              </div>
              <div className="text-sm text-slate-400 mb-4">
                per 1,000 employees
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                ROI: 340% in first year
              </div>
            </div>
          </motion.div>

          {/* Automation Rate Metric */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-blue-500/5 p-8 text-center backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 mb-6 shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
                </div>
              <div className="text-4xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">
                92%
              </div>
              <div className="text-base text-slate-200 font-medium mb-2">
                Expense processing automation
              </div>
              <div className="text-sm text-slate-400 mb-4">
                rate achieved
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                vs. 15% industry average
              </div>
            </div>
          </motion.div>

          {/* Close Acceleration Metric */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-purple-500/10 to-purple-500/5 p-8 text-center backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 mb-6 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
                </div>
              <div className="text-4xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors">
                7× faster
              </div>
              <div className="text-base text-slate-200 font-medium mb-2">
                Month-end close acceleration
              </div>
              <div className="text-sm text-slate-400 mb-4">
                vs. traditional processes
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                From 5 days to 18 hours average
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div id="testimonials" className="relative">
          {/* Testimonials Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              What our customers say
            </h2>
            <p className="text-lg text-slate-300">
              Real results from finance teams at leading companies
            </p>
          </motion.div>

          {/* Enhanced Testimonials with Company Logos */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -100, -200, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 min-w-full">
                  {/* Spotify Testimonial */}
                  <motion.div 
                    className="flex-1 min-w-[320px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm group hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <SpotifyLogo size={24} />
                      </motion.div>
                      <div className="text-sm text-slate-300 font-medium">Spotify</div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-emerald-400 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                        </div>
                      </div>
                    <p className="text-lg text-slate-100 mb-6 relative">
                      <motion.span
                        className="absolute -left-2 -top-2 text-4xl text-emerald-400/30"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        "
                      </motion.span>
                      Our finance team processes 50,000+ expenses monthly. Agentic T&E reduced manual work by 85% and cut our month-end close from 5 days to 1.5 days.
                    </p>
                    <footer className="text-sm text-slate-400 flex items-center justify-between">
                      <div>
                        <strong className="text-white">Jennifer Martinez</strong>, VP Finance
                    </div>
                      <div className="text-xs text-emerald-400 font-medium">$95B valuation</div>
                    </footer>
                  </motion.div>
                  
                  {/* Airbnb Testimonial */}
                  <motion.div 
                    className="flex-1 min-w-[320px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm group hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <AirbnbLogo size={24} />
                      </motion.div>
                      <div className="text-sm text-slate-300 font-medium">Airbnb</div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-blue-400 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                        </div>
                      </div>
                    <p className="text-lg text-slate-100 mb-6 relative">
                      <motion.span
                        className="absolute -left-2 -top-2 text-4xl text-blue-400/30"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        "
                      </motion.span>
                      With 15,000+ employees globally, compliance was our biggest challenge. The AI agents caught $2.3M in policy violations in Q1 alone.
                    </p>
                    <footer className="text-sm text-slate-400 flex items-center justify-between">
                      <div>
                        <strong className="text-white">David Kim</strong>, Global Finance Director
                    </div>
                      <div className="text-xs text-blue-400 font-medium">15,000 employees</div>
                    </footer>
                  </motion.div>
                  
                  {/* Shopify Testimonial */}
                  <motion.div 
                    className="flex-1 min-w-[320px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm group hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <ShopifyLogo size={24} />
                      </motion.div>
                      <div className="text-sm text-slate-300 font-medium">Shopify</div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-purple-400 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                        </div>
                      </div>
                    <p className="text-lg text-slate-100 mb-6 relative">
                      <motion.span
                        className="absolute -left-2 -top-2 text-4xl text-purple-400/30"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        "
                      </motion.span>
                      Our remote-first culture means complex expense scenarios. The AI agents handle edge cases that used to take hours manually.
                    </p>
                    <footer className="text-sm text-slate-400 flex items-center justify-between">
                      <div>
                        <strong className="text-white">Amanda Foster</strong>, Head of Finance Operations
                      </div>
                      <div className="text-xs text-purple-400 font-medium">Remote-first</div>
                      </footer>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Differentiation Section */}
      <section id="comparison" className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 sm:p-12 backdrop-blur-sm"
        >
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Beyond traditional T&E platforms
            </h2>
            <p className="text-lg text-slate-300">
              See why finance teams choose us over legacy solutions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Traditional platforms (SAP Concur, Navan)</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Manual exception handling</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Limited policy automation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Basic sustainability insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-red-500 flex items-center justify-center text-red-500 text-xs mt-0.5">✕</div>
                  <span className="text-slate-300">Reactive compliance monitoring</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Agentic T&E Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">AI-powered exception resolution (92% automated)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Deep policy engine with real-time learning</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Carbon optimization in every booking decision</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-slate-300">Proactive fraud detection & prevention</span>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </section>

      {/* Partners & Integrations Section */}
      <section id="partners" className="mx-auto max-w-6xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Trusted by industry leaders
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Seamlessly integrate with the tools your team already uses
          </p>
        </motion.div>

        {/* Infinite Scrolling Logo Carousel - Two Rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          {/* First Row - Scroll Left to Right (ERP + Travel) */}
          <InfiniteLogoCarousel 
            companies={[...erpCompanies, ...travelCompanies]} 
            direction="left" 
            speed={60}
          />

          {/* Second Row - Scroll Right to Left (Payment + Cloud) */}
          <InfiniteLogoCarousel 
            companies={[...paymentCompanies, ...cloudCompanies]} 
            direction="right" 
            speed={60}
          />

          {/* Gradient Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10"></div>
        </motion.div>
      </section>


      {/* CTA Section */}
      <section id="cta" className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 p-8 sm:p-12 text-center backdrop-blur-sm"
        >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to save $2.4M annually?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ finance teams already using AI agents to automate expense management. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl" onClick={handleDemoClick}>
              <span className="flex items-center gap-2">
                See Demo
                <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl bg-white/10 backdrop-blur-sm"
              asChild
            >
              <Link href="mailto:hello@agenticte.com?subject=Product%20Demo" className="flex items-center gap-2">
                Talk with Specialist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              <span className="font-semibold">14-day free trial</span> • No setup fees • Cancel anytime
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default MarketingPage;