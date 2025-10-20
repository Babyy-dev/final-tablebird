// app/location/[location]/page.tsx
"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data (same as used in the original LocationPage.tsx)
const restaurantData = [
  {
    id: 1,
    name: "Sauterelle",
    image:
      "https://images.unsplash.com/photo-1661422586023-681ea60507e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5ODcxNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Royal Exchange, Bank",
    rating: 4.5,
    reviews: 1250,
    cuisineType: ["French", "European"],
    priceRange: "£££",
    available: true,
    tags: ["Fine Dining", "Romantic"],
  },
  {
    id: 2,
    name: "Sky Garden",
    image:
      "https://images.unsplash.com/photo-1655140026236-9292f2d3d3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudCUyMG5pZ2h0fGVufDF8fHx8MTc1OTk1NTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "20 Fenchurch Street",
    rating: 4.3,
    reviews: 2100,
    cuisineType: ["British", "Modern"],
    priceRange: "££££",
    available: true,
    tags: ["Rooftop", "Views"],
  },
  {
    id: 3,
    name: "The Ivy Chelsea Garden",
    image:
      "https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxvdXRkb29yJTIwcmVzdGF1cmFudCUyMHRlcnJhY2V8ZW58MXx8fHwxNzU5OTMzMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "197 King's Road, Chelsea",
    rating: 4.6,
    reviews: 3400,
    cuisineType: ["British", "International"],
    priceRange: "£££",
    available: true,
    tags: ["Outdoor", "Garden"],
  },
  // ... (add more mock data for realistic testing if available)
];

interface LocationPageProps {
  params: {
    location: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const { location } = params;
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const golden = "#D4A853";

  const locationName = useMemo(
    () =>
      location
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "London",
    [location]
  );

  // MOCK: Filter logic is simplified to only use the tags/category, ignoring actual location string for now.
  const filteredRestaurants = useMemo(() => {
    if (selectedFilter === "all") {
      return restaurantData;
    }
    const filterTerm = selectedFilter.replace("-", " ");
    return restaurantData.filter(
      (r) =>
        r.tags.some((tag) => tag.toLowerCase().includes(filterTerm)) ||
        r.cuisineType.some((cuisine) =>
          cuisine.toLowerCase().includes(filterTerm)
        )
    );
  }, [selectedFilter]);

  // Map Drag/Zoom Handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y,
    });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const filterOptions = [
    { id: "all", label: "All", icon: "🍽️" },
    { id: "fine-dining", label: "Fine Dining", icon: "⭐" },
    { id: "rooftop", label: "Rooftop", icon: "🏙️" },
    { id: "outdoor", label: "Outdoor", icon: "🌳" },
    { id: "casual", label: "Casual", icon: "☕" },
    { id: "romantic", label: "Romantic", icon: "💝" },
  ];

  return (
    <div className="min-h-screen bg-[#0A1E3C]">
      {/* Header */}
      <div className="bg-[#0F2744] border-b border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center gap-2 text-xs md:text-sm mb-3 md:mb-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#D4A853] transition"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#D4A853]">{locationName}</span>
          </div>
          <h1 className="text-white text-xl md:text-3xl">
            Searching in:{" "}
            <span className="text-[#D4A853]">{locationName.toUpperCase()}</span>
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0A1E3C] border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 md:gap-2 text-sm md:text-base ${
                  selectedFilter === filter.id
                    ? "bg-[#D4A853] text-[#0A1E3C]"
                    : "bg-[#1A2E4C] text-white hover:bg-[#2A3E5C]"
                }`}
                style={{
                  backgroundColor:
                    selectedFilter === filter.id ? golden : "#1A2E4C",
                  color: selectedFilter === filter.id ? "#0A1E3C" : "white",
                }}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row">
        {/* Restaurant List - Left Side */}
        <div
          className="w-full lg:w-[55%] p-4 md:p-6 space-y-3 md:space-y-4 lg:overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => router.push(`/destination/${restaurant.id}`)}
              className="bg-[#1A2E4C] rounded-lg overflow-hidden hover:bg-[#2A3E5C] transition cursor-pointer border border-gray-700"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white text-xl mb-2">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>
                  {/* Status Badge */}
                  {restaurant.available ? (
                    <span className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm">
                      <Check className="h-4 w-4" />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm">
                      <X className="h-4 w-4" />
                      <span>Unavailable</span>
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(restaurant.rating)
                            ? "fill-[#D4A853] text-[#D4A853]"
                            : "text-gray-600"
                        }`}
                        style={{
                          fill:
                            i < Math.floor(restaurant.rating)
                              ? golden
                              : "transparent",
                          color:
                            i < Math.floor(restaurant.rating)
                              ? golden
                              : "#4B5563",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[#D4A853]" style={{ color: golden }}>
                    {restaurant.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({restaurant.reviews} reviews)
                  </span>
                </div>

                {/* Tags and Price */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {restaurant.cuisineType.map((cuisine, idx) => (
                      <span
                        key={idx}
                        className="text-[#0A1E3C] px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: golden, color: "#0A1E3C" }}
                      >
                        {cuisine}
                      </span>
                    ))}
                    {restaurant.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded text-sm border border-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[#D4A853] text-lg"
                    style={{ color: golden }}
                  >
                    {restaurant.priceRange}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map - Right Side (Sticky) */}
        <div className="w-full lg:w-[45%] h-[400px] lg:h-screen p-4 md:p-6 sticky top-0">
          <div
            ref={mapRef}
            className="w-full h-full rounded-lg relative overflow-hidden select-none"
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              backgroundColor: "#E5E3DF",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Simple Map Background - Static elements */}
            <div
              className="absolute inset-0 transition-transform duration-100"
              style={{
                transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              {/* Map features (just to show displacement during drag/zoom) */}
              <div className="absolute top-[30%] left-0 w-full h-[1.5%] bg-[#F4A460] opacity-80" />
              <div className="absolute top-[60%] left-0 w-full h-[1.5%] bg-[#F4A460] opacity-80" />
              <div className="absolute left-[30%] top-0 h-full w-[1.5%] bg-[#F4A460] opacity-80" />

              {/* Markers */}
              {filteredRestaurants.slice(0, 8).map((restaurant, idx) => {
                const positions = [
                  { top: "15%", left: "25%" },
                  { top: "28%", left: "50%" },
                  { top: "42%", left: "35%" },
                  { top: "58%", left: "62%" },
                  { top: "22%", left: "72%" },
                  { top: "68%", left: "38%" },
                  { top: "48%", left: "78%" },
                  { top: "78%", left: "52%" },
                ];

                return (
                  <div
                    key={restaurant.id}
                    className="absolute w-8 h-8 bg-[#D4A853] rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:scale-125 transition-transform cursor-pointer group"
                    style={
                      positions[idx] || {
                        top: "50%",
                        left: "50%",
                        backgroundColor: golden,
                      }
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/destination/${restaurant.id}`);
                    }}
                  >
                    <MapPin className="h-4 w-4 text-white" />

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white rounded-lg shadow-xl p-3 w-48 z-50 pointer-events-none">
                      <p className="text-[#0A1E3C] font-semibold text-sm">
                        {restaurant.name}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {restaurant.location}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star
                          className="h-3 w-3 fill-[#D4A853] text-[#D4A853]"
                          style={{ fill: golden, color: golden }}
                        />
                        <span className="text-xs text-gray-700">
                          {restaurant.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="bg-white hover:bg-gray-100 text-[#0A1E3C] w-12 h-12 p-0 shadow-lg text-xl"
              >
                {" "}
                +{" "}
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="bg-white hover:bg-gray-100 text-[#0A1E3C] w-12 h-12 p-0 shadow-lg text-xl"
              >
                {" "}
                −{" "}
              </Button>
            </div>

            {/* Map Label */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg z-10">
              <div className="text-[#0A1E3C]">
                <span className="opacity-70">
                  {filteredRestaurants.length} restaurants
                </span>
                <span className="mx-2">•</span>
                <span className="text-[#D4A853]" style={{ color: golden }}>
                  {locationName}
                </span>
              </div>
            </div>

            {/* Zoom indicator */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg z-10 text-sm text-[#0A1E3C]">
              Zoom: {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
