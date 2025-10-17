// components/MapView.tsx
"use client";

import React, { useMemo } from "react";
// Import from the required library (You must install @react-google-maps/api)
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Libraries to load (must be installed)
const libraries = ["places"];
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
    // FIX 1 & 4: Smaller size (h-[500px]) and relies on sticky top-8 (from parent) for fixed position.
    <div className="sticky top-8 w-full h-[500px] rounded-lg bg-[#0E1A2B] overflow-hidden shadow-2xl">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        {/* 2. Markers */}
        {list.map((m) => {
          const isSelected = String(selectedId) === String(m.id);

          return (
            <MarkerF
              key={m.id}
              position={{ lat: m.lat, lng: m.lng }}
              // FIX 3: Change interaction to HOVER/MOUSE ENTER/LEAVE
              onClick={() => onSelect?.(m.id)} // Keep onClick for mobile/touch
              onMouseOver={() => onSelect?.(m.id)}
              onMouseOut={() => onSelect?.(null)}
              // FIX 3: Custom icon style based on selection
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", // Standard map pin SVG path
                fillColor: isSelected ? "#FF0000" : "#22c55e", // Red marker on hover/select
                fillOpacity: 1,
                strokeWeight: 0,
                scale: isSelected ? 2.5 : 2,
              }}
            >
              {/* Marker content logic is handled by the onSelect and the selected pop-up */}
            </MarkerF>
          );
        })}
      </GoogleMap>

      {/* 3. Selected Restaurant Preview Card (Absolute positioned over the map) */}
      {selected && (
        <div
          className={cn(
            "absolute z-50 w-[300px] md:w-[340px] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/30 transition-transform duration-300 ease-out"
          )}
          style={{
            top: "20px",
            right: "20px",
            position: "absolute",
            backgroundColor: deepBlue,
          }}
        >
          {/* Image Area with Bookmark/Close (omitted for brevity) */}
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
              <h2 className="text-xl font-normal text-white truncate">
                {selected.name}
              </h2>
              <p className="text-sm text-white/80">
                {selected.cuisine} • {selected.location}
              </p>
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
  );
}
