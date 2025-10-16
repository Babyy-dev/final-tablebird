// components/DestinationCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart, Calendar } from "lucide-react";
import React from "react";
// Interface should be pulled from your lib/data/destinations.ts file
interface Destination {
  id: string;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  featured?: boolean;
  category: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const golden = "#D4A853";

  return (
    <div className="bg-[#1A2E4C] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02] group cursor-pointer">
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
            <span
              className="absolute top-3 left-3 text-[#0A1E3C] px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Featured
            </span>
          )}
          <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70">
            <Heart className="h-5 w-5 text-white" />
          </button>
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between mb-2">
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

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{destination.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{destination.duration}</span>
        </div>

        <div className="space-y-3">
          <div className="text-gray-400 text-sm">
            ({destination.reviews} reviews)
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">From</span>
              <div className="text-[#D4A853] text-xl" style={{ color: golden }}>
                ${destination.price}
              </div>
            </div>
            <Link href={`/destination/${destination.id}`}>
              <button
                className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C] px-6 py-2 rounded-lg transition"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
