// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LocationSearchPopover } from "@/components/LocationSearchPopover";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

const LOGO_PATH = "/logo.png";

interface HeaderProps {
  lang: "EN" | "BG";
  setLang: (lang: "EN" | "BG") => void;
  // Optional prop to change header background for pages that don't have a hero image
  isTransparent?: boolean;
}

export default function Header({
  lang,
  setLang,
  isTransparent = true,
}: HeaderProps) {
  const golden = "#BC995D";
  const router = useRouter();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Sofia");

  const handleSearchClick = () => {
    // 3. Search button in header goes to explore page
    router.push("/explore");
  };

  const bgColor = isTransparent
    ? "bg-transparent"
    : "bg-[#0E1A2B] border-b border-white/10";

  return (
    <header className={`sticky top-0 z-50 ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-6 flex justify-between items-center">
        <Link href="/">
          <Image
            src={LOGO_PATH}
            alt="TableBird Logo"
            width={160}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-x-4">
          {/* 2. Location Selector - Taps to open popover/sheet */}
          <button
            onClick={() => setIsLocationOpen(true)}
            className="flex items-center gap-2 border border-white/50 rounded-full px-4 py-1.5 bg-black/20 backdrop-blur-sm hover:border-[#D4A853] transition"
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

          {/* Search Bar */}
          <div
            onClick={handleSearchClick}
            className="flex items-center gap-2 border border-white/50 rounded-full px-4 py-2.5 bg-black/20 backdrop-blur-sm w-72 cursor-pointer hover:border-[#D4A853] transition"
          >
            <span className="text-white placeholder-white/80 w-full text-sm">
              Search
            </span>
            <Search className="w-5 h-5 text-white" />
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "EN" ? "BG" : "EN")}
            role="switch"
            className="relative w-[86px] h-[45px] rounded-[50px] border border-white bg-black/20 shadow-md cursor-pointer transition-colors"
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

          {/* Login/Register Links (Re-added for header completeness) */}
          <Link
            href="/Login"
            className="text-white text-sm font-medium hover:text-[#D4A853] transition-colors ml-4"
          >
            Login
          </Link>
          <Link href="/Register">
            <Button
              className="ml-2 px-8 py-3 rounded-md shadow-lg hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: golden }}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>

      {/* Location Search Modal/Sheet */}
      <LocationSearchPopover
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          setIsLocationOpen(false);
          router.push(`/explore?loc=${loc}`);
        }}
      />
    </header>
  );
}
