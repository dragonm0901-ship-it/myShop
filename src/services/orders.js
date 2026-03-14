const STORAGE_KEY = 'myshop-orders-v1';

export const ORDER_STATUS = {
  CREATED: 'created',
  PAID: 'paid',
  FULFILLED: 'fulfilled',
  RETURNED: 'returned',
};

const readOrders = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const writeOrders = (orders) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const createOrder = ({ items, totals, customer, deliveryMethod, paymentMethod }) => {
  const orders = readOrders();
  const order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    status: ORDER_STATUS.PAID,
    createdAt: new Date().toISOString(),
    items,
    totals,
    customer,
    deliveryMethod,
    paymentMethod,
  };

  writeOrders([order, ...orders]);
  return order;
};

export const getOrders = () => readOrders();

export const getOrderById = (orderId) =>
  readOrders().find((order) => order.id === orderId);

export const updateOrderStatus = (orderId, status) => {
  const orders = readOrders();
  const nextOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  );
  writeOrders(nextOrders);
  return nextOrders.find((order) => order.id === orderId);
};
