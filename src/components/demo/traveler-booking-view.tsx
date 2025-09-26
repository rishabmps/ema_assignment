"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ItineraryCard } from "@/components/demo/itinerary-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Flight, Hotel, User } from "@/types";
import flightsData from "@/lib/data/flights.json";
import hotelsData from "@/lib/data/hotels.json";
import usersData from "@/lib/data/users.json";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SendHorizonal, Bot, Calendar, Sparkles, CheckCircle, Check, Building } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "agent";
  content: React.ReactNode;
  type: "text" | "card" | "loading" | "confirmed" | "options";
};

type DemoStage = "initial" | "clarifying" | "searching" | "presenting_options" | "finalizing" | "confirmed";

const flights = flightsData as Flight[];
const hotels = hotelsData as Hotel[];
const traveler = usersData.find(u => u.role === "Traveler") as User;


const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const initialAgentMessage: Message = {
  id: generateUniqueId(),
  sender: "agent",
  content: "Hi Sarah! Where can I help you book a trip to today?",
  type: "text",
};

export function TravelerBookingView() {
  const [messages, setMessages] = useState<Message[]>([initialAgentMessage]);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<DemoStage>("initial");
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || stage !== 'initial') return;

    const userMessage: Message = {
      id: generateUniqueId(),
      sender: "user",
      content: input,
      type: "text",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    setTimeout(() => {
        const clarifyingMessage: Message = {
            id: generateUniqueId(),
            sender: 'agent',
            content: "Sounds good. To find the best hotel, could you tell me the purpose of your trip? E.g. conference, client meeting, etc.",
            type: 'text'
        }
        setMessages((prev) => [...prev, clarifyingMessage]);
        setStage('clarifying');
        setInput("It's for a client meeting downtown.")
    }, 1500)
  };
  
  const handleClarificationResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || stage !== 'clarifying') return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      sender: "user",
      content: input,
      type: "text",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStage('searching');

    const loadingMessage: Message = {
      id: generateUniqueId(),
      sender: "agent",
      content: "Perfect. Searching for policy-compliant flights and hotels near downtown Chicago...",
      type: "loading",
    };
    setMessages((prev) => [...prev, loadingMessage]);

    setTimeout(() => {
      const compliantHotels = hotels.filter(h => h.compliant);
      const optionsMessage: Message = {
        id: generateUniqueId(),
        sender: 'agent',
        content: <HotelOptions onSelect={handleHotelSelect} hotels={compliantHotels} />,
        type: 'options'
      }
      setMessages((prev) => prev.filter(m => m.type !== 'loading').concat(optionsMessage));
      setStage('presenting_options');
    }, 2500);
  }

  const handleHotelSelect = (hotel: Hotel) => {
    const selectionMessage: Message = {
        id: generateUniqueId(),
        sender: 'user',
        content: `Great, let's go with the ${hotel.name}.`,
        type: 'text'
    };
    setMessages(prev => prev.filter(m => m.type !== 'options').concat(selectionMessage));
    setStage('finalizing');

    setTimeout(() => {
         const loadingMessage: Message = {
            id: generateUniqueId(),
            sender: "agent",
            content: "Excellent choice. Putting together the final itinerary for you now...",
            type: "loading",
        };
        setMessages((prev) => [...prev, loadingMessage]);
    }, 500);

    setTimeout(() => {
        const compliantFlight = flights.find((f) => f.id === "fl_202");
        if (compliantFlight && hotel) {
            const itineraryCard: Message = {
            id: generateUniqueId(),
            sender: "agent",
            content: (
                <ItineraryCard
                flight={compliantFlight}
                hotel={hotel}
                onConfirm={handleConfirmBooking}
                />
            ),
            type: "card",
            };
            setMessages((prev) => prev.filter((m) => m.type !== "loading").concat(itineraryCard));
            setStage('confirmed');
        }
    }, 2000);
  }


  const handleConfirmBooking = () => {
    const confirmationMessage: Message = {
      id: generateUniqueId(),
      sender: "agent",
      content: (
        <div className="rounded-lg border border-success/50 bg-success/10 p-4 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-success mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Trip to Chicago Confirmed!</h3>
            <p className="text-sm text-muted-foreground mt-1">Flight: AA 789 (Conf: XYZ123)</p>
            <p className="text-sm text-muted-foreground">Hotel: Hilton Chicago (Conf: 987654)</p>
            <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" size="sm"><Calendar className="mr-2 h-4 w-4" /> Add to Calendar</Button>
                <Button variant="outline" size="sm">View Expenses</Button>
            </div>
        </div>
      ),
      type: "confirmed",
    };
    setMessages((prev) => prev.filter((m) => m.type !== "card").concat(confirmationMessage));
    setStage('confirmed');
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to Chicago has been successfully booked.",
    });
  };
  
  const getFormHandler = () => {
      switch (stage) {
          case 'initial':
              return handleSendMessage;
          case 'clarifying':
              return handleClarificationResponse;
          default:
              return (e: React.FormEvent) => e.preventDefault();
      }
  }
  
  const getPlaceholder = () => {
    switch (stage) {
      case 'initial':
        return "I need to go to Chicago next Tuesday for 2 days...";
      case 'clarifying':
        return "It's for a client meeting downtown.";
      default:
        return "The agent is working...";
    }
  }

  const isInputDisabled = !['initial', 'clarifying'].includes(stage);

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
              {msg.sender === 'agent' && (
                <Avatar className="h-8 w-8 self-start">
                    <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`max-w-[90%] rounded-lg px-3 py-2 shadow-sm ${msg.sender === 'agent' ? 'bg-secondary' : 'bg-primary text-primary-foreground'} ${msg.type === 'options' || msg.type === 'card' ? 'p-0 bg-transparent shadow-none' : ''}`}>
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
                <Avatar className="h-8 w-8 self-start">
                    <AvatarFallback>{traveler.initials}</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-background p-4">
        <form onSubmit={getFormHandler()} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            className="pr-12"
            disabled={isInputDisabled}
            autoFocus
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10" disabled={isInputDisabled}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}


function HotelOptions({ hotels, onSelect }: { hotels: Hotel[], onSelect: (hotel: Hotel) => void }) {
  const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const hotelOptions = [
    { hotel: hotels[1], reason: "Closest to your meeting" },
    { hotel: hotels[0], reason: "Best value & preferred partner" },
    { hotel: hotels[2], reason: "Highest traveler rating" },
  ].filter(option => option.hotel);

  return (
    <div className="w-full">
      <p className="text-sm mb-2 text-foreground bg-secondary rounded-lg px-3 py-2">OK. I found a few great, policy-compliant hotels near downtown. Which one looks best?</p>
      <div className="space-y-2">
        {hotelOptions.map(({ hotel, reason }) => {
          const hotelImage = PlaceHolderImages.find(img => img.id === hotel.image);
          return (
            <Card key={hotel.id} onClick={() => onSelect(hotel)} className="p-3 hover:border-primary cursor-pointer transition-colors flex gap-3 items-center bg-background">
              {hotelImage && <Image src={hotelImage.imageUrl} alt={hotel.name} width={64} height={64} className="rounded-md object-cover h-16 w-16" data-ai-hint={hotelImage.imageHint} />}
              <div className="flex-grow">
                <p className="font-semibold">{hotel.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Building className="h-3 w-3" />{reason}</span>
                </div>
                 <div className="flex items-center gap-2 mt-1">
                    {hotel.preferred_brand && <Badge variant="outline" className="text-xs border-green-600 bg-green-50 text-green-700">Preferred+</Badge>}
                    <span className="text-sm font-semibold">{currencyFormatter.format(hotel.price_per_night)}<span className="font-normal text-xs text-muted-foreground">/night</span></span>
                 </div>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                Select <Check className="ml-2 h-4 w-4"/>
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
