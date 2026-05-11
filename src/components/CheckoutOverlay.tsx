import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Package, Truck, Calendar } from "lucide-react";

interface CheckoutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  estimatedTime: string;
}

export default function CheckoutOverlay({ isOpen, onClose, estimatedTime }: CheckoutOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] p-8 text-center overflow-hidden"
          >
            {/* Celebration elements */}
            <div className="absolute top-0 left-0 w-full h-2 flex gap-1">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.05, repeat: Infinity, repeatType: 'reverse' }}
                  className={`flex-1 h-full bg-orange-400 opacity-20`}
                />
              ))}
            </div>

            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 font-medium">Your food is being prepared with love.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-400" />
                <div className="text-xs">
                  <div className="text-gray-400 font-bold uppercase tracking-wider">Order ID</div>
                  <div className="font-bold text-gray-900">#CD-92831</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-500" />
                <div className="text-xs">
                  <div className="text-gray-400 font-bold uppercase tracking-wider">Estimated Time</div>
                  <div className="font-bold text-gray-900">{estimatedTime}</div>
                </div>
              </div>
            </div>

            <div className="mb-8 text-left">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 px-1">
                Delivery Instructions
              </label>
              <textarea 
                placeholder="e.g. Gate code 1234, please leave at the front desk..."
                className="w-full p-4 bg-gray-50 border-transparent rounded-2xl text-sm focus:bg-white focus:border-orange-200 focus:ring-0 min-h-[100px] resize-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-4">
              <button 
                onClick={onClose}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-orange-500 transition-all active:scale-95"
              >
                Track Order
              </button>
              <button 
                onClick={onClose}
                className="w-full text-gray-400 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors"
              >
                Back to Home
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
