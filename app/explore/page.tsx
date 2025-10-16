// app/explore/page.tsx
"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import MapView, { MapMarker } from "@/components/MapView";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

// --- FIX: Import the new data file and type directly ---
import { restaurants } from "@/lib/data/restaurants";

export default function ExplorePage() {
  const searchParams = useSearchParams();

  // State for search/filter bar inputs
  const [time, setTime] = useState(searchParams.get("time") || "19:00");
  const [date, setDate] = useState(searchParams.get("date") || "2025-10-05");
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 7);

  // State for map/list interaction (uses string ID for component compatibility)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lang, setLang] = useState<"EN" | "BG">("EN");

  // FIX: Convert number IDs to string IDs for MapView compatibility
  const markers: MapMarker[] = useMemo(
    () => restaurants.map((r) => ({ ...r, id: String(r.id), image: r.image })),
    []
  );

  // Handler for search button

  // FIX: Helper to convert number ID from data to string for component props
  const handleSelect = (id: number | null) => {
    setSelectedId(id ? String(id) : null);
  };

  return (
    <div className="min-h-screen bg-[#0E1A2B] flex flex-col">
      <Header lang={lang} setLang={setLang} isTransparent={false} />

      {/* Filter */}
      <div>
        <div className="flex-1 max-w-[800px] mx-auto px-[30px]">
          <div className="w-full p-6 md:p-8 rounded-xl border border-[#eec212] bg-gradient-to-b from-[rgba(33,60,98,0.55)] to-[rgba(0,0,0,0.55)] shadow-md backdrop-blur-md">
            <div className="flex flex-wrap items-end gap-6 md:gap-10">
              <div className="flex-1 min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">Time</label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-transparent border-white/40 text-white"
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent border-white/40 text-white"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Guests
                </label>
                <Input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-transparent border-white/40 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: List and Map */}
      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto px-[42px] py-8">
          <div className="flex gap-6">
            {/* Left Column: Restaurant List */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  // FIX: Pass string ID to components expecting string ID
                  id={String(restaurant.id)}
                  name={restaurant.name}
                  rating={restaurant.rating}
                  price={restaurant.price}
                  cuisine={restaurant.cuisine}
                  location={restaurant.location}
                  neighborhood={restaurant.neighborhood}
                  image={restaurant.image}
                  tags={restaurant.tags}
                  // FIX: Convert selected ID back to string
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Right Column: Map View */}
            <div className="hidden lg:block w-[426px]">
              <MapView
                markers={markers}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
