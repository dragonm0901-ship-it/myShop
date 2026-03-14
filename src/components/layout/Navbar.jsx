import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Truck,
  Heart,
} from 'lucide-react';
import { cn } from '../../utils';
import { useCartStore } from '../../store/useCartStore';
import { SearchModal } from '../ui/SearchModal';
import { CATEGORIES } from '../../data/products';

const NAV_CATEGORIES = CATEGORIES.filter((category) => category !== 'All');
const BRAND_NAME = 'myShop';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const openCart = useCartStore((state) => state.openCart);
  const cartCount = useCartStore((state) => state.getCartCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const wishlistCount = useCartStore((state) => state.wishlistItems.length);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-soft border-b border-line'
          : 'bg-white border-b border-line'
      )}
    >
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-brand-900 text-[10px] md:text-xs text-white"
          >
            <div className="container-xl flex items-center justify-between py-2">
              <div className="hidden items-center gap-4 md:flex">
                <span className="flex items-center gap-1 font-medium text-white/80">
                  <MapPin size={12} className="text-brand-200" />
                  Delivering nationwide
                </span>
                <span className="flex items-center gap-1 font-medium text-white/80">
                  <Truck size={12} className="text-brand-200" />
                  Free delivery over NPR 2000
                </span>
              </div>
              <div className="flex items-center gap-4 font-semibold text-white/80">
                <button className="hover:text-white transition-colors">EN / NEP</button>
                <div className="h-3 w-px bg-white/20" />
                <button className="hover:text-white transition-colors">NPR / USD</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-xl py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-ink hover:text-brand-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-soft">
                <span className="font-headings text-lg font-extrabold">mS</span>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink">{BRAND_NAME}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                  marketplace
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 items-center md:flex">
            <div className="flex w-full max-w-2xl items-center rounded-2xl border border-line bg-canvas px-3 py-2">
              <Search size={18} className="text-muted" />
              <input
                type="text"
                placeholder="Search products, brands, or categories"
                className="w-full bg-transparent px-3 text-sm font-medium text-ink placeholder:text-muted/70 focus:outline-none"
                aria-label="Search products"
              />
              <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-700">
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden rounded-full bg-canvas p-2 text-muted transition hover:text-brand-700 sm:block"
              aria-label="Open search"
              aria-expanded={isSearchOpen}
            >
              <Search size={22} />
            </button>

            <button
              className="relative hidden rounded-full bg-canvas p-2 text-muted transition hover:text-brand-700 sm:block"
              aria-label="View wishlist"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            <Link to="/login" className="hidden sm:block">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors hover:bg-canvas">
                <User size={20} className="text-muted" />
                <div className="hidden text-left lg:block">
                  <div className="text-[10px] font-semibold text-muted">Account</div>
                  <div className="text-sm font-bold text-ink">Sign in</div>
                </div>
              </div>
            </Link>

            <button
              onClick={openCart}
              className="flex items-center gap-3 rounded-2xl bg-canvas px-3 py-2 transition hover:bg-brand-50"
              aria-label="Open cart"
            >
              <div className="relative">
                <ShoppingCart size={20} className="text-muted" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <div className="hidden text-left lg:block">
                <div className="text-[10px] font-semibold text-muted">Cart total</div>
                <div className="text-sm font-bold text-ink">NPR {cartTotal.toLocaleString()}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-t border-line md:block">
        <div className="container-xl">
          <div className="flex items-center gap-8 py-3 text-sm font-bold">
            <Link to="/" className="text-ink hover:text-brand-700 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <Link
                to="/shop"
                className="flex items-center gap-1 text-ink hover:text-brand-700 transition-colors"
              >
                Shop
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-2xl border border-line bg-white p-3 shadow-soft opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                {NAV_CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    to="/shop"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-muted transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/shop" className="text-muted hover:text-brand-700 transition-colors">
              New arrivals
            </Link>
            <Link to="/shop" className="text-muted hover:text-brand-700 transition-colors">
              Best deals
            </Link>
            <Link to="/support" className="text-muted hover:text-brand-700 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-line bg-white shadow-soft"
            id="mobile-menu"
          >
            <div className="p-4">
              <div className="flex w-full items-center rounded-2xl border border-line bg-canvas px-3 py-2">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full bg-transparent px-2 text-sm focus:outline-none"
                  aria-label="Search products"
                />
                <button className="rounded-xl bg-brand-600 px-3 py-2 text-xs font-bold text-white">
                  Search
                </button>
              </div>
            </div>
            <div className="space-y-4 px-4 pb-6 text-sm font-semibold text-ink">
              <Link to="/login" className="block rounded-xl bg-brand-50 px-4 py-3 text-brand-700">
                Sign in or create account
              </Link>
              <div className="space-y-2">
                <Link to="/" className="block">
                  Home
                </Link>
                <Link to="/shop" className="block">
                  Shop all
                </Link>
                <Link to="/support" className="block">
                  Support
                </Link>
              </div>
              <div className="rounded-2xl border border-line p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Categories</div>
                <div className="mt-3 grid gap-2">
                  {NAV_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to="/shop"
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-muted hover:bg-brand-50 hover:text-brand-700"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Navbar;
