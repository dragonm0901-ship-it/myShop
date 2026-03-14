import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, Search, Star, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

// Mock Data
const MOCK_PRODUCTS = [
  { id: '1', name: "Aero X1 Running Shoes", priceNPR: 8500, category: "Clothing", rating: 4.5, reviews: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: '2', name: "Quantum Smart Watch", priceNPR: 25000, category: "Electronics", rating: 4.8, reviews: 340, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" },
  { id: '3', name: "Organic Arabica Coffee", priceNPR: 1200, category: "Grocery", rating: 4.9, reviews: 85, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80" },
  { id: '4', name: "Noise Cancelling Earbuds", priceNPR: 15000, category: "Electronics", rating: 4.6, reviews: 210, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
  { id: '5', name: "Minimalist Leather Minimalist Wallet", priceNPR: 3500, category: "Clothing", rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1628151515500-8dce4f04c643?w=400&q=80" },
  { id: '6', name: "4K Action Camera", priceNPR: 45000, category: "Electronics", rating: 4.4, reviews: 92, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80" },
  { id: '7', name: "Himalayan Pink Salt 1kg", priceNPR: 800, category: "Grocery", rating: 4.8, reviews: 400, image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80" },
  { id: '8', name: "Premium Cotton T-Shirt", priceNPR: 2200, category: "Clothing", rating: 4.3, reviews: 150, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
];

const CATEGORIES = ["All", "Clothing", "Electronics", "Grocery"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" }
];

const Shop = () => {
  const addItem = useCartStore(state => state.addItem);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  
  // View State
  const [isListView, setIsListView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  // Derived filtered & sorted data
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price
    result = result.filter(p => p.priceNPR >= priceRange.min && p.priceNPR <= priceRange.max);

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.priceNPR - b.priceNPR);
        break;
      case 'price_desc':
        result.sort((a, b) => b.priceNPR - a.priceNPR);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended (default order)
        break;
    }

    return result;
  }, [activeCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-headings font-extrabold text-textDark mb-1">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          <p className="text-gray-500 font-medium">Showing {filteredProducts.length} results</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg font-bold text-sm bg-white"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative group w-full md:w-48">
             <div className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-primary transition-colors">
               <span className="font-bold text-sm text-textDark truncate">
                 {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
               </span>
               <ChevronDown size={16} className="text-gray-400 group-hover:text-primary" />
             </div>
             {/* Dropdown Options */}
             <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-20 translate-y-2 group-hover:translate-y-0">
               {SORT_OPTIONS.map(opt => (
                 <button 
                   key={opt.value}
                   onClick={() => setSortBy(opt.value)}
                   className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-neutral transition-colors ${sortBy === opt.value ? 'text-primary bg-primary/5' : 'text-gray-600'}`}
                 >
                   {opt.label}
                 </button>
               ))}
             </div>
          </div>

          {/* View Toggles */}
          <div className="hidden md:flex items-center gap-1 bg-neutral p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setIsListView(false)}
              className={`p-1.5 rounded-md transition-all ${!isListView ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setIsListView(true)}
              className={`p-1.5 rounded-md transition-all ${isListView ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 space-y-8 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          {/* Search */}
          <div>
            <h3 className="font-headings font-bold text-lg mb-3">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm text-textDark placeholder:text-gray-400"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-headings font-bold text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={activeCategory === category}
                      onChange={() => setActiveCategory(category)}
                      className="peer sr-only" 
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary transition-colors flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                  <span className={`font-medium transition-colors ${activeCategory === category ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-textDark'}`}>
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-headings font-bold text-lg mb-3">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
                  placeholder="Min"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
                  placeholder="Max"
                />
              </div>
              
              {/* Simple range slider mapping to max value */}
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid / List */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-300 mb-2">No products found</h2>
              <p className="text-gray-500">Try checking your spelling or clearing your filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setPriceRange({ min: 0, max: 100000 });
                }}
                className="mt-6 text-primary font-bold hover:text-accent underline"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className={isListView 
                ? "flex flex-col gap-4" 
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              <AnimatePresence>
                {filteredProducts.map((prod) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={prod.id}
                    className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all group overflow-hidden ${isListView ? 'flex h-40' : 'flex flex-col h-full p-4'}`}
                  >
                    {/* Image */}
                    <Link to={`/product/${prod.id}`} className={`relative bg-neutral/50 flex items-center justify-center p-4 overflow-hidden z-0 ${isListView ? 'w-48 h-full rounded-l-2xl' : 'w-full h-48 rounded-xl mb-4'}`}>
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      {/* Quick Add Overlay (Grid Only) */}
                      {!isListView && (
                        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                          <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(prod); }}
                            className="w-full bg-primary/95 backdrop-blur-sm text-white py-3 rounded-lg font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-primary pointer-events-auto"
                          >
                            <ShoppingCart size={16} /> Add
                          </button>
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className={`flex flex-col justify-between flex-1 relative z-10 ${isListView ? 'p-6' : ''}`}>
                      <div>
                        {isListView && (
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                             {prod.category}
                          </div>
                        )}
                        <Link to={`/product/${prod.id}`}>
                          <h3 className={`font-bold text-textDark leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer ${isListView ? 'text-xl mb-2' : 'text-lg mb-2'}`}>
                            {prod.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1.5 mb-4">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-textDark">{prod.rating}</span>
                          <span className="text-xs font-medium text-gray-400">({prod.reviews})</span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-between ${isListView ? 'mt-auto' : ''}`}>
                        <div className="text-xl font-extrabold text-primary">
                          NPR {prod.priceNPR.toLocaleString()}
                        </div>
                        {isListView && (
                          <button 
                            onClick={() => addItem(prod)}
                            className="bg-neutral text-textDark hover:bg-primary hover:text-white transition-colors px-4 py-2 flex items-center gap-2 font-bold rounded-lg"
                          >
                             <ShoppingCart size={16} /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
