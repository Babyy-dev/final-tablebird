// app/confirmation/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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
  Navigation,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ConfirmationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { userBookings, user } = useBooking();
  const t = useTranslations('confirmation');
  const golden = "#D4A853";
  const navyDark = "#0E1A2B";
  const [lang, setLang] = useState<"EN" | "BG">("EN"); // Keep for component interface

  // Access the latest booking from userBookings for display
  const latestBooking = useMemo(() => {
    return userBookings.length > 0
      ? userBookings[userBookings.length - 1]
      : null;
  }, [userBookings]);

  // Fallback data for demonstration if context is empty (e.g. initial load/direct navigation)
  const fallbackBooking = {
    id: "51681646881",
    checkIn: new Date(),
    time: "19:00",
    guests: 2,
    totalPrice: 50,
    seating: "Outdoor",
    occasion: "Birthday Party",
  };
  const fallbackDestination = {
    title: "La coco",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    id: "la-coco",
  };

  const booking = latestBooking || fallbackBooking;
  const destination = booking.destination || fallbackDestination;
  const bookingCode = String(booking.id).slice(-8);

  useEffect(() => {
    // Note: To show fallback UI, the redirect is currently disabled.
    // if (!latestBooking) { router.push("/"); }
  }, [latestBooking, router]);

  const userDetails = {
    phone: "+49 125 456 3",
    email: user?.email || "sofia@gmail.com",
    occasion: booking.occasion || "Birthday Party",
    seating: booking.seating || "Outdoor",
    specialRequest: "Add some flowers and candles on the table",
    coDinerName: "Kevin",
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // Prevent default navigation for mock buttons
    if (href === "#") e.preventDefault();
    else router.push(href);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: navyDark }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            radial-gradient(49.93% 70.21% at 50% 0%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            linear-gradient(0deg, ${navyDark} 0%, ${navyDark} 100%)
          `,
        }}
      />

      <div className="relative z-10">
        <Header lang={lang} setLang={setLang} />

        <main className="max-w-[1074px] mx-auto mt-16 mb-20 px-4">
          <div className="rounded-[44px] border border-white bg-white/10 backdrop-blur-[7.5px] p-8 md:p-14">
            <div className="flex flex-col items-center gap-12">
              <div className="flex flex-col items-center gap-2.5 text-center">
                {/* Custom SVG Check Icon */}
                <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 66 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.0957 46.6585L16.8213 34.3812L20.9118 30.2907L29.0957 38.4717L45.4577 22.1068L49.5511 26.2002L29.0957 46.6585Z"
                      fill={golden}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.35693 13.25C2.35693 10.1811 3.57606 7.23783 5.74613 5.06777C7.91619 2.8977 10.8594 1.67857 13.9284 1.67857H54.4284C57.4973 1.67857 60.4405 2.8977 62.6106 5.06777C64.7807 7.23783 65.9998 10.1811 65.9998 13.25V53.75C65.9998 56.8189 64.7807 59.7622 62.6106 61.9322C60.4405 64.1023 57.4973 65.3214 54.4284 65.3214H13.9284C10.8594 65.3214 7.91619 64.1023 5.74613 61.9322C3.57606 59.7622 2.35693 56.8189 2.35693 53.75V13.25ZM13.9284 7.46429H54.4284C55.9628 7.46429 57.4344 8.07385 58.5195 9.15888C59.6045 10.2439 60.2141 11.7155 60.2141 13.25V53.75C60.2141 55.2845 59.6045 56.7561 58.5195 57.8411C57.4344 58.9262 55.9628 59.5357 54.4284 59.5357H13.9284C12.3939 59.5357 10.9223 58.9262 9.83724 57.8411C8.75221 56.7561 8.14265 55.2845 8.14265 53.75V13.25C8.14265 11.7155 8.75221 10.2439 9.83724 9.15888C10.9223 8.07385 12.3939 7.46429 13.9284 7.46429Z"
                      fill={golden}
                    />
                  </svg>
                </div>
                <h1 className="text-white text-5xl font-normal">
                  {t('booking_confirmed')}
                </h1>
                <p className="text-white text-sm tracking-[0.035px]">
                  {t('confirmation_code')}: {bookingCode}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 w-full">
                <div className="flex-1 space-y-9">
                  <div className="space-y-9">
                    {/* Destination Info */}
                    <div className="flex items-start gap-5">
                      <Image
                        src={destination.image}
                        alt={destination.title}
                        width={92}
                        height={92}
                        className="w-[92px] h-[92px] rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 space-y-5">
                        <h2 className="text-white text-[34px] leading-none tracking-[0.085px]">
                          {destination.title}
                        </h2>

                        {/* Booking Details */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                          <div className="flex items-center gap-1.5 text-white text-sm">
                            <Calendar className="w-5 h-5" />
                            <span>{format(booking.checkIn, "PP")}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white text-sm">
                            <Clock className="w-5 h-5" />
                            <span className="opacity-90">
                              {booking.time || "19:00"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white text-sm">
                            <Users className="w-5 h-5" />
                            <span>{booking.guests} {t('people')}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white text-sm">
                            <DollarSign className="w-5 h-5" />
                            {/* Assumes price is in Euro, converts to BGN (1 EUR ≈ 1.95 BGN) */}
                            <span>
                              {booking.totalPrice.toFixed(2)}€ /{" "}
                              <span className="opacity-75">
                                {(booking.totalPrice * 1.95).toFixed(2)}лв
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white text-sm">
                            <QrCode className="w-5 h-5" />
                            <span>{bookingCode}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5">
                      <Button className="px-2.5 py-1 rounded-md border border-white bg-red-600/60 text-white/95 text-sm font-medium hover:bg-red-600/80 transition-colors shadow-lg">
                        {t('cancel')}
                      </Button>
                      <Button className="px-2.5 py-1 rounded-md border border-white bg-white/10 text-white/95 text-sm font-medium hover:bg-white/20 transition-colors shadow-lg">
                        {t('modify')}
                      </Button>
                      <Button
                        className="px-2.5 py-1 rounded-md border border-white bg-golden text-white/95 text-sm font-medium hover:bg-golden/90 transition-colors shadow-lg"
                        style={{ backgroundColor: golden, color: navyDark }}
                      >
                        {t('add_to_calendar')}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Action Links */}
                  <div className="space-y-5">
                    <Link href={`/venue/${destination.id}`} className="w-full">
                      <Button className="w-full flex items-center gap-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors h-auto justify-start">
                        <div className="w-[50px] h-[50px] rounded-md bg-black/58 flex items-center justify-center flex-shrink-0">
                          <BookOpen
                            className="w-7 h-7"
                            style={{ color: golden }}
                          />
                        </div>
                        <span className="text-white/87 text-base font-medium">
                          See Menu
                        </span>
                      </Button>
                    </Link>

                    <Button
                      className="w-full flex items-center gap-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors h-auto justify-start"
                      onClick={(e) => handleLinkClick(e, "#")}
                    >
                      <div className="w-[50px] h-[50px] rounded-md bg-black/58 flex items-center justify-center flex-shrink-0">
                        <Navigation
                          className="w-7 h-7"
                          style={{ color: golden }}
                        />
                      </div>
                      <span className="text-white/87 text-base font-medium">
                        Get Direction
                      </span>
                    </Button>

                    <Button
                      className="w-full flex items-center gap-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors h-auto justify-start"
                      onClick={(e) => handleLinkClick(e, "#")}
                    >
                      <div className="w-[50px] h-[50px] rounded-md bg-black/58 flex items-center justify-center flex-shrink-0">
                        <MessageSquare
                          className="w-7 h-7"
                          style={{ color: golden }}
                        />
                      </div>
                      <span className="text-white/87 text-base font-medium">
                        Send Message
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Right Column - User Details & Note */}
                <div className="flex-1 space-y-12 pt-4 md:pt-0">
                  {/* Who's Going */}
                  <div className="space-y-2.5">
                    <h3 className="text-white text-base font-medium tracking-[0.024px]">
                      Who Going
                    </h3>
                    <div className="flex items-start gap-8">
                      {/* User 1 (Sofia) */}
                      <div className="flex flex-col items-start gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback style={{ backgroundColor: golden }}>
                            {user?.name.charAt(0) || "S"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-base font-medium tracking-[0.024px]">
                          {user?.name || "Sofia"}
                        </span>
                      </div>
                      {/* User 2 Placeholder (Kevin) */}
                      <div className="flex flex-col items-start gap-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {userDetails.coDinerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-base font-medium tracking-[0.024px]">
                          {userDetails.coDinerName}
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
                      <div className="space-y-5">
                        <div>
                          <p>Phone no.</p>
                          <p className="block font-medium text-base tracking-[0.024px]">
                            {userDetails.phone}
                          </p>
                        </div>
                        <div>
                          <p>Email</p>
                          <p className="block font-medium text-base tracking-[0.024px]">
                            {userDetails.email}
                          </p>
                        </div>
                        <div>
                          <p>Occasion</p>
                          <p className="block font-medium text-base tracking-[0.024px]">
                            {userDetails.occasion}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <p>Seating Area</p>
                          <p className="block font-medium text-base tracking-[0.024px]">
                            {userDetails.seating}
                          </p>
                        </div>
                        <div>
                          <p>Special Request</p>
                          <p className="block font-medium text-base tracking-[0.024px]">
                            {userDetails.specialRequest}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Know Before You Go (Full Width) */}
              <div className="w-full rounded-[21px] border border-white bg-white/10 p-9 space-y-4">
                <h2 className="text-white text-2xl font-bold">
                  What to know before you go
                </h2>
                <p className="text-white/60 text-base tracking-[0.08px]">
                  A note from the restaurant
                </p>
                <p className="text-white text-base font-medium tracking-[0.024px] max-w-[564px] leading-relaxed">
                  While we do everything possible to accommodate all seating
                  requests, we are unable to guarantee a specific table or
                  section. Please allow a grace period of 15 minutes for seating
                  during peak times. If you do not see a reservation time or
                  party size available, please contact us directly.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
