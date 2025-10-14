// components/RestaurantCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Tag } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (id: string) => void;
}

export default function RestaurantCard({
  restaurant,
  onSelect,
}: RestaurantCardProps) {
  const golden = "#BC995D";
  const router = useRouter();
  const id = restaurant.id;

  // 4. When we click on venue card it shows info (and navigates on click of card body/link)
  const handleCardClick = () => {
    router.push(`/venue/${id}`);
  };

  return (
    <div
      className="bg-[#1A2E4C] rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02] group cursor-pointer border border-transparent hover:border-[#D4A853]"
      onMouseEnter={() => onSelect(id)}
      onMouseLeave={() => onSelect(null)}
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full">
        {/* Placeholder image path, assuming assets are in public */}
        <Image
          src="/placeholder.svg"
          alt={restaurant.name}
          fill
          sizes="33vw"
          className="object-cover"
        />

        <div className="absolute top-3 right-3 p-1 rounded bg-[#125604]">
          <span className="text-[#5F5] text-sm font-medium">
            {restaurant.rating}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-2xl font-semibold text-white truncate">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Tag className="h-4 w-4" />
          <span>
            {restaurant.cuisine} - {restaurant.price}
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/70 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{restaurant.location}</span>
        </div>

        <div className="text-xs text-white/50">{restaurant.neighborhood}</div>

        <div className="flex gap-2 pt-2">
          {restaurant.tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium text-white",
                index === 0 ? "bg-[#D4A853]" : "bg-[#213C62]" // Highlighting the first tag
              )}
              style={{ backgroundColor: index === 0 ? golden : "#213C62" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
