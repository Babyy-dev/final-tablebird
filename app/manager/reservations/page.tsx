// app/manager/reservations/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockReservations = [
  {
    id: 1,
    customer: "Alice Johnson",
    time: "7:00 PM",
    date: "2025-10-15",
    guests: 4,
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Bob Smith",
    time: "6:30 PM",
    date: "2025-10-15",
    guests: 2,
    status: "Pending",
  },
];

export default function VenueReservationsPage() {
  const golden = "#D4A853";

  return (
    <DashboardLayout requiredRole="venue-manager">
      <h1 className="text-3xl font-bold text-white mb-6">Reservations</h1>
      <div className="bg-[#1A2E4C] rounded-lg p-4">
        <Table className="text-white">
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-[#1A2E4C]">
              <TableHead>Reservation ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReservations.map((res) => (
              <TableRow
                key={res.id}
                className="border-gray-700 hover:bg-[#1A2E4C]/50"
              >
                <TableCell className="font-medium text-gray-300">
                  {res.id}
                </TableCell>
                <TableCell>{res.customer}</TableCell>
                <TableCell>{res.date}</TableCell>
                <TableCell>{res.time}</TableCell>
                <TableCell>{res.guests}</TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    style={{
                      backgroundColor:
                        res.status === "Confirmed" ? "green" : "orange",
                      color: "white",
                    }}
                  >
                    {res.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C] mr-2"
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C]"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
