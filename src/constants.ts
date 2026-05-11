import { Restaurant } from "./types";

export const RESTAURANTS: Restaurant[] = [
  {
    id: "rest-1",
    name: "Sushi Zen Garden",
    description: "Premium Japanese cuisine and fresh sashimi",
    rating: 4.8,
    deliveryTime: "25-35 min",
    minOrder: 20,
    deliveryFee: 2.99,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    categories: ["Sushi", "Japanese", "Seafood"],
    menu: [
      { id: "m1", name: "Dragon Roll", description: "Shrimp tempura, eel, avocado, and unagi sauce", price: 16.50, image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=400", category: "Signature Rolls" },
      { id: "m2", name: "Salmon Sashimi", description: "5 pieces of fresh Atlantic salmon", price: 14.00, image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400", category: "Sashimi" },
      { id: "m3", name: "Miso Soup", description: "Traditional dashi with tofu and seaweed", price: 4.50, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400", category: "Appetizers" }
    ]
  },
  {
    id: "rest-2",
    name: "Aroma Italia",
    description: "Authentic wood-fired pizzas and homemade pasta",
    rating: 4.6,
    deliveryTime: "30-45 min",
    minOrder: 15,
    deliveryFee: 1.50,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    categories: ["Pizza", "Italian", "Pasta"],
    menu: [
      { id: "m4", name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 18.00, image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=400", category: "Pizza" },
      { id: "m5", name: "Truffle Carbonara", description: "Pancetta, egg yolk, pecorino, black truffle", price: 21.00, image: "https://images.unsplash.com/photo-1633337474564-1d9478f4529a?auto=format&fit=crop&q=80&w=400", category: "Pasta" }
    ]
  },
  {
    id: "rest-3",
    name: "The Burger Lab",
    description: "Gourmet smash burgers and loaded fries",
    rating: 4.7,
    deliveryTime: "15-25 min",
    minOrder: 10,
    deliveryFee: 0.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800",
    categories: ["Burgers", "American", "Fast Food"],
    menu: [
      { id: "m6", name: "The Lab Beast", description: "Double wagyu patty, aged cheddar, secret sauce", price: 15.50, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400", category: "Burgers" },
      { id: "m7", name: "Truffle Fries", description: "Hand-cut fries, truffle oil, parmesan, herbs", price: 7.50, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400", category: "Sides" }
    ]
  },
  {
    id: "rest-4",
    name: "Green & Grain",
    description: "Healthy bowls, salads, and cold-pressed juices",
    rating: 4.9,
    deliveryTime: "20-30 min",
    minOrder: 12,
    deliveryFee: 1.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    categories: ["Salad", "Healthy", "Vegetarian"],
    menu: [
      { id: "m8", name: "Harvest Bowl", description: "Quinoa, roasted sweet potato, kale, tahini dressing", price: 14.50, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400", category: "Bowls" },
      { id: "m9", name: "Green Detox Juice", description: "Spinach, apple, ginger, lemon, cucumber", price: 8.00, image: "https://images.unsplash.com/photo-1622597467822-54576fe3d15c?auto=format&fit=crop&q=80&w=400", category: "Juices" }
    ]
  }
];

export const CATEGORIES = [
  "All", "Pizza", "Sushi", "Burgers", "Salad", "Japanese", "Italian", "Healthy"
];
