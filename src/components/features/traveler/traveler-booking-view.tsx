
"use client";

import { useState, useRef, useEffect } from "react";
import { ItineraryCardV2 } from "@/components/features/traveler/itinerary-card-v2";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Flight, Train, User, TripBudget } from "@/types";
import flightsData from "@/lib/data/flights.json";
import trainsData from "@/lib/data/trains.json";
import usersData from "@/lib/data/users.json";
import tripBudgetsData from "@/lib/data/trip_budgets.json";
import { SendHorizonal, Bot, Sparkles, CheckCircle, Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BudgetCopilotWidget } from "@/components/common/budget-copilot-widget";
import { AgentActivityPanel, InlineAgentActivity, useAgentActivity } from "@/components/features/agent-activity";

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
  content: "Hi Sarah! I'm ready to help you book your next trip. Where are you headed?",
  type: "text",
};

export function TravelerBookingView() {
  const [messages, setMessages] = useState<Message[]>([initialAgentMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    activities, 
    simulateTripBookingFlow, 
    clearActivities 
  } = useAgentActivity();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
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
    simulateTripBookingFlow(destination);
    // No need to manually open panel - it shows inline automatically

    setTimeout(() => {
      addMessage({ id: generateUniqueId(), sender: "agent", content: "Got it. Planning your trip to Boston...", type: "loading" });
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
          content: "I've found two great options for your trip. The train is a greener choice and also saves a bit on your budget.",
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
        <div className="rounded-lg border border-success/50 bg-success/10 p-4 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-success mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Trip to Boston Confirmed!</h3>
            <p className="text-sm text-muted-foreground mt-2">
                You saved {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(savings)} against your budget and reduced your carbon footprint by {carbonSavings} kg. Well done!
            </p>
            <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="bg-background"><Calendar className="mr-2 h-4 w-4" /> Add to Calendar</Button>
                <Button variant="outline" size="sm" className="bg-background">View Itinerary</Button>
            </div>
        </div>
      ),
      type: "confirmed",
    };
    addMessage(confirmationMessage);
    toast({
      title: "Booking Confirmed!",
      description: "Your sustainable trip to Boston is booked.",
    });
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="p-4 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="flex items-center gap-3">
            <Avatar><AvatarFallback>{traveler.initials}</AvatarFallback></Avatar>
            <div>
                <p className="text-sm font-semibold">{traveler.name}</p>
                <p className="text-xs text-muted-foreground">{traveler.title}</p>
            </div>
        </div>
      </header>
      
      {showBudget && <BudgetCopilotWidget budget={tripBudget.budget_usd} currentCost={0} />}

      {/* Inline Agent Activity - shown seamlessly in the main flow */}
      {activities.length > 0 && (
        <div className="p-4 pb-2">
          <InlineAgentActivity 
            activities={activities} 
            compact={true}
          />
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
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
                <Avatar className="h-8 w-8 self-start flex-shrink-0">
                    <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm ${msg.sender === 'agent' ? 'bg-secondary' : 'bg-primary text-primary-foreground'} ${msg.type === 'options' || msg.type === 'card' || msg.type === 'confirmed' ? 'p-0 bg-transparent shadow-none w-full' : ''}`}>
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
                <Avatar className="h-8 w-8 self-start flex-shrink-0">
                    <AvatarFallback>{traveler.initials}</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Trip to Boston for the Q3 planning meeting..."
            className="pr-12"
            disabled={isTyping}
            autoFocus
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10" disabled={isTyping}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
