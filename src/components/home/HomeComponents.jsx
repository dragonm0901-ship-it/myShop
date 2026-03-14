import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, ShoppingCart } from 'lucide-react';
import { cn } from '../../utils';
import { useCartStore } from '../../store/useCartStore';

const HERO_OFFER = "Mega Tech Week - Up to 60% Off";

// Dummy data for Preset A aesthetic
const getProducts = (count) => Array.from({ length: count }).map((_, i) => ({
  id: i,
  name: `Premium Aesthetic Gear Edition ${i + 1}`,
  priceNPR: Math.floor(Math.random() * 20000) + 5000,
  priceUSD: Math.floor(Math.random() * 150) + 50,
  rating: (Math.random() * 1 + 4).toFixed(1),
  reviews: Math.floor(Math.random() * 1000) + 100,
  image: `https://images.unsplash.com/photo-${i % 2 === 0 ? '1505740420928-5e560c06d30e' : '1583394838336-acd977736f90'}?w=400&q=80`,
  discount: Math.floor(Math.random() * 40) + 10,
}));

const FLASH_PRODUCTS = getProducts(4);
const PRESET_A_CATEGORIES = [
  { name: "Electronics", img: "1498049794561-a4968df373b5" },
  { name: "Premium Audio", img: "1505740420928-5e560c06d30e" },
  { name: "Smart Watches", img: "1579586337278-3befd40fd17a" }
];

export const HeroSection = () => {
  const addItem = useCartStore(state => state.addItem);

  const heroProduct = {
    id: 'hero-1',
    name: 'Quantum Series Watch',
    priceNPR: 27000,
    priceUSD: 200,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80'
  };

  return (
    <section className="relative overflow-hidden bg-primary w-full min-h-[500px] flex items-center justify-center pt-8 md:pt-0">
      {/* Background Image Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1550009158-9effb6ba3573?w=1600&q=80" 
          alt="Tech Lifestyle" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-accent/40"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid md:grid-cols-2 gap-8 items-center py-12 md:py-24">
        {/* Text Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 shadow-lg">
              Limited Drop
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-headings font-extrabold text-white leading-[1.1]"
          >
            {HERO_OFFER}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/80 text-lg max-w-md font-medium"
          >
            Curated premium electronics and fashion. Engineered for performance, designed for life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-4"
          >
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold tracking-wide hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 relative overflow-hidden group">
              <span className="relative z-10">Shop Collection</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-full bg-neutral scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
            </button>
          </motion.div>
        </div>

        {/* Hero Product Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="hidden md:block relative w-full aspect-square max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-accent rounded-full blur-[100px] opacity-20"></div>
             {/* Image Container */}
             <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative z-10 overflow-hidden group h-full flex flex-col justify-between">
             <div className="flex justify-between items-start">
               <div className="bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full">-40% Today</div>
               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                 <Star size={16} className="text-yellow-400 fill-current" />
               </div>
             </div>
             
             <Link to="/product/hero-1" className="h-full flex items-center justify-center">
                <motion.img 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring" }}
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80" 
                  alt="Hero Product" 
                  className="w-full h-48 object-contain my-auto drop-shadow-2xl mix-blend-screen"
                />
             </Link>

             <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 mt-auto">
               <Link to="/product/hero-1"><h3 className="text-white font-bold text-lg mb-1 hover:text-accent transition-colors">Quantum Series Watch</h3></Link>
               <div className="flex items-center justify-between">
                 <div>
                   <span className="text-white/60 line-through text-xs block">NPR 45,000</span>
                   <span className="text-white font-extrabold text-xl">NPR 27,000</span>
                 </div>
                 <button 
                   onClick={() => addItem(heroProduct)}
                   className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                 >
                   <ShoppingCart size={18} />
                 </button>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const CategoryGrid = () => {
  return (
    <section className="py-20 bg-neutral/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-headings font-extrabold text-textDark tracking-tight">Curated <span className="text-primary">Categories</span></h2>
          <button className="text-sm font-bold text-primary group flex items-center gap-1 hidden md:flex">
             View Directory <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESET_A_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
            >
              <img 
                src={`https://images.unsplash.com/photo-${cat.img}?w=600&q=80`} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <div className="w-0 h-1 bg-accent group-hover:w-16 transition-all duration-500 mb-4"></div>
                <span className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  Explore Collection <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FlashSales = () => {
  const addItem = useCartStore(state => state.addItem);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-headings font-extrabold text-textDark tracking-tight mb-4">
              Flash <span className="text-red-500">Deals</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500">Ends in</span>
              <div className="flex items-center gap-2 bg-textDark text-white px-4 py-2 rounded-lg font-bold font-ui text-lg shadow-xl shadow-textDark/10 tracking-widest">
                <Clock size={18} className="text-red-500" />
                <span>02</span>:<span>14</span>:<span>59</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLASH_PRODUCTS.map((prod, i) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full relative"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Save {prod.discount}%
              </div>

              {/* Image Container */}
              <div className="h-48 w-full bg-neutral/50 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center p-4">
                <Link to={`/product/${prod.id}`} className="w-full h-full flex items-center justify-center cursor-pointer z-0">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none"
                  />
                </Link>
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(prod); }}
                    className="w-full bg-primary/95 backdrop-blur-sm text-white py-3 rounded-lg font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-primary pointer-events-auto"
                  >
                    <ShoppingCart size={16} /> Quick Add
                  </button>
                </div>
              </div>

              {/* Data Content */}
              <div className="flex flex-col flex-grow justify-between relative z-10 pointer-events-none">
                <div>
                  <Link to={`/product/${prod.id}`} className="pointer-events-auto">
                    <h3 className="font-bold text-textDark text-lg mb-2 leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                      {prod.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-textDark">{prod.rating}</span>
                    <span className="text-xs text-gray-400 font-medium">({prod.reviews})</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-extrabold text-primary">NPR {prod.priceNPR.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium text-gray-400">
                     <span className="line-through">NPR {Math.floor(prod.priceNPR * 1.5).toLocaleString()}</span>
                     <span>~${prod.priceUSD} USD</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
