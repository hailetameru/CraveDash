import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Star, Clock, Info, Check } from "lucide-react";
import { MenuItem, Restaurant } from "../types";
import { useCart } from "../CartContext";
import { useToast } from "../ToastContext";

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

interface MenuItemRowProps {
  item: MenuItem;
  restaurant: Restaurant;
}

function MenuItemRow({ item, restaurant }: MenuItemRowProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(item, restaurant, quantity);
    showToast(`Added ${quantity}x ${item.name} to cart`);
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="group flex gap-4 p-4 bg-white rounded-2xl hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-gray-100"
    >
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 rounded-xl object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1">
        <h5 className="font-bold text-gray-900 mb-1">{item.name}</h5>
        <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-black text-orange-500">${item.price.toFixed(2)}</span>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={isAdding}
                className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition-colors disabled:opacity-30"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold w-4 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={isAdding}
                className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition-colors disabled:opacity-30"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <motion.button 
              onClick={handleAdd}
              disabled={isAdding}
              initial={false}
              animate={{
                width: isAdding ? 80 : 32,
                backgroundColor: isAdding ? "#22c55e" : "#111827",
              }}
              className={`h-8 rounded-lg flex items-center justify-center text-white relative overflow-hidden ${
                isAdding ? 'shadow-lg shadow-green-500/20' : 'hover:bg-orange-500'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1 whitespace-nowrap"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Done</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuModal({ restaurant, onClose }: MenuModalProps) {
  const { addToCart } = useCart();

  if (!restaurant) return null;

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Header Image Part for Mobile/Side */}
          <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{restaurant.name}</h2>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-90">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  {restaurant.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {restaurant.deliveryTime}
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 md:left-auto md:right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items Part */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50/50">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">Menu</h3>
                <p className="text-sm text-gray-500">Pick your favorite dishes</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl cursor-help">
                <Info className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-12">
              {categories.map(cat => (
                <div key={cat}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-4">
                    {cat}
                    <div className="h-px flex-1 bg-gray-100" />
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {restaurant.menu.filter(item => item.category === cat).map(item => (
                      <div key={item.id}>
                        <MenuItemRow item={item} restaurant={restaurant} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
