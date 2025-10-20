// components/MobileMenuSheet.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  ChevronDown,
  LogIn,
  UserPlus,
  Utensils,
  Star,
  Heart,
  GlassWater,
  Search,
} from "lucide-react";

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "EN" | "BG";
  setLang: (lang: "EN" | "BG") => void;
  currentLocation: string;
  onLocationClick: () => void;
}

export function MobileMenuSheet({
  isOpen,
  onClose,
  lang,
  setLang,
  currentLocation,
  onLocationClick,
}: MobileMenuSheetProps) {
  const golden = "#D4A853";
  
  // Translation hooks
  const t = useTranslations('mobile_menu');
  const tHeader = useTranslations('header');

  const newNavLinks = [
    { name: tHeader('restaurants'), href: "/Restaurants", icon: Utensils },
    { name: tHeader('bars'), href: "/Bars", icon: GlassWater },
    { name: tHeader('clubs'), href: "/Clubs", icon: Star },
    { name: tHeader('favourites'), href: "/Favourites", icon: Heart },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        // FIX: Use w-[85%] on smaller screens to ensure it slides out completely, then max-w-xs on bigger screens.
        className="bg-[#0E1A2B] border-l border-gray-700 p-0 text-white w-[85%] max-w-full sm:max-w-xs"
      >
        <SheetHeader className="p-4 border-b border-gray-700">
          <SheetTitle className="text-white text-xl">
            {t('title')}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col p-4 space-y-4">
          {/* Login/Register Buttons */}
          <div className="flex flex-col space-y-2">
            <Link href="/Login" onClick={onClose}>
              <Button
                className="w-full justify-start gap-2 bg-[#1A2E4C] hover:bg-[#2A3E5C] text-white"
                variant="outline"
              >
                <LogIn className="w-5 h-5" />
                {tHeader('login')}
              </Button>
            </Link>
            <Link href="/Register" onClick={onClose}>
              <Button
                className="w-full justify-start gap-2"
                style={{ backgroundColor: golden, color: "#0A1E3C" }}
                variant="default"
              >
                <UserPlus className="w-5 h-5" />
                {tHeader('register')}
              </Button>
            </Link>
          </div>

          {/* Search Button */}
          <Link href="/explore" onClick={onClose}>
            <Button
              className="w-full justify-start gap-2 bg-[#1A2E4C] hover:bg-[#2A3E5C] text-white border border-gray-700"
              variant="outline"
            >
              <Search className="w-5 h-5" />
              {tHeader('search')}
            </Button>
          </Link>

          {/* New Navigation Links Section for the added tabs */}
          <div className="pt-4 space-y-1 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              {t('explore')}
            </h3>
            {newNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block"
              >
                <Button
                  className="w-full justify-start gap-3 bg-transparent hover:bg-[#1A2E4C] text-white/90"
                  variant="ghost"
                >
                  <link.icon className="w-5 h-5 text-white/70" />
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Location Selector */}
          <button
            onClick={() => {
              onClose();
              onLocationClick(); // Opens the original LocationPopover
            }}
            className="flex items-center justify-between p-3 border border-gray-700 rounded-md bg-[#1A2E4C] hover:bg-[#2A3E5C] transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white" />
              <div className="flex flex-col items-start">
                <p className="text-xs text-white/70 leading-none">{tHeader('location')}</p>
                <p className="text-sm font-medium text-white leading-none">
                  {currentLocation}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          {/* Language Toggle */}
          <div className="border border-gray-700 rounded-md p-3 flex justify-between items-center bg-[#1A2E4C]">
            <span className="text-white">{t('language')}</span>
            <button
              onClick={() => setLang(lang === "EN" ? "BG" : "EN")}
              // role="switch"
              className="relative w-[70px] h-[35px] rounded-[50px] border border-white/50 bg-black/20 shadow-md cursor-pointer transition-colors"
              style={{ backgroundColor: "rgba(14, 26, 43, 0.4)" }}
            >
              <div
                className={`absolute top-[3px] w-[29px] h-[29px] rounded-full transition-all duration-300 ${
                  lang === "EN" ? "left-[3px]" : "left-[38px]"
                }`}
                style={{ backgroundColor: golden }}
              ></div>
              <span
                className={`absolute left-[10px] top-[9px] text-xs font-medium z-10 ${
                  lang === "EN" ? "text-black" : "text-white"
                }`}
              >
                EN
              </span>
              <span
                className={`absolute right-[10px] top-[9px] text-xs font-medium z-10 ${
                  lang === "BG" ? "text-black" : "text-white"
                }`}
              >
                BG
              </span>
            </button>
          </div>

          {/* Placeholder/Admin link */}
          <Link
            href="/admin/analytics"
            className="pt-4 text-gray-400 hover:text-red-400 text-sm"
          >
            {t('admin_dashboard')}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
