// app/layout.tsx
import type { Metadata } from "next";
// Assuming you still use Geist fonts
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the providers
import { BookingProvider } from "@/context/BookingContext";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TableBird - Premium Venue Booking",
  description:
    "Discover and book the finest venues for your special occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#0E1A2B", color: "#ededed" }}
      >
        <LanguageProvider>
          <BookingProvider>{children}</BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
