import React from "react";
import { ShoppingBag, Search, User, MapPin } from "lucide-react";
import { useCart } from "../CartContext";
import { motion } from "motion/react";

interface NavbarProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ onCartClick, searchQuery, onSearchChange }: NavbarProps) {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">CraveDash</span>
          </div>

          {/* Delivery Location - Hidden on small mobile */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Deliver to: </span>
            <span>Maple Avenue, 12</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search food, restaurants..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-orange-200 focus:ring-0 rounded-full text-sm w-64 transition-all"
              />
            </div>
            
            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors hidden sm:block">
              <User className="w-6 h-6" />
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
