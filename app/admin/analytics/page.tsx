// app/admin/analytics/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assumes you created components/ui/card.tsx
import { DollarSign, Users, Store, ArrowLeftRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout requiredRole="admin">
      <h1 className="text-3xl font-bold text-white mb-6">
        Admin Analytics Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-green-400">+180 since last hour</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Venues</CardTitle>
            <Store className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-red-400">-5 since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-green-400">+19% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-1 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              [Placeholder for Chart Component]
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Top Performing Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>1. La Trattoria</span>
                <span className="font-bold">$8,500</span>
              </li>
              <li className="flex justify-between">
                <span>2. Oceans Catch</span>
                <span className="font-bold">$7,200</span>
              </li>
              <li className="flex justify-between">
                <span>3. The Grill House</span>
                <span className="font-bold">$6,100</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
