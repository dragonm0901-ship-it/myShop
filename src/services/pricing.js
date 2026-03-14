const TAX_RATE = 0.13;
const EXPRESS_SHIPPING_FEE = 450;

export const calculateSubtotal = (items) =>
  items.reduce((total, item) => total + item.priceNPR * item.quantity, 0);

export const calculateTotals = (items, deliveryMethod = 'standard') => {
  const subtotal = calculateSubtotal(items);
  const shipping = deliveryMethod === 'express' ? EXPRESS_SHIPPING_FEE : 0;
  const tax = Math.floor(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
    taxRate: TAX_RATE,
  };
};
