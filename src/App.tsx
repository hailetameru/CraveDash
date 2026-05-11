import React, { useState, useMemo } from "react";
import { CartProvider, useCart } from "./CartContext";
import { ToastProvider } from "./ToastContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantCard from "./components/RestaurantCard";
import MenuModal from "./components/MenuModal";
import CartSidebar from "./components/CartSidebar";
import CheckoutOverlay from "./components/CheckoutOverlay";
import { RESTAURANTS, CATEGORIES } from "./constants";
import { Restaurant } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Filter, SlidersHorizontal } from "lucide-react";

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating"); // "rating" | "time" | "fee"
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const { items } = useCart();

  const filteredRestaurants = useMemo(() => {
    let result = RESTAURANTS.filter((r) => {
      const matchesCategory = selectedCategory === "All" || r.categories.includes(selectedCategory);
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "fee") return a.deliveryFee - b.deliveryFee;
      if (sortBy === "time") {
        const timeA = parseInt(a.deliveryTime);
        const timeB = parseInt(b.deliveryTime);
        return timeA - timeB;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const estimatedTime = useMemo(() => {
    if (items.length === 0) return "25-35 Minutes";
    
    // Find the max base delivery time from restaurants in cart
    const restaurantIds = Array.from(new Set(items.map(i => i.restaurantId)));
    const relevantRestaurants = RESTAURANTS.filter(r => restaurantIds.includes(r.id));
    
    let maxMinTime = 0;
    let maxMaxTime = 0;
    
    relevantRestaurants.forEach(r => {
      const parts = r.deliveryTime.split("-");
      const min = parseInt(parts[0]);
      const max = parts.length > 1 ? parseInt(parts[1]) : min + 10;
      if (min > maxMinTime) maxMinTime = min;
      if (max > maxMaxTime) maxMaxTime = max;
    });

    // Add extra time based on item count (approx 2 mins per unique item)
    const extraTime = Math.min(15, items.length * 2);
    
    return `${maxMinTime + extraTime}-${maxMaxTime + extraTime} Minutes`;
  }, [items]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-600">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <Hero />

        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">Best Restaurants</h2>
              <p className="text-gray-400 font-medium">Curated selection for your taste buds</p>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2 pr-4 border-r border-gray-100 mr-2">
                <Filter className="w-4 h-4 text-gray-400" />
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-xl shadow-gray-900/10 scale-105"
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-12 py-4 border-b border-gray-50">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">Sort By:</span>
            {[
              { id: "rating", label: "Top Rated" },
              { id: "time", label: "Fastest" },
              { id: "fee", label: "Lowest Fee" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  sortBy === option.id
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <RestaurantCard 
                    restaurant={restaurant} 
                    onClick={setSelectedRestaurant} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="text-gray-300">
                <SlidersHorizontal className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 font-medium">No restaurants found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-orange-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Featured/Promotion Section */}
        <section className="bg-orange-50 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
                Get $0 Delivery Fee <br />
                <span className="text-orange-500">For 30 Days!</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Join CraveDash+ and enjoy unlimited free delivery on all orders from your favorite local spots.
              </p>
              <button className="bg-gray-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-colors shadow-2xl shadow-gray-900/20 active:scale-95">
                Start Free Trial
              </button>
            </div>
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -10, 0, 10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                  alt="Promo food" 
                  className="rounded-[60px] shadow-2xl w-full max-w-md mx-auto"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 rounded-full blur-3xl -z-0" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black italic">CD</span>
            </div>
            <span className="font-bold tracking-tight text-gray-900 uppercase">CraveDash</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-gray-300">© 2026 CraveDash Inc. All flavors reserved.</p>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <MenuModal 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutOverlay 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        estimatedTime={estimatedTime}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <MainContent />
      </ToastProvider>
    </CartProvider>
  );
}

