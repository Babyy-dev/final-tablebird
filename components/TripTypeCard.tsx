// components/TripTypeCard.tsx
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
  type: TripType;
}

export default function TripTypeCard({ type }: TripTypeCardProps) {
  const router = useRouter();
  const golden = "#D4A853";

  const handleNavigate = () => {
    // Navigate to a mock search result page filtered by the category
    router.push(`/search?category=${encodeURIComponent(type.filterValue)}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative w-full h-80 rounded-xl overflow-hidden cursor-pointer shadow-xl transform transition duration-300 hover:scale-[1.02]"
    >
      <Image
        src={type.image}
        alt={type.title}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover filter brightness-75"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
        <h3 className="text-3xl font-bold text-white mb-2">{type.title}</h3>
        <p className="text-gray-200 text-sm">{type.description}</p>
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
