// context/BookingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Destination } from "@/lib/data/destinations";

interface BookingData {
  destination: Destination | null;
  checkIn: Date | null;
  checkOut: Date | null;
  time: string;
  guests: number;
  totalPrice: number;
  seating: string | null;
}

// FIX: Updated User interface to include 'type' and optional 'restaurantName'
export interface User {
  name: string;
  email: string;
  type: "customer" | "admin" | "venue-manager";
  restaurantName?: string;
}

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  user: User | null;
  userBookings: any[];
  addBooking: (booking: any) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingDataState] = useState<BookingData>({
    destination: null,
    checkIn: null,
    checkOut: null,
    time: "19:00",
    guests: 2,
    totalPrice: 0,
    seating: null,
  });

  // FIX: Updated mock user to include the default 'type'
  const [user] = useState<User | null>({
    name: "Sofia",
    email: "sofia@example.com",
    type: "customer", // Default role set
    restaurantName: undefined,
  });
  const [userBookings, setUserBookings] = useState<any[]>([]);

  const setBookingData = (data: Partial<BookingData>) => {
    setBookingDataState((prev) => ({ ...prev, ...data }));
  };

  const addBooking = (booking: any) => {
    setUserBookings((prev) => [...prev, booking]);
  };

  const clearBooking = () => {
    setBookingDataState({
      destination: null,
      checkIn: null,
      checkOut: null,
      time: "19:00",
      guests: 2,
      totalPrice: 0,
      seating: null,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        user,
        userBookings,
        addBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
