"use client";

import { Bookmark, Star } from "lucide-react";
import React from "react";

interface RestaurantCardProps {
  name: string;
  id: number;
  price?: string;
  altPrice?: string;
  address: string;
  cuisine?: string;
  priceRange?: string;
  priceAlt?: string;
  location?: string;
  rating?: string;
  ratingCount?: string;
  reviews?: string;
  distance?: string;
  bookedCount?: number;
  bookedTimes: number;
  tags?: string[];
  countdown?: string;
  image: string;
  times?: string[];
  featured?: boolean;
  className?: string;
  onSelect?: (id: number) => void;
}

export function RestaurantCard({
  name,
  price = "40€",
  altPrice = "78.23лв",
  cuisine = "Italian",
  priceRange = "$$$",
  location = "Street Name",
  rating = "4.2",
  ratingCount = "2.5k",
  distance = "1 km away",
  bookedCount = 4,
  countdown = "19:59:43",
  image,
  times = ["19:00", "19:15", "19:30", "19:45"],
  featured = false,
  className = "",
}: RestaurantCardProps) {
  const gold = "#D4A853";

  return (
    <div
      className={`relative min-w-[315px] ${
        featured ? "h-[334px]" : "h-[307px]"
      } rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-all duration-500 ${className}`}
      style={{ border: `1.5px solid ${gold}` }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-[#213C62]/70 to-transparent" />

      {/* Glass Info Panel */}
      <div className="absolute left-4 bottom-0 w-[280px] rounded-lg border border-white/10 bg-[rgba(6,6,6,0.6)] backdrop-blur-md p-4 z-10">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white text-xl font-semibold leading-tight">
              {name}
            </h3>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-white text-lg font-bold">{price}</span>
              <span className="text-white/70 text-xs">{altPrice}</span>
            </div>

            <p className="text-white/60 text-xs mt-2">{distance}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Bookmark */}
            <button className="p-1 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 transition">
              <Bookmark className="w-4 h-4 text-white" />
            </button>

            {/* Rating & Countdown */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 bg-[#125604] text-white text-xs px-2 py-1 rounded-md">
                <Star className="w-3.5 h-3.5 text-[#D4A853] fill-[#D4A853]" />
                <span className="font-semibold">{rating}</span>
                <span className="text-white/80 text-[11px]">
                  ({ratingCount})
                </span>
              </div>

              <div className="bg-[#9B1F1F] text-white px-2 py-1 rounded-md text-[11px]">
                {countdown}
              </div>
            </div>
          </div>
        </div>

        {/* Cuisine & Location */}
        <div className="mt-3 text-white text-sm">
          <p className="font-medium">
            {cuisine} {priceRange} • {location}
          </p>
          <p className="text-white/70 text-xs mt-1">
            Booked {bookedCount} times today
          </p>
        </div>

        {/* Time Buttons */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {times.map((t, i) => (
            <button
              key={i}
              className="flex-shrink-2 px-5 py-1 rounded-md bg-[#FFD343] text-black text-sm font-medium shadow-sm"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Subtle Highlight Frame */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}
