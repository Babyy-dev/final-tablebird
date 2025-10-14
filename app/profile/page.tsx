// app/profile/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser, userBookings } = useBooking();
  const golden = "#D4A853";
  const activeTab = searchParams.get("tab") || "bookings";

  useEffect(() => {
    // If user is not logged in, redirect to home or login page.
    if (user === null) {
      router.push("/Login");
    }
  }, [user, router]);

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  const handleTabChange = (tab: string) => {
    router.push(`/profile?tab=${tab}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Profile Header */}
      <div className="bg-[#1A2E4C] rounded-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 w-full sm:w-auto">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback
                className="bg-[#D4A853] text-[#0A1E3C] text-xl md:text-2xl"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl text-white mb-2">
                {user.name}
              </h1>
              <p className="text-gray-400 text-sm md:text-base">{user.email}</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-[#2A3E5C] hover:text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-1">Member Since</div>
            <div className="text-white">October 2025</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="bg-[#1A2E4C] border-b border-gray-600">
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-[#D4A853] data-[state=active]:text-[#0A1E3C]"
          >
            My Bookings
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-[#D4A853] data-[state=active]:text-[#0A1E3C]"
          >
            Favorites
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-[#D4A853] data-[state=active]:text-[#0A1E3C]"
          >
            Payment Methods
          </TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          {userBookings.length === 0 ? (
            <div className="bg-[#1A2E4C] rounded-lg p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No bookings yet</h3>
              <p className="text-gray-400 mb-6">
                Start exploring and book your next adventure
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C]"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
              >
                Browse Destinations
              </Button>
            </div>
          ) : (
            userBookings.map((booking) => (
              <div key={booking.id} className="bg-[#1A2E4C] rounded-lg p-6">
                <div className="flex items-start gap-6">
                  <Image
                    src={booking.destination.image}
                    alt={booking.destination.title}
                    width={192} // w-48
                    height={128} // h-32
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl text-white mb-2">
                          {booking.destination.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.destination.location}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500">
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Check-in</p>
                        <p className="text-white text-sm">
                          {format(new Date(booking.checkIn), "PP")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Check-out</p>
                        <p className="text-white text-sm">
                          {format(new Date(booking.checkOut), "PP")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Guests</p>
                        <p className="text-white text-sm">{booking.guests}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Total</p>
                        <p
                          className="text-[#D4A853] text-sm"
                          style={{ color: golden }}
                        >
                          ${booking.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/destination/${booking.destination.id}`}>
                        <Button
                          size="sm"
                          className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C]"
                          style={{ backgroundColor: golden, color: "#0A1E3C" }}
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-gray-600 text-gray-300 hover:bg-[#2A3E5C] hover:text-white"
                      >
                        Download Voucher
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-red-500/50 text-red-500 hover:bg-red-500/20 hover:text-red-500"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <div className="bg-[#1A2E4C] rounded-lg p-12 text-center">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No favorites yet</h3>
            <p className="text-gray-400 mb-6">
              Save your favorite destinations for quick access
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-[#D4A853] hover:bg-[#C9A961] text-[#0A1E3C]"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Browse Destinations
            </Button>
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <div className="space-y-4">
            <div className="bg-[#1A2E4C] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white">•••• •••• •••• 4242</p>
                    <p className="text-gray-400 text-sm">Expires 12/25</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-[#2A3E5C] hover:text-white"
                >
                  Remove
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-[#1A2E4C] border-gray-600 text-white hover:bg-[#2A3E5C] hover:text-white h-12"
            >
              Add Payment Method
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
