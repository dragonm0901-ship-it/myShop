import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const clampQuantityToStock = (item, quantity) => {
  const stock = typeof item.stock === 'number' ? item.stock : Infinity;
  return Math.min(quantity, stock);
};

// A simple Zustand store for handling the shopping cart and wishlist state
export const useCartStore = create(
  persist(
    (set, get) => ({
      // Cart State
      items: [],
      isCartOpen: false,

      // Wishlist State
      wishlistItems: [],

      // UI State
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Cart Logic
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        const quantityToAdd =
          product.quantity && product.quantity > 0 ? product.quantity : 1;

        if (existingItem) {
          const nextQuantity = clampQuantityToStock(
            existingItem,
            existingItem.quantity + quantityToAdd
          );
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: nextQuantity } : item
            ),
            isCartOpen: true,
          });
        } else {
          const nextQuantity = clampQuantityToStock(product, quantityToAdd);
          if (nextQuantity <= 0) return;
          set({
            items: [...items, { ...product, quantity: nextQuantity }],
            isCartOpen: true,
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((item) => {
            if (item.id !== productId) return item;
            const nextQuantity = clampQuantityToStock(item, quantity);
            return { ...item, quantity: nextQuantity };
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      // Derived State Selectors
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.priceNPR * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // --- WISHLIST LOGIC ---
      toggleWishlist: (product) => {
        const { wishlistItems } = get();
        const isWished = wishlistItems.some((item) => item.id === product.id);
        if (isWished) {
          set({
            wishlistItems: wishlistItems.filter((item) => item.id !== product.id),
          });
        } else {
          set({ wishlistItems: [...wishlistItems, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some((item) => item.id === productId);
      },
    }),
    {
      name: 'myshop-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        wishlistItems: state.wishlistItems,
      }),
      version: 1,
      migrate: (persistedState) => {
        if (!persistedState?.items) return persistedState;
        return {
          ...persistedState,
          items: persistedState.items.map((item) => ({
            ...item,
            quantity: clampQuantityToStock(item, item.quantity),
          })),
        };
      },
    }
  )
);
