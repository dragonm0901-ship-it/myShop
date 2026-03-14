import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Search,
  Star,
  ShoppingCart,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useSeo } from '../seo';
import { trackEvent } from '../services/analytics';

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating' },
];

const MAX_PRICE = PRODUCTS.reduce((max, product) => Math.max(max, product.priceNPR), 0);

const getBadge = (product) => {
  if (product.tags.includes('limited')) return { label: 'Limited', className: 'bg-amber-100 text-amber-700' };
  if (product.tags.includes('best')) return { label: 'Best seller', className: 'bg-brand-50 text-brand-700' };
  if (product.tags.includes('new')) return { label: 'New', className: 'bg-emerald-100 text-emerald-700' };
  return null;
};

const Shop = () => {
  useSeo({
    title: 'Shop — myShop',
    description:
      'Browse the latest electronics, fashion, home, and grocery essentials. Filter, compare, and shop in seconds.',
  });
  const addItem = useCartStore((state) => state.addItem);
  const handleAdd = (product) => {
    addItem(product);
    trackEvent('add_to_cart', { productId: product.id, price: product.priceNPR });
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: MAX_PRICE });
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter((product) => product.category === activeCategory);
    }

    result = result.filter(
      (product) => product.priceNPR >= priceRange.min && product.priceNPR <= priceRange.max
    );

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
        result.sort((a, b) => {
          const aScore = (a.tags.includes('best') ? 2 : 0) + a.rating;
          const bScore = (b.tags.includes('best') ? 2 : 0) + b.rating;
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [activeCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="container-xl py-8 md:py-12">
      <div className="flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Shop</p>
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">
            {activeCategory === 'All' ? 'All products' : activeCategory}
          </h1>
          <p className="text-sm text-muted">Showing {filteredProducts.length} results</p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold text-ink md:hidden"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <div className="relative group w-full md:w-56">
            <div className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-2">
              <span className="text-sm font-bold text-ink">
                {SORT_OPTIONS.find((option) => option.value === sortBy)?.label}
              </span>
              <ChevronDown size={16} className="text-muted" />
            </div>
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-line bg-white shadow-soft opacity-0 pointer-events-none transition group-hover:opacity-100 group-hover:pointer-events-auto">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`w-full px-4 py-2 text-left text-sm font-semibold transition hover:bg-brand-50 ${
                    sortBy === option.value ? 'text-brand-700' : 'text-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-1 rounded-xl border border-line bg-canvas p-1 md:flex">
            <button
              onClick={() => setIsListView(false)}
              className={`rounded-lg p-2 transition ${
                !isListView ? 'bg-white text-brand-700 shadow-soft' : 'text-muted'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`rounded-lg p-2 transition ${
                isListView ? 'bg-white text-brand-700 shadow-soft' : 'text-muted'
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <aside
          className={`w-full space-y-8 md:w-64 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}
        >
          <div className="surface-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Search</h3>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="input-field pl-10"
                aria-label="Search products"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Categories</h3>
            <div className="mt-4 space-y-3">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <input
                    type="radio"
                    name="category"
                    checked={activeCategory === category}
                    onChange={() => setActiveCategory(category)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span className={activeCategory === category ? 'text-brand-700' : ''}>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Price range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(event) =>
                    setPriceRange({ ...priceRange, min: Number(event.target.value) })
                  }
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm font-semibold"
                  placeholder="Min"
                />
                <span className="text-muted">-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(event) =>
                    setPriceRange({ ...priceRange, max: Number(event.target.value) })
                  }
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm font-semibold"
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="500"
                value={priceRange.max}
                onChange={(event) =>
                  setPriceRange({ ...priceRange, max: Number(event.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-brand-100 accent-brand-600"
              />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="surface-card py-16 text-center">
              <h2 className="text-xl font-bold text-muted">No products found</h2>
              <p className="mt-2 text-sm text-muted">Try adjusting your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setPriceRange({ min: 0, max: MAX_PRICE });
                }}
                className="btn-secondary mt-6"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={isListView ? 'flex flex-col gap-4' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  className={`surface-card overflow-hidden ${
                      isListView ? 'flex' : 'flex flex-col'
                    }`}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className={`relative flex items-center justify-center bg-brand-50 p-5 ${
                        isListView ? 'h-full w-44' : 'h-48 w-full'
                      }`}
                    >
                      {getBadge(product) && (
                        <span
                          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${getBadge(product).className}`}
                        >
                          {getBadge(product).label}
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-auto object-contain transition duration-500 hover:scale-105"
                      />
                    </Link>
                    <div className={`flex flex-1 flex-col p-5 ${isListView ? '' : 'gap-3'}`}>
                      <div>
                        {isListView && (
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                            {product.category}
                          </div>
                        )}
                        <Link
                          to={`/product/${product.id}`}
                          className="text-lg font-bold text-ink hover:text-brand-700"
                        >
                          {product.name}
                        </Link>
                        {product.stock === 0 && (
                          <span className="text-xs font-semibold text-red-500">Out of stock</span>
                        )}
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted">
                          <Star size={14} className="text-amber-500" />
                          <span className="font-semibold text-ink">{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-xl font-extrabold text-brand-700">
                          NPR {product.priceNPR.toLocaleString()}
                        </div>
                        {isListView && (
                          <button
                            onClick={() => handleAdd(product)}
                            disabled={product.stock === 0}
                            className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                              product.stock === 0
                                ? 'border-line bg-white text-muted cursor-not-allowed'
                                : 'border-line bg-brand-50 text-brand-700 hover:bg-brand-100'
                            }`}
                          >
                            <ShoppingCart size={16} />{' '}
                            {product.stock === 0 ? 'Unavailable' : 'Add'}
                          </button>
                        )}
                      </div>
                      {!isListView && (
                        <button
                          onClick={() => handleAdd(product)}
                          disabled={product.stock === 0}
                          className={`mt-4 rounded-xl border py-2 text-sm font-bold transition ${
                            product.stock === 0
                              ? 'border-line bg-white text-muted cursor-not-allowed'
                              : 'border-line bg-white text-brand-700 hover:bg-brand-50'
                          }`}
                        >
                          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                        </button>
                      )}
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
