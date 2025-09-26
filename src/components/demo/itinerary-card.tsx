"use client";

import Image from "next/image";
import type { Flight, Hotel } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Plane, Building2, Clock, ArrowRight } from "lucide-react";

interface ItineraryCardProps {
  flight: Flight;
  hotel: Hotel;
  onConfirm: () => void;
}

export function ItineraryCard({ flight, hotel, onConfirm }: ItineraryCardProps) {
  const hotelImage = PlaceHolderImages.find((img) => img.id === hotel.image);
  const savings = hotel.market_rate - hotel.price_per_night;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card className="w-full max-w-sm overflow-hidden border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5 p-4">
        <CardTitle className="text-lg">Your Trip to Chicago</CardTitle>
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="outline" className="border-success bg-success/10 text-success">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Policy Compliant
          </Badge>
          {savings > 0 && (
            <Badge variant="outline" className="border-accent bg-accent/10 text-accent-foreground">
              Savings Found: {currencyFormatter.format(savings)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-md font-semibold mb-2">
            <Plane className="h-4 w-4" />
            Flight
          </h4>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{flight.airline}</p>
              <p className="text-xs text-muted-foreground">{flight.flight_number}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <p className="font-bold">{flight.from}</p>
                <p className="text-xs">{flight.departure_time}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-center">
                <p className="font-bold">{flight.to}</p>
                <p className="text-xs">{flight.arrival_time}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="flex items-center gap-2 text-md font-semibold mb-2">
            <Building2 className="h-4 w-4" />
            Hotel
          </h4>
          <div className="flex gap-4">
            {hotelImage && (
              <Image
                src={hotelImage.imageUrl}
                alt={hotel.name}
                data-ai-hint={hotelImage.imageHint}
                width={100}
                height={80}
                className="rounded-md object-cover"
              />
            )}
            <div>
              <p className="font-medium">{hotel.name}</p>
              <p className="text-xs text-muted-foreground">{hotel.address}</p>
              <p className="text-sm font-semibold mt-1">{currencyFormatter.format(hotel.price_per_night)} / night</p>
            </div>
          </div>
        </div>

      </CardContent>
      <CardFooter className="bg-secondary/50 p-4">
        <Button onClick={onConfirm} className="w-full">
          Confirm & Book
        </Button>
      </CardFooter>
    </Card>
  );
}
