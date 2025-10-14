// app/venue/[id]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  CreditCard,
  ParkingCircle,
  Tag,
  Star,
  ChevronDown,
  Timer,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/data/destinations"; // Assuming data export structure
import Footer from "@/components/Footer";

export default function VenueDetailsPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const golden = "#D4A853";
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingData, setBookingData] = useState({
    time: "7:00pm",
    date: "Today",
    guests: "02",
  });

  // MOCK DATA: Find destination based on URL ID
  const venue = useMemo(() => destinations.find((d) => d.id === id), [id]);

  // Fallback data for the provided UI structure
  const timeSlots = ["19:00", "19:15", "19:30", "19:45"];

  // Handle Not Found or missing data
  if (!venue) {
    return <div className="p-16 text-white text-center">Venue not found.</div>;
  }

  const handleBooking = () => {
    // 5. When tap on Book Now, it goes to booking page
    router.push("/booking");
  };

  return (
    <div className="min-h-screen bg-[#0E1A2B]">
      {/* Hero Section */}
      <div className="relative h-[541px] w-full">
        <Image
          src={venue.image} // Use dynamic image from data
          alt="Restaurant view"
          fill
          className="w-full h-full object-cover"
        />

        {/* Bookmark Icon */}
        <button className="absolute top-10 right-10 md:right-32 lg:right-40 text-white hover:text-[#D4A853] transition-colors">
          <Bookmark className="w-6 h-8" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative -mt-32 rounded-t-[50px] bg-[#0E1A2B] pb-20">
        <div className="container mx-auto px-4 lg:px-16 pt-10">
          <div className="grid lg:grid-cols-[1fr,540px] gap-8 items-start">
            {/* Left Column - Restaurant Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl text-white font-normal">
                  {venue.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-xl text-white">
                    {venue.category} <span className="text-white/50">$$$$</span>
                  </p>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#125604]">
                    <Star className="w-4 h-4 fill-white text-white" />
                    <span className="text-sm text-[#5F5]">
                      {venue.rating}{" "}
                      <span className="text-[10px]">
                        ({venue.reviews} reviews)
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-4xl text-white">25€-50€</p>
                  <p className="text-base text-white/75">42лв-84лв</p>
                </div>

                <div
                  className="inline-flex px-3 py-1 rounded-md border border-white/50"
                  style={{ backgroundColor: golden }}
                >
                  <span className="text-sm text-white font-medium">
                    {/* Dynamic distance logic needed, using mock */}2 km away
                  </span>
                </div>

                <p className="text-base text-white">
                  34 Person Currently Watching
                </p>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#7A7A7A] overflow-x-auto">
                <div className="flex gap-4 md:gap-8 min-w-max">
                  {[
                    "Overview",
                    "Experiences",
                    "Private Dinning",
                    "Offers",
                    "Ask Concierge",
                    "Photos",
                    "Menu",
                    "Reviews",
                    "Details",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={cn(
                        "pb-2 text-base whitespace-nowrap transition-colors",
                        activeTab === tab.toLowerCase()
                          ? "text-[#F4F4F4] border-b-2 border-[#F4F4F4] font-medium"
                          : "text-[#7A7A7A]"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 rounded-md border border-white/50 text-white text-sm">
                    Good for Group
                  </span>
                  <span className="px-4 py-1 rounded-md border border-white/50 text-white text-sm">
                    Neighborhood gem
                  </span>
                </div>

                <p className="text-base text-white/60 leading-relaxed">
                  {venue.description}
                </p>
              </div>

              {/* Menu Section */}
              <div className="space-y-4">
                <h2 className="text-xl text-white font-medium">Menu</h2>
                <p className="text-base text-white/60">
                  Vist on Restaurant Website to see Menu
                </p>
              </div>

              {/* Photos Section */}
              <div className="space-y-4">
                <h2 className="text-xl text-white font-medium">Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="rounded-lg w-full h-64 object-cover md:col-span-2 md:row-span-2 relative">
                    <Image
                      src={venue.image}
                      alt="Restaurant"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  {/* Mock Images */}
                  <div className="rounded-lg w-full h-32 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1551632832-68a865f32b12?w=242"
                      alt="Food"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="rounded-lg w-full h-32 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=149"
                      alt="Drink"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="relative rounded-lg w-full h-32 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=149"
                      alt="More"
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-end justify-center pb-3">
                      <span className="text-white/65 text-xs">
                        10 + More Images
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl text-white font-medium">Details</h2>

                <div className="space-y-5 pl-8">
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: golden }}
                    />
                    <div>
                      <p className="text-sm text-white/60">Location</p>
                      <p className="text-lg text-white/60">{venue.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <Phone
                      className="w-6 h-6 flex-shrink-0 rotate-90"
                      style={{ color: golden }}
                    />
                    <div>
                      <p className="text-sm text-white/60">Phone no.</p>
                      <p className="text-lg text-white/60">+140 345 678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-10">
                    <Mail
                      className="w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: golden }}
                    />
                    <div>
                      <p className="text-sm text-white/60">Mail</p>
                      <p className="text-lg text-white/60">lacoco@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-10">
                    <Globe
                      className="w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: golden }}
                    />
                    <div>
                      <p className="text-sm text-white/60">Website</p>
                      <p className="text-lg text-white/60">lacoco.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:sticky lg:top-8">
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/50 bg-gradient-to-b from-[#213C62]/60 to-black/60 backdrop-blur-lg">
                {/* Booking Form */}
                <div className="flex items-center gap-6 p-5 rounded-lg border border-white/50 bg-white/10 backdrop-blur-sm">
                  <Calendar className="w-7 h-7 text-white" />

                  <div className="flex items-center gap-4 flex-1 divide-x divide-white/50">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/50 mb-1">Time</p>
                      <button className="flex items-center gap-2 text-white font-medium">
                        <span>{bookingData.time}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex-1 pl-4 min-w-0">
                      <p className="text-[10px] text-white/50 mb-1">Date</p>
                      <button className="flex items-center gap-2 text-white font-medium">
                        <span>{bookingData.date}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pl-4">
                      <p className="text-[10px] text-white/50 mb-1">Guests</p>
                      <button className="flex items-center gap-2 text-white font-medium">
                        <span>{bookingData.guests}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBooking}
                  className="w-full py-6 rounded-lg border border-white hover:bg-opacity-90 text-white font-medium text-sm transition-colors"
                  style={{ backgroundColor: golden }}
                >
                  Book a Table
                </Button>

                {/* Time Slots */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <p className="text-white font-medium">Select a Time</p>
                    <span className="px-3 py-1 rounded-md bg-red-600/50 text-[#FF5656] text-sm">
                      19:59:43 {/* Mock Timer */}
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "px-4 py-2 rounded-md border border-white/50 text-sm shadow-lg transition-colors",
                          selectedTime === time
                            ? "bg-[#D4A853] text-[#0A1E3C]"
                            : "bg-[#D4A853]/50 text-[#F4F4F4]"
                        )}
                        style={{
                          backgroundColor:
                            selectedTime === time ? golden : `${golden}80`,
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <button className="px-4 py-2 rounded-md border border-white/50 bg-white/10 text-[#F4F4F4] text-sm hover:bg-white/20">
                    Notify me
                  </button>

                  <div className="flex items-center gap-2 text-white text-sm">
                    <Timer className="w-5 h-5" />
                    <span>You're in Luck! we still have 4 time slots</span>
                  </div>

                  <div className="flex items-center gap-2 text-white text-sm">
                    <UtensilsCrossed className="w-5 h-5" />
                    <span>Additonal seating option</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section (kept simple, not the full complex one) */}
          <div className="mt-16 space-y-12">
            <h2 className="text-4xl text-[#F4F4F4] font-normal">
              Latest reviews
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {[1, 2].map((review) => (
                <div
                  key={review}
                  className="p-6 rounded-lg border border-white/50 bg-white/10 backdrop-blur-sm space-y-6"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5"
                        style={{ color: golden, fill: golden }}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl text-[#F4F4F4] font-bold">
                      Review title
                    </h3>
                    <p className="text-base text-[#F4F4F4]">Review body</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (use your existing global Footer component) */}
      <Footer />
    </div>
  );
}
