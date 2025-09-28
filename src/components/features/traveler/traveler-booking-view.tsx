
"use client";

import { useState, useRef, useEffect } from "react";
import { ItineraryCardV2 } from "@/components/features/traveler/itinerary-card-v2";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMobileToast } from "@/components/ui/mobile-toast";
import type { Flight, Train, User, TripBudget } from "@/types";
import flightsData from "@/lib/data/flights.json";
import trainsData from "@/lib/data/trains.json";
import usersData from "@/lib/data/users.json";
import tripBudgetsData from "@/lib/data/trip_budgets.json";
import { SendHorizonal, Bot, Sparkles, CheckCircle, Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BudgetCopilotWidget } from "@/components/common/budget-copilot-widget";
import { InlineAgentActivity, useAgentActivity } from "@/components/features/agent-activity";
import { useDemoAgentContext } from "@/components/features/agent-activity/demo-agent-context";

type Message = {
  id: string;
  sender: "user" | "agent";
  content: React.ReactNode;
  type: "text" | "card" | "loading" | "confirmed" | "options";
};

const flights = flightsData as Flight[];
const trains = trainsData as Train[];
const traveler = usersData.find(u => u.role === "Traveler") as User;
const budgets = tripBudgetsData as { [key: string]: TripBudget };
const tripBudget = budgets["trip_789"];

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const initialAgentMessage: Message = {
  id: generateUniqueId(),
  sender: "agent",
  content: "Hi Sarah! 👋 I'm your AI Travel Assistant. I see you have a trip to Boston coming up for the Q3 planning meeting. I've already found some great options that balance cost, sustainability, and your preferences. Would you like me to show you what I've discovered?",
  type: "text",
};

interface TravelerBookingViewProps {
  hideInlineAgentActivity?: boolean;
}

export function TravelerBookingView({ hideInlineAgentActivity = false }: TravelerBookingViewProps) {
  const [messages, setMessages] = useState<Message[]>([initialAgentMessage]);
  const [input, setInput] = useState("Book my trip to Boston for the Q3 meeting");
  const [isTyping, setIsTyping] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const { showToast } = useMobileToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    activities, 
    simulateTripBookingFlow: simulateTripBookingFlowLocal
  } = useAgentActivity();

  const { triggerTransactionReaction, clearTransactionReaction, completeAgentProcessing } = useDemoAgentContext();

  // Smart auto-scroll: only scroll when new messages are added by agent or user
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;
    
    // Only auto-scroll for new messages, not when existing messages are modified
    const timeoutId = setTimeout(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest",
          inline: "nearest"
        });
      }
    }, 300); // Small delay to avoid interrupting user interactions
    
    return () => clearTimeout(timeoutId);
  }, [messages.length]); // Only trigger on new messages, not content changes
  
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const destination = input.trim();
    addMessage({ id: generateUniqueId(), sender: "user", content: input, type: "text" });
    setInput("");
    setIsTyping(true);
    
    // Trigger agent activity simulation for trip booking - now shown inline!
    simulateTripBookingFlowLocal(destination);
    
    // Trigger contextual agent reaction with booking data
    triggerTransactionReaction('booking', {
      destination: destination,
      co2Savings: '2.3', // Default CO2 savings for train option
      budget: 'Q4'
    });

    setTimeout(() => {
      addMessage({ 
        id: generateUniqueId(), 
        sender: "agent", 
        content: "Perfect! Let me analyze the best options for your Boston trip. I'm checking flights, trains, hotels, and considering your sustainability preferences... ✈️🚄", 
        type: "loading" 
      });
    }, 500);

    setTimeout(() => {
        setMessages(prev => prev.filter(m => m.type !== 'loading'));
        setShowBudget(true);
    }, 2000);

    setTimeout(() => {
      const flightOption = flights.find(f => f.id === "fl_401_bos");
      const trainOption = trains.find(t => t.id === "tr_501_bos");

      if (flightOption && trainOption) {
        addMessage({
          id: generateUniqueId(),
          sender: "agent",
          content: "Great news! I found some excellent options for your Boston trip. Here's what I recommend based on your preferences for sustainability and cost-effectiveness:",
          type: "text"
        });

        addMessage({
          id: generateUniqueId(),
          sender: "agent",
          content: <ItineraryCardV2 option={trainOption} type="train" onConfirm={handleConfirmBooking} />,
          type: "card"
        });
        
        addMessage({
          id: generateUniqueId(),
          sender: "agent",
          content: <ItineraryCardV2 option={flightOption} type="flight" onConfirm={handleConfirmBooking} />,
          type: "card"
        });
      }
      setIsTyping(false);
    }, 2500);
  };

  const handleConfirmBooking = (cost: number) => {
    setShowBudget(false);
    setMessages(prev => prev.filter(m => m.type !== "card" && m.type !== "text" && m.type !== "loading" && m.sender !== 'user'));

    const savings = tripBudget.budget_usd - cost;
    const carbonSavings = 160 - 30; // Hardcoded for this demo

    const confirmationMessage: Message = {
      id: generateUniqueId(),
      sender: "agent",
      content: (
        <div className="rounded-xl border border-green-200/60 bg-gradient-to-br from-green-50/95 to-emerald-50/80 p-3 text-center mx-auto shadow-sm">
            <CheckCircle className="mx-auto h-7 w-7 text-green-600 mb-2" />
            <h3 className="text-sm font-semibold text-slate-800 mb-1">🎉 Boston Trip Confirmed!</h3>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                Saved {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(savings)} and reduced carbon footprint by {carbonSavings} kg! 🌱
            </p>
            <p className="text-xs text-slate-500 mb-3">
                Plus 15% hotel discount & priority boarding secured.
            </p>
            <div className="flex gap-2 justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-6 px-2 bg-white/90 border-green-200 hover:bg-green-50 rounded-lg"
                  onClick={() => {
                    showToast({
                      title: "Added to Calendar",
                      description: "Boston trip has been added to your calendar.",
                      type: "calendar"
                    });
                  }}
                >
                  <Calendar className="mr-1 h-3 w-3" /> Calendar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-6 px-2 bg-white/90 border-green-200 hover:bg-green-50 rounded-lg"
                  onClick={() => {
                    showToast({
                      title: "Itinerary Details",
                      description: "Full itinerary with flight times, hotel details, and local recommendations.",
                      type: "itinerary"
                    });
                  }}
                >
                  View Itinerary
                </Button>
            </div>
        </div>
      ),
      type: "confirmed",
    };
    addMessage(confirmationMessage);
    showToast({
      title: "Booking Confirmed!",
      description: "Your sustainable trip to Boston is booked.",
      type: "success"
    });
    
    // Complete agent processing when booking is confirmed
    completeAgentProcessing('booking', {
      destination: 'Boston', // This should match the actual destination
      co2Savings: '2.3',
      budget: 'Q4'
    });
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-50/80 to-blue-50/60">
      <header className="p-3 bg-white/95 backdrop-blur-md border-b border-slate-200/40 shadow-sm relative z-10">
        <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-blue-100 h-9 w-9">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm">{traveler.initials}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-bold text-slate-800">{traveler.name}</p>
                <p className="text-xs text-slate-500 font-medium">{traveler.title}</p>
            </div>
        </div>
      </header>
      
      {showBudget && <BudgetCopilotWidget budget={tripBudget.budget_usd} currentCost={0} />}

      {/* Inline Agent Activity - only show if not in full device view */}
  {activities.length > 0 && !hideInlineAgentActivity && (
        <div className="p-3 pb-2">
          <InlineAgentActivity 
            activities={activities} 
            compact={true}
          />
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto p-3 bg-gradient-to-b from-slate-50/40 to-blue-50/40">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20}}
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.5,
                },
              }}
              className={`flex items-end gap-2 ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.sender === 'agent' && msg.type !== 'options' && (
                <Avatar className="h-7 w-7 self-start flex-shrink-0 ring-1 ring-blue-100">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[90%] rounded-xl px-3 py-2 shadow-sm ${msg.sender === 'agent' ? 'bg-white/95 border border-slate-200/40' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'} ${msg.type === 'options' || msg.type === 'card' || msg.type === 'confirmed' ? 'p-0 bg-transparent shadow-none w-full' : ''}`}>
                {msg.type === "loading" ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    <span>{msg.content}</span>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
               {msg.sender === 'user' && (
                <Avatar className="h-7 w-7 self-start flex-shrink-0">
                    <AvatarFallback className="text-xs">{traveler.initials}</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 border-t border-slate-200/40 bg-white/95 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Click send to start the booking process"
            className="pr-11 rounded-xl border-slate-200/40 focus:border-blue-400 focus:ring-blue-400/20 bg-white/90 backdrop-blur-sm text-sm"
            disabled={isTyping}
            autoFocus
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-9 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md" disabled={isTyping}>
            <SendHorizonal className="h-3 w-3" />
          </Button>
        </form>
      </div>
    </div>
  );
}
