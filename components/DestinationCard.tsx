// components/DestinationCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Heart } from "lucide-react";
import React from "react";
import { Destination } from "@/lib/data/destinations";
import { Badge } from "@/components/ui/badge"; // Assuming you have the Badge component

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const golden = "#D4A853";

  return (
    <div className="bg-[#1A2E4C] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02]">
      <Link href={`/destination/${destination.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {destination.featured && (
            <Badge
              className="absolute top-3 left-3 text-[#0A1E3C]"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Featured
            </Badge>
          )}
          <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70">
            <Heart className="h-5 w-5 text-white" />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white truncate w-4/5">
            <Link
              href={`/destination/${destination.id}`}
              className="hover:text-[#D4A853]"
            >
              {destination.title}
            </Link>
          </h3>
          <div className="text-2xl font-bold" style={{ color: golden }}>
            ${destination.price}
          </div>
        </div>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{destination.location}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1" style={{ color: golden }}>
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{destination.rating}</span>
            <span className="text-gray-400">
              ({destination.reviews} reviews)
            </span>
          </div>
          <span className="text-gray-400">{destination.duration}</span>
        </div>
      </div>
    </div>
  );
}
