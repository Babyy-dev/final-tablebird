// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderProps {
  lang: "EN" | "BG";
  setLang: (lang: "EN" | "BG") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const golden = "#BC995D";
  const router = useRouter();

  return (
    <header className="max-w-[1440px] mx-auto px-6 lg:px-14 py-6 grid grid-cols-[auto_1fr_auto] items-center gap-6">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="TableBird Logo"
          width={160}
          height={44}
          className="h-11 w-auto object-contain"
        />
      </Link>

      {/* Center nav links */}
      <nav className="hidden md:flex items-center justify-center gap-6 text-sm">
        <Link href="#" className="text-white hover:text-[#BC995D]">
          Restaurants
        </Link>
        <Link href="#" className="text-white hover:text-[#BC995D]">
          Bars
        </Link>
        <Link href="#" className="text-white/60 hover:text-[#BC995D]">
          Clubs
        </Link>
        <Link href="#" className="text-white hover:text-[#BC995D]">
          Favourites
        </Link>
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Location Selector */}
        <div className="h-[45px] flex items-center gap-2.5 px-2.5 rounded-xl border border-white bg-black/20 backdrop-blur-sm">
          <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          <div>
            <div className="text-white/90 text-[10px] sm:text-xs leading-none">
              Location
            </div>
            <div className="text-white text-xs sm:text-sm font-medium">
              Sofia
            </div>
          </div>
        </div>

        {/* Search button (takes to a search page - mock route) */}
        <button
          onClick={() => router.push("/search")}
          className="lg:block h-[45px] min-w-[200px] flex items-center justify-between px-3 rounded-xl border border-white bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
          <span className="text-white text-sm font-medium">Search</span>
          <Search className="w-5 h-5 text-white" />
        </button>

        {/* Language Toggle (EN/BG) */}
        <button
          onClick={() => setLang(lang === "EN" ? "BG" : "EN")}
          role="switch"
          aria-checked={lang === "BG"}
          className="relative w-[86px] h-[45px] rounded-[50px] border border-white bg-black/20 shadow-md cursor-pointer transition-colors"
          style={{ backgroundColor: "rgba(14, 26, 43, 0.4)" }}
        >
          <div
            className={`absolute top-[5px] w-[35px] h-[35px] rounded-full transition-all duration-300 ${
              lang === "EN" ? "left-[5px]" : "left-[46px]"
            }`}
            style={{ backgroundColor: golden }}
          ></div>
          {/* Note: Colors are explicitly defined to work with dynamic Tailwind styles */}
          <span
            className={`absolute left-[13px] top-[14px] text-sm font-medium transition-colors z-10 ${
              lang === "EN" ? "text-black" : "text-white"
            }`}
          >
            EN
          </span>
          <span
            className={`absolute right-[13px] top-[14px] text-sm font-medium transition-colors z-10 ${
              lang === "BG" ? "text-black" : "text-white"
            }`}
          >
            BG
          </span>
        </button>

        {/* Register Button */}
        <Link
          href="/Register"
          className="px-6 sm:px-10 py-3.5 rounded-md border border-white shadow-md text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
          style={{ backgroundColor: golden }}
        >
          Register
        </Link>
      </div>
    </header>
  );
}
