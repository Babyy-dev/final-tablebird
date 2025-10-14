// app/admin/venues/page.tsx
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
import Link from "next/link";

const mockVenues = [
  {
    id: 101,
    name: "La Trattoria",
    manager: "Venue Alex",
    status: "Approved",
    bookings: 120,
  },
  {
    id: 102,
    name: "Ocean's Catch",
    manager: "Manager Bob",
    status: "Pending",
    bookings: 45,
  },
];

export default function AdminVenueManagementPage() {
  const golden = "#D4A853";

  return (
    <DashboardLayout requiredRole="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Venue Management</h1>
        <Button
          style={{ backgroundColor: golden, color: "#0A1E3C" }}
          className="hover:bg-opacity-90"
        >
          Add New Venue
        </Button>
      </div>
      <div className="bg-[#1A2E4C] rounded-lg p-4">
        <Table className="text-white">
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-[#1A2E4C]">
              <TableHead>Venue ID</TableHead>
              <TableHead>Venue Name</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVenues.map((venue) => (
              <TableRow
                key={venue.id}
                className="border-gray-700 hover:bg-[#1A2E4C]/50"
              >
                <TableCell className="font-medium text-gray-300">
                  {venue.id}
                </TableCell>
                <TableCell>{venue.name}</TableCell>
                <TableCell className="text-gray-400">{venue.manager}</TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    style={{
                      backgroundColor:
                        venue.status === "Approved" ? "green" : "orange",
                      color: "white",
                    }}
                  >
                    {venue.status}
                  </Badge>
                </TableCell>
                <TableCell>{venue.bookings}</TableCell>
                <TableCell>
                  <Link
                    href={`/destination/${venue.id}`}
                    className="inline-block mr-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C]"
                    >
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C]"
                  >
                    Edit
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
