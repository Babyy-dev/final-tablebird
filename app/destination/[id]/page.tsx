// app/destination/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { destinations } from "@/lib/data/destinations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// NOTE: You must create this file in components/ui
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  Star,
  MapPin,
  Calendar,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Check,
  ArrowLeft,
} from "lucide-react";

interface DestinationDetailPageProps {
  params: {
    id: string;
  };
}

export default function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { id } = params;
  const router = useRouter();
  const { setBookingData } = useBooking();
  const golden = "#D4A853";

  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 bg-[#0A1E3C] text-white">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Destination not found</h1>
          <Link href="/">
            <Button className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C] rounded-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    setBookingData({ destination });
    router.push("/booking");
  };

  const iconMap: { [key: string]: any } = {
    WiFi: Wifi,
    "Fine Dining": Utensils,
    Restaurant: Utensils,
    "Room Service": Coffee,
    "Valet Parking": Car,
    "Rooftop Terrace": Utensils,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 bg-[#0A1E3C]">
      <div className="mb-6 md:mb-8">
        {/* Back Button adaptation */}
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition mb-4 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </button>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-white mb-3 md:mb-2">
              {destination.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1 text-[#D4A853]"
                  style={{ color: golden }}
                >
                  <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                  <span className="text-sm md:text-base">
                    {destination.rating}
                  </span>
                </div>
                <span className="text-gray-400 text-sm md:text-base">
                  ({destination.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          {destination.featured && (
            <Badge
              className="bg-[#D4A853] text-[#0A1E3C]"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content & Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery Placeholder */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 h-96 relative">
              <ImageWithFallback
                src={destination.image}
                alt={destination.title}
                className="object-cover rounded-lg"
              />
            </div>
            {/* Additional image placeholders */}
            <div className="h-48 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzU5ODU1OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Room"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="h-48 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671127172578-6e877abab905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc1OTg4NTcwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Amenity"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <h2 className="text-2xl text-white mb-4">About this destination</h2>
          <p className="text-gray-400 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A2E4C] rounded-lg p-6 sticky lg:top-6">
            <div className="mb-6">
              <div className="text-gray-400 text-sm mb-2">Price per person</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl" style={{ color: golden }}>
                  ${destination.price}
                </span>
                <span className="text-gray-400">/ person</span>
              </div>
            </div>
            <Button
              onClick={handleBookNow}
              className="w-full text-[#0A1E3C] h-12 mb-4 rounded-lg"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Book Now
            </Button>
            {/* ... other details ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
