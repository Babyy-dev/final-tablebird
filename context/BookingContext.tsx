// context/BookingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
// Destination interface is defined here to be self-contained
interface Destination {
  id: string;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  featured?: boolean;
  description: string;
  amenities: string[];
  included: string[];
  category: string;
}

interface BookingData {
  destination: Destination | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  rooms: number;
  totalPrice: number;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  type?: 'customer' | 'venue-manager' | 'admin';
  restaurantName?: string;
}

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  user: User | null;
  setUser: (user: User | null) => void;
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
    guests: 2,
    rooms: 1,
    totalPrice: 0,
  });

  // MOCK USER STATE: Change the 'type' to test different dashboards.
  const [user, setUser] = useState<User | null>({
    name: "Admin Alice",
    email: "admin@tablebird.com",
    type: "admin", // <-- Change to 'venue-manager' or 'customer' for testing
    avatar: 'https://images.unsplash.com/photo-1617818247016-50e017f99305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXN0b21lciUyMGZhY2V8ZW58MXx8fHwxNzU5OTQ2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    restaurantName: "La Trattoria"
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
      guests: 2,
      rooms: 1,
      totalPrice: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        user,
        setUser,
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