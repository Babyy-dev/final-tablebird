// app/admin/layout.tsx
"use client";

import { BookingProvider } from "@/context/BookingContext";

export default function AdminLayout({
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