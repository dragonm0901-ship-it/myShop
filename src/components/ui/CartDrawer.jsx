import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    isCartOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    getCartTotal,
  } = useCartStore();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-white shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-line bg-canvas p-6">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
                <ShoppingBag size={22} className="text-brand-600" />
                Your cart
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-muted transition hover:bg-white hover:text-brand-700"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-muted">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="text-sm font-semibold">Your cart is empty.</p>
                  <button onClick={closeCart} className="btn-secondary">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex gap-4 rounded-2xl border border-line bg-white p-3"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-brand-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-ink truncate">{item.name}</h3>
                        {item.stock === 0 && (
                          <p className="text-xs font-semibold text-red-500">Out of stock</p>
                        )}
                        <div className="mt-1 text-sm font-extrabold text-brand-700">
                          NPR {item.priceNPR.toLocaleString()}
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center rounded-lg border border-line bg-canvas">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2 text-muted transition hover:text-brand-700"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={`p-1 px-2 transition ${
                                typeof item.stock === 'number' && item.quantity >= item.stock
                                  ? 'text-muted/60 cursor-not-allowed'
                                  : 'text-muted hover:text-brand-700'
                              }`}
                              disabled={typeof item.stock === 'number' && item.quantity >= item.stock}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs font-semibold text-muted transition hover:text-brand-700"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-line bg-white p-6">
                <div className="space-y-3 text-sm text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>NPR {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-brand-600">Free</span>
                  </div>
                  <div className="flex items-end justify-between border-t border-line pt-3 text-ink">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-extrabold text-brand-700">
                      NPR {getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="btn-primary mt-6 w-full"
                  aria-label="Proceed to checkout"
                >
                  Proceed to checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
