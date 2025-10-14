// lib/data/destinations.ts

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

// NOTE: I am using the mock data provided in the original repository's pages.
export const destinations: Destination[] = [
  {
    id: "the-grand-restaurant",
    image:
      "https://images.unsplash.com/photo-1661422586023-681ea60507e2?w=1080",
    title: "The Grand Restaurant",
    location: "Sofia, Bulgaria",
    rating: 4.9,
    reviews: 342,
    price: 85,
    duration: "2 hours",
    featured: true,
    description:
      "Experience fine dining at its best in our elegant restaurant. Featuring contemporary European cuisine with a focus on seasonal ingredients and exceptional presentation.",
    amenities: [
      "Private Dining",
      "Wine Cellar",
      "Bar",
      "Valet Parking",
      "Live Music",
      "WiFi",
    ],
    included: [
      "Amuse-bouche",
      "Bread Service",
      "Complimentary Water",
      "After-dinner Mints",
    ],
    category: "Fine Dining",
  },
  {
    id: "sky-lounge",
    image:
      "https://images.unsplash.com/photo-1756397391675-dce7c5faf9cc?w=1080",
    title: "Sky Lounge",
    location: "Plovdiv, Bulgaria",
    rating: 4.8,
    reviews: 267,
    price: 95,
    duration: "2-3 hours",
    featured: true,
    description:
      "Elevated dining with panoramic city views. Enjoy sunset cocktails and innovative fusion cuisine on our stunning rooftop terrace.",
    amenities: [
      "Rooftop Terrace",
      "Cocktail Bar",
      "City Views",
      "Outdoor Seating",
      "DJ Nights",
      "WiFi",
    ],
    included: ["Welcome Cocktail", "Sunset Views", "Complimentary Appetizer"],
    category: "Rooftop",
  },
  {
    id: "bella-italia",
    image:
      "https://images.unsplash.com/photo-1703258581842-31608ecd6528?w=1080",
    title: "Bella Italia",
    location: "Sofia, Bulgaria",
    rating: 4.7,
    reviews: 428,
    price: 65,
    duration: "1.5-2 hours",
    description:
      "Authentic Italian cuisine in the heart of the city. Handmade pasta, wood-fired pizzas, and traditional recipes passed down through generations.",
    amenities: [
      "Wood-Fired Oven",
      "Outdoor Patio",
      "Wine Selection",
      "Family-Friendly",
      "Takeaway",
    ],
    included: [
      "Fresh Bread",
      "Olive Oil & Balsamic",
      "Complimentary Limoncello",
    ],
    category: "Italian",
  },
  {
    id: "ocean-grill",
    image:
      "https://images.unsplash.com/photo-1736381563680-03d7ad197ed4?w=1080",
    title: "Ocean Grill",
    location: "Varna, Bulgaria",
    rating: 4.8,
    reviews: 389,
    price: 78,
    duration: "2 hours",
    description:
      "Fresh seafood and stunning ocean views. Daily catch specials and sustainable fishing practices ensure the finest quality.",
    amenities: [
      "Ocean View",
      "Fresh Seafood",
      "Outdoor Deck",
      "Bar",
      "Sustainable Sourcing",
    ],
    included: ["Oyster Starter", "Lemon Water", "Tartar Sauce Selection"],
    category: "Seafood",
  },
  {
    id: "steakhouse-prime",
    image:
      "https://images.unsplash.com/photo-1690983325563-fe4412c4c347?w=1080",
    title: "Steakhouse Prime",
    location: "Sofia, Bulgaria",
    rating: 4.9,
    reviews: 512,
    price: 92,
    duration: "2-3 hours",
    featured: true,
    description:
      "Premium cuts aged to perfection. Experience the finest steaks with our signature dry-aging process and expert preparation.",
    amenities: [
      "Dry-Aged Beef",
      "Whisky Bar",
      "Private Rooms",
      "Sommelier",
      "Cigar Lounge",
    ],
    included: ["Bread & Butter", "Steak Sauce Selection", "Side Salad"],
    category: "Steakhouse",
  },
  {
    id: "asian-fusion",
    image:
      "https://images.unsplash.com/photo-1601121626816-20662be061d8?w=1080",
    title: "Asian Fusion",
    location: "Plovdiv, Bulgaria",
    rating: 4.7,
    reviews: 298,
    price: 58,
    duration: "1.5-2 hours",
    description:
      "Contemporary Asian cuisine blending traditional flavors with modern techniques. Sushi bar, dim sum, and innovative fusion dishes.",
    amenities: [
      "Sushi Bar",
      "Teppanyaki",
      "Private Booths",
      "Sake Selection",
      "Lunch Menu",
    ],
    included: ["Edamame", "Miso Soup", "Green Tea"],
    category: "Asian",
  },
  {
    id: "garden-terrace",
    image:
      "https://images.unsplash.com/photo-1759866614095-d867221143f7?w=1080",
    title: "Garden Terrace",
    location: "Varna, Bulgaria",
    rating: 4.6,
    reviews: 234,
    price: 72,
    duration: "2 hours",
    description:
      "Dine surrounded by nature in our beautiful garden setting. Farm-to-table cuisine with organic ingredients from local suppliers.",
    amenities: [
      "Garden Setting",
      "Organic Menu",
      "Outdoor Heaters",
      "Pet-Friendly",
      "Brunch",
    ],
    included: ["Fresh Juice", "Garden Salad", "Homemade Bread"],
    category: "Garden",
  },
  {
    id: "tasting-room",
    image:
      "https://images.unsplash.com/photo-1698434939525-dd584e446a29?w=1080",
    title: "The Tasting Room",
    location: "Plovdiv, Bulgaria",
    rating: 4.9,
    reviews: 187,
    price: 125,
    duration: "3-4 hours",
    featured: true,
    description:
      "Michelin-starred tasting menu experience. An intimate culinary journey featuring seasonal ingredients and wine pairings.",
    amenities: [
      "Michelin Star",
      "Wine Pairing",
      "Chef's Table",
      "Tasting Menu Only",
      "Sommelier",
    ],
    included: ["Wine Pairing", "Amuse-bouche", "Petit Fours", "Coffee Service"],
    category: "Fine Dining",
  },
];
