// components/MapView.tsx
"use client";

import React from "react";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  x: number; // Normalized X coordinate (0 to 1)
  y: number; // Normalized Y coordinate (0 to 1)
}

interface MapViewProps {
  markers: Restaurant[];
  selectedId: string | number | null;
  onSelect: (id: string | number | null) => void;
}

export default function MapView({
  markers,
  selectedId,
  onSelect,
}: MapViewProps) {
  const golden = "#BC995D";

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gray-300">
      <Image
        // Placeholder for a map image
        src="https://images.unsplash.com/photo-1549490349-87436b6ff9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2l0eSUyMG1hcHxlbnwxfHx8fDE3NTk5NTc4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Map of locations"
        fill
        className="object-cover"
      />

      {/* Map Control - Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-white rounded-full p-3 shadow-md flex items-center justify-between">
        <input
          type="text"
          placeholder="Search the map"
          className="flex-1 text-sm outline-none text-gray-800"
        />
        <Search className="w-5 h-5 text-gray-500" />
      </div>

      {/* Markers */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className={cn(
            "absolute flex items-center justify-center p-1 rounded-full shadow-lg transition-all cursor-pointer",
            marker.id === selectedId
              ? "bg-red-500 ring-4 ring-red-300 z-20 w-8 h-8"
              : "bg-[#213C62] w-6 h-6 z-10 hover:scale-125"
          )}
          style={{
            top: `${marker.y * 100}%`,
            left: `${marker.x * 100}%`,
            transform: `translate(-50%, -50%)`,
            backgroundColor: marker.id === selectedId ? golden : "#213C62",
          }}
          onClick={() => onSelect(marker.id)}
        >
          <MapPin className="w-4 h-4 text-white" />

          {/* Tooltip/Label */}
          {marker.id === selectedId && (
            <div className="absolute bottom-full mb-2 bg-white text-gray-800 p-2 rounded-md whitespace-nowrap text-xs">
              {marker.name} ({marker.rating})
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
