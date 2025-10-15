// components/MapView.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { X, Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { RestaurantCardProps } from "./RestaurantCard";

// Extend MapMarker interface to include all card props needed for the preview
export interface MapMarker extends Omit<RestaurantCardProps, "onSelect"> {
  id: string; // Ensure ID is string for marker system
  x: number; // 0..1 (left %)
  y: number; // 0..1 (top %)
}

interface MapViewProps {
  markers?: MapMarker[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function MapView({
  markers = [],
  selectedId = null,
  onSelect,
}: MapViewProps) {
  const golden = "#BC995D";
  const deepBlue = "#0E1A2B";
  const router = useRouter();

  const list: MapMarker[] = useMemo(
    () => (Array.isArray(markers) ? markers : []),
    [markers]
  );
  const selected = list.find((m) => m.id === selectedId);

  const handleMarkerClick = (id: string) => {
    onSelect(id);
  };

  const handleDetailsClick = () => {
    if (selected) {
      router.push(`/venue/${selected.id}`);
    }
  };

  const handleCloseClick = () => {
    onSelect(null);
  };

  return (
    <div className="sticky top-8 w-full h-[713px] rounded-xl bg-gray-300 overflow-hidden shadow-2xl">
      <div className="relative w-full h-full">
        {/* Background Map Image */}
        <Image
          src="/map.png"
          alt="Map"
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Map Markers */}
        {list.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-label={`Select ${m.name}`}
            onClick={() => handleMarkerClick(m.id)}
            onMouseEnter={() => onSelect(m.id)}
            onMouseLeave={() => onSelect(null)}
            className={cn(
              "absolute w-8 h-8 rounded-full border-[3px] border-white transition-transform -translate-x-1/2 -translate-y-1/2",
              selectedId === m.id
                ? "ring-4 ring-golden/60 scale-110"
                : "hover:scale-110"
            )}
            style={{
              left: `${m.x * 100}%`,
              top: `${m.y * 100}%`,
              backgroundColor: selectedId === m.id ? golden : "#22c55e", // Use green for unselected
            }}
          >
            {selectedId === m.id ? (
              <MapPin className="w-4 h-4 text-white mx-auto" />
            ) : null}
          </button>
        ))}

        {/* Selected Restaurant Preview Card */}
        {selected && (
          <div className="absolute right-4 top-4 w-[330px] rounded-xl border border-white/30 bg-black/40 backdrop-blur-md overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)] z-30">
            <div className="relative h-[190px]">
              {/* Image with gradient overlay */}
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="absolute inset-0 object-cover"
              />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)`,
                }}
              />

              <button
                type="button"
                onClick={handleCloseClick}
                aria-label="Close"
                className="absolute right-2 top-2 p-1 rounded-md bg-black/50 text-white hover:bg-black/70 z-40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4 bg-[#1A2E4C]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-lg font-semibold">
                  {selected.name}
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-xs font-medium">
                  {selected.price}
                </span>
              </div>

              {/* Rating and Location */}
              <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="#22c55e"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.953L10 0l2.951 5.957 6.561.953-4.756 4.635 1.122 6.545z" />
                </svg>
                <span>{selected.rating ?? "4.5"}</span>
                <span className="mx-1">•</span>
                <MapPin className="w-4 h-4" />
                <span>{selected.location}</span>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mb-3">
                {(selected.tags ?? []).slice(0, 4).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{ backgroundColor: golden, color: deepBlue }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Navigation Button */}
              <button
                onClick={handleDetailsClick}
                className="w-full py-2 rounded-md font-medium hover:brightness-105 transition-colors"
                style={{ backgroundColor: golden, color: deepBlue }}
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
