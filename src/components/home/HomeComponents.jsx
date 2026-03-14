import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  ShoppingCart,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { trackEvent } from '../../services/analytics';
import {
  FEATURED_PRODUCTS,
  FLASH_DEALS,
  NEW_ARRIVALS,
  BEST_SELLERS,
  LIMITED_DROPS,
  PRODUCTS,
} from '../../data/products';

const HERO_PRODUCT = FEATURED_PRODUCTS[0] || PRODUCTS[0];

const CATEGORY_CARDS = [
  {
    name: 'Electronics',
    description: 'Audio, wearables, cameras',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
  {
    name: 'Fashion',
    description: 'Everyday essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  },
  {
    name: 'Home',
    description: 'Kitchen + living',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80',
  },
  {
    name: 'Grocery',
    description: 'Fresh, curated pantry',
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=800&q=80',
  },
];

const VALUE_PROPS = [
  {
    title: 'Fast, reliable delivery',
    description: 'Tracked shipping with clear ETAs at checkout.',
    icon: Truck,
  },
  {
    title: 'Secure payments',
    description: 'Industry-standard encryption end to end.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy returns',
    description: '14-day returns with instant status updates.',
    icon: RotateCcw,
  },
  {
    title: 'Real support',
    description: 'Talk to a human 7 days a week.',
    icon: Headphones,
  },
];

const getBadge = (product) => {
  if (product.tags.includes('limited')) return { label: 'Limited', className: 'bg-amber-100 text-amber-700' };
  if (product.tags.includes('best')) return { label: 'Best seller', className: 'bg-brand-50 text-brand-700' };
  if (product.tags.includes('new')) return { label: 'New', className: 'bg-emerald-100 text-emerald-700' };
  return null;
};

export const HeroSection = () => {
  const addItem = useCartStore((state) => state.addItem);
  const handleAdd = (product) => {
    addItem(product);
    trackEvent('add_to_cart', { productId: product.id, price: product.priceNPR });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-600/20 blur-[140px]" />

      <div className="container-xl relative z-10 grid gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.28em]"
          >
            New season arrivals
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold leading-tight md:text-6xl"
          >
            A refined marketplace for modern living.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg text-white/75"
          >
            Shop a curated catalog of electronics, fashion, home, and pantry essentials. Designed for speed, clarity, and comfort.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop" className="btn-primary">
              Shop the collection
            </Link>
            <Link to="/shop" className="btn-secondary">
              Explore new arrivals
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 pt-6 text-sm text-white/70 md:grid-cols-3">
            <div>
              <div className="text-2xl font-extrabold text-white">150+</div>
              New items weekly
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">24/7</div>
              Customer support
            </div>
            <div className="hidden md:block">
              <div className="text-2xl font-extrabold text-white">4.8</div>
              Average rating
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[32px] border border-white/10 bg-white/5" />
          <div className="relative rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                Editor pick
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Star size={16} className="text-amber-300" />
                {HERO_PRODUCT.rating} ({HERO_PRODUCT.reviews})
              </div>
            </div>
            <Link to={`/product/${HERO_PRODUCT.id}`} className="block py-8">
              <img
                src={HERO_PRODUCT.image}
                alt={HERO_PRODUCT.name}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="mx-auto h-52 w-auto object-contain drop-shadow-2xl"
              />
            </Link>
            <div className="space-y-3">
              <div>
                <Link
                  to={`/product/${HERO_PRODUCT.id}`}
                  className="text-xl font-bold text-white transition-colors hover:text-brand-200"
                >
                  {HERO_PRODUCT.name}
                </Link>
                <p className="text-sm text-white/70">Best-in-class performance, built to last.</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60">From</div>
                  <div className="text-2xl font-extrabold text-white">
                    NPR {HERO_PRODUCT.priceNPR.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(HERO_PRODUCT)}
                  disabled={HERO_PRODUCT.stock === 0}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                    HERO_PRODUCT.stock === 0
                      ? 'bg-white/50 text-white/70 cursor-not-allowed'
                      : 'bg-white text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {HERO_PRODUCT.stock === 0 ? 'Out of stock' : 'Add to cart'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ValueProps = () => (
  <section className="py-12 bg-surface">
    <div className="container-xl">
      <div className="grid gap-6 md:grid-cols-4">
        {VALUE_PROPS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="surface-card p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="text-sm text-muted mt-2">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export const CategoryGrid = () => {
  return (
    <section className="py-16 bg-canvas">
      <div className="container-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Browse by category</p>
            <h2 className="section-title">Find your next favorite.</h2>
          </div>
          <Link to="/shop" className="btn-ghost inline-flex items-center gap-2">
            View all categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="text-sm text-white/70">{category.description}</p>
              </div>
              <Link
                to="/shop"
                className="absolute inset-0"
                aria-label={`Shop ${category.name}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturedShelf = () => (
  <section className="py-16 bg-surface">
    <div className="container-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Featured</p>
          <h2 className="section-title">Built for your best days.</h2>
        </div>
        <Link to="/shop" className="btn-ghost inline-flex items-center gap-2">
          Shop featured <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="surface-card overflow-hidden p-5"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>{product.category}</span>
              {getBadge(product) && (
                <span className={`rounded-full px-3 py-1 ${getBadge(product).className}`}>
                  {getBadge(product).label}
                </span>
              )}
            </div>
            <Link
              to={`/product/${product.id}`}
              className="mt-4 flex items-center justify-center rounded-2xl bg-brand-50/60 p-6"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-40 w-auto object-contain transition duration-500 hover:scale-105"
              />
            </Link>
            <div className="mt-5 space-y-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                <Star size={14} /> {product.rating}
              </span>
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-bold text-ink hover:text-brand-700"
              >
                {product.name}
              </Link>
              {product.stock === 0 && (
                <span className="text-xs font-semibold text-red-500">Out of stock</span>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-brand-700">
                  NPR {product.priceNPR.toLocaleString()}
                </span>
                <span className="text-sm text-muted">~${product.priceUSD}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const FlashSales = () => {
  const addItem = useCartStore((state) => state.addItem);
  const handleAdd = (product) => {
    addItem(product);
    trackEvent('add_to_cart', { productId: product.id, price: product.priceNPR });
  };

  return (
    <section className="py-16 bg-canvas">
      <div className="container-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Limited-time offers</p>
            <h2 className="section-title">The best deals of the week.</h2>
          </div>
          <Link to="/shop" className="btn-ghost inline-flex items-center gap-2">
            See all deals <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {FLASH_DEALS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="group surface-card p-5"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>{product.category}</span>
              {getBadge(product) && (
                <span className={`rounded-full px-3 py-1 ${getBadge(product).className}`}>
                  {getBadge(product).label}
                </span>
              )}
            </div>
            <Link
              to={`/product/${product.id}`}
              className="mt-4 flex items-center justify-center rounded-2xl bg-white p-5"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-36 w-auto object-contain transition duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="mt-5 space-y-3">
              <Link
                to={`/product/${product.id}`}
                className="text-base font-bold text-ink hover:text-brand-700"
              >
                {product.name}
              </Link>
              {product.stock === 0 && (
                <span className="text-xs font-semibold text-red-500">Out of stock</span>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="font-extrabold text-brand-700">
                  NPR {product.priceNPR.toLocaleString()}
                </span>
                <span className="text-muted">~${product.priceUSD}</span>
              </div>
                <button
                  onClick={() => handleAdd(product)}
                disabled={product.stock === 0}
                className={`w-full rounded-xl border py-2.5 text-sm font-bold transition ${
                  product.stock === 0
                    ? 'border-line bg-white text-muted cursor-not-allowed'
                    : 'border-line bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
};

export const BestSellers = () => (
  <section className="py-16 bg-surface">
    <div className="container-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Best sellers</p>
          <h2 className="section-title">Customer favorites this month.</h2>
        </div>
        <Link to="/shop" className="btn-ghost inline-flex items-center gap-2">
          Shop best sellers <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BEST_SELLERS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="surface-card overflow-hidden p-5"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>{product.category}</span>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">Best seller</span>
            </div>
            <Link
              to={`/product/${product.id}`}
              className="mt-4 flex items-center justify-center rounded-2xl bg-brand-50/60 p-6"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-40 w-auto object-contain transition duration-500 hover:scale-105"
              />
            </Link>
            <div className="mt-5 space-y-3">
              <Link to={`/product/${product.id}`} className="text-lg font-bold text-ink hover:text-brand-700">
                {product.name}
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-brand-700">
                  NPR {product.priceNPR.toLocaleString()}
                </span>
                <span className="text-sm text-muted">~${product.priceUSD}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const LimitedDrop = () => {
  const product = LIMITED_DROPS[0];
  if (!product) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-brand-950 to-brand-800 text-white">
      <div className="container-xl grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-4">
          <p className="section-kicker text-brand-200">Limited drop</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">{product.name}</h2>
          <p className="text-sm text-white/70">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-extrabold">NPR {product.priceNPR.toLocaleString()}</span>
            <Link to={`/product/${product.id}`} className="btn-secondary">
              View drop
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/10 p-6">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-56 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export const NewArrivals = () => (
  <section className="py-16 bg-surface">
    <div className="container-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-kicker">Just in</p>
          <h2 className="section-title">Fresh arrivals, ready now.</h2>
        </div>
        <Link to="/shop" className="btn-ghost inline-flex items-center gap-2">
          Browse new arrivals <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {NEW_ARRIVALS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className="surface-card overflow-hidden p-5"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex items-center justify-center rounded-2xl bg-brand-50/60 p-6"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-40 w-auto object-contain transition duration-500 hover:scale-105"
              />
            </Link>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-muted">
                <span>{product.category}</span>
                {getBadge(product) && (
                  <span className={`rounded-full px-3 py-1 ${getBadge(product).className}`}>
                    {getBadge(product).label}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                <Star size={14} /> {product.rating}
              </span>
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-bold text-ink hover:text-brand-700"
              >
                {product.name}
              </Link>
              {product.stock === 0 && (
                <span className="text-xs font-semibold text-red-500">Out of stock</span>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-brand-700">
                  NPR {product.priceNPR.toLocaleString()}
                </span>
                <span className="text-sm text-muted">~${product.priceUSD}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
