// app/checkout/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
// NOTE: You must create this file in components/ui
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export default function CheckoutPage() {
  const router = useRouter();
  const { bookingData, user, addBooking } = useBooking();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const golden = "#D4A853";

  useEffect(() => {
    if (
      !user ||
      !bookingData.destination ||
      !bookingData.checkIn ||
      !bookingData.checkOut
    ) {
      router.push("/");
    }
  }, [
    user,
    bookingData.destination,
    bookingData.checkIn,
    bookingData.checkOut,
    router,
  ]);

  if (
    !user ||
    !bookingData.destination ||
    !bookingData.checkIn ||
    !bookingData.checkOut
  ) {
    return null;
  }

  const destination = bookingData.destination;
  const serviceFee = bookingData.totalPrice * 0.05;
  const tax = bookingData.totalPrice * 0.1;
  const finalTotal = bookingData.totalPrice + serviceFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert("Please fill in all payment fields");
      return;
    }

    // Mock payment processing
    const booking = {
      id: Date.now().toString(),
      destination: destination,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      rooms: bookingData.rooms,
      totalPrice: finalTotal,
      bookingDate: new Date(),
      status: "Confirmed",
    };

    addBooking(booking);
    router.push("/confirmation");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <Button
        variant="ghost"
        className="text-gray-400 hover:text-white mb-6 md:mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl md:text-3xl text-white mb-6 md:mb-8">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method adapted for Next.js */}
            <div className="bg-[#1A2E4C] rounded-lg p-6">
              {/* ... (Payment form fields using Input/Label components) ... */}
            </div>

            {/* Billing Address adapted for Next.js */}
            <div className="bg-[#1A2E4C] rounded-lg p-6">
              {/* ... (Billing Address form fields using Input/Label components) ... */}
            </div>

            <div
              className="bg-[#D4A853]/10 border border-[#D4A853]/30 rounded-lg p-4 flex items-start gap-3"
              style={{
                borderColor: `${golden}4d`,
                backgroundColor: `${golden}1a`,
              }}
            >
              <Lock className="h-5 w-5" style={{ color: golden }} />
              {/* ... (Secure payment message) ... */}
            </div>
            <Button
              type="submit"
              className="w-full text-[#0A1E3C] h-12"
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Complete Booking
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A2E4C] rounded-lg p-6 sticky lg:top-6">
            <h2 className="text-xl text-white mb-4">Order Summary</h2>
            <div className="mb-6 relative h-40">
              <ImageWithFallback
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-white mb-1 mt-4">{destination.title}</h3>
              <p className="text-gray-400 text-sm">{destination.location}</p>
            </div>
            {/* ... (Summary details) ... */}
            <div className="space-y-2 border-t border-gray-600 pt-4 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white">
                  ${bookingData.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Service Fee (5%)</span>
                <span className="text-white">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Tax (10%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl pt-2 border-t border-gray-600">
                <span className="text-white">Total</span>
                <span className="text-[#D4A853]" style={{ color: golden }}>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
