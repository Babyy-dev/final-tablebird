"use client";

import { Bookmark, Star } from "lucide-react";
import React, { useState } from "react";

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
  isExplorePage?: boolean; // New prop for explore page layout
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
  isExplorePage = false,
}: RestaurantCardProps) {
  const gold = "#D4A853";
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking bookmark
    setIsSaved(!isSaved);
  };

  return (
    <div
      className={`relative w-full min-w-[280px] sm:min-w-[315px] max-w-[340px] flex-shrink-0 snap-center ${
        featured ? "h-[300px] sm:h-[334px]" : "h-[280px] sm:h-[307px]"
      } rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-all duration-500 ${className} mx-auto`}
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
      <div className={`absolute rounded-lg border border-white/10 bg-[rgba(6,6,6,0.6)] backdrop-blur-md p-3 sm:p-4 z-10 ${
        isExplorePage 
          ? "right-0 top-1/2 -translate-y-1/2 w-[280px] sm:w-[300px]" 
          : "left-2 sm:left-4 right-2 sm:right-auto bottom-0 w-auto sm:w-[280px]"
      }`}>
        {/* Top Section */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg sm:text-xl font-semibold leading-tight truncate">
              {name}
            </h3>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-white text-base sm:text-lg font-bold">{price}</span>
              <span className="text-white/70 text-xs">{altPrice}</span>
            </div>

            <p className="text-white/60 text-xs mt-2">{distance}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Bookmark/Save Button */}
            <button 
              onClick={handleSaveClick}
              className={`p-1 rounded-md border transition-all duration-300 ${
                isSaved 
                  ? "border-green-400 bg-green-500/20 hover:bg-green-500/30" 
                  : "border-white/20 bg-white/10 hover:bg-white/20"
              }`}
            >
              <Bookmark 
                className={`w-4 h-4 transition-all duration-300 ${
                  isSaved 
                    ? "text-green-400 fill-green-400" 
                    : "text-white fill-transparent"
                }`} 
              />
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
        <div className="mt-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
          {times.map((t, i) => (
            <button
              key={i}
              className="flex-shrink-0 px-3 sm:px-5 py-1 rounded-md bg-[#FFD343] text-black text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap"
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
