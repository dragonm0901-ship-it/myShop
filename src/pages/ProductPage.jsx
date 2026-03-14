import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, ArrowRight, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

// Temporary Mock Data Fetcher
const getProductDetails = (id) => ({
  id,
  name: "Premium Quantum Series Wireless Headphones",
  priceNPR: 24500,
  priceUSD: 185,
  rating: 4.8,
  reviews: 1240,
  description: "Experience sound like never before with the Quantum Series. Featuring adaptive active noise cancellation, lossless audio transmission, and a 40-hour battery life. Crafted from aerospace-grade aluminum and premium memory foam for unparalleled comfort.",
  features: [
    "Adaptive Active Noise Cancellation",
    "Lossless Hi-Res Audio",
    "40-hour Battery Life",
    "Multipoint Bluetooth 5.3 Connect",
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
  ],
  colors: [
    { name: "Obsidian Black", class: "bg-gray-900" },
    { name: "Lunar White", class: "bg-gray-100" },
    { name: "Cobalt Blue", class: "bg-primary" },
  ]
});

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductDetails(id || "123");
  const addItem = useCartStore(state => state.addItem);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const isInWishlist = useCartStore(state => state.isInWishlist(product.id));
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add product with specific variant info
    addItem({ 
      ...product, 
      id: `${product.id}-${activeColor}`, // Unique ID for variant
      name: `${product.name} (${activeColor})`,
      quantity // Add multiple at once
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8 md:py-12"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ArrowRight size={14} />
        <Link to="#" className="hover:text-primary transition-colors">Electronics</Link>
        <ArrowRight size={14} />
        <span className="text-textDark font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
           {/* Thumbnails */}
           <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
             {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 md:w-full aspect-square rounded-lg border-2 overflow-hidden bg-neutral transition-all flex-shrink-0 ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply p-2" />
                </button>
             ))}
           </div>
           
           {/* Main Image */}
           <div className="flex-1 bg-neutral rounded-2xl aspect-square md:aspect-auto md:h-[600px] relative overflow-hidden group">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply p-8"
              />
           </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <h1 className="text-3xl md:text-4xl font-headings font-extrabold text-textDark leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm text-yellow-700">{product.rating}</span>
              </div>
              <span className="text-sm font-medium text-gray-500 underline cursor-pointer hover:text-primary">
                Read {product.reviews} Reviews
              </span>
            </div>

            <div className="flex items-end gap-3 mb-2">
               <span className="text-4xl font-extrabold text-primary">NPR {product.priceNPR.toLocaleString()}</span>
               <span className="text-lg font-medium text-gray-400 line-through mb-1">NPR {Math.floor(product.priceNPR * 1.3).toLocaleString()}</span>
            </div>
            <span className="text-sm font-bold text-gray-400 tracking-wide uppercase">~${product.priceUSD} USD</span>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              {product.description}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm font-bold text-textDark">
               {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    {feat}
                  </li>
               ))}
            </ul>
          </div>

          {/* Connectors/Variants */}
          <div className="mb-8">
            <h3 className="font-headings font-bold text-textDark mb-3">Color: <span className="text-gray-500 font-medium">{activeColor}</span></h3>
            <div className="flex gap-3">
               {product.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setActiveColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center p-0.5 ${activeColor === color.name ? 'border-primary' : 'border-transparent'}`}
                  >
                    <div className={`w-full h-full rounded-full ${color.class} border border-black/10`}></div>
                  </button>
               ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
             {/* Quantity */}
             <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl bg-white w-full sm:w-32 py-2 px-4 shadow-sm focus-within:border-primary transition-colors">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-textDark font-bold text-lg">-</button>
                 <span className="font-extrabold text-lg w-8 text-center">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-textDark font-bold text-lg">+</button>
             </div>

             <motion.button 
               onClick={handleAddToCart}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
             >
               <span className="relative z-10 flex items-center gap-2">
                 <ShoppingCart size={20} /> Add to Cart
               </span>
               <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
             </motion.button>

             <button 
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 sm:w-14 rounded-xl flex items-center justify-center border-2 transition-colors flex-shrink-0 ${isInWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 text-gray-400'}`}
              >
                <Heart size={24} className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
             <div className="flex flex-col items-center justify-center text-center gap-2">
               <div className="w-10 h-10 bg-neutral rounded-full flex items-center justify-center text-primary">
                 <Truck size={18} />
               </div>
               <span className="text-xs font-bold text-gray-500">Free Regional<br/>Delivery</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center gap-2">
               <div className="w-10 h-10 bg-neutral rounded-full flex items-center justify-center text-primary">
                 <ShieldCheck size={18} />
               </div>
               <span className="text-xs font-bold text-gray-500">1 Year Official<br/>Warranty</span>
             </div>
             <div className="flex flex-col items-center justify-center text-center gap-2">
               <div className="w-10 h-10 bg-neutral rounded-full flex items-center justify-center text-primary">
                 <RotateCcw size={18} />
               </div>
               <span className="text-xs font-bold text-gray-500">14-Day Easy<br/>Returns</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
