// app/manager/layout.tsx
"use client";

import { BookingProvider } from "@/context/BookingContext";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      {children}
    </BookingProvider>
  );
}