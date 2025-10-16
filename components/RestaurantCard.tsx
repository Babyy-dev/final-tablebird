"use client";

import { Bookmark } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export interface RestaurantCardProps {
  id?: string | number;
  name: string;
  rating: number;
  price: string;
  priceAlt?: string;
  address?: string;
  reviews: string;
  times?: string[];
  countdown: string;
  cuisine: string;
  location: string;
  image: string;
  tags?: string[];
  distance?: string;
  bookedTimes?: number;
  onSelect?: (id: number | null) => void;
}

export default function RestaurantCard({
  id,
  name,
  rating,

  price,
  cuisine,
  location,
  image,
  tags = [],
  distance = "1.2 km away",
  bookedTimes = 4,
  onSelect,
}: RestaurantCardProps) {
  const router = useRouter();
  const golden = "#D4A853";

  const stringId = String(id ?? "");
  const numberId = typeof id === "number" ? id : parseInt(stringId, 10) || 0;

  const openDetails = () => router.push(`/venue/${stringId}`);
  const handleMouseEnter = () => onSelect?.(numberId);
  const handleMouseLeave = () => onSelect?.(null);

  return (
    <button
      onClick={openDetails}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-[250px] sm:w-[315px] h-[307px] rounded-[12px] overflow-hidden border border-[#ffffff30] bg-[#0E1A2B] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Info Section (with gradient background only here) */}
      <div className="absolute bottom-0 left-2 right-2  bg-gradient-to-b from-black/20 via-black/70 to-black/90 p-4 backdrop-blur-[4px] ">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white text-lg font-semibold truncate">{name}</h3>
          <Bookmark className="w-4 h-4 text-white opacity-80 hover:text-[#D4A853]" />
        </div>

        <div className="text-white/70 text-xs mb-1">{distance}</div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-sm font-semibold">{price}</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="#22c55e"
              aria-hidden="true"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.953L10 0l2.951 5.957 6.561.953-4.756 4.635 1.122 6.545z" />
            </svg>
            <span className="text-[#22c55e] text-xs font-semibold">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-white/80 text-xs mb-1">
          {cuisine} • {location}
        </p>

        <p className="text-white/50 text-[11px] mb-2">
          Booked {bookedTimes} times today
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium"
                style={{ backgroundColor: golden, color: "#0E1A2B" }}
              >
                {tag}
              </span>
            ))
          ) : (
            <>
              {["19:00", "19:15", "19:30", "19:45"].map((time, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium border border-[#D4A853] text-white/90"
                >
                  {time}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </button>
  );
}
