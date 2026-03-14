import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../../data/products';

const RECENT_SEARCHES = ['Smart watch', 'Running shoes', 'Air fryer'];
const POPULAR_CATEGORIES = CATEGORIES.filter((category) => category !== 'All').slice(0, 4);

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  const results = query.length > 1
    ? PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[10vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lift"
          >
            <div className="flex items-center gap-4 border-b border-line bg-canvas px-6 py-4">
              <Search className="text-brand-600" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, or categories"
                className="flex-1 bg-transparent text-lg font-semibold text-ink placeholder:text-muted/70 focus:outline-none"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                className="rounded-full bg-white p-2 text-muted transition hover:text-brand-700"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6">
              {query.length === 0 ? (
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                      Recent searches
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      {RECENT_SEARCHES.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => setQuery(item)}
                            className="w-full text-left font-semibold text-ink transition hover:text-brand-700"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                      Popular categories
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {POPULAR_CATEGORIES.map((category) => (
                        <Link
                          key={category}
                          to="/shop"
                          onClick={onClose}
                          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand-50 hover:text-brand-700"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                    {results.length > 0 ? 'Products' : 'No results'}
                  </h3>

                  {results.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-2xl border border-line p-3 transition hover:bg-brand-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 overflow-hidden rounded-xl bg-white">
                              <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain p-2"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-ink">{product.name}</div>
                              <div className="text-xs text-muted">NPR {product.priceNPR.toLocaleString()}</div>
                            </div>
                          </div>
                          <ArrowRight size={18} className="text-muted" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-sm text-muted">
                      No matches for "{query}". Try a different keyword or browse categories.
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
