export const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Grocery",
];

export const PRODUCTS = [
  {
    id: "p-1001",
    name: "Pulse Pro Smart Watch",
    category: "Electronics",
    priceNPR: 24900,
    priceUSD: 189,
    stock: 12,
    rating: 4.8,
    reviews: 1280,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&q=80",
    ],
    description:
      "A refined, everyday smart watch with a bright edge-to-edge display, multi-day battery, and precise health tracking. Built for workdays and weekends alike.",
    features: [
      "Always-on AMOLED display",
      "10-day battery life",
      "Advanced sleep + heart tracking",
      "Water resistant to 50m",
    ],
    colors: [
      { name: "Onyx", class: "bg-slate-900" },
      { name: "Stone", class: "bg-slate-200" },
      { name: "Ocean", class: "bg-brand-600" },
    ],
    tags: ["featured", "flash", "best"],
  },
  {
    id: "p-1002",
    name: "Studio ANC Wireless Headphones",
    category: "Electronics",
    priceNPR: 27900,
    priceUSD: 209,
    stock: 8,
    rating: 4.7,
    reviews: 940,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    ],
    description:
      "Immersive over-ear sound with adaptive noise cancellation, a balanced signature, and plush ear cushions for all-day comfort.",
    features: [
      "Adaptive ANC with transparency",
      "40-hour battery with fast charge",
      "Multi-device pairing",
      "Premium memory foam cushions",
    ],
    colors: [
      { name: "Graphite", class: "bg-slate-800" },
      { name: "Mist", class: "bg-slate-100" },
      { name: "Navy", class: "bg-brand-800" },
    ],
    tags: ["featured", "best"],
  },
  {
    id: "p-1003",
    name: "AeroFlex Running Shoes",
    category: "Fashion",
    priceNPR: 9800,
    priceUSD: 79,
    stock: 6,
    rating: 4.6,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
      "https://images.unsplash.com/photo-1528701800489-20be8f8073fc?w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&q=80",
    ],
    description:
      "Lightweight trainers built for daily mileage with breathable mesh, responsive cushioning, and a grippy outsole.",
    features: [
      "Ultra-light mesh upper",
      "Responsive foam midsole",
      "Breathable, quick-dry lining",
      "Durable traction outsole",
    ],
    colors: [
      { name: "Cloud", class: "bg-slate-100" },
      { name: "Graphite", class: "bg-slate-800" },
      { name: "Sky", class: "bg-brand-500" },
    ],
    tags: ["flash", "best"],
  },
  {
    id: "p-1004",
    name: "Everyday Cotton Tee",
    category: "Fashion",
    priceNPR: 2200,
    priceUSD: 18,
    stock: 25,
    rating: 4.4,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=80",
    ],
    description:
      "Soft, heavyweight cotton with a clean drape and a modern fit. Built to stay sharp wash after wash.",
    features: [
      "100% combed cotton",
      "Pre-shrunk and colorfast",
      "Structured collar",
      "Relaxed modern fit",
    ],
    colors: [
      { name: "White", class: "bg-white" },
      { name: "Charcoal", class: "bg-slate-700" },
      { name: "Blue", class: "bg-brand-600" },
    ],
    tags: ["new"],
  },
  {
    id: "p-1005",
    name: "Edge 4K Action Camera",
    category: "Electronics",
    priceNPR: 45900,
    priceUSD: 349,
    stock: 0,
    rating: 4.5,
    reviews: 280,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80",
      "https://images.unsplash.com/photo-1519183071298-a2962be96c26?w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80",
    ],
    description:
      "Capture smooth 4K footage with horizon leveling, waterproof housing, and an ultra-wide lens for any adventure.",
    features: [
      "4K/60fps with stabilization",
      "Waterproof to 10m",
      "Ultra-wide 155° lens",
      "Quick-mount system",
    ],
    colors: [
      { name: "Black", class: "bg-slate-900" },
      { name: "Slate", class: "bg-slate-500" },
      { name: "Blue", class: "bg-brand-700" },
    ],
    tags: ["featured", "limited"],
  },
  {
    id: "p-1006",
    name: "HomePro Air Fryer 5L",
    category: "Home",
    priceNPR: 17900,
    priceUSD: 129,
    stock: 14,
    rating: 4.6,
    reviews: 760,
    image: "https://images.unsplash.com/photo-1604908177225-3574f8f6b3d6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1604908177225-3574f8f6b3d6?w=900&q=80",
      "https://images.unsplash.com/photo-1514516870926-2063f2b9da85?w=900&q=80",
      "https://images.unsplash.com/photo-1546549039-9a3997a89b16?w=900&q=80",
    ],
    description:
      "Crisp, even cooking with less oil. The 5L basket fits family meals and cleans up in minutes.",
    features: [
      "5L family-size basket",
      "Rapid hot-air circulation",
      "8 one-touch presets",
      "Dishwasher-safe basket",
    ],
    colors: [
      { name: "Matte Black", class: "bg-slate-900" },
      { name: "Steel", class: "bg-slate-300" },
      { name: "Blue", class: "bg-brand-500" },
    ],
    tags: ["new"],
  },
  {
    id: "p-1007",
    name: "Nimbus 24L Backpack",
    category: "Fashion",
    priceNPR: 6400,
    priceUSD: 49,
    stock: 4,
    rating: 4.7,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
    ],
    description:
      "A sleek, everyday backpack with padded laptop storage, weather-resistant fabric, and clean lines.",
    features: [
      "Padded 16-inch laptop sleeve",
      "Water-repellent shell",
      "Breathable back panel",
      "Quick-access top pocket",
    ],
    colors: [
      { name: "Midnight", class: "bg-slate-900" },
      { name: "Sand", class: "bg-amber-100" },
      { name: "Blue", class: "bg-brand-600" },
    ],
    tags: ["featured", "best"],
  },
  {
    id: "p-1008",
    name: "Organic Arabica Coffee 1kg",
    category: "Grocery",
    priceNPR: 1600,
    priceUSD: 12,
    stock: 30,
    rating: 4.9,
    reviews: 860,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=900&q=80",
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=900&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80",
    ],
    description:
      "Single-origin beans with a balanced, chocolatey finish. Roasted fresh for a clean, smooth cup.",
    features: [
      "Single-origin Arabica",
      "Medium roast profile",
      "Freshly roasted weekly",
      "Resealable 1kg bag",
    ],
    colors: [
      { name: "Roast", class: "bg-amber-800" },
      { name: "Cream", class: "bg-amber-100" },
      { name: "Blue", class: "bg-brand-500" },
    ],
    tags: ["flash"],
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) =>
  product.tags.includes("featured")
);

export const FLASH_DEALS = PRODUCTS.filter((product) =>
  product.tags.includes("flash")
);

export const NEW_ARRIVALS = PRODUCTS.filter((product) =>
  product.tags.includes("new")
);

export const BEST_SELLERS = PRODUCTS.filter((product) =>
  product.tags.includes("best")
);

export const LIMITED_DROPS = PRODUCTS.filter((product) =>
  product.tags.includes("limited")
);
