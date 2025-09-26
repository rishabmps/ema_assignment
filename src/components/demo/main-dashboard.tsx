"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TravelerExpenseFeed } from "@/components/demo/traveler-expense-feed";
import { TravelerBookingView } from "@/components/demo/traveler-booking-view";
import { FinanceDashboard } from "@/components/demo/finance-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Briefcase, ChevronRight, User } from "lucide-react";
import usersData from "@/lib/data/users.json";
import { Separator } from "@/components/ui/separator";

type Persona = "traveler" | "finance";

export default function MainDashboard() {
  const [persona, setPersona] = useState<Persona>("traveler");
  const traveler = usersData.find(u => u.role === "Traveler");
  const finance = usersData.find(u => u.role === "Finance Operations");

  const renderPersonaSwitcher = () => (
    <Card>
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Select Persona</h2>
            <RadioGroup
                value={persona}
                onValueChange={(value: Persona) => setPersona(value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <Label htmlFor="traveler" className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                    <RadioGroupItem value="traveler" id="traveler" />
                    <Avatar className="h-10 w-10"><AvatarFallback>{traveler?.initials}</AvatarFallback></Avatar>
                    <div>
                        <p className="font-semibold">{traveler?.name}</p>
                        <p className="text-sm text-muted-foreground">{traveler?.title}</p>
                    </div>
                </Label>
                <Label htmlFor="finance" className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                    <RadioGroupItem value="finance" id="finance" />
                    <Avatar className="h-10 w-10"><AvatarFallback>{finance?.initials}</AvatarFallback></Avatar>
                    <div>
                        <p className="font-semibold">{finance?.name}</p>
                        <p className="text-sm text-muted-foreground">{finance?.title}</p>
                    </div>
                </Label>
            </RadioGroup>
        </div>
    </Card>
  );

  const renderTravelerView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section id="expense-journey">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">The Invisible Expense Report</h2>
          <p className="text-muted-foreground">Showcasing the "Zero-Touch" expense flow.</p>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-2 shadow-2xl">
                <div className="aspect-[9/19] w-full rounded-xl bg-background overflow-hidden">
                    <TravelerExpenseFeed />
                </div>
            </div>
        </div>
      </section>

      <section id="booking-journey">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">The Conversational Trip</h2>
          <p className="text-muted-foreground">Demonstrating AI-powered travel booking.</p>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-2 shadow-2xl">
                <div className="aspect-[9/19] w-full rounded-xl bg-background overflow-hidden">
                    <TravelerBookingView />
                </div>
            </div>
        </div>
      </section>
    </div>
  )

  const renderFinanceView = () => (
     <section id="finance-journey">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">The Finance Operations Cockpit</h2>
          <p className="text-muted-foreground">Managing exceptions with AI-powered insights.</p>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-4xl rounded-t-2xl bg-gray-800 p-2 pt-4 shadow-2xl">
                <div className="aspect-video w-full rounded-t-xl bg-background overflow-hidden">
                    <FinanceDashboard />
                </div>
            </div>
        </div>
      </section>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
          <Bot className="h-10 w-10 text-primary" />
          Agentic T&E
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          The future of Travel & Expense management is invisible.
        </p>
      </header>

      {renderPersonaSwitcher()}
      
      <Separator className="my-8" />
      
      {persona === "traveler" ? renderTravelerView() : renderFinanceView()}

    </div>
  );
}
