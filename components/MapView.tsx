// components/MapView.tsx
"use client";

import React from "react";
import Image from "next/image";
import { X, Star, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Interface must match the card properties plus map coordinates
export interface MapMarker {
  id: string | number;
  name: string;
  rating: number;
  price: string;
  cuisine: string;
  location: string;
  image: string;
  priceAlt?: string;
  address?: string;
  tags?: string[];
  distance?: string;
  bookedTimes?: number;
  countdown?: string;
  reviews: string;
  x: number; // 0..1 (left %)
  y: number; // 0..1 (top %)
}

interface MapViewProps {
  markers?: MapMarker[];
  selectedId?: string | number | null;
  onSelect?: (id: string | number | null) => void;
}

export default function MapView({
  markers = [],
  selectedId = null,
  onSelect,
}: MapViewProps) {
  const router = useRouter();
  const golden = "#D4A853";
  const deepBlue = "#0E1A2B";

  const list = Array.isArray(markers) ? markers : [];
  const selected = list.find((m) => String(m.id) === String(selectedId));

  const handleDetailsClick = () => {
    if (selected) {
      router.push(`/venue/${selected.id}`);
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(null);
  };

  const countdown = "19:59:43";

  // FIX: Dynamic position calculation for the pop-up
  const popupStyle = selected
    ? {
        // Position based on marker coordinates (absolute requires top/left in percent)
        left: `${selected.x * 100}%`,
        top: `${selected.y * 100}%`,
        // Translate to center the card horizontally (-50%) and lift it above the marker (-100%) plus margin (-20px)
        // The -20px is a guess for the gap between marker and card.
        transform: "translate(-50%, -100%) translateY(-20px)",
      }
    : {};

  return (
    // FIX: Set explicit overflow-hidden
    <div className="sticky top-8 w-full h-[713px] rounded-lg bg-[#0E1A2B] overflow-hidden shadow-2xl">
      <div className="relative w-full h-full">
        {/* FIX 1: Map Image (Using Image component and smaller size) */}
        <Image
          src="/map.png"
          alt="Map"
          fill
          className="object-cover scale-[1.1] md:scale-[1.0] transition-transform duration-500" // FIX: Small scale factor to make it look slightly smaller/more contained
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized
        />

        {/* 2. Markers */}
        {list.map((m) => {
          const isSelected = String(selectedId) === String(m.id);

          return (
            <button
              key={m.id}
              type="button"
              aria-label={`Select ${m.name}`}
              onClick={() => onSelect?.(m.id)}
              onMouseEnter={() => onSelect?.(m.id)}
              onMouseLeave={() => onSelect?.(null)}
              className={cn(
                "absolute w-3.5 h-3.5 rounded-full border-[3px] border-white transition-all -translate-x-1/2 -translate-y-1/2",
                isSelected
                  ? "bg-golden ring-4 ring-golden/60 scale-125 z-40"
                  : "bg-[#22c55e] hover:scale-110 z-30"
              )}
              style={{
                left: `${m.x * 100}%`,
                top: `${m.y * 100}%`,
                backgroundColor: isSelected ? golden : "#22c55e",
              }}
            >
              {/* Optional: Show MapPin icon when selected for extra visibility */}
              {isSelected ? (
                <MapPin className="w-3 h-3 text-white mx-auto translate-y-[-2px]" />
              ) : null}
            </button>
          );
        })}

        {/* 3. Selected Restaurant Preview Card (Updated to follow marker location) */}
        {selected && (
          <div
            // FIX: Removed fixed top-4 right-4 and applied dynamic positioning via inline style
            className="absolute z-50 w-[300px] md:w-[340px] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/30 transition-transform duration-300 ease-out"
            style={popupStyle} // Apply dynamic position and transform
          >
            {/* Image Area with Bookmark/Close */}
            <div
              className="relative h-24 md:h-32 bg-cover bg-center"
              style={{
                backgroundImage: `url(${selected.image})`,
                backgroundSize: "cover",
              }}
            >
              <button
                type="button"
                onClick={handleCloseClick}
                aria-label="Close"
                className="absolute right-3 top-3 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white z-40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Box */}
            <div className="p-4" style={{ backgroundColor: deepBlue }}>
              <div className="flex flex-col space-y-2">
                {/* Row 1: Name, Rating, and Price */}
                <div className="flex flex-col">
                  <h2 className="text-xl font-normal text-white truncate">
                    {selected.name}
                  </h2>

                  <div className="flex items-center justify-between mt-1">
                    {/* Price and Price Alt (Left side) */}
                    <div className="flex flex-col justify-start">
                      <p className="text-2xl font-bold text-white">
                        {selected.price}
                      </p>
                      <p className="text-xs text-white/50">
                        {selected.priceAlt || "—"}
                      </p>
                    </div>

                    {/* Rating Badge (Right side) */}
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#125604] w-fit">
                        <span className="text-white text-sm font-semibold mr-1">
                          G
                        </span>
                        <Star
                          size={14}
                          className="text-[#D4A853] fill-[#D4A853] mr-1"
                        />
                        <span className="text-sm font-medium text-white">
                          {selected.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-white/70 ml-1">
                          ({selected.reviews || "—"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Distance and Countdown */}
                <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                  {/* Distance */}
                  <div className="text-sm text-white/70">
                    {selected.distance || "1 km"} away
                  </div>

                  {/* Countdown Clock */}
                  {countdown && (
                    <div
                      className="flex items-center px-3 py-1 rounded-md text-sm font-mono text-[#FF5656]"
                      style={{ backgroundColor: "#A0522D" }}
                    >
                      <Clock size={14} className="mr-1" />
                      {countdown}
                    </div>
                  )}
                </div>

                {/* Row 3: Details and Booked Count */}
                <div className="space-y-1 border-t border-gray-700 pt-3">
                  <p className="text-sm text-white/80">
                    {selected.cuisine} • {selected.location}
                  </p>
                  {selected.bookedTimes && (
                    <p className="text-xs text-white/60">
                      Booked {selected.bookedTimes} times Today
                    </p>
                  )}
                </div>

                {/* Button to navigate to details page */}
                <button
                  onClick={handleDetailsClick}
                  className="w-full py-2 mt-4 rounded-md font-medium text-sm transition-colors"
                  style={{ backgroundColor: golden, color: deepBlue }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
