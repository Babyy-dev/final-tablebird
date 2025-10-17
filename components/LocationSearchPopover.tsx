// components/LocationSearchPopover.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data (omitted for brevity)
const mockMetroRegions = [
  { name: "Adelaide", count: 367, regions: ["All India", "Mumbai", "Pune"] },
  { name: "Brisbane", count: 60, regions: ["Bangalore", "Delhi", "Odisha"] },
  {
    name: "Canberra",
    count: 31,
    regions: ["Maharashtra", "Tamil Nadu", "Punjab"],
  },
  { name: "India", count: 52, regions: ["All India", "Mumbai", "Delhi"] },
  { name: "Gold Coast", count: 45, regions: ["Pune", "Bangalore", "Odisha"] },
  {
    name: "Melbourne",
    count: 1,
    regions: ["Tamil Nadu", "Punjab", "Maharashtra"],
  },
];

interface LocationSearchPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

export function LocationSearchPopover({
  isOpen,
  onClose,
  onSelectLocation,
}: LocationSearchPopoverProps) {
  const golden = "#D4A853";
  const [selectedMetro, setSelectedMetro] = React.useState(mockMetroRegions[0]);

  const handleSelect = (regionName: string) => {
    onSelectLocation(regionName);
    onClose(); // Close on selection
  };

  // Custom height logic for the two columns
  const contentMaxHeight = "calc(90vh - 120px)";

  // Render nothing if closed to avoid DOM clutter
  if (!isOpen) return null;

  return (
    // Outer container: Fixed position to anchor popover over the whole page
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Backdrop overlay (faded black, closes popover when clicked outside) */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* The Actual Popover Content: Fixed, anchored below the header, aligned with the right desktop padding. 
          The right position is set to match the header's right padding, ensuring it drops directly below the header elements.
      */}
      <div
        className={cn(
          "absolute z-50 w-[350px] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 pointer-events-auto",
          // Frosted Glass Look: semi-transparent black background + heavy blur + white border
          "bg-black/60 backdrop-blur-xl border-white/20 border p-0",
          // Position: top-[72px] clears the Header height.
          // right-4 aligns it with mobile padding.
          // lg:right-14 aligns it with the desktop padding (px-14 in Header).
          "hidden sm:flex flex-col top-[72px] right-4 lg:right-14"
        )}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex-row items-center justify-between flex">
            <h2 className="text-white text-xl font-semibold">
              Select Location
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex">
            {/* Metro Column */}
            <div
              className="w-1/3 border-r border-gray-700 overflow-y-auto"
              style={{ maxHeight: contentMaxHeight }}
            >
              <div className="p-2 text-gray-400 font-bold text-sm">Metro</div>
              {mockMetroRegions.map((metro) => (
                <div
                  key={metro.name}
                  onClick={() => setSelectedMetro(metro)}
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer transition",
                    selectedMetro.name === metro.name
                      ? "bg-[#1A2E4C] text-[#D4A853]"
                      : "text-white hover:bg-[#1A2E4C]"
                  )}
                  style={{
                    color:
                      selectedMetro.name === metro.name ? golden : undefined,
                  }}
                >
                  <span>{metro.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
              <div className="p-3">
                <Link
                  href="#"
                  className="text-[#D4A853] text-sm hover:underline"
                  style={{ color: golden }}
                >
                  Full list of Metros
                </Link>
              </div>
            </div>

            {/* Region Column */}
            <div
              className="w-2/3 overflow-y-auto"
              style={{ maxHeight: contentMaxHeight }}
            >
              <div className="p-2 text-gray-400 font-bold text-sm">Region</div>
              {selectedMetro.regions.map((region) => (
                <div
                  key={region}
                  onClick={() => handleSelect(region)}
                  className="flex items-center justify-between p-3 cursor-pointer text-white hover:bg-[#1A2E4C] transition"
                >
                  <span>{region}</span>
                  <span className="text-gray-400 text-sm">
                    {selectedMetro.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
