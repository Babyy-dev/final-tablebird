// lib/data/destinations.ts
// (Content is exactly as provided in source)
export interface Destination {
  id: string;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  featured?: boolean;
  description: string;
  amenities: string[];
  included: string[];
  category: string;
}

export const destinations: Destination[] = [
  // ... (Paste all 8 Destination objects here from the source file)
];
