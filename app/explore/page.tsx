// app/explore/page.tsx
"use client";

import { useMemo, useState, Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import MapView, { MapMarker } from "@/components/MapView";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

import { restaurants } from "@/lib/data/restaurants";

// Component that handles the core UI and logic, receiving search data as props
interface ExploreContentProps {
  initialTime: string;
  initialDate: string;
  initialGuests: number;
}
function ExploreContent({
  initialTime,
  initialDate,
  initialGuests,
}: ExploreContentProps) {
  const golden = "#D4A853"; // Standardized golden color

  const [time, setTime] = useState(initialTime);
  const [date, setDate] = useState(initialDate);
  const [guests, setGuests] = useState(initialGuests);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lang, setLang] = useState<"EN" | "BG">("EN");

  const markers: MapMarker[] = useMemo(
    () => restaurants.map((r) => ({ ...r, id: String(r.id), image: r.image })),
    []
  );

  const handleSelect = (id: number | null) => {
    setSelectedId(id ? String(id) : null);
  };

  return (
    <div className="min-h-screen bg-[#0E1A2B] flex flex-col">
      <Header lang={lang} setLang={setLang} isTransparent={false} />

      {/* Filter Bar */}
      <div>
        <div className="flex-1 max-w-[800px] mx-auto px-[30px]">
          {/* FIX: Use standardized golden color for border and inline styling for dark theme opacity */}
          <div
            className="w-full p-6 md:p-8 rounded-xl border"
            style={{
              borderColor: golden,
              backgroundColor: "rgba(33,60,98,0.55)",
            }}
          >
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
                  id={String(restaurant.id)}
                  name={restaurant.name}
                  rating={restaurant.rating}
                  price={restaurant.price}
                  cuisine={restaurant.cuisine}
                  location={restaurant.location}
                  neighborhood={restaurant.neighborhood}
                  image={restaurant.image}
                  tags={restaurant.tags}
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

// Dedicated component to use the hook and pass initial values
function SearchParamsLoader() {
  const searchParams = useSearchParams();

  const initialTime = searchParams.get("time") || "19:00";
  const initialDate = searchParams.get("date") || "2025-10-05";
  const initialGuests = Number(searchParams.get("guests")) || 7;

  return (
    <ExploreContent
      initialTime={initialTime}
      initialDate={initialDate}
      initialGuests={initialGuests}
    />
  );
}

// Default export uses Suspense around the component that uses the hook.
export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E1A2B] flex items-center justify-center text-white text-xl">
          Loading Map and Filters...
        </div>
      }
    >
      <SearchParamsLoader />
    </Suspense>
  );
}
