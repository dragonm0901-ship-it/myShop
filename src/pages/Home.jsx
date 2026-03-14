import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection, CategoryGrid, FlashSales } from '../components/home/HomeComponents';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      {/* Dynamic Payment/Trust Strip */}
      <div className="bg-textDark py-4 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-[scroll_20s_linear_infinite] opacity-50 text-white/50 text-sm font-bold tracking-widest uppercase">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-16 mx-8 items-center">
              <span>Verified Secure Checkout</span>
              <span>•</span>
              <span className="text-white">Stripe</span>
              <span>•</span>
              <span className="text-white">PayPal</span>
              <span>•</span>
              <span className="text-blue-400">Visa</span>
              <span>•</span>
              <span className="text-green-400">eSewa</span>
              <span>•</span>
              <span className="text-purple-400">Khalti</span>
              <span>•</span>
              <span className="text-white">Mastercard</span>
            </div>
          ))}
        </div>
      </div>

      <CategoryGrid />
      <FlashSales />
    </motion.div>
  );
};

export default Home;
