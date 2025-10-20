// app/venue/[id]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  MapPin,
  Phone,
  Clock,
  Star,
  Timer,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { restaurants, Restaurant } from "@/lib/data/restaurants";
import { useBooking } from "@/context/BookingContext";

export default function VenueDetailsPage() {
  // --- SETUP ---
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { setBookingData } = useBooking();
  const golden = "#eec212";
  const navyDark = "#0E1A2B";
  const [lang, setLang] = useState<"EN" | "BG">("EN");

  // --- LOCAL UI STATE ---
  const [selectedTime, setSelectedTime] = useState<string | null>("19:00");
  const [activeTab, setActiveTab] = useState("overview");
  const [localBookingData, setLocalBookingData] = useState({
    time: "7:00pm", // Default for the dropdown
    date: "2025-10-05", // Mock date
    guests: 2,
  });
  const timeSlots = ["19:00", "19:15", "19:30", "19:45", "20:00", "20:15"];

  // --- DATA FETCHING ---
  const venue: Restaurant | undefined = useMemo(() => {
    return restaurants.find((r) => String(r.id) === id);
  }, [id]);

  const handleBooking = () => {
    if (!venue || !selectedTime) {
      alert("Please select an available time slot.");
      return;
    }

    setBookingData({
      destination: {
        id: String(venue.id),
        title: venue.name,
        image: venue.image,
        location: venue.location,
        rating: venue.rating,
        reviews: 100,
        price: Number(venue.price.replace("₺", "").trim()) || 50,
        duration: "2 hours",
        description: venue.neighborhood,
        amenities: [],
        included: [],
        category: venue.cuisine,
      },
      time: selectedTime,
      guests: localBookingData.guests,
      totalPrice:
        Number(venue.price.replace("₺", "").trim()) * localBookingData.guests,
      checkIn: new Date(),
    });
    router.push("/booking");
  };

  if (!venue) {
    return (
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{
          background: `radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            radial-gradient(49.93% 70.21% at 50% 0%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            linear-gradient(0deg, ${navyDark} 0%, ${navyDark} 100%)`,
        }}
      >
        <div className="text-center">
          <p className="mb-4">Venue not found.</p>
          <Link href="/explore" className="underline" style={{ color: golden }}>
            Go back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const venuePriceNumber = Number(venue.price.replace("₺", "").trim()) || 50;
  const priceRangeText = `${(venuePriceNumber * 0.9).toFixed(0)}€-${(
    venuePriceNumber * 1.1
  ).toFixed(0)}€`;
  const priceRangeBGN = `${(venuePriceNumber * 1.9).toFixed(0)}лв-${(
    venuePriceNumber * 2.2
  ).toFixed(0)}лв`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: navyDark }}>
      {/* 2. STICKY TRANSPARENT HEADER */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm">
        <Header lang={lang} setLang={setLang} isTransparent={true} />
      </header>

      {/* Hero Image */}
      <div className="relative h-[541px] w-full -mt-[95px]">
        {" "}
        {/* Negative margin pulls it up under the sticky header */}
        <Image
          src={venue.image} // Use dynamic image from data
          alt="Restaurant view"
          fill
          className="w-full h-full object-cover"
        />
        <button className="absolute top-[100px] right-10 md:right-32 lg:right-40 text-white hover:text-golden transition-colors z-20">
          <Bookmark className="w-6 h-8" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative -mt-32 rounded-t-[50px] bg-gradient-to-br from-[#0A1E3C] via-[#0E1A2B] to-[#064194] pb-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16 pt-10">
          {/* --- TOP ROW: NAME/DETAILS and BOOKING WIDGET --- */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Main Info Block (Flex to take remaining space) */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* Back Link */}
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Search Results
              </Link>

              {/* Title Block */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl text-white font-normal">
                  {venue.name}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-xl text-white">
                    {venue.cuisine} <span className="text-white/50">$$$$</span>
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#125604]">
                    <Star className="w-4 h-4 fill-white text-white" />
                    <span className="text-sm text-[#5F5]">
                      {venue.rating} <span className="text-[10px]">(2.5k)</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-4xl text-white">{priceRangeText}</p>
                  <p className="text-base text-white/75">{priceRangeBGN}</p>
                </div>

                <div
                  className="inline-flex px-3 py-1 rounded-md border border-white/50"
                  style={{ backgroundColor: golden, color: navyDark }}
                >
                  <span className="text-sm text-white font-medium">
                    2 km away
                  </span>
                </div>

                <p className="text-base text-white">
                  34 Person Currently Watching
                </p>
              </div>
            </div>

            {/* Right: Booking Widget (Sticky in original position) */}
            <div className="w-full lg:w-fit lg:sticky lg:top-[100px] lg:self-start max-w-sm mx-auto lg:mx-0 lg:max-w-none z-40">
              <div className="flex flex-col gap-4 p-4 rounded-lg border border-white/50 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-white flex-shrink-0" />

                  <div className="grid grid-cols-3 gap-4 w-full">
                    {/* Time */}
                    <div>
                      <p className="text-[10px] text-white/50 mb-1">Time</p>
                      <select
                        aria-label="Select time"
                        value={localBookingData.time}
                        onChange={(e) =>
                          setLocalBookingData((s) => ({
                            ...s,
                            time: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-white font-medium border border-white/40 rounded-md px-2 py-1 focus:outline-none"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t} className="text-black">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Date */}
                    <div>
                      <p className="text-[10px] text-white/50 mb-1">Date</p>
                      <input
                        type="date"
                        aria-label="Select date"
                        onChange={(e) =>
                          setLocalBookingData((s) => ({
                            ...s,
                            date: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-white font-medium border border-white/40 rounded-md px-2 py-1 focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    {/* Guests */}
                    <div>
                      <p className="text-[10px] text-white/50 mb-1">Guests</p>
                      <select
                        aria-label="Select guests"
                        value={localBookingData.guests}
                        onChange={(e) =>
                          setLocalBookingData((s) => ({
                            ...s,
                            guests: Number(e.target.value),
                          }))
                        }
                        className="w-full bg-transparent text-white font-medium border border-white/40 rounded-md px-2 py-1 focus:outline-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (g) => (
                            <option key={g} value={g} className="text-black">
                              {g}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBooking}
                  className="w-full py-3 rounded-lg border border-white bg-golden hover:bg-golden/90 text-white font-medium text-sm transition-colors"
                  style={{ backgroundColor: golden, color: navyDark }}
                >
                  Book a Table
                </Button>

                {/* Time Slots Widget */}
                <div className="space-y-3 p-2">
                  <div className="flex items-center gap-3">
                    <p className="text-white font-medium">Select a Time</p>
                    <span className="px-3 py-1 rounded-md bg-red-600/50 text-[#FF5656] text-sm">
                      19:59:43
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "px-3 py-1.5 rounded-md border border-white/50 text-sm shadow-lg transition-colors",
                          selectedTime === time
                            ? "bg-golden text-white"
                            : "bg-[#213C62] text-[#F4F4F4] hover:bg-golden/30"
                        )}
                        style={{
                          backgroundColor:
                            selectedTime === time ? golden : "#213C62",
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 text-white text-sm">
                    <button className="px-4 py-2 rounded-md border border-white/50 bg-white/10 hover:bg-white/20">
                      Notify me
                    </button>
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5" style={{ color: golden }} />
                      <span>Youre in Luck! we still have 4 time slots</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECOND ROW: TABS & CONTENT --- */}
          <div className="w-full space-y-12">
            {/* Tabs (Horizontal Navigation) */}
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

            {/* --- TAB CONTENT: OVERVIEW (Default) --- */}
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
                Lorem Ipsum is simply dummy text of the printing and typesettin
                Lorem Ipsum is simply dummy text of the printing and
                typesettinLorem Ipsum is simply dummy text of the printing and
                typesettinLorem Ipsum is simply dummy text of the printing and
                typesettinLorem Ipsum is simply dummy text of the printing and
                typesettin
              </p>
            </div>

            {/* Details Section (Moved down) */}
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

                <div className="flex items-start gap-4">
                  <Clock
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: golden }}
                  />
                  <div>
                    <p className="text-sm text-white/60">Hours of Operation</p>
                    <p className="text-lg text-white/60">
                      Daily 5:00 pm–2:00 am
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <UtensilsCrossed
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: golden }}
                  />
                  <div>
                    <p className="text-sm text-white/60">Cusine</p>
                    <p className="text-lg text-white/60">{venue.cuisine}</p>
                  </div>
                </div>

                {/* Mock/Placeholder details block */}
                <div className="flex items-start gap-4">
                  <Phone
                    className="w-6 h-6 flex-shrink-0 mt-1 rotate-90"
                    style={{ color: golden }}
                  />
                  <div>
                    <p className="text-sm text-white/60">Phone no.</p>
                    <p className="text-lg text-white/60">+140 345 678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div className="space-y-4">
              <h2 className="text-xl text-white font-medium">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1d1ed3e5f70e1e1a250f33074a94e7525868cae5?width=523"
                  alt="Restaurant"
                  className="rounded-lg w-full h-64 object-cover md:col-span-2 md:row-span-2"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3e223fd226de422eaef54e9cf6c1cf8a34bd8de1?width=242"
                  alt="Food"
                  className="rounded-lg w-full h-32 object-cover"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/d7c68600d92c8c7efd2b93dabe2e9b998de9b49d?width=149"
                  alt="Drink"
                  className="rounded-lg w-full h-32 object-cover"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/ade224f646b752d71ed32640da7514aed6cea408?width=149"
                  alt="Dessert"
                  className="rounded-lg w-full h-32 object-cover"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b63f788297e6e4ed951eadcf9df62c0f25c65534?width=242"
                  alt="Interior"
                  className="rounded-lg w-full h-32 object-cover"
                />
                <div className="relative rounded-lg w-full h-32 overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/86e48b0818b4e1c264eb6d5ac4f35aee12006b22?width=149"
                    alt="More"
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

            {/* Reviews Section */}
            <div className="mt-16 space-y-12 w-full">
              <h2 className="text-4xl text-[#F4F4F4] font-normal">
                Latest reviews
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                {[1, 2, 3].map((review) => (
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
                          strokeWidth={2}
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl text-[#F4F4F4] font-bold">
                        Review title
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
