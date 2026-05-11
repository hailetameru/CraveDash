import React from "react";
import { motion } from "motion/react";
import { Search, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-[400px] md:h-[500px] bg-gray-900 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600" 
          alt="Gourmet food banner" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 mb-6 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full">
            Fastest Delivery in Town
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Crave it? <span className="text-orange-500">Dash it.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 mx-auto">
            Order from the best local restaurants and get your favorite meals delivered fresh to your door in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Enter your delivery address" 
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-900 focus:ring-0 focus:border-orange-500 border-none transition-shadow shadow-lg"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 transform active:scale-95">
              Find Food
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
