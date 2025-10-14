// components/VenueManagerSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  BookOpen,
  Clock,
  ArrowLeftRight,
} from "lucide-react";
import React from "react";

interface SidebarProps {
  user: { name: string; email: string; restaurantName?: string };
}

export function VenueManagerSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const golden = "#D4A853";

  const navItems = [
    { name: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
    { name: "Venue Details", href: "/manager/venue", icon: Store },
    { name: "Reservations", href: "/manager/reservations", icon: BookOpen },
    { name: "Slot Management", href: "/manager/slots", icon: Clock },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-[#1A2E4C] text-white p-4 border-r border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold" style={{ color: golden }}>
          {user.restaurantName || "Venue Manager"}
        </h2>
        <p className="text-sm text-gray-400">{user.name}</p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
                style={{ backgroundColor: isActive ? "#0A1E3C" : undefined }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 pt-4 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700/50"
        >
          <ArrowLeftRight className="w-5 h-5 mr-3" />
          Back to Customer View
        </Link>
      </div>
    </div>
  );
}
