// app/manager/dashboard/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, BookOpen, Clock, TrendingUp } from "lucide-react";

export default function VenueManagerDashboard() {
  return (
    <DashboardLayout requiredRole="venue-manager">
      <h1 className="text-3xl font-bold text-white mb-6">
        La Trattoria Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,450.00</div>
            <p className="text-xs text-green-400">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reservations
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185</div>
            <p className="text-xs text-green-400">25 confirmed today</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Slots
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-red-400">10% capacity remaining</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7:00 PM</div>
            <p className="text-xs text-green-400">Highest traffic time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-1 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Daily Reservation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              [Placeholder for Chart Component]
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Alice (2 guests)</span>
                <span className="font-bold">8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Bob (4 guests)</span>
                <span className="font-bold">6:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Charlie (1 guest)</span>
                <span className="font-bold">9:00 PM</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
