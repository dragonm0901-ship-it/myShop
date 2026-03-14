import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-neutral">
              <h2 className="text-xl font-headings font-extrabold text-textDark flex items-center gap-2">
                <ShoppingBag size={24} className="text-primary" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-textDark"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="font-medium">Your cart is empty.</p>
                  <button onClick={closeCart} className="text-primary font-bold hover:underline">
                     Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-neutral rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-textDark leading-tight mb-1">{item.name}</h3>
                      <div className="text-primary font-extrabold text-sm mb-3">
                        NPR {item.priceNPR.toLocaleString()}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-neutral">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-gray-500 hover:text-textDark transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-gray-500 hover:text-textDark transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 font-medium hover:underline ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-500 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>NPR {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm font-medium">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                    <span className="text-textDark font-bold">Total</span>
                    <span className="text-2xl font-extrabold text-primary">
                      NPR {getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
