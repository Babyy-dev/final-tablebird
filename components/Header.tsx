// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ChevronDown, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LocationSearchPopover } from "@/components/LocationSearchPopover";
import { Button } from "@/components/ui/button";
import { MobileMenuSheet } from "./MobileMenuSheet"; // Import the new Sheet component

const LOGO_PATH = "/logo.png";

interface HeaderProps {
  lang: "EN" | "BG";
  setLang: (lang: "EN" | "BG") => void;
  isTransparent?: boolean;
}

export default function Header({
  lang,
  setLang,
  isTransparent = true,
}: HeaderProps) {
  const golden = "#D4A853";
  const router = useRouter();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Sofia");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchClick = () => {
    router.push("/explore");
  };

  const handleLocationClick = () => {
    setIsLocationOpen(true);
  };

  const bgColor = isTransparent
    ? "bg-transparent"
    : "bg-[#0E1A2B] border-b border-white/10";

  return (
    <header className={`sticky top-0 z-50 ${bgColor}`}>
      {/* FIX: Reduced horizontal padding on mobile */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-14 py-4 md:py-6 flex justify-between items-center h-[72px]">
        <Link href="/">
          <Image
            src={LOGO_PATH}
            alt="TableBird Logo"
            width={160}
            height={44}
            className="h-8 w-auto object-contain md:h-11" // FIX: Smaller logo on mobile
          />
        </Link>

        <div className="flex items-center gap-x-4">
          {/* DESKTOP ACTIONS (Hidden on mobile) */}
          {/* FIX: Hide all desktop components explicitly */}
          <button
            onClick={handleLocationClick}
            className="hidden sm:flex items-end-safe gap-2 border border-white/50 rounded-md px-4 py-1.5 bg-black/20 backdrop-blur-sm hover:border-[#D4A853] transition"
          >
            <MapPin className="w-5 h-5 text-white" />
            <div>
              <p className="text-xs text-white/70 leading-none">Location</p>
              <p className="text-sm font-medium text-white leading-none">
                {currentLocation}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          <div
            onClick={handleSearchClick}
            className="hidden sm:flex items-center gap-2 border border-white/50 rounded-md px-4 py-2.5 bg-black/20 backdrop-blur-sm w-72 cursor-pointer hover:border-[#D4A853] transition"
          >
            <span className="text-white placeholder-white/80 w-full text-sm">
              Search
            </span>
            <Search className="w-5 h-5 text-white" />
          </div>

          <button
            onClick={() => setLang(lang === "EN" ? "BG" : "EN")}
            // role="switch"
            className="hidden sm:inline-flex relative w-[86px] h-[45px] rounded-[50px] border border-white bg-black/20 shadow-md cursor-pointer transition-colors"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.4)" }}
          >
            <div
              className={`absolute top-[5px] w-[35px] h-[35px] rounded-full transition-all duration-300 ${
                lang === "EN" ? "left-[5px]" : "left-[46px]"
              }`}
              style={{ backgroundColor: golden }}
            ></div>
            <span
              className={`absolute left-[13px] top-[14px] text-sm font-medium z-10 ${
                lang === "EN" ? "text-black" : "text-white"
              }`}
            >
              EN
            </span>
            <span
              className={`absolute right-[13px] top-[14px] text-sm font-medium z-10 ${
                lang === "BG" ? "text-black" : "text-white"
              }`}
            >
              BG
            </span>
          </button>

          <Link
            href="/Restaurants"
            className="hidden sm:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            Restaurants
          </Link>

          <Link
            href="/Bars"
            className="hidden sm:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            Bars
          </Link>

          <Link
            href="/Clubs"
            className="hidden sm:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            Clubs
          </Link>

          <Link
            href="/Favourites"
            className="hidden sm:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            Favourites
          </Link>

          {/* <Link
            href="/Login"
            className="hidden sm:inline-block text-white text-sm font-medium hover:text-[#D4A853] transition-colors ml-2 lg:ml-4"
          >
            Login
          </Link> */}

          <Link href="/Register" className="hidden sm:inline-block">
            <Button
              className="ml-2 px-6 py-2.5 lg:px-8 lg:py-3 rounded-md shadow-lg hover:bg-opacity-90 transition-colors h-9 lg:h-10 text-xs lg:text-sm"
              style={{ backgroundColor: golden }}
            >
              Register
            </Button>
          </Link>

          {/* MOBILE HAMBURGER MENU ICON (Visible on mobile, hidden on sm+) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="sm:hidden text-white hover:text-[#D4A853] transition-colors p-1"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <LocationSearchPopover
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          setIsLocationOpen(false);
          router.push(`/explore?loc=${loc}`);
        }}
      />

      {/* Mobile Menu Sheet component */}
      <MobileMenuSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lang={lang}
        setLang={setLang}
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />
    </header>
  );
}
