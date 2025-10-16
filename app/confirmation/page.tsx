// app/confirmation/page.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  QrCode,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ConfirmationPage() {
  const router = useRouter();
  const { userBookings } = useBooking();
  const golden = "#D4A853";
  const navyDark = "#0E1A2B";

  // FIX: Access the latest booking from userBookings for display
  const latestBooking = useMemo(() => {
    return userBookings.length > 0
      ? userBookings[userBookings.length - 1]
      : null;
  }, [userBookings]);

  useEffect(() => {
    // Redirect if no recent booking exists (e.g., direct navigation)
    if (!latestBooking) {
      router.push("/");
    }
  }, [latestBooking, router]);

  if (!latestBooking) {
    return null;
  }

  const destination = latestBooking.destination;
  const bookingCode = latestBooking.id.slice(-8);

  // const handleNewBooking = () => {
  //   clearBooking(); // Reset booking state
  //   router.push("/");
  // };

  return (
    <div
      className="min-h-screen bg-navy-dark relative overflow-x-hidden"
      style={{ backgroundColor: navyDark }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 0%, rgba(14, 26, 43, 0.00) 100%),
            radial-gradient(49.93% 70.21% at 50% 0%, #064194 0%, rgba(14, 26, 43, 0.00) 100%),
            linear-gradient(0deg, ${navyDark} 0%, ${navyDark} 100%)
          `,
        }}
      />

      <div className="relative z-10">
        <Header lang="EN" setLang={() => {}} />

        <main className="max-w-[1074px] mx-auto mt-16 mb-20 px-4">
          <div className="rounded-[44px] border border-white bg-white/10 backdrop-blur-[7.5px] p-8 md:p-14">
            <div className="flex flex-col items-center gap-12">
              <div className="flex flex-col items-center gap-2.5 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle
                    className="w-16 h-16"
                    style={{ color: golden, fill: `${golden}30` }}
                  />
                </div>
                <h1 className="text-white text-5xl font-normal">
                  Booking Confirmed
                </h1>
                <p className="text-white text-sm tracking-[0.035px]">
                  Confirmation Booking code: {bookingCode}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 w-full">
                <div className="flex-1 space-y-9">
                  <div className="flex items-start gap-5">
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      width={92}
                      height={92}
                      className="w-[92px] h-[92px] rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 space-y-3">
                      <h2 className="text-white text-[34px] leading-none tracking-[0.085px]">
                        {destination.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-5 h-5" />
                          <span>{format(latestBooking.checkIn, "PP")}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-5 h-5" />
                          <span>19:00</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-5 h-5" />
                          <span>{latestBooking.guests} people</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-5 h-5" />
                          <span>{latestBooking.totalPrice.toFixed(2)}€</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <QrCode className="w-5 h-5" />
                          <span>{bookingCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button className="px-4 py-2 rounded-md border bg-red-600/60 text-white/95 text-sm hover:bg-red-600/80">
                      Cancel
                    </Button>
                    <Button className="px-4 py-2 rounded-md border bg-white/10 text-white/95 text-sm hover:bg-white/20">
                      Modify
                    </Button>
                    <Button
                      className="px-4 py-2 rounded-md border text-white/95 text-sm"
                      style={{ backgroundColor: golden }}
                    >
                      Add to Calendar
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-5">
                    <Link href={`/venue/${destination.id}`} className="w-full">
                      <Button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <BookOpen
                          className="w-7 h-7"
                          style={{ color: golden }}
                        />
                        <span className="text-white/87 text-base font-medium">
                          See Menu
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Column - User Details */}
                <div className="flex-1 space-y-12 pt-4 md:pt-0">
                  {/* Who's Going */}
                  <div className="space-y-2.5">
                    <h3 className="text-white text-base font-medium tracking-[0.024px]">
                      Who Going
                    </h3>
                    <div className="flex items-start gap-8">
                      {/* Placeholder for Sofia/Kevin */}
                      <div className="flex flex-col items-start gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback style={{ backgroundColor: golden }}>
                            S
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-base font-medium tracking-[0.024px]">
                          Sofia
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>K</AvatarFallback>
                        </Avatar>
                        <span className="text-white text-base font-medium tracking-[0.024px]">
                          Kevin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Your Details */}
                  <div className="space-y-7">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white text-base font-medium tracking-[0.024px]">
                        Your Details
                      </h3>
                      <div className="flex-1 h-px bg-white/60"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-7 text-white/90 text-sm">
                      <div className="space-y-3">
                        <p>
                          Phone no.{" "}
                          <span className="block font-medium">
                            +49 125 456 3
                          </span>
                        </p>
                        <p>
                          Email{" "}
                          <span className="block font-medium">
                            Sofia@gmail.com
                          </span>
                        </p>
                        <p>
                          Occasion{" "}
                          <span className="block font-medium">
                            Birthday Party
                          </span>
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p>
                          Seating Area{" "}
                          <span className="block font-medium">Outdoor</span>
                        </p>
                        <p>
                          Special Request{" "}
                          <span className="block font-medium">
                            Add some flowers and candles
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Know Before You Go */}
                  <div className="w-full rounded-[21px] border border-white bg-white/10 p-9 space-y-4">
                    <h2 className="text-white text-2xl font-bold">
                      What to know before you go
                    </h2>
                    <p className="text-white/64 text-base tracking-[0.08px]">
                      A note from the restaurant
                    </p>
                    <p className="text-white text-base font-medium tracking-[0.024px]">
                      While we do everything possible to accommodate all seating
                      requests...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
