
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
    <Card className="w-full overflow-hidden border-slate-200/60 shadow-lg mb-3 bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50/80 to-slate-50/80 p-3 flex flex-row justify-between items-start">
        <CardTitle className="text-base flex items-center gap-2 font-semibold text-slate-800">
            <Icon className="h-4 w-4 text-blue-600" />
            {title}
        </CardTitle>
        {isGreener && (
             <Badge variant="outline" className="border-green-500 bg-green-50/80 text-green-700 text-xs px-2 py-1">
                <Leaf className="mr-1 h-3 w-3" />
                Greener Choice: {co2Savings}% less CO2
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between text-sm">
            <div className="text-center flex-1">
                <p className="font-bold text-slate-800 text-sm">{option.from}</p>
                <p className="text-xs text-slate-500 font-medium">{option.departure_time}</p>
            </div>
            <div className="flex flex-col items-center px-2">
                <ArrowRight className="h-3 w-3 text-slate-400" />
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> ~{option.co2_kg} kg CO2
                </p>
            </div>
            <div className="text-center flex-1">
                <p className="font-bold text-slate-800 text-sm">{option.to}</p>
                <p className="text-xs text-slate-500 font-medium">{option.arrival_time}</p>
            </div>
        </div>
        <Separator className="bg-slate-200/50" />
         <div className="flex justify-between items-center">
            <p className="text-xs text-slate-600 font-medium">{isTrain ? "Business Class" : (option as Flight).class}</p>
            <p className="text-lg font-bold text-slate-800">{currencyFormatter.format(option.price)}</p>
         </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-blue-50/50 to-slate-50/50 p-3">
        <Button 
          onClick={() => onConfirm(option.price)} 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm py-2 rounded-lg shadow-sm"
        >
          Select & Book for {currencyFormatter.format(option.price)}
        </Button>
      </CardFooter>
    </Card>
  );
}
