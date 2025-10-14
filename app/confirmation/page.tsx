// app/confirmation/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  Bed,
  Download,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
// NOTE: You must create this file in components/ui
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export default function ConfirmationPage() {
  const router = useRouter();
  const { bookingData, userBookings, clearBooking } = useBooking();
  const golden = "#D4A853";

  useEffect(() => {
    if (!bookingData.destination || userBookings.length === 0) {
      router.push("/");
    }
  }, [bookingData, userBookings, router]);

  if (!bookingData.destination || userBookings.length === 0) {
    return null;
  }

  const latestBooking = userBookings[userBookings.length - 1];
  const destination = latestBooking.destination;

  const handleNewBooking = () => {
    clearBooking();
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Success Header adapted */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-500" />
        </div>
        <h1 className="text-2xl md:text-4xl text-white mb-2">
          Booking Confirmed!
        </h1>
        {/* ... (Success message) ... */}
      </div>

      {/* Booking Details adapted */}
      <div className="bg-[#1A2E4C] rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="w-full h-48 relative">
              <ImageWithFallback
                src={destination.image}
                alt={destination.title}
                className="object-cover rounded-lg mb-4"
              />
            </div>
            <h2 className="text-2xl text-white mb-2">{destination.title}</h2>
          </div>

          <div className="space-y-4">
            <div className="pt-4 border-t border-gray-600">
              <p className="text-gray-400 text-sm mb-1">Total Amount Paid</p>
              <p className="text-3xl text-[#D4A853]" style={{ color: golden }}>
                ${latestBooking.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons adapted */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/profile" className="flex-1">
          <Button
            variant="outline"
            className="w-full bg-[#1A2E4C] border-gray-600 text-white h-12"
          >
            View My Bookings
          </Button>
        </Link>
        <Button
          onClick={handleNewBooking}
          className="flex-1 text-[#0A1E3C] h-12"
          style={{ backgroundColor: golden, color: "#0A1E3C" }}
        >
          Book Another Trip
        </Button>
      </div>
    </div>
  );
}
