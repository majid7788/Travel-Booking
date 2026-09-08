export interface Destination {
  id: number;
  city: string;
  country: string;
  image: string;
  price: number;
  rating: number;
}

export const destinations: Destination[] = [
  {
    id: 1,
    city: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    price: 450,
    rating: 4.9,
  },
  {
    id: 2,
    city: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    price: 380,
    rating: 4.8,
  },
  {
    id: 3,
    city: "Istanbul",
    country: "Turkey",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
    price: 290,
    rating: 4.7,
  },
  {
    id: 4,
    city: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    price: 620,
    rating: 4.9,
  },
];