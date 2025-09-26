"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TravelerExpenseFeed } from "@/components/demo/traveler-expense-feed";
import { TravelerBookingView } from "@/components/demo/traveler-booking-view";
import { FinanceDashboard } from "@/components/demo/finance-dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import usersData from "@/lib/data/users.json";
import { Separator } from "@/components/ui/separator";

type Persona = "traveler" | "finance";
type Act = "expense" | "booking";

export default function MainDashboard() {
  const [persona, setPersona] = useState<Persona>("traveler");
  const [act, setAct] = useState<Act>("expense");

  const traveler = usersData.find(u => u.role === "Traveler");
  const finance = usersData.find(u => u.role === "Finance Operations");

  const renderPersonaSwitcher = () => (
    <Card>
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Select Persona</h2>
            <RadioGroup
                value={persona}
                onValueChange={(value: string) => setPersona(value as Persona)}
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
    <>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Choose a Demo</h2>
      </div>
      <RadioGroup
        value={act}
        onValueChange={(value: string) => setAct(value as Act)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <Label htmlFor="act1" className="cursor-pointer">
          <div className="text-center mb-6 h-24 flex flex-col justify-end">
            <h2 className="text-2xl font-semibold">Act I: The Invisible<br/>Expense Report</h2>
            <p className="text-muted-foreground mt-2">Showcasing the "Zero-Touch" expense flow.</p>
          </div>
          <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-2 shadow-2xl">
                  <div className="aspect-[9/19] w-full rounded-xl bg-background overflow-hidden">
                      <RadioGroupItem value="expense" id="act1" className="sr-only" />
                      <TravelerExpenseFeed />
                  </div>
              </div>
          </div>
        </Label>
        <Label htmlFor="act2" className="cursor-pointer">
          <div className="text-center mb-6 h-24 flex flex-col justify-end">
            <h2 className="text-2xl font-semibold">Act II: The<br/>Conversational Trip</h2>
            <p className="text-muted-foreground mt-2">Demonstrating AI-powered travel booking.</p>
          </div>
          <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-2 shadow-2xl">
                  <div className="aspect-[9/19] w-full rounded-xl bg-background overflow-hidden">
                      <RadioGroupItem value="booking" id="act2" className="sr-only" />
                      <TravelerBookingView />
                  </div>
              </div>
          </div>
        </Label>
      </RadioGroup>
    </>
  )

  const renderFinanceView = () => (
     <section id="finance-journey">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">The Finance Operations Cockpit</h2>
          <p className="text-muted-foreground">Managing exceptions with AI-powered insights.</p>
        </div>
        <div className="flex justify-center">
            <div className="w-full max-w-6xl rounded-xl bg-gray-800 shadow-2xl p-2">
                <div className="h-10 bg-gray-700 rounded-t-lg flex items-center p-4">
                  <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="bg-background overflow-y-auto" style={{ height: 'calc(80vh - 2.5rem)', maxHeight: '700px'}}>
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
