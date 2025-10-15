// lib/data/restaurants.ts
export type Restaurant = {
  id: number;
  name: string;
  rating: number;
  price: string;
  cuisine: string;
  location: string;
  neighborhood: string;
  image: string;
  tags: string[];
  x: number; // 0..1 left
  y: number; // 0..1 top
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "La coco",
    rating: 4.5,
    price: "40₺",
    cuisine: "Eatern Asia",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.78,
    y: 0.5,
  },
  {
    id: 2,
    name: "Pop Tate",
    rating: 4.2,
    price: "35₺",
    cuisine: "Zen Zone",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.86,
    y: 0.44,
  },
  {
    id: 3,
    name: "Social",
    rating: 4.8,
    price: "50₺",
    cuisine: "Cool Cafe",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.74,
    y: 0.46,
  },
  {
    id: 4,
    name: "KFC",
    rating: 4.0,
    price: "25₺",
    cuisine: "Fast Food",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.7,
    y: 0.42,
  },
  {
    id: 5,
    name: "Dominos",
    rating: 4.3,
    price: "30₺",
    cuisine: "Pizza",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.67,
    y: 0.48,
  },
  {
    id: 6,
    name: "Mainsonnaire",
    rating: 4.7,
    price: "60₺",
    cuisine: "Fine Dining",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.72,
    y: 0.38,
  },
  {
    id: 7,
    name: "La Cena",
    rating: 4.6,
    price: "45₺",
    cuisine: "Italian",
    location: "Urban ££1 - Great Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.62,
    y: 0.36,
  },
  {
    id: 8,
    name: "Spotlight",
    rating: 4.4,
    price: "55₺",
    cuisine: "Modern Cuisine",
    location: "Urban ££1 - Street Name",
    neighborhood: "Booked 4 times Today",
    image:
      "https://images.unsplash.com/photo-1541542684-4a1a5d17a8a1?q=80&w=1500&auto=format&fit=crop",
    tags: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    x: 0.58,
    y: 0.62,
  },
];
