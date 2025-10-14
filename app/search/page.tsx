// app/search/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { destinations } from "@/lib/data/destinations";
import DestinationCard from "@/components/DestinationCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const golden = "#D4A853";

  // States derived from URL or defaults
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(true);

  // Sync state from URL on initial load
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const loc = searchParams.get("loc") || "";
    const cat = searchParams.get("category") || "all";

    setSearchTerm(q || loc);
    setCategory(cat);
  }, [searchParams]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(destinations.map((d) => d.category)));
  }, []);

  // Filtering Logic
  const filteredDestinations = destinations.filter((dest) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      dest.title.toLowerCase().includes(query) ||
      dest.location.toLowerCase().includes(query);
    const matchesPrice =
      dest.price >= priceRange[0] && dest.price <= priceRange[1];
    const matchesRating = dest.rating >= minRating;
    const matchesCategory = category === "all" || dest.category === category;

    return matchesSearch && matchesPrice && matchesRating && matchesCategory;
  });

  // Sorting Logic
  const sortedDestinations = useMemo(() => {
    return [...filteredDestinations].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [filteredDestinations, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?q=${encodeURIComponent(searchTerm)}&category=${category}`
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setMinRating(0);
    setCategory("all");
    setSortBy("featured");
    router.push("/search");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl text-white mb-3 md:mb-4">
          Search Destinations
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Found {sortedDestinations.length}{" "}
          {sortedDestinations.length === 1 ? "destination" : "destinations"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A2E4C] rounded-lg p-4 md:p-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl text-white flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" />
                Filters
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#D4A853] hover:text-[#C9A961] lg:hidden text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide" : "Show"}
              </Button>
            </div>

            <div
              className={`space-y-6 ${!showFilters ? "hidden lg:block" : ""}`}
            >
              {/* Search */}
              <form onSubmit={handleSearchSubmit}>
                <Label htmlFor="search-input" className="text-gray-300 mb-2">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search-input"
                    type="text"
                    placeholder="Destination or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#0A1E3C] border-gray-600 text-white pl-10"
                  />
                  <Button type="submit" className="sr-only">
                    Search
                  </Button>
                </div>
              </form>

              {/* Category */}
              <div>
                <Label className="text-gray-300 mb-2">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-[#0A1E3C] border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A2E4C] border-gray-600 text-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-gray-300 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  min={0}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-4"
                />
              </div>

              {/* Minimum Rating */}
              <div>
                <Label className="text-gray-300 mb-2">Minimum Rating</Label>
                <Select
                  value={minRating.toString()}
                  onValueChange={(val) => setMinRating(Number(val))}
                >
                  <SelectTrigger className="bg-[#0A1E3C] border-gray-600 text-white">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A2E4C] border-gray-600 text-white">
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-[#2A3E5C] hover:text-white"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {/* Sort */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-gray-400">
              Showing {sortedDestinations.length} results
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-[#1A2E4C] border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A2E4C] border-gray-600 text-white">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          {sortedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A2E4C] rounded-lg p-12 text-center">
              <h3 className="text-xl text-white mb-2">No destinations found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button
                onClick={handleResetFilters}
                className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C]"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
