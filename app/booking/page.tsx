// app/booking/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import {
  Calendar,
  Clock,
  Users,
  ChevronDown,
  Phone,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Header from "@/components/Header"; // Assuming you reuse Header/Navigation
import Image from "next/image";

export default function BookingPage() {
  const router = useRouter();
  const { bookingData, setBookingData } = useBooking();
  const golden = "#D4A853";
  const [selectedSeating, setSelectedSeating] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("+49 125 456 3");
  const [occasion, setOccasion] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const [textUpdates, setTextUpdates] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(292); // 4:52 in seconds

  useEffect(() => {
    // If user has navigated directly here without selecting a destination, redirect.
    if (!bookingData.destination) {
      router.push("/");
    }

    // Timer setup
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingData.destination, router]);

  if (!bookingData.destination) {
    return null;
  }

  const destination = bookingData.destination;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const seatingOptions = [
    { id: "standard", label: "Standard" },
    { id: "outdoor", label: "Outdoor" },
    { id: "rooftop", label: "Rooftop" },
    { id: "bar-lounge", label: "Bar lounge" },
  ];

  const handleCompleteBooking = () => {
    if (!selectedSeating) {
      alert("Please select a seating option");
      return;
    }

    // Update booking context with final details before moving to Confirmation
    const finalBookingDetails = {
      ...bookingData,
      seating: selectedSeating,
      occasion,
      specialRequest,
      // Mock final total (if not already calculated from a date range)
      totalPrice: 50,
    };

    // MOCK: Add to user bookings to show in confirmation page
    // const mockBooking = {
    //   id: Date.now().toString(),
    //   destination,
    //   checkIn: new Date(),
    //   checkOut: new Date(),
    //   guests: 2,
    //   rooms: 1,
    //   totalPrice: 50,
    //   status: "Confirmed",
    // };

    setBookingData(finalBookingDetails);
    // In a real app, this would be `addBooking(mockBooking)`
    router.push("/confirmation"); // 5. Go to confirmation page
  };

  return (
    <div className="min-h-screen bg-[#0E1A2B] relative overflow-hidden">
      {/* Background (kept for UI consistency) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 0%, rgba(14, 26, 43, 0.00) 100%)`,
        }}
      />

      <div className="relative z-10">
        <Header lang="EN" setLang={() => {}} />

        {/* Main Content */}
        <main className="max-w-[1320px] mx-auto px-4 lg:px-[60px] mt-8 lg:mt-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Restaurant Info */}
              <div className="flex items-center gap-5">
                <Image
                  src={destination.image} // Use dynamic image
                  alt={destination.title}
                  width={92}
                  height={92}
                  className="w-[92px] h-[92px] rounded-xl object-cover"
                />
                <div className="flex-1 space-y-3">
                  <h1 className="text-white text-[34px] font-normal tracking-[0.085px]">
                    {destination.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-5 h-5 text-white" />
                      <span className="text-white text-sm tracking-[0.035px]">
                        Today
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-5 h-5 text-white" />
                      <span className="text-white text-sm tracking-[0.035px] opacity-90">
                        19:00
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-5 h-5 text-white" />
                      <span className="text-white text-sm tracking-[0.035px]">
                        {bookingData.guests} people
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer Badge */}
              <div
                className="inline-flex items-center px-5 py-2.5 rounded-[10px] border border-white"
                style={{ backgroundColor: "#A0522D" }}
              >
                <span className="text-white text-base tracking-[0.08px]">
                  We are holding this table for you for{" "}
                  <span className="font-medium">
                    {formatTime(timeRemaining)}
                  </span>
                </span>
              </div>

              {/* Price (Mocked as single price from details page) */}
              <div className="space-y-1">
                <div className="text-white text-[34px] font-normal">
                  {destination.price}€
                </div>
                <div className="text-white/75 text-base font-medium tracking-[0.024px]">
                  84лв
                </div>
              </div>

              {/* Available Seating Options */}
              <div className="space-y-6">
                <h2 className="text-white text-xl font-medium tracking-[0.03px]">
                  Available seating options
                </h2>
                <div className="space-y-4">
                  {seatingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSeating(option.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3.5 rounded-lg border border-white transition-all",
                        selectedSeating === option.id
                          ? "bg-golden/20 border-golden"
                          : "bg-white/10 backdrop-blur-sm hover:bg-white/15"
                      )}
                      style={{
                        backgroundColor:
                          selectedSeating === option.id
                            ? `${golden}20`
                            : "#FFFFFF1A",
                        borderColor:
                          selectedSeating === option.id ? golden : "#FFFFFF",
                      }}
                    >
                      <span className="text-white text-sm tracking-[0.035px]">
                        {option.label}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-md border-[0.5px] bg-golden text-[#F4F4F4] text-sm font-medium tracking-[0.175px] shadow-lg"
                        style={{ backgroundColor: golden }}
                      >
                        Select
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diner's Details (Simplified - assumed pre-filled from user) */}
              <div className="space-y-4">
                <h2 className="text-white text-xl font-medium tracking-[0.03px]">
                  Dinner Details
                </h2>
                {/* Phone Input */}
                <div className="flex items-center gap-5 px-5 py-3 rounded-[10px] border border-white bg-white/10 backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-white" />
                  <div className="w-px h-11 bg-white" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-transparent text-white text-xl font-medium tracking-[0.03px] outline-none placeholder:text-white/50"
                    placeholder="+49 125 456 3"
                  />
                </div>
                <p className="text-white text-sm tracking-[0.035px]">
                  You will receive a text message to verify your account.
                  Message & data rates may apply.
                </p>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <h2 className="text-white text-xl font-medium tracking-[0.03px]">
                  Booking details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Occasion Selector */}
                  <div className="relative">
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-5 py-3 rounded-[10px] border border-white bg-white/10 backdrop-blur-sm text-white/60 text-sm tracking-[0.035px] outline-none appearance-none cursor-pointer"
                      style={{
                        color: occasion ? "white" : "#FFFFFF99",
                        backgroundColor: "#FFFFFF1A",
                      }}
                    >
                      <option value="" disabled className="bg-[#0E1A2B]">
                        Select an occasion
                      </option>
                      <option value="birthday" className="bg-[#0E1A2B]">
                        Birthday
                      </option>
                      <option value="anniversary" className="bg-[#0E1A2B]">
                        Anniversary
                      </option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white pointer-events-none" />
                  </div>

                  {/* Special Request */}
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Add a special Request (optional)"
                    className="px-5 py-3 rounded-[10px] border border-white bg-white/10 backdrop-blur-sm text-white text-sm tracking-[0.035px] outline-none placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-4">
                {/* Email Offers */}
                <label className="flex items-start gap-2 cursor-pointer group">
                  <div
                    onClick={() => setEmailOffers(!emailOffers)}
                    className="w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
                    style={{
                      borderColor: golden,
                      backgroundColor: emailOffers ? golden : "transparent",
                    }}
                  >
                    {emailOffers && (
                      <Check className="w-4 h-4 text-[#0A1E3C]" />
                    )}
                  </div>
                  <span className="text-white text-sm tracking-[0.035px]">
                    Sign me up to receive dining offers and news from this
                    restaurant by email.
                  </span>
                </label>

                {/* Text Updates */}
                <label className="flex items-start gap-2 cursor-pointer group">
                  <div
                    onClick={() => setTextUpdates(!textUpdates)}
                    className="w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
                    style={{
                      borderColor: golden,
                      backgroundColor: textUpdates ? golden : "transparent",
                    }}
                  >
                    {textUpdates && (
                      <Check className="w-4 h-4 text-[#0A1E3C]" />
                    )}
                  </div>
                  <span className="text-white text-sm tracking-[0.035px]">
                    Yes, I want to get text updates and reminders about my
                    bookings.
                  </span>
                </label>
              </div>

              {/* Complete Booking Button */}
              <Button
                onClick={handleCompleteBooking}
                className="w-full max-w-[670px] px-10 py-3 rounded-[11px] border-[0.5px] border-white text-xl font-medium tracking-[0.03px] shadow-lg hover:bg-opacity-90 transition-colors h-12"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
              >
                Complete Booking
              </Button>
            </div>

            {/* Right Column - Info Card */}
            <div className="lg:w-[426px] p-10 lg:p-[42px] rounded-[21px] border border-white bg-white/10 backdrop-blur-sm space-y-5 h-fit lg:sticky lg:top-8">
              <h3 className="text-white text-2xl font-bold">
                What to know before you go
              </h3>
              <p className="text-white/60 text-base tracking-[0.08px]">
                A note from the restaurant
              </p>
              <p className="text-white text-base font-medium tracking-[0.024px] leading-relaxed">
                While we do everything possible to accommodate all seating
                requests, we are unable to guarantee a specific table or
                section. Please allow a grace period of 15 minutes for seating
                during peak times. If you do not see a reservation time or party
                size available, please contact us directly.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
