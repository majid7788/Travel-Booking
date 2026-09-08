export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Paris Hotel",
    city: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    rating: 4.9,
    reviews: 1240,
    price: 180,
    description:
      "Luxury hotel in the heart of Paris with beautiful city views.",
  },
  {
    id: 2,
    name: "Dubai Marina Resort",
    city: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    rating: 4.8,
    reviews: 980,
    price: 220,
    description:
      "Modern resort with stunning marina views and premium facilities.",
  },
  {
    id: 3,
    name: "Istanbul Palace",
    city: "Istanbul",
    country: "Turkey",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    rating: 4.7,
    reviews: 760,
    price: 120,
    description:
      "Elegant hotel close to Istanbul's most famous attractions.",
  },
  {
    id: 4,
    name: "Bali Paradise Resort",
    city: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8",
    rating: 4.9,
    reviews: 1560,
    price: 250,
    description:
      "Relax in a tropical paradise surrounded by nature and beaches.",
  },
  {
    id: 5,
    name: "Cairo Nile Hotel",
    city: "Cairo",
    country: "Egypt",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    rating: 4.6,
    reviews: 620,
    price: 95,
    description:
      "Comfortable hotel overlooking the Nile with excellent service.",
  },
  {
    id: 6,
    name: "Doha Grand Resort",
    city: "Doha",
    country: "Qatar",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    rating: 4.8,
    reviews: 840,
    price: 160,
    description:
      "Premium resort offering modern rooms and exceptional hospitality.",
  },
];