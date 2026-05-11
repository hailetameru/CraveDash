import React from "react";
import { Star, Clock, ShoppingBag } from "lucide-react";
import { Restaurant } from "../types";
import { motion } from "motion/react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => onClick(restaurant)}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
            {restaurant.rating}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 transition-transform">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.categories.map(cat => (
            <span key={cat} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-1">{restaurant.description}</p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600 border-t border-gray-50 pt-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            {restaurant.deliveryTime}
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div>Min. ${restaurant.minOrder}</div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="text-orange-600 font-bold">${restaurant.deliveryFee} fee</div>
        </div>
      </div>
    </motion.div>
  );
}
