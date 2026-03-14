import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, MapPin, Truck, Heart } from 'lucide-react';
import { cn } from '../../utils';
import { useCartStore } from '../../store/useCartStore';
import { SearchModal } from '../ui/SearchModal';

const CATEGORIES = ["Clothing", "Electronics", "Grocery"];
const BRAND_NAME = "myShop";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const location = useLocation();
  const openCart = useCartStore(state => state.openCart);
  const cartCount = useCartStore(state => state.getCartCount());
  const cartTotal = useCartStore(state => state.getCartTotal());
  const wishlistCount = useCartStore(state => state.wishlistItems.length);

  // Handle scroll to change nav style (glassmorphism effect)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50" : "bg-white border-b border-gray-100"
      )}
    >
      {/* Top Bar - Disappears on scroll for a cleaner look */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-primary text-[10px] md:text-xs text-white"
          >
            <div className="py-1.5 px-4 hidden md:flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium"><MapPin size={12} className="text-accent/60"/> Deliver to: Kathmandu</span>
                <span className="flex items-center gap-1 font-medium"><Truck size={12} className="text-accent/60"/> Free Delivery over NPR 2000</span>
              </div>
              <div className="flex items-center gap-4 font-medium">
                <button className="hover:text-accent transition-colors">EN / NEP</button>
                <div className="w-px h-3 bg-white/20"></div>
                <button className="hover:text-accent transition-colors">NPR / USD</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bar */}
      <div className="px-4 py-3 md:py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-textDark hover:text-primary transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-[-5deg] hover:rotate-0 transition-transform">
              <span className="text-white font-headings font-extrabold text-xl leading-none pt-0.5">mS</span>
            </div>
            <span className="font-headings font-extrabold text-2xl tracking-tight text-textDark">
              myShop
            </span>
          </Link>
          </div>

          {/* Desktop Search (Animated) */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="flex w-full group relative focus-within:ring-2 ring-primary/20 rounded-lg transition-shadow bg-neutral">
              <input 
                type="text" 
                placeholder="Search for premium goods..." 
                className="w-full bg-transparent border-none px-4 py-2.5 outline-none transition-all placeholder-gray-400 font-ui font-medium text-sm text-textDark"
              />
              <button className="bg-textDark hover:bg-primary transition-colors text-white px-6 rounded-r-lg font-bold tracking-wide flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-neutral rounded-full transition-colors hidden sm:block"
            >
              <Search size={22} className="text-gray-600 hover:text-primary transition-colors"/>
            </button>
            
            <button className="relative p-2 hover:bg-neutral rounded-full transition-colors hidden sm:block group">
              <Heart size={22} className="text-gray-600 group-hover:text-red-500 transition-colors"/>
              {wishlistCount > 0 && (
                <motion.span 
                  key={wishlistCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            <Link to="/login" className="hidden sm:block">
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-neutral rounded-xl transition-colors cursor-pointer group">
                <User size={22} className="text-gray-600 group-hover:text-primary transition-colors"/>
                <div className="text-left hidden lg:block">
                  <div className="text-[10px] text-gray-500 font-medium">Account</div>
                  <div className="text-sm font-bold text-textDark leading-tight group-hover:text-primary transition-colors">Sign In</div>
                </div>
              </div>
            </Link>
            <button onClick={openCart} className="flex items-center gap-2 group relative transition-transform hover:scale-105 active:scale-95">
              <div className="p-2 bg-neutral rounded-full group-hover:bg-primary/10 transition-colors relative">
                <ShoppingCart size={20} className="text-gray-600 group-hover:text-primary transition-colors"/>
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-[10px] text-gray-500 font-medium">Cart</div>
                <div className="text-sm font-bold text-textDark leading-tight group-hover:text-primary transition-colors truncate max-w-[80px]">NPR {cartTotal.toLocaleString()}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Nav Bar */}
      <nav className="hidden md:block border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-textDark hover:text-primary transition-colors">Home</Link>
            <div className="relative group">
              <Link to="/shop" className="flex items-center gap-1 text-sm font-bold text-textDark hover:text-primary transition-colors py-2 cursor-pointer">
                Shop <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300"/>
              </Link>
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
                  {CATEGORIES.map((cat, idx) => (
                    <Link key={idx} to="/shop" className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-neutral hover:pl-6 transition-all">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <Link to="/shop" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Deals</Link>
            <Link to="/shop" className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">New Arrivals</Link>
          </nav>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-200 shadow-xl absolute top-full left-0 w-full rounded-b-lg"
          >
            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex w-full focus-within:ring-2 ring-primary/20 rounded-md transition-shadow">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-neutral border border-gray-200 border-r-0 rounded-l-md px-3 py-2 outline-none text-sm focus:border-primary/50"
                />
                <button className="bg-textDark text-white px-4 rounded-r-md flex items-center justify-center">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <ul className="flex flex-col text-sm font-bold text-textDark p-2">
              <Link to="/login" className="px-4 py-3 hover:bg-neutral rounded-md transition-colors flex items-center gap-3 text-primary">
                <User size={18}/> Sign In / Register
              </Link>
              <div className="h-px bg-gray-100 my-1 mx-2"></div>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-textDark">Home</Link>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-textDark">Shop All Products</Link>
                <div className="space-y-2 pl-4 border-l-2 border-gray-100 mt-2">
                  {CATEGORIES.map((cat, idx) => (
                    <Link key={idx} to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 font-medium">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <li className="px-4 py-3 text-accent hover:bg-neutral rounded-md transition-colors cursor-pointer mt-2">
                Today's Deals
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Navbar;
