// app/explore/page.tsx
"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import MapView from "@/components/MapView";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header"; // Ensure Header is used here if not in layout

// Interface for Restaurant (Must be consistent)
interface Restaurant {
  id: string;
  name: string;
  rating: number;
  price: string;
  cuisine: string;
  location: string;
  neighborhood: string;
  image: string;
  tags: string[];
  x: number;
  y: number;
}

// Mock data (from your provided explore page code)
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La coco",
    rating: 4.5,
    price: "40€",
    cuisine: "Eatern Asia",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.78,
    y: 0.5,
  },
  {
    id: "2",
    name: "Pop Tate",
    rating: 4.2,
    price: "35€",
    cuisine: "Zen Zone",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.86,
    y: 0.44,
  },
  {
    id: "3",
    name: "Social",
    rating: 4.8,
    price: "50€",
    cuisine: "Cool Cafe",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.74,
    y: 0.46,
  },
  {
    id: "4",
    name: "KFC",
    rating: 4.0,
    price: "25€",
    cuisine: "Fast Food",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.7,
    y: 0.42,
  },
  {
    id: "5",
    name: "Dominos",
    rating: 4.3,
    price: "30€",
    cuisine: "Pizza",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.67,
    y: 0.48,
  },
  {
    id: "6",
    name: "Mainsonnaire",
    rating: 4.7,
    price: "60€",
    cuisine: "Fine Dining",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.72,
    y: 0.38,
  },
  {
    id: "7",
    name: "La Cena",
    rating: 4.6,
    price: "45€",
    cuisine: "Italian",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.62,
    y: 0.36,
  },
  {
    id: "8",
    name: "Spotlight",
    rating: 4.4,
    price: "55€",
    cuisine: "Modern Cuisine",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image: "/placeholder.svg",
    tags: ["19:00", "19:30", "20:00", "20:30"],
    x: 0.58,
    y: 0.62,
  },
];

export default function ExplorePage() {
  const [time, setTime] = useState("19:00");
  const [date, setDate] = useState("2025-10-05");
  const [guests, setGuests] = useState(7);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const golden = "#BC995D";

  const markers = useMemo(() => mockRestaurants, []);

  return (
    <div className="min-h-screen bg-[#0E1A2B]">
      {/* Header component is assumed to be handled by the parent layout or included here if necessary */}
      <Header lang="EN" setLang={() => {}} />

      {/* Hero Section - The Booking Filter Bar */}
      <div
        className="w-full bg-[#0E1A2B] pb-6 pt-32" // Adjusted padding to account for fixed header
        style={{
          background:
            "radial-gradient(7.64% 111.53% at 0% 77.22%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.81% 67.5% at 96.67% 44.69%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(14.14% 32.54% at 1.11% -0.19%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(19.69% 150.83% at 101.94% 6.59%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.97% 68.75% at -3.75% 22.84%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), #0E1A2B",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="w-full max-w-[1200px] mx-auto p-6 md:p-8 rounded-2xl border border-white bg-gradient-to-b from-[rgba(33,60,98,0.55)] to-[rgba(0,0,0,0.55)] shadow-md backdrop-blur-md">
            <h3 className="text-white text-base font-medium mb-4">
              Refine Search
            </h3>
            {/* Booking form inputs from your provided code */}
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
              <button
                className={`px-10 md:px-12 py-3.5 rounded-md text-white text-sm font-medium text-center`}
                style={{ backgroundColor: golden }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: List and Map */}
      <div className="max-w-[1400px] mx-auto px-[42px] py-8">
        <div className="flex gap-6">
          {/* Restaurant List */}
          <div className="flex-1 grid grid-cols-2 gap-5">
            {mockRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          {/* Map View */}
          <div className="w-[426px] h-[800px] sticky top-8 hidden lg:block">
            <MapView
              markers={markers}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
