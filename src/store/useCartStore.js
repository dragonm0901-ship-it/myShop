import { create } from 'zustand';

// A simple Zustand store for handling the shopping cart and wishlist state
export const useCartStore = create((set, get) => ({
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

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        isCartOpen: true, // Auto-open cart on add
      });
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }],
        isCartOpen: true, // Auto-open cart on add
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
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
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
    const isWished = wishlistItems.some(item => item.id === product.id);
    if (isWished) {
      set({ wishlistItems: wishlistItems.filter(item => item.id !== product.id) });
    } else {
      set({ wishlistItems: [...wishlistItems, product] });
    }
  },
  
  isInWishlist: (productId) => {
    return get().wishlistItems.some(item => item.id === productId);
  }
}));
