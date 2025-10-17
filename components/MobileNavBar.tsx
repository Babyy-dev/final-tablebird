// components/MobileNavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Star, MapPin, Heart, GlassWater } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavBar = () => {
  const pathname = usePathname();
  const golden = "#D4A853";
  const deepBlue = "#0E1A2B";

  const navItems = [
    {
      name: "Restaurants",
      href: "/",
      icon: Utensils,
      activePaths: ["/", "/explore", "/venue"],
    },
    { name: "Bars", href: "/bars", icon: GlassWater, activePaths: ["/bars"] },
    { name: "Clubs", href: "/clubs", icon: Star, activePaths: ["/clubs"] },
    { name: "Maps", href: "/maps", icon: MapPin, activePaths: ["/maps"] },
    {
      name: "Favourites",
      href: "/favourites",
      icon: Heart,
      activePaths: ["/favourites"],
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 xl:hidden"
      style={{
        backgroundColor: deepBlue,
        borderTop: "1px solid #1A2E4C",
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <nav className="flex justify-around items-center h-25 px-4 ">
        {navItems.map((item) => {
          const isActive = item.activePaths.some((path) =>
            pathname.startsWith(path)
          );

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center p-2 text-white/70 hover:text-white transition-colors"
            >
              <item.icon
                className={cn(
                  "w-6 h-6 mb-1 transition-colors",
                  isActive ? "text-[#D4A853]" : "text-white/60"
                )}
                style={{ color: isActive ? golden : undefined }}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60"
                )}
                style={{ color: isActive ? golden : undefined }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="w-full h-1" style={{ backgroundColor: golden }}></div>
    </div>
  );
};

export default MobileNavBar;
