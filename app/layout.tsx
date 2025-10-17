// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the providers
import { BookingProvider } from "@/context/BookingContext";
import { LanguageProvider } from "@/context/LanguageContext";
import MobileNavBar from "@/components/MobileNavBar";

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
        // Ensure dark background for the whole application
        style={{ backgroundColor: "#0E1A2B", color: "#ededed" }}
      >
        <LanguageProvider>
          <BookingProvider>
            <div className="pb-20 xl:pb-0">{children}</div>
            <MobileNavBar />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
