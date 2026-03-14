import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';
import { useSeo } from '../seo';
import { trackEvent } from '../services/analytics';

const REVIEWS = [
  {
    id: 1,
    name: 'Anita K.',
    rating: 5,
    text: 'Arrived earlier than expected and the build quality feels premium.',
  },
  {
    id: 2,
    name: 'Sujal P.',
    rating: 4,
    text: 'Great value for the price. Battery life holds up well.',
  },
  {
    id: 3,
    name: 'Maya R.',
    rating: 5,
    text: 'Clean design and easy setup. Would definitely recommend.',
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0];
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist(product.id));

  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const maxQuantity = typeof product.stock === 'number' ? product.stock : Number.POSITIVE_INFINITY;

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NPR',
      price: product.priceNPR,
      availability: isOutOfStock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  useSeo({
    title: `${product.name} — myShop`,
    description: product.description,
    image: product.image,
    type: 'product',
    jsonLd: productSchema,
  });

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: `${product.id}-${activeColor}`,
      name: `${product.name} (${activeColor})`,
      quantity,
      selectedColor: activeColor,
    });
    trackEvent('add_to_cart', {
      productId: product.id,
      price: product.priceNPR,
      quantity,
      variant: activeColor,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container-xl py-8 md:py-12"
    >
      <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-6">
        <Link to="/" className="hover:text-brand-700">Home</Link>
        <ArrowRight size={12} />
        <Link to="/shop" className="hover:text-brand-700">{product.category}</Link>
        <ArrowRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                className={`h-20 w-20 rounded-xl border ${
                  activeImage === index ? 'border-brand-600' : 'border-line'
                } bg-white`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-2"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-3xl border border-line bg-white p-6">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={product.images[activeImage]}
              alt={product.name}
              loading="eager"
              decoding="async"
              className="h-[420px] w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-4 border-b border-line pb-6">
            <h1 className="text-3xl font-extrabold text-ink md:text-4xl">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-brand-700">
                <Star size={14} className="text-amber-500" />
                {product.rating} ({product.reviews})
              </span>
              <span className={`text-muted ${isOutOfStock ? 'text-red-500' : ''}`}>
                {isOutOfStock ? 'Out of stock' : isLowStock ? `Only ${product.stock} left` : 'In stock'} • Ships in 24 hours
              </span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-extrabold text-brand-700">
                NPR {product.priceNPR.toLocaleString()}
              </span>
              <span className="text-sm text-muted">~${product.priceUSD} USD</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted leading-relaxed">{product.description}</p>
            <ul className="grid gap-2 text-sm text-ink">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Color</h3>
              <div className="mt-3 flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color.name)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                      activeColor === color.name ? 'border-brand-600' : 'border-transparent'
                    }`}
                    aria-label={`Select ${color.name}`}
                  >
                    <span className={`h-8 w-8 rounded-full ${color.class} border border-black/10`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted hover:text-brand-700"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg font-bold text-ink">{quantity}</span>
                <button
                  onClick={() => setQuantity((current) => Math.min(current + 1, maxQuantity))}
                  className={`text-muted hover:text-brand-700 ${isOutOfStock ? 'cursor-not-allowed' : ''}`}
                  disabled={isOutOfStock || quantity >= maxQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`btn-primary flex-1 justify-center gap-2 ${
                  isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart size={18} />
                {isOutOfStock ? 'Out of stock' : 'Add to cart'}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                  isInWishlist
                    ? 'border-brand-600 bg-brand-50 text-brand-600'
                    : 'border-line text-muted hover:border-brand-200'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart size={20} className={isInWishlist ? 'fill-brand-600 text-brand-600' : ''} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-line pt-6 text-center text-xs font-semibold text-muted">
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Truck size={16} />
              </div>
              Fast delivery
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <ShieldCheck size={16} />
              </div>
              Secure checkout
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <RotateCcw size={16} />
              </div>
              Easy returns
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-line bg-white p-5 text-sm text-muted">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink">Delivery & Returns</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-brand-50 p-4 text-ink">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Shipping</div>
                <p className="mt-2 text-sm font-semibold">Free standard delivery over NPR 2000.</p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4 text-ink">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Returns</div>
                <p className="mt-2 text-sm font-semibold">14-day returns with pickup scheduling.</p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4 text-ink">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Warranty</div>
                <p className="mt-2 text-sm font-semibold">Official warranty with verified service.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink">Verified reviews</h3>
              <span className="text-xs font-semibold text-muted">{product.reviews} total</span>
            </div>
            <div className="space-y-4">
              {REVIEWS.map((review) => (
                <div key={review.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-ink">{review.name}</div>
                    <div className="text-xs font-semibold text-brand-700">Verified purchase</div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
