// app/venue/[id]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Use Next.js hooks
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image component
import Header from "@/components/Header"; // Assuming Header is fixed and reusable
import Footer from "@/components/Footer"; // Assuming Footer is fixed and reusable
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

// FIX: Import the exact data structure and data source
import { restaurants, Restaurant } from "@/lib/data/restaurants";
import { useBooking } from "@/context/BookingContext"; // Use BookingContext to set destination

export default function VenueDetailsPage() {
  const { id } = useParams() as { id: string }; // Use Next.js useParams hook
  const router = useRouter();
  const { setBookingData } = useBooking();
  const golden = "#BC995D";
  const deepBlue = "#0E1A2B";
  const [lang, setLang] = useState<"EN" | "BG">("EN"); // State for Header

  const venue: Restaurant | undefined = useMemo(() => {
    // Find the venue, converting the ID from the data (number) to a string for comparison
    return restaurants.find((r) => String(r.id) === id);
  }, [id]);

  const handleBookNowClick = () => {
    if (venue) {
      // 5. Set the destination in the context and navigate to the booking page
      setBookingData({
        destination: {
          id: String(venue.id),
          title: venue.name,
          image: venue.image,
          location: venue.location,
          rating: venue.rating,
          reviews: 100, // Mocked reviews count
          price: 50, // Mocked price number
          duration: "2 hours",
          description: venue.neighborhood,
          amenities: [],
          included: [],
          category: venue.cuisine,
        },
      });
      router.push("/booking");
    }
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#0E1A2B] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Venue not found.</p>
          <Link href="/explore" className="underline" style={{ color: golden }}>
            Go back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: deepBlue }}>
      <Header lang={lang} setLang={setLang} isTransparent={false} />

      <section className="max-w-[1200px] mx-auto px-6 py-10 text-white">
        {/* Back Link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search Results
        </Link>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-2xl">
          <div className="relative w-full h-[420px]">
            <Image
              src={venue.image}
              alt={venue.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>

            {/* Rating & Location */}
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <Star className="w-5 h-5 text-green-500 fill-green-500" />
              <span>{venue.rating}</span>
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4" />
              <span>{venue.location}</span>
            </div>

            {/* Cuisine & Neighborhood (used as description placeholder) */}
            <p className="text-white/80">
              {venue.cuisine} — {venue.neighborhood}
            </p>

            {/* Additional details (mock) */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-white/70">
                This venue specializes in {venue.cuisine} and is known as the{" "}
                {venue.neighborhood}. Experience our {venue.price} range in a
                setting designed for memorable occasions.
              </p>

              <h2 className="text-xl font-semibold pt-4">Opening Hours</h2>
              <p className="text-white/70">Daily: 5:00 PM - 2:00 AM</p>
            </div>
          </div>

          {/* Booking Widget Placeholder */}
          <div className="bg-black/30 rounded-xl border border-white/20 p-5 backdrop-blur">
            <h3 className="font-semibold mb-4 text-xl">Book Your Table</h3>

            {/* Available Times */}
            <h4 className="font-semibold mb-3 text-sm">Available times</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {venue.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded text-sm font-medium"
                  style={{ backgroundColor: golden, color: deepBlue }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Book Now Button */}
            <Button
              onClick={handleBookNowClick}
              className="w-full py-3 rounded-md font-medium hover:brightness-105"
              style={{ backgroundColor: golden, color: deepBlue }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
