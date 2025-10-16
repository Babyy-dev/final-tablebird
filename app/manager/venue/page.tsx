// app/manager/venue/page.tsx
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Assumes components/ui/input.tsx exists
import { Textarea } from "@/components/ui/textarea"; // Assumes components/ui/textarea.tsx exists
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"; // Assumes components/ui/ImageWithFallback.tsx exists

export default function VenueManagementPage() {
  const golden = "#D4A853";

  return (
    <DashboardLayout requiredRole="venue-manager">
      <h1 className="text-3xl font-bold text-white mb-6">
        Venue Details Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Venue Information Form */}
        <Card className="lg:col-span-2 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your restaurants details and contact info.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Venue Name</Label>
                <Input
                  id="name"
                  defaultValue="La Trattoria"
                  className="bg-[#0A1E3C] border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  defaultValue="Sofia, Bulgaria"
                  className="bg-[#0A1E3C] border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                defaultValue="Authentic Italian dining experience..."
                className="bg-[#0A1E3C] border-gray-600 text-white"
              />
            </div>
            <Button
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
              className="hover:bg-opacity-90"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Media/Image Management */}
        <Card className="lg:col-span-1 bg-[#1A2E4C] border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Venue Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full h-40 relative rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                alt="Venue Hero"
                className="object-cover"
              />
            </div>
            <Button
              variant="outline"
              className="w-full bg-[#0A1E3C] border-gray-600 text-white hover:bg-[#1A2E4C]"
            >
              Upload New Image
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
