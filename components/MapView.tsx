// components/MapView.tsx
"use client";

import React, { useMemo } from "react";
// Import from the required library (You must install @react-google-maps/api)
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Libraries to load (must be installed)
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem", // rounded-lg
};

// Interface remains the same.
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
  lat: number;
  lng: number;
  onSelect?: (id: string | number | null) => void;
}

interface MapViewProps {
  markers?: MapMarker[];
  selectedId?: string | number | null;
  onSelect?: (id: string | number | null) => void;
  center: { lat: number; lng: number };
}

export default function MapView({
  markers = [],
  selectedId = null,
  onSelect,
  center,
}: MapViewProps) {
  const router = useRouter();
  const golden = "#D4A853";
  const deepBlue = "#0E1A2B";

  // Dynamic positioning based on screen size
  const getCardPosition = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      // Tablet landscape: position at bottom
      if (width >= 768 && width <= 1024) {
        return {
          bottom: "12px",
          left: "12px",
          top: "auto",
          right: "auto",
        };
      }
    }
    // Default: top-left for mobile and desktop
    return {
      top: "12px",
      left: "12px",
      bottom: "auto",
      right: "auto",
    };
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    // libraries: libraries as any,
  });

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

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      // Using a placeholder dark style
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
      ],
    }),
    []
  );

  if (loadError)
    return (
      <div className="p-12 text-center text-red-500">
        Error loading maps. Check API Key.
      </div>
    );
  if (!isLoaded)
    return (
      <div className="p-12 flex items-center justify-center text-white h-full w-full">
        Loading Map...
      </div>
    );

  return (
    // Responsive container that works with parent sticky positioning
    <div className="w-full h-full rounded-lg bg-[#0E1A2B] overflow-hidden shadow-2xl">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onClick={() => onSelect?.(null)} // Deselect when clicking on map background
      >
        {/* 2. Markers - Improved interaction */}
        {list.map((m) => {
          const isSelected = String(selectedId) === String(m.id);

          return (
            <MarkerF
              key={m.id}
              position={{ lat: m.lat, lng: m.lng }}
              // Simplified interaction - only onClick to prevent overlapping on hover
              onClick={() => {
                // Toggle selection: if already selected, deselect, otherwise select
                if (isSelected) {
                  onSelect?.(null);
                } else {
                  onSelect?.(m.id);
                }
              }}
              // Enhanced marker styling
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                fillColor: isSelected ? "#D4A853" : "#22c55e", // Golden when selected, green otherwise
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
                scale: isSelected ? 3 : 2.2,
              }}
            >
              {/* Marker content logic is handled by the onSelect and the selected pop-up */}
            </MarkerF>
          );
        })}
      </GoogleMap>

      {/* 3. Selected Restaurant Preview Card (Positioned to avoid overlapping) */}
      {selected && (
        <div
          className={cn(
            "absolute z-50 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[340px] rounded-lg md:rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-white/30 transition-all duration-300 ease-out"
          )}
          style={{
            ...getCardPosition(),
            position: "absolute",
            backgroundColor: deepBlue,
            maxWidth: "calc(100% - 24px)",
            maxHeight: "calc(100% - 24px)",
            zIndex: 1000,
          }}
        >
          {/* Image Area with Close button */}
          <div
            className="relative h-16 sm:h-20 md:h-24 lg:h-28 bg-cover bg-center"
            style={{
              backgroundImage: `url(${selected.image})`,
              backgroundSize: "cover",
            }}
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <button
              type="button"
              onClick={handleCloseClick}
              aria-label="Close"
              className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 p-1 sm:p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white z-40 transition-colors"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Content Box - Compact for tablet */}
          <div
            className="p-2.5 sm:p-3 md:p-3.5 lg:p-4"
            style={{ backgroundColor: deepBlue }}
          >
            <div className="flex flex-col space-y-1.5 sm:space-y-2">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white truncate leading-tight">
                {selected.name}
              </h2>
              <p className="text-xs text-white/80 truncate">
                {selected.cuisine} • {selected.location}
              </p>

              {/* Rating and Price - More compact */}
              {selected.rating && selected.price && (
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-xs text-green-400 font-medium">
                    ⭐ {selected.rating}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-bold">
                    {selected.price}
                  </span>
                </div>
              )}

              <button
                onClick={handleDetailsClick}
                className="w-full py-1.5 sm:py-2 mt-2 sm:mt-3 rounded-md font-medium text-xs transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900"
                style={{
                  backgroundColor: golden,
                  color: deepBlue,
                  // focusRingColor: golden,
                }}
              >
                View Details
              </button>
            </div>
          </div>
          
          {/* Pointer arrow below the card */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: `10px solid ${deepBlue}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
