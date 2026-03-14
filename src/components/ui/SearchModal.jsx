import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RECENT_SEARCHES = ["Smart Watch", "Running Shoes", "Wireless Earbuds"];
const POPULAR_CATEGORIES = ["Electronics", "Men's Fashion", "Groceries", "Home Appliances"];

// Mock DB for instant search
const MOCK_DB = [
  { id: '1', name: "Aero X1 Running Shoes", price: "NPR 8,500", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" },
  { id: '2', name: "Quantum Smart Watch", price: "NPR 25,000", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80" },
  { id: '4', name: "Noise Cancelling Earbuds", price: "NPR 15,000", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80" },
];

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery("");
    }
  }, [isOpen]);

  const results = query.length > 1 
    ? MOCK_DB.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex flex-col items-center pt-[10vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"
          />

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden mx-4 flex flex-col max-h-[80vh]"
          >
            {/* Input Header */}
            <div className="flex items-center px-6 py-4 border-b border-gray-100 bg-neutral/50">
              <Search className="text-primary w-6 h-6 mr-4 flex-shrink-0" />
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands, or categories..." 
                className="flex-1 bg-transparent text-xl font-bold text-textDark placeholder:text-gray-400 focus:outline-none"
              />
              <button 
                onClick={onClose}
                className="p-2 bg-gray-200/50 hover:bg-gray-200 text-gray-500 rounded-full transition-colors ml-4"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto p-6 bg-white min-h-[300px]">
              {query.length === 0 ? (
                // Default State (Recent/Popular)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Recent Searches</h3>
                    <ul className="space-y-3">
                      {RECENT_SEARCHES.map((item, idx) => (
                        <li key={idx}>
                          <button 
                            onClick={() => setQuery(item)}
                            className="flex items-center gap-3 text-gray-600 font-medium hover:text-primary transition-colors text-left w-full group"
                          >
                            <Clock size={16} className="text-gray-300 group-hover:text-primary transition-colors" /> {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Categories</h3>
                    <div className="flex flex-wrap gap-2">
                       {POPULAR_CATEGORIES.map((cat, idx) => (
                         <Link 
                           key={idx} 
                           to="/shop" 
                           onClick={onClose}
                           className="px-4 py-2 bg-neutral hover:bg-primary/10 hover:text-primary text-gray-600 font-bold text-sm rounded-full transition-colors"
                         >
                           {cat}
                         </Link>
                       ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Results State
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                    {results.length > 0 ? 'Products' : 'No Results Found'}
                  </h3>
                  
                  {results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map(product => (
                        <Link 
                          to={`/product/${product.id}`} 
                          key={product.id}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                               <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                            </div>
                            <div>
                               <h4 className="font-bold text-textDark group-hover:text-primary transition-colors">{product.name}</h4>
                               <p className="text-sm font-extrabold text-gray-500">{product.price}</p>
                            </div>
                          </div>
                          <ArrowRight size={18} className="text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all mr-4" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Search size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-medium text-lg text-textDark mb-1">We couldn't find anything for "{query}"</p>
                      <p className="text-sm">Try searching for something else or browse our categories.</p>
                      <Link 
                        to="/shop" 
                        onClick={onClose}
                        className="inline-block mt-6 px-6 py-3 bg-neutral hover:bg-gray-200 text-textDark font-bold rounded-xl transition-colors"
                      >
                        Browse All Products
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-neutral/50 border-t border-gray-100 py-3 px-6 text-center text-xs font-medium text-gray-400 flex items-center justify-center gap-4">
               <span><kbd className="bg-white border text-gray-500 rounded px-1.5 py-0.5 shadow-sm font-sans mx-1">↑</kbd><kbd className="bg-white border text-gray-500 rounded px-1.5 py-0.5 shadow-sm font-sans mx-1">↓</kbd> to navigate</span>
               <span><kbd className="bg-white border text-gray-500 rounded px-1.5 py-0.5 shadow-sm font-sans mx-1">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
