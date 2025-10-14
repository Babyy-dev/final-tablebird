// components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Users, Store, ArrowLeftRight } from "lucide-react";
import React from "react";

interface SidebarProps {
  user: { name: string; email: string };
}

export function AdminSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const golden = "#D4A853";

  const navItems = [
    { name: "Analytics", href: "/admin/analytics", icon: Gauge },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Venue Management", href: "/admin/venues", icon: Store },
    { name: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-[#1A2E4C] text-white p-4 border-r border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold" style={{ color: golden }}>
          Admin Panel
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
