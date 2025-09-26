
"use client";

import type { Flight, Train } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, TrainFront, Leaf, ArrowRight, Clock } from "lucide-react";

interface ItineraryCardV2Props {
  option: Flight | Train;
  type: 'flight' | 'train';
  onConfirm: (cost: number) => void;
}

export function ItineraryCardV2({ option, type, onConfirm }: ItineraryCardV2Props) {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const isTrain = type === 'train';
  const isGreener = (option.co2_kg || 0) < 100; // Example threshold

  const Icon = isTrain ? TrainFront : Plane;
  const title = isTrain ? (option as Train).carrier : (option as Flight).airline;
  const flightNumber = isTrain ? '' : `(${(option as Flight).flight_number})`;
  const co2Savings = Math.round((1 - (option.co2_kg || 0) / 160) * 100);

  return (
    <Card className="w-full max-w-sm overflow-hidden border-primary/20 shadow-lg mb-4">
      <CardHeader className="bg-primary/5 p-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
        </CardTitle>
        {isGreener && (
             <Badge variant="outline" className="border-green-600 bg-green-50 text-green-700">
                <Leaf className="mr-1 h-3 w-3" />
                Greener Choice: {co2Savings}% less CO2
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between text-sm">
            <div className="text-center">
                <p className="font-bold">{option.from}</p>
                <p className="text-xs">{option.departure_time}</p>
            </div>
            <div className="flex flex-col items-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> ~{option.co2_kg} kg CO2
                </p>
            </div>
            <div className="text-center">
                <p className="font-bold">{option.to}</p>
                <p className="text-xs">{option.arrival_time}</p>
            </div>
        </div>
        <Separator />
         <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{isTrain ? "Business Class" : (option as Flight).class}</p>
            <p className="text-lg font-bold">{currencyFormatter.format(option.price)}</p>
         </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 p-2">
        <Button onClick={() => onConfirm(option.price)} className="w-full">
          Select & Book for {currencyFormatter.format(option.price)}
        </Button>
      </CardFooter>
    </Card>
  );
}

    