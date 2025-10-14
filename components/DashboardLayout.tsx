// components/DashboardLayout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { AdminSidebar } from "./AdminSidebar";
import { VenueManagerSidebar } from "./VenueManagerSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole: "admin" | "venue-manager";
}

export default function DashboardLayout({
  children,
  requiredRole,
}: DashboardLayoutProps) {
  const { user } = useBooking();
  const router = useRouter();
  const golden = "#D4A853";

  // Authorization Check
  useEffect(() => {
    if (user === undefined) return;

    if (!user || user.type !== requiredRole) {
      router.replace("/");
    }
  }, [user, requiredRole, router]);

  if (user === null || user.type !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1E3C] text-white">
        <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading or
        Unauthorized...
      </div>
    );
  }

  const Sidebar = requiredRole === "admin" ? AdminSidebar : VenueManagerSidebar;

  return (
    <div className="min-h-screen flex bg-[#0A1E3C]">
      <Sidebar user={user} />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-[#1A2E4C] p-4 border-b border-gray-700 flex justify-between items-center z-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="TableBird Logo"
              width={120}
              height={30}
              className="object-contain"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium" style={{ color: golden }}>
              {user.name} ({user.type})
            </span>
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
