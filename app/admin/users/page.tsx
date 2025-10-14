// app/admin/users/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assumes table component exists
import { Badge } from "@/components/ui/badge"; // Assumes badge component exists
import { Button } from "@/components/ui/button"; // Assumes button component exists

const mockUsers = [
  {
    id: 1,
    name: "Customer Doe",
    email: "customer@example.com",
    role: "customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Venue Alex",
    email: "alex@venue.com",
    role: "venue-manager",
    status: "Pending",
  },
  {
    id: 3,
    name: "Admin Jane",
    email: "jane@admin.com",
    role: "admin",
    status: "Active",
  },
];

export default function AdminUserManagementPage() {
  const golden = "#D4A853";

  return (
    <DashboardLayout requiredRole="admin">
      <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>
      <div className="bg-[#1A2E4C] rounded-lg p-4">
        <Table className="text-white">
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-[#1A2E4C]">
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-gray-700 hover:bg-[#1A2E4C]/50"
              >
                <TableCell className="font-medium text-gray-300">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-gray-400">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    style={{
                      backgroundColor:
                        user.role === "admin" ? golden : "#0A1E3C",
                      color: user.role === "admin" ? "#0A1E3C" : "white",
                    }}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    style={{
                      backgroundColor:
                        user.status === "Active" ? "green" : "orange",
                      color: "white",
                    }}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
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
