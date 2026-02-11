export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  crops: string[];
  capacity: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export interface Produce {
  id: string;
  name: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  price: number;
  unit: string;
  availableQty: number;
  minOrder: number;
  grade: "A" | "B" | "C";
  harvestDate: string;
  image: string;
  description: string;
  pricingTiers: { minQty: number; price: number }[];
}

export interface Order {
  id: string;
  produceId: string;
  produceName: string;
  farmerName: string;
  buyerName: string;
  quantity: number;
  total: number;
  status: "Pending" | "Confirmed" | "In Transit" | "Delivered" | "Cancelled";
  orderDate: string;
  deliveryDate: string;
}

export interface Review {
  id: string;
  farmerId: string;
  buyerName: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories = [
  { name: "Grains", icon: "🌾", count: 45 },
  { name: "Vegetables", icon: "🥬", count: 120 },
  { name: "Fruits", icon: "🍎", count: 85 },
  { name: "Dairy", icon: "🥛", count: 32 },
  { name: "Pulses", icon: "🫘", count: 28 },
  { name: "Spices", icon: "🌶️", count: 56 },
];

export const farmers: Farmer[] = [
  {
    id: "f1",
    name: "Rajesh Patel",
    farmName: "Green Valley Farms",
    location: "Gujarat",
    crops: ["Wheat", "Rice", "Cotton"],
    capacity: "500 tonnes/season",
    verified: true,
    rating: 4.8,
    reviewCount: 124,
    avatar: "",
    bio: "Third-generation farmer specializing in premium quality grains with sustainable farming practices.",
    joinedDate: "2024-01-15",
  },
  {
    id: "f2",
    name: "Sunita Devi",
    farmName: "Sunrise Organic Farm",
    location: "Punjab",
    crops: ["Vegetables", "Fruits", "Herbs"],
    capacity: "200 tonnes/season",
    verified: true,
    rating: 4.9,
    reviewCount: 98,
    avatar: "",
    bio: "Certified organic farmer growing chemical-free produce for health-conscious buyers.",
    joinedDate: "2023-08-20",
  },
  {
    id: "f3",
    name: "Arun Kumar",
    farmName: "Golden Harvest Farms",
    location: "Maharashtra",
    crops: ["Sugarcane", "Soybeans", "Onions"],
    capacity: "800 tonnes/season",
    verified: true,
    rating: 4.6,
    reviewCount: 76,
    avatar: "",
    bio: "Large-scale farmer with modern irrigation and quality-first approach to bulk supply.",
    joinedDate: "2024-03-10",
  },
  {
    id: "f4",
    name: "Meena Sharma",
    farmName: "Hillside Spice Gardens",
    location: "Kerala",
    crops: ["Cardamom", "Pepper", "Turmeric"],
    capacity: "50 tonnes/season",
    verified: false,
    rating: 4.4,
    reviewCount: 34,
    avatar: "",
    bio: "Specialty spice grower from the Western Ghats with generations of expertise.",
    joinedDate: "2024-06-01",
  },
];

export const produce: Produce[] = [
  {
    id: "p1",
    name: "Premium Basmati Rice",
    category: "Grains",
    farmerId: "f1",
    farmerName: "Rajesh Patel",
    farmerLocation: "Gujarat",
    price: 65,
    unit: "kg",
    availableQty: 5000,
    minOrder: 100,
    grade: "A",
    harvestDate: "2025-12-15",
    image: "",
    description: "Long-grain aromatic basmati rice, aged for 12 months. Perfect for restaurants and premium retail.",
    pricingTiers: [
      { minQty: 100, price: 65 },
      { minQty: 500, price: 60 },
      { minQty: 1000, price: 55 },
    ],
  },
  {
    id: "p2",
    name: "Organic Tomatoes",
    category: "Vegetables",
    farmerId: "f2",
    farmerName: "Sunita Devi",
    farmerLocation: "Punjab",
    price: 40,
    unit: "kg",
    availableQty: 2000,
    minOrder: 50,
    grade: "A",
    harvestDate: "2026-01-20",
    image: "",
    description: "Certified organic, vine-ripened tomatoes. Firm, juicy, and chemical-free.",
    pricingTiers: [
      { minQty: 50, price: 40 },
      { minQty: 200, price: 36 },
      { minQty: 500, price: 32 },
    ],
  },
  {
    id: "p3",
    name: "Fresh Alphonso Mangoes",
    category: "Fruits",
    farmerId: "f3",
    farmerName: "Arun Kumar",
    farmerLocation: "Maharashtra",
    price: 120,
    unit: "kg",
    availableQty: 3000,
    minOrder: 50,
    grade: "A",
    harvestDate: "2026-03-01",
    image: "",
    description: "Export-quality Alphonso mangoes, hand-picked at peak ripeness.",
    pricingTiers: [
      { minQty: 50, price: 120 },
      { minQty: 200, price: 110 },
      { minQty: 500, price: 100 },
    ],
  },
  {
    id: "p4",
    name: "Malabar Black Pepper",
    category: "Spices",
    farmerId: "f4",
    farmerName: "Meena Sharma",
    farmerLocation: "Kerala",
    price: 450,
    unit: "kg",
    availableQty: 500,
    minOrder: 10,
    grade: "A",
    harvestDate: "2025-11-10",
    image: "",
    description: "Premium whole black pepper with bold aroma and intense flavor. Sun-dried naturally.",
    pricingTiers: [
      { minQty: 10, price: 450 },
      { minQty: 50, price: 420 },
      { minQty: 100, price: 400 },
    ],
  },
  {
    id: "p5",
    name: "Farm-Fresh Potatoes",
    category: "Vegetables",
    farmerId: "f1",
    farmerName: "Rajesh Patel",
    farmerLocation: "Gujarat",
    price: 22,
    unit: "kg",
    availableQty: 10000,
    minOrder: 200,
    grade: "B",
    harvestDate: "2026-01-05",
    image: "",
    description: "Clean, sorted potatoes ideal for chips, restaurants, and wholesale distribution.",
    pricingTiers: [
      { minQty: 200, price: 22 },
      { minQty: 1000, price: 20 },
      { minQty: 5000, price: 18 },
    ],
  },
  {
    id: "p6",
    name: "Organic Turmeric Powder",
    category: "Spices",
    farmerId: "f4",
    farmerName: "Meena Sharma",
    farmerLocation: "Kerala",
    price: 200,
    unit: "kg",
    availableQty: 800,
    minOrder: 20,
    grade: "A",
    harvestDate: "2025-10-20",
    image: "",
    description: "High-curcumin turmeric, stone-ground and chemical-free. Ideal for food processing.",
    pricingTiers: [
      { minQty: 20, price: 200 },
      { minQty: 100, price: 180 },
      { minQty: 500, price: 160 },
    ],
  },
  {
    id: "p7",
    name: "A2 Cow Milk",
    category: "Dairy",
    farmerId: "f2",
    farmerName: "Sunita Devi",
    farmerLocation: "Punjab",
    price: 70,
    unit: "litre",
    availableQty: 500,
    minOrder: 20,
    grade: "A",
    harvestDate: "2026-02-10",
    image: "",
    description: "Pure A2 cow milk from indigenous breeds. Fresh, unprocessed, and nutrient-rich.",
    pricingTiers: [
      { minQty: 20, price: 70 },
      { minQty: 100, price: 65 },
      { minQty: 300, price: 60 },
    ],
  },
  {
    id: "p8",
    name: "Red Onions",
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Arun Kumar",
    farmerLocation: "Maharashtra",
    price: 28,
    unit: "kg",
    availableQty: 8000,
    minOrder: 500,
    grade: "B",
    harvestDate: "2026-01-25",
    image: "",
    description: "Nashik red onions, crisp and firm. Sorted by size for retail and wholesale.",
    pricingTiers: [
      { minQty: 500, price: 28 },
      { minQty: 2000, price: 25 },
      { minQty: 5000, price: 22 },
    ],
  },
];

export const orders: Order[] = [
  {
    id: "o1",
    produceId: "p1",
    produceName: "Premium Basmati Rice",
    farmerName: "Rajesh Patel",
    buyerName: "Metro Mart",
    quantity: 500,
    total: 30000,
    status: "Delivered",
    orderDate: "2026-01-10",
    deliveryDate: "2026-01-15",
  },
  {
    id: "o2",
    produceId: "p2",
    produceName: "Organic Tomatoes",
    farmerName: "Sunita Devi",
    buyerName: "FreshBasket Hotels",
    quantity: 200,
    total: 7200,
    status: "In Transit",
    orderDate: "2026-02-01",
    deliveryDate: "2026-02-05",
  },
  {
    id: "o3",
    produceId: "p3",
    produceName: "Fresh Alphonso Mangoes",
    farmerName: "Arun Kumar",
    buyerName: "Metro Mart",
    quantity: 100,
    total: 12000,
    status: "Confirmed",
    orderDate: "2026-02-08",
    deliveryDate: "2026-02-12",
  },
  {
    id: "o4",
    produceId: "p5",
    produceName: "Farm-Fresh Potatoes",
    farmerName: "Rajesh Patel",
    buyerName: "QuickBite Restaurants",
    quantity: 1000,
    total: 20000,
    status: "Pending",
    orderDate: "2026-02-10",
    deliveryDate: "2026-02-16",
  },
  {
    id: "o5",
    produceId: "p4",
    produceName: "Malabar Black Pepper",
    farmerName: "Meena Sharma",
    buyerName: "SpiceWorld Exports",
    quantity: 50,
    total: 21000,
    status: "Delivered",
    orderDate: "2025-12-20",
    deliveryDate: "2025-12-28",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    farmerId: "f1",
    buyerName: "Metro Mart",
    rating: 5,
    comment: "Excellent quality rice. Consistent grain size and aroma. Will order again.",
    date: "2026-01-20",
  },
  {
    id: "r2",
    farmerId: "f1",
    buyerName: "FreshBasket Hotels",
    rating: 4,
    comment: "Good quality produce. Delivery was on time. Packaging could be better.",
    date: "2025-12-15",
  },
  {
    id: "r3",
    farmerId: "f2",
    buyerName: "GreenLife Stores",
    rating: 5,
    comment: "Best organic produce we've sourced. Customers love the freshness.",
    date: "2026-01-28",
  },
  {
    id: "r4",
    farmerId: "f3",
    buyerName: "Metro Mart",
    rating: 4,
    comment: "Mangoes were great quality. Some minor variation in ripeness across the batch.",
    date: "2025-04-15",
  },
  {
    id: "r5",
    farmerId: "f4",
    buyerName: "SpiceWorld Exports",
    rating: 5,
    comment: "Outstanding pepper quality. Strong aroma and perfect moisture content.",
    date: "2026-01-05",
  },
];

export const testimonials = [
  {
    name: "Vikram Singh",
    role: "Procurement Manager, Metro Mart",
    quote: "Farm2Market has transformed how we source fresh produce. Direct access to verified farmers means better prices and consistent quality.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Owner, GreenLife Organic Stores",
    quote: "Finding certified organic farmers was always a challenge. This platform made it effortless. Our customers can taste the difference.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    role: "Farmer, Green Valley Farms",
    quote: "I used to depend on middlemen who took 40% of my earnings. Now I sell directly to buyers at fair prices. My income has doubled.",
    rating: 5,
  },
];

export const stats = [
  { label: "Active Farmers", value: "500+", icon: "👨‍🌾" },
  { label: "Bulk Buyers", value: "200+", icon: "🏪" },
  { label: "Orders Completed", value: "10,000+", icon: "📦" },
  { label: "Tonnes Traded", value: "50,000+", icon: "⚖️" },
];
