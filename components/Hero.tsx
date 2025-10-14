// components/Hero.tsx
"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Assuming ui components are installed

export default function Hero() {
  const router = useRouter();
  const golden = "#BC995D";

  // Mock search state
  const [time, setTime] = useState("19:00");
  const [date, setDate] = useState("2025-10-05");
  const [guests, setGuests] = useState(7);
  const [location, setLocation] = useState("Sofia");

  const handleSearchClick = () => {
    // 3. Hero search button navigates to explore page with search params
    router.push(
      `/explore?time=${time}&date=${date}&guests=${guests}&loc=${location}`
    );
  };

  return (
    <div
      className="w-full pb-6"
      // Using the background logic from the explore page code provided
      style={{
        background:
          "radial-gradient(7.64% 111.53% at 0% 77.22%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.81% 67.5% at 96.67% 44.69%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(14.14% 32.54% at 1.11% -0.19%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(19.69% 150.83% at 101.94% 6.59%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.97% 68.75% at -3.75% 22.84%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), #0E1A2B",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 pt-32 pb-16">
        {/* Simplified main hero content block for visibility */}
        <div className="text-center max-w-[514px] mx-auto mb-10">
          <h1 className="font-dm-sans text-6xl font-light tracking-tight text-white mb-4">
            Premium Venues Await Your Booking
          </h1>
        </div>

        {/* Booking Form Widget */}
        <div className="w-full max-w-[664px] mx-auto p-8 rounded-2xl border border-white bg-gradient-to-b from-[rgba(33,60,98,0.55)] to-[rgba(0,0,0,0.55)] shadow-md backdrop-blur-md">
          <h3 className="text-white text-base font-medium mb-4">
            Book a Table
          </h3>
          <div className="flex flex-wrap items-end gap-6 md:gap-10">
            {/* Location (Input here, but should integrate with LocationSearchPopover later) */}
            <div className="flex-1 min-w-[140px]">
              <label className="text-white/50 text-xs mb-1 block">
                Location
              </label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-white/40 text-white"
              />
            </div>
            {/* Time */}
            <div className="flex-1 min-w-[120px]">
              <label className="text-white/50 text-xs mb-1 block">Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent border-white/40 text-white"
              />
            </div>
            {/* Date */}
            <div className="flex-1 min-w-[140px]">
              <label className="text-white/50 text-xs mb-1 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent border-white/40 text-white"
              />
            </div>
            {/* Guests */}
            <div className="flex-1 min-w-[120px]">
              <label className="text-white/50 text-xs mb-1 block">Guests</label>
              <Input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent border-white/40 text-white"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className={`px-10 md:px-12 py-3.5 rounded-md text-white text-sm font-medium text-center`}
              style={{ backgroundColor: golden }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
