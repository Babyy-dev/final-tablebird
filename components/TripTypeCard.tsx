// components/TripTypeCard.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

// Mock TripType interface
interface TripType {
  title: string;
  image: string;
  description: string;
  filterValue: string;
}

interface TripTypeCardProps {
  image: string;
  title: string;
  description: string;
  filterValue: string;
}

export default function TripTypeCard({
  image,
  title,
  description,
  filterValue,
}: TripTypeCardProps) {
  const router = useRouter();
  const golden = "#D4A853";

  const handleNavigate = () => {
    router.push(`/search?category=${encodeURIComponent(filterValue)}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative w-full h-80 rounded-xl overflow-hidden cursor-pointer shadow-xl transform transition duration-300 hover:scale-[1.02] group"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover filter brightness-75 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
        <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
      <div className="absolute top-4 right-4">
        <span
          className="text-white px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: golden }}
        >
          Explore
        </span>
      </div>
    </div>
  );
}
