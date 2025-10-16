// components/LocationSearchPopover.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
interface LocationSearchPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

// Mock data based on your image and provided structure
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

export function LocationSearchPopover({
  isOpen,
  onClose,
  onSelectLocation,
}: LocationSearchPopoverProps) {
  const golden = "#D4A853";
  const [selectedMetro, setSelectedMetro] = React.useState(mockMetroRegions[0]);

  const handleSelect = (regionName: string) => {
    onSelectLocation(regionName);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Set side to 'top' or 'right' if you want a different look. 'bottom' is common for mobile. */}
      <SheetContent
        side="top"
        className="h-auto max-h-[90vh] sm:max-w-4xl rounded-b-xl overflow-hidden bg-[#0A1E3C] border-t border-[#1A2E4C] p-0"
      >
        <SheetHeader className="p-4 border-b border-gray-700 flex-row items-center justify-between">
          <SheetTitle className="text-white text-xl">
            Select Location
          </SheetTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </SheetHeader>

        <div className="flex">
          {/* Metro Column */}
          <div
            className="w-1/3 border-r border-gray-700 overflow-y-auto"
            style={{ maxHeight: "calc(90vh - 64px)" }}
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
                  color: selectedMetro.name === metro.name ? golden : undefined,
                }}
              >
                <span>{metro.name}</span>
                <ChevronRight className="w-4 h-4" />
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
            style={{ maxHeight: "calc(90vh - 64px)" }}
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
      </SheetContent>
    </Sheet>
  );
}
