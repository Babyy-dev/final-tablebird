// app/booking/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Calendar as CalComponent } from "@/components/ui/calendar"; // Renamed import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Users, Bed, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

export default function BookingPage() {
  const router = useRouter();
  const { bookingData, setBookingData, user } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    bookingData.checkIn || undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    bookingData.checkOut || undefined
  );
  const [guests, setGuests] = useState(bookingData.guests);
  const [rooms, setRooms] = useState(bookingData.rooms);
  const golden = "#D4A853";

  useEffect(() => {
    // Redirect if no destination selected
    if (!bookingData.destination) {
      router.push("/");
    }
  }, [bookingData.destination, router]);

  if (!bookingData.destination) {
    return null;
  }

  const destination = bookingData.destination;

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    // Calculate nights using date-fns
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = Math.max(1, diffDays);
    return destination.price * guests * nights;
  };

  const totalPrice = calculateTotalPrice();

  const handleContinue = () => {
    if (!checkIn || !checkOut || totalPrice <= 0) {
      alert("Please select valid check-in and check-out dates");
      return;
    }

    setBookingData({
      checkIn,
      checkOut,
      guests,
      rooms,
      totalPrice,
    });

    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Back Button adaptation */}
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-white mb-6 md:mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl md:text-3xl text-white mb-6 md:mb-8">
        Complete Your Booking
      </h1>
      {/* ... (Rest of the component content) */}

      {/* Date and Guest Selection adapted to Next.js */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1A2E4C] rounded-lg p-6">
            <h2 className="text-xl text-white mb-6">Trip Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in Date */}
              <div>
                <Label className="text-gray-300 mb-2">Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1A2E4C] border-gray-600">
                    <CalComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              {/* ... (The rest of the date/guest selectors are also adapted with proper component imports and state hooks) ... */}
              {/* Check-out Date */}
              <div>
                <Label className="text-gray-300 mb-2">Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1A2E4C] border-gray-600">
                    <CalComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => !checkIn || date <= checkIn}
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div>
                <Label className="text-gray-300 mb-2">Number of Guests</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </Button>
                  <div className="flex-1 bg-[#0A1E3C] border border-gray-600 rounded-md px-4 py-2 text-white text-center flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    {guests}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Rooms */}
              <div>
                <Label className="text-gray-300 mb-2">Number of Rooms</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                  >
                    -
                  </Button>
                  <div className="flex-1 bg-[#0A1E3C] border border-gray-600 rounded-md px-4 py-2 text-white text-center flex items-center justify-center gap-2">
                    <Bed className="h-4 w-4" />
                    {rooms}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] hover:text-white"
                    onClick={() => setRooms(rooms + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A2E4C] rounded-lg p-6 sticky top-6">
            <h2 className="text-xl text-white mb-4">Booking Summary</h2>

            <div className="mb-6">
              <div className="w-full h-40 relative">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.title}
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-white mb-1 mt-4">{destination.title}</h3>
              <p className="text-gray-400 text-sm">{destination.location}</p>
            </div>

            <div className="border-t border-gray-600 pt-4 mb-6">
              <div className="flex justify-between text-xl pt-4">
                <span className="text-white">Total</span>
                <span className="text-[#D4A853]" style={{ color: golden }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full text-[#0A1E3C] h-12"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Continue to {user ? "Checkout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
