// components/RestaurantCard.tsx
"use client";

import Image from "next/image";
import { Star, MapPin, Tag, Bookmark } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Use the exact props structure from the data file
export interface RestaurantCardProps {
  id: string | number; // Updated to accept both types, but treats as string internally
  name: string;
  rating: number;
  price: string;
  cuisine: string;
  location: string;
  neighborhood: string;
  image: string;
  tags?: string[];
  onSelect?: (id: number | null) => void; // Updated to emit number ID
}

export default function RestaurantCard({
  id,
  name,
  rating,
  price,
  cuisine,
  location,
  neighborhood,
  image,
  tags = [],
  onSelect,
}: RestaurantCardProps) {
  const golden = "#BC995D";
  const deepBlue = "#0E1A2B";
  const router = useRouter();

  // Ensure ID is treated as string for routing
  const stringId = String(id);
  const numberId = typeof id === "number" ? id : parseInt(id, 10);

  const openDetails = () => {
    router.push(`/venue/${stringId}`);
  };

  const handleMouseEnter = () => {
    if (onSelect) onSelect(numberId); // Emit number ID
  };
  const handleMouseLeave = () => {
    if (onSelect) onSelect(null);
  };

  return (
    <button
      type="button"
      onClick={openDetails}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[236px] rounded-xl border border-white/50 bg-[#1A2E4C] overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-[#BC995D] transition-all duration-300 hover:scale-[1.01]"
      aria-label={`Open ${name} details`}
      style={{ boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)` }}
    >
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // FIX: Use the actual image prop
          backgroundImage: `linear-gradient(270deg, ${deepBlue}C0 33.66%, ${deepBlue}00 100%), url(${image})`,
        }}
      />

      <div className="relative h-full flex flex-col justify-end p-4 pl-28">
        {/* Top Header Row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white text-xl font-semibold">{name}</h3>
              <Bookmark className="w-4 h-4 text-white hover:text-[#D4A853]" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="#22c55e"
                aria-hidden="true"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.953L10 0l2.951 5.957 6.561.953-4.756 4.635 1.122 6.545z" />
              </svg>
              <span className="text-white text-sm">{rating}</span>
            </div>

            <p className="text-white text-sm mb-1">{cuisine}</p>
          </div>

          {/* Price Tag */}
          <div className="px-3 py-1 rounded bg-red-600 text-white text-xs font-medium">
            {price}
          </div>
        </div>

        {/* Location Details */}
        <div className="text-white/80 text-xs mb-2">
          <p>{location}</p>
          <p>{neighborhood}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: golden, color: deepBlue }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
