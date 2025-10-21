// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ChevronDown, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
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
  const pathname = usePathname();
  const t = useTranslations('header');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Sofia");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get current language directly from pathname (English is default)
  // Only Bulgarian if pathname explicitly starts with '/bg'
  const isCurrentlyBulgarian = pathname.startsWith('/bg');
  const currentLang = isCurrentlyBulgarian ? 'BG' : 'EN';

  const handleSearchClick = () => {
    const explorePath = isCurrentlyBulgarian ? '/bg/explore' : '/explore';
    router.push(explorePath);
  };

  const handleLocationClick = () => {
    setIsLocationOpen(true);
  };

  const handleLanguageSwitch = () => {
    let newPath;
    
    if (isCurrentlyBulgarian) {
      // Switch from Bulgarian to English (remove /bg prefix)
      if (pathname === '/bg') {
        newPath = '/';
      } else if (pathname.startsWith('/bg/')) {
        newPath = pathname.substring(3); // Remove '/bg'
      } else {
        newPath = '/'; // Fallback
      }
    } else {
      // Switch from English to Bulgarian (add /bg prefix)  
      newPath = pathname === '/' ? '/bg' : `/bg${pathname}`;
    }
    
    // Force a full page reload to ensure proper navigation
    window.location.assign(newPath);
  };

  const bgColor = isTransparent
    ? "bg-transparent"
    : "bg-[#0E1A2B] border-b border-white/10";

  return (
    <header className={`sticky top-0 z-50 ${bgColor}`}>
      {/* Enhanced mobile responsive header */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-14 py-3 sm:py-4 md:py-6 flex justify-between items-center h-[60px] sm:h-[68px] md:h-[72px]">
        <Link href={pathname.startsWith('/bg') ? '/bg' : '/'} className="flex-shrink-0">
          <Image
            src={LOGO_PATH}
            alt="TableBird Logo"
            width={160}
            height={44}
            className="h-7 sm:h-8 w-auto object-contain md:h-11"
          />
        </Link>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          {/* DESKTOP ACTIONS (Hidden on mobile) */}
          {/* Enhanced mobile hiding with better spacing */}
          <button
            onClick={handleLocationClick}
            className="hidden xl:flex items-center gap-2 border border-white/50 rounded-md px-3 lg:px-4 py-1.5 bg-black/20 backdrop-blur-sm hover:border-[#D4A853] transition text-sm"
          >
            <MapPin className="w-5 h-5 text-white" />
            <div>
              <p className="text-xs text-white/70 leading-none">{t('location')}</p>
              <p className="text-sm font-medium text-white leading-none">
                {currentLocation}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          <div
            onClick={handleSearchClick}
            className="hidden xl:flex items-center gap-2 border border-white/50 rounded-md px-4 py-2.5 bg-black/20 backdrop-blur-sm w-72 cursor-pointer hover:border-[#D4A853] transition"
          >
            <span className="text-white placeholder-white/80 w-full text-sm">
              {t('search')}
            </span>
            <Search className="w-5 h-5 text-white" />
          </div>

          <button
            onClick={handleLanguageSwitch}
            // role="switch"
            className="hidden xl:inline-flex relative w-[86px] h-[45px] rounded-[50px] border border-white bg-black/20 shadow-md cursor-pointer transition-colors"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.4)" }}
          >
            <div
              className={`absolute top-[5px] w-[35px] h-[35px] rounded-full transition-all duration-300 ${
                currentLang === "EN" ? "left-[5px]" : "left-[46px]"
              }`}
              style={{ backgroundColor: golden }}
            ></div>
            <span
              className={`absolute left-[13px] top-[14px] text-sm font-medium z-10 ${
                currentLang === "EN" ? "text-black" : "text-white"
              }`}
            >
              EN
            </span>
            <span
              className={`absolute right-[13px] top-[14px] text-sm font-medium z-10 ${
                currentLang === "BG" ? "text-black" : "text-white"
              }`}
            >
              BG
            </span>
          </button>

          <Link
            href={pathname.startsWith('/bg') ? '/bg/Restaurants' : '/Restaurants'}
            className="hidden xl:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            {t('restaurants')}
          </Link>

          <Link
            href={pathname.startsWith('/bg') ? '/bg/Bars' : '/Bars'}
            className="hidden xl:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            {t('bars')}
          </Link>

          <Link
            href={pathname.startsWith('/bg') ? '/bg/Clubs' : '/Clubs'}
            className="hidden xl:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            {t('clubs')}
          </Link>

          <Link
            href={pathname.startsWith('/bg') ? '/bg/Favourites' : '/Favourites'}
            className="hidden xl:inline-block text-white text-sm font-medium transition-colors ml-2 lg:ml-4"
          >
            {t('favourites')}
          </Link>

          {/* <Link
            href="/Login"
            className="hidden xl:inline-block text-white text-sm font-medium hover:text-[#D4A853] transition-colors ml-2 lg:ml-4"
          >
            Login
          </Link> */}

          <Link href={pathname.startsWith('/bg') ? '/bg/Register' : '/Register'} className="hidden xl:inline-block">
            <Button
              className="ml-2 px-6 py-2.5 lg:px-8 lg:py-3 rounded-md shadow-lg hover:bg-opacity-90 transition-colors h-9 lg:h-10 text-xs lg:text-sm"
              style={{ backgroundColor: golden }}
            >
              {t('register')}
            </Button>
          </Link>

          {/* MOBILE HAMBURGER MENU ICON (Visible on mobile and tablet, hidden on xl+) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="xl:hidden text-white hover:text-[#D4A853] transition-colors p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      <LocationSearchPopover
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          setIsLocationOpen(false);
          const currentLocale = pathname.startsWith('/bg') ? 'bg' : 'en';
          const explorePath = currentLocale === 'en' ? '/explore' : '/bg/explore';
          router.push(`${explorePath}?loc=${loc}`);
        }}
      />

      {/* Mobile Menu Sheet component */}
      <MobileMenuSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lang={currentLang}
        setLang={setLang}
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
      />
    </header>
  );
}
