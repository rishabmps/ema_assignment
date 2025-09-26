"use client";

import { useState, useRef, useEffect } from "react";
import { ItineraryCard } from "@/components/demo/itinerary-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Flight, Hotel } from "@/types";
import flightsData from "@/lib/data/flights.json";
import hotelsData from "@/lib/data/hotels.json";
import { SendHorizonal, Bot, Calendar, Sparkles, CheckCircle } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "agent";
  content: React.ReactNode;
  type: "text" | "card" | "loading" | "confirmed";
};

const flights = flightsData as Flight[];
const hotels = hotelsData as Hotel[];

const initialAgentMessage: Message = {
  id: 1,
  sender: "agent",
  content: "Where do you need to go? e.g., 'Client meeting in Denver next week'",
  type: "text",
};

export function TravelerBookingView() {
  const [messages, setMessages] = useState<Message[]>([initialAgentMessage]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: input,
      type: "text",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateAgentResponse();
  };

  const simulateAgentResponse = () => {
    const loadingMessage: Message = {
      id: Date.now() + 1,
      sender: "agent",
      content: "Got it. Finding the best policy-compliant options for your trip to Chicago...",
      type: "loading",
    };
    setMessages((prev) => [...prev, loadingMessage]);

    setTimeout(() => {
      const compliantFlight = flights.find((f) => f.id === "fl_202");
      const compliantHotel = hotels.find((h) => h.id === "htl_302");

      if (compliantFlight && compliantHotel) {
        const itineraryCard: Message = {
          id: Date.now() + 2,
          sender: "agent",
          content: (
            <ItineraryCard
              flight={compliantFlight}
              hotel={compliantHotel}
              onConfirm={handleConfirmBooking}
            />
          ),
          type: "card",
        };
        setMessages((prev) => prev.filter((m) => m.type !== "loading").concat(itineraryCard));
      }
    }, 2000);
  };

  const handleConfirmBooking = () => {
    const confirmationMessage: Message = {
      id: Date.now() + 3,
      sender: "agent",
      content: (
        <div className="rounded-lg border border-success/50 bg-success/10 p-4 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-success mb-2" />
            <h3 className="text-xl font-semibold text-foreground">Trip to Chicago Confirmed!</h3>
            <p className="text-muted-foreground mt-1">Flight: AA 789 (Conf: XYZ123)</p>
            <p className="text-muted-foreground">Hotel: Hilton Chicago (Conf: 987654)</p>
            <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" size="sm"><Calendar className="mr-2 h-4 w-4" /> Add to Calendar</Button>
                <Button variant="outline" size="sm">View Expenses</Button>
            </div>
        </div>
      ),
      type: "confirmed",
    };
    setMessages((prev) => prev.filter((m) => m.type !== "card").concat(confirmationMessage));
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to Chicago has been successfully booked.",
    });
  };

  const renderMessage = (msg: Message) => {
    const isAgent = msg.sender === 'agent';
    return (
      <div key={msg.id} className={`flex items-end gap-2 ${isAgent ? 'justify-start' : 'justify-end'}`}>
        {isAgent && <Avatar className="h-8 w-8"><AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback></Avatar>}
        <div className={`max-w-[80%] rounded-lg px-3 py-2 ${isAgent ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
          {msg.type === "loading" ? (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{msg.content}</span>
            </div>
          ) : (
            msg.content
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map(renderMessage)}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I need to go to Chicago next Tuesday for 2 days..."
            className="pr-12"
            disabled={messages.some(m => m.type === 'loading' || m.type === 'card' || m.type === 'confirmed')}
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
