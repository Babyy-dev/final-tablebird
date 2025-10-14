// app/manager/slots/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockSlots = [
  { time: "6:00 PM", capacity: 50, booked: 20, available: 30 },
  { time: "7:00 PM", capacity: 50, booked: 45, available: 5 },
  { time: "8:00 PM", capacity: 50, booked: 10, available: 40 },
];

export default function SlotManagementPage() {
  const golden = "#D4A853";

  return (
    <DashboardLayout requiredRole="venue-manager">
      <h1 className="text-3xl font-bold text-white mb-6">Slot Management</h1>
      <Card className="bg-[#1A2E4C] border-gray-700 text-white mb-8">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Daily Capacity: October 15, 2025</CardTitle>
          <Button style={{ backgroundColor: golden, color: "#0A1E3C" }}>
            Adjust Capacity
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="text-white">
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-[#1A2E4C]">
                <TableHead>Time Slot</TableHead>
                <TableHead>Total Capacity</TableHead>
                <TableHead>Booked</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSlots.map((slot) => (
                <TableRow
                  key={slot.time}
                  className="border-gray-700 hover:bg-[#1A2E4C]/50"
                >
                  <TableCell className="font-medium" style={{ color: golden }}>
                    {slot.time}
                  </TableCell>
                  <TableCell>{slot.capacity}</TableCell>
                  <TableCell className="text-red-400">{slot.booked}</TableCell>
                  <TableCell className="text-green-400">
                    {slot.available}
                  </TableCell>
                  <TableCell>
                    {slot.available > 10 ? "Normal" : "High Demand"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
