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
  { name: "Grains", icon: "🌾", count: 45, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop" },
  { name: "Vegetables", icon: "🥬", count: 120, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
  { name: "Fruits", icon: "🍎", count: 85, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop" },
  { name: "Dairy", icon: "🥛", count: 32, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop" },
  { name: "Pulses", icon: "🫘", count: 28, image: "https://images.unsplash.com/photo-1515543904413-1f5e45b16ef8?w=400&h=300&fit=crop" },
  { name: "Spices", icon: "🌶️", count: 56, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop" },
];

export const farmers: Farmer[] = [
  { id: "f1", name: "Rajesh Patel", farmName: "Green Valley Farms", location: "Gujarat", crops: ["Wheat", "Rice", "Cotton"], capacity: "500 tonnes/season", verified: true, rating: 4.8, reviewCount: 124, avatar: "", bio: "Third-generation farmer specializing in premium quality grains with sustainable farming practices.", joinedDate: "2024-01-15" },
  { id: "f2", name: "Sunita Devi", farmName: "Sunrise Organic Farm", location: "Punjab", crops: ["Vegetables", "Fruits", "Herbs"], capacity: "200 tonnes/season", verified: true, rating: 4.9, reviewCount: 98, avatar: "", bio: "Certified organic farmer growing chemical-free produce for health-conscious buyers.", joinedDate: "2023-08-20" },
  { id: "f3", name: "Arun Kumar", farmName: "Golden Harvest Farms", location: "Maharashtra", crops: ["Sugarcane", "Soybeans", "Onions"], capacity: "800 tonnes/season", verified: true, rating: 4.6, reviewCount: 76, avatar: "", bio: "Large-scale farmer with modern irrigation and quality-first approach to bulk supply.", joinedDate: "2024-03-10" },
  { id: "f4", name: "Meena Sharma", farmName: "Hillside Spice Gardens", location: "Kerala", crops: ["Cardamom", "Pepper", "Turmeric"], capacity: "50 tonnes/season", verified: false, rating: 4.4, reviewCount: 34, avatar: "", bio: "Specialty spice grower from the Western Ghats with generations of expertise.", joinedDate: "2024-06-01" },
  { id: "f5", name: "Deepak Yadav", farmName: "Yadav Agro Farms", location: "Uttar Pradesh", crops: ["Sugarcane", "Wheat", "Mustard"], capacity: "600 tonnes/season", verified: true, rating: 4.7, reviewCount: 89, avatar: "", bio: "Progressive farmer using drip irrigation and modern techniques for high-yield farming.", joinedDate: "2024-02-10" },
  { id: "f6", name: "Lakshmi Reddy", farmName: "Deccan Fresh Farms", location: "Andhra Pradesh", crops: ["Chillies", "Rice", "Groundnuts"], capacity: "350 tonnes/season", verified: true, rating: 4.5, reviewCount: 67, avatar: "", bio: "Award-winning farmer known for premium Guntur chillies and organic rice cultivation.", joinedDate: "2023-11-15" },
  { id: "f7", name: "Harpreet Singh", farmName: "Punjab Pride Dairy", location: "Punjab", crops: ["Dairy", "Wheat", "Corn"], capacity: "300 tonnes/season", verified: true, rating: 4.8, reviewCount: 112, avatar: "", bio: "Family-run dairy and grain farm supplying premium quality products across North India.", joinedDate: "2023-06-01" },
  { id: "f8", name: "Kavitha Nair", farmName: "Malabar Greens", location: "Karnataka", crops: ["Coffee", "Coconut", "Banana"], capacity: "150 tonnes/season", verified: false, rating: 4.3, reviewCount: 41, avatar: "", bio: "Sustainable plantation farmer from Coorg growing shade-grown coffee and tropical fruits.", joinedDate: "2024-04-20" },
];

export const produce: Produce[] = [
  { id: "p1", name: "Premium Basmati Rice", category: "Grains", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 65, unit: "kg", availableQty: 5000, minOrder: 100, grade: "A", harvestDate: "2025-12-15", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop", description: "Long-grain aromatic basmati rice, aged for 12 months.", pricingTiers: [{ minQty: 100, price: 65 }, { minQty: 500, price: 60 }, { minQty: 1000, price: 55 }] },
  { id: "p2", name: "Organic Tomatoes", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 40, unit: "kg", availableQty: 2000, minOrder: 50, grade: "A", harvestDate: "2026-01-20", image: "https://images.unsplash.com/photo-1592924357228-91a4daadce55?w=600&h=400&fit=crop", description: "Certified organic, vine-ripened tomatoes. Firm, juicy, and chemical-free.", pricingTiers: [{ minQty: 50, price: 40 }, { minQty: 200, price: 36 }, { minQty: 500, price: 32 }] },
  { id: "p3", name: "Fresh Alphonso Mangoes", category: "Fruits", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 120, unit: "kg", availableQty: 3000, minOrder: 50, grade: "A", harvestDate: "2026-03-01", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop", description: "Export-quality Alphonso mangoes, hand-picked at peak ripeness.", pricingTiers: [{ minQty: 50, price: 120 }, { minQty: 200, price: 110 }, { minQty: 500, price: 100 }] },
  { id: "p4", name: "Malabar Black Pepper", category: "Spices", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 450, unit: "kg", availableQty: 500, minOrder: 10, grade: "A", harvestDate: "2025-11-10", image: "https://images.unsplash.com/photo-1599909533601-aa042bfb1603?w=600&h=400&fit=crop", description: "Premium whole black pepper with bold aroma and intense flavor.", pricingTiers: [{ minQty: 10, price: 450 }, { minQty: 50, price: 420 }, { minQty: 100, price: 400 }] },
  { id: "p5", name: "Farm-Fresh Potatoes", category: "Vegetables", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 22, unit: "kg", availableQty: 10000, minOrder: 200, grade: "B", harvestDate: "2026-01-05", image: "https://images.unsplash.com/photo-1508313880080-c8bef38b5c4f?w=600&h=400&fit=crop", description: "Clean, sorted potatoes ideal for chips, restaurants, and wholesale.", pricingTiers: [{ minQty: 200, price: 22 }, { minQty: 1000, price: 20 }, { minQty: 5000, price: 18 }] },
  { id: "p6", name: "Organic Turmeric Powder", category: "Spices", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 200, unit: "kg", availableQty: 800, minOrder: 20, grade: "A", harvestDate: "2025-10-20", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop", description: "High-curcumin turmeric, stone-ground and chemical-free.", pricingTiers: [{ minQty: 20, price: 200 }, { minQty: 100, price: 180 }, { minQty: 500, price: 160 }] },
  { id: "p7", name: "A2 Cow Milk", category: "Dairy", farmerId: "f7", farmerName: "Harpreet Singh", farmerLocation: "Punjab", price: 70, unit: "litre", availableQty: 500, minOrder: 20, grade: "A", harvestDate: "2026-02-10", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=400&fit=crop", description: "Pure A2 cow milk from indigenous breeds. Fresh and nutrient-rich.", pricingTiers: [{ minQty: 20, price: 70 }, { minQty: 100, price: 65 }, { minQty: 300, price: 60 }] },
  { id: "p8", name: "Red Onions", category: "Vegetables", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 28, unit: "kg", availableQty: 8000, minOrder: 500, grade: "B", harvestDate: "2026-01-25", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&h=400&fit=crop", description: "Nashik red onions, crisp and firm. Sorted by size.", pricingTiers: [{ minQty: 500, price: 28 }, { minQty: 2000, price: 25 }, { minQty: 5000, price: 22 }] },
  { id: "p9", name: "Green Cardamom", category: "Spices", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 1800, unit: "kg", availableQty: 200, minOrder: 5, grade: "A", harvestDate: "2025-11-01", image: "https://images.unsplash.com/photo-1603431777007-61e57be0ffe7?w=600&h=400&fit=crop", description: "Premium green cardamom pods with intense aroma. Handpicked.", pricingTiers: [{ minQty: 5, price: 1800 }, { minQty: 25, price: 1700 }, { minQty: 50, price: 1600 }] },
  { id: "p10", name: "Fresh Spinach", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 30, unit: "kg", availableQty: 1500, minOrder: 25, grade: "A", harvestDate: "2026-02-05", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop", description: "Tender baby spinach leaves, organically grown and freshly harvested.", pricingTiers: [{ minQty: 25, price: 30 }, { minQty: 100, price: 27 }, { minQty: 300, price: 24 }] },
  { id: "p11", name: "Organic Wheat Flour", category: "Grains", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 38, unit: "kg", availableQty: 8000, minOrder: 100, grade: "A", harvestDate: "2025-12-20", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop", description: "Stone-ground organic wheat flour from heritage wheat varieties.", pricingTiers: [{ minQty: 100, price: 38 }, { minQty: 500, price: 35 }, { minQty: 1000, price: 32 }] },
  { id: "p12", name: "Fresh Cauliflower", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 35, unit: "kg", availableQty: 3000, minOrder: 50, grade: "A", harvestDate: "2026-01-28", image: "https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=600&h=400&fit=crop", description: "Tight, white cauliflower heads. Perfect for processing and retail.", pricingTiers: [{ minQty: 50, price: 35 }, { minQty: 200, price: 31 }, { minQty: 500, price: 28 }] },
  { id: "p13", name: "Bananas - Cavendish", category: "Fruits", farmerId: "f8", farmerName: "Kavitha Nair", farmerLocation: "Karnataka", price: 35, unit: "kg", availableQty: 5000, minOrder: 100, grade: "A", harvestDate: "2026-02-01", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop", description: "Premium Cavendish bananas, uniformly ripened for retail chains.", pricingTiers: [{ minQty: 100, price: 35 }, { minQty: 500, price: 32 }, { minQty: 1000, price: 29 }] },
  { id: "p14", name: "Toor Dal", category: "Pulses", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 95, unit: "kg", availableQty: 4000, minOrder: 100, grade: "A", harvestDate: "2025-12-10", image: "https://images.unsplash.com/photo-1515543904413-1f5e45b16ef8?w=600&h=400&fit=crop", description: "Premium polished toor dal with high protein content.", pricingTiers: [{ minQty: 100, price: 95 }, { minQty: 500, price: 90 }, { minQty: 1000, price: 85 }] },
  { id: "p15", name: "Fresh Green Chillies", category: "Vegetables", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 45, unit: "kg", availableQty: 2000, minOrder: 25, grade: "A", harvestDate: "2026-02-08", image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&h=400&fit=crop", description: "Spicy green chillies from Guntur. Perfect heat level for food processing.", pricingTiers: [{ minQty: 25, price: 45 }, { minQty: 100, price: 40 }, { minQty: 500, price: 36 }] },
  { id: "p16", name: "Fresh Coconuts", category: "Fruits", farmerId: "f8", farmerName: "Kavitha Nair", farmerLocation: "Karnataka", price: 18, unit: "piece", availableQty: 10000, minOrder: 100, grade: "A", harvestDate: "2026-02-12", image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=600&h=400&fit=crop", description: "Tender and mature coconuts. High water content and thick flesh.", pricingTiers: [{ minQty: 100, price: 18 }, { minQty: 500, price: 16 }, { minQty: 1000, price: 14 }] },
  { id: "p17", name: "Paneer (Cottage Cheese)", category: "Dairy", farmerId: "f7", farmerName: "Harpreet Singh", farmerLocation: "Punjab", price: 280, unit: "kg", availableQty: 600, minOrder: 10, grade: "A", harvestDate: "2026-02-11", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop", description: "Fresh handmade paneer from pure cow milk. Soft and creamy texture.", pricingTiers: [{ minQty: 10, price: 280 }, { minQty: 50, price: 260 }, { minQty: 100, price: 240 }] },
  { id: "p18", name: "Cinnamon Sticks", category: "Spices", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 600, unit: "kg", availableQty: 300, minOrder: 5, grade: "A", harvestDate: "2025-10-15", image: "https://images.unsplash.com/photo-1587131782738-de30ea91a542?w=600&h=400&fit=crop", description: "True Ceylon cinnamon sticks. Sweet aroma, delicate flavor.", pricingTiers: [{ minQty: 5, price: 600 }, { minQty: 25, price: 550 }, { minQty: 50, price: 500 }] },
  { id: "p19", name: "Sweet Corn", category: "Vegetables", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 25, unit: "kg", availableQty: 6000, minOrder: 100, grade: "A", harvestDate: "2026-01-15", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=400&fit=crop", description: "Super sweet corn, perfect for processing, frozen food, and restaurants.", pricingTiers: [{ minQty: 100, price: 25 }, { minQty: 500, price: 22 }, { minQty: 1000, price: 20 }] },
  { id: "p20", name: "Pomegranates", category: "Fruits", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 110, unit: "kg", availableQty: 2500, minOrder: 50, grade: "A", harvestDate: "2026-01-20", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop", description: "Ruby-red Bhagwa pomegranates. High juice content and sweet taste.", pricingTiers: [{ minQty: 50, price: 110 }, { minQty: 200, price: 100 }, { minQty: 500, price: 90 }] },
  { id: "p21", name: "Moong Dal", category: "Pulses", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 85, unit: "kg", availableQty: 3500, minOrder: 100, grade: "A", harvestDate: "2025-11-20", image: "https://images.unsplash.com/photo-1612257416648-ee7a6c5b16eb?w=600&h=400&fit=crop", description: "Split yellow moong dal, cleaned and polished. High protein content.", pricingTiers: [{ minQty: 100, price: 85 }, { minQty: 500, price: 80 }, { minQty: 1000, price: 75 }] },
  { id: "p22", name: "Fresh Garlic", category: "Vegetables", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 55, unit: "kg", availableQty: 4000, minOrder: 50, grade: "A", harvestDate: "2026-01-10", image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?w=600&h=400&fit=crop", description: "Large-clove garlic bulbs with strong aroma. Perfect for wholesale.", pricingTiers: [{ minQty: 50, price: 55 }, { minQty: 200, price: 50 }, { minQty: 500, price: 46 }] },
  { id: "p23", name: "Saffron Threads", category: "Spices", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 95000, unit: "kg", availableQty: 5, minOrder: 0.01, grade: "A", harvestDate: "2025-10-01", image: "https://images.unsplash.com/photo-1600880291467-79e7fde46e69?w=600&h=400&fit=crop", description: "Premium Kashmiri saffron threads. Deep red color and intense aroma.", pricingTiers: [{ minQty: 0.01, price: 95000 }, { minQty: 0.1, price: 90000 }, { minQty: 0.5, price: 85000 }] },
  { id: "p24", name: "Fresh Ginger", category: "Vegetables", farmerId: "f4", farmerName: "Meena Sharma", farmerLocation: "Kerala", price: 80, unit: "kg", availableQty: 2000, minOrder: 25, grade: "A", harvestDate: "2026-01-15", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop", description: "Fresh, aromatic ginger roots. High oil content for food and beverages.", pricingTiers: [{ minQty: 25, price: 80 }, { minQty: 100, price: 72 }, { minQty: 500, price: 65 }] },
  { id: "p25", name: "Watermelon", category: "Fruits", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 12, unit: "kg", availableQty: 15000, minOrder: 500, grade: "A", harvestDate: "2026-02-15", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=600&h=400&fit=crop", description: "Sweet, juicy watermelons with deep red flesh. Perfect for summers.", pricingTiers: [{ minQty: 500, price: 12 }, { minQty: 2000, price: 10 }, { minQty: 5000, price: 8 }] },
  { id: "p26", name: "Ghee (Clarified Butter)", category: "Dairy", farmerId: "f7", farmerName: "Harpreet Singh", farmerLocation: "Punjab", price: 550, unit: "kg", availableQty: 400, minOrder: 5, grade: "A", harvestDate: "2026-02-08", image: "https://images.unsplash.com/photo-1600398142498-e4ed6b4e6a41?w=600&h=400&fit=crop", description: "Pure desi cow ghee made using traditional bilona method.", pricingTiers: [{ minQty: 5, price: 550 }, { minQty: 25, price: 520 }, { minQty: 50, price: 490 }] },
  { id: "p27", name: "Cabbage", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 15, unit: "kg", availableQty: 7000, minOrder: 200, grade: "B", harvestDate: "2026-02-01", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&h=400&fit=crop", description: "Fresh green cabbage, tight heads. Great for salads and processing.", pricingTiers: [{ minQty: 200, price: 15 }, { minQty: 1000, price: 13 }, { minQty: 3000, price: 11 }] },
  { id: "p28", name: "Red Chilli Powder", category: "Spices", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 180, unit: "kg", availableQty: 1500, minOrder: 20, grade: "A", harvestDate: "2025-12-01", image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&h=400&fit=crop", description: "Premium Guntur red chilli powder. Vibrant color and strong heat.", pricingTiers: [{ minQty: 20, price: 180 }, { minQty: 100, price: 165 }, { minQty: 500, price: 150 }] },
  { id: "p29", name: "Pineapple", category: "Fruits", farmerId: "f8", farmerName: "Kavitha Nair", farmerLocation: "Karnataka", price: 40, unit: "kg", availableQty: 4000, minOrder: 100, grade: "A", harvestDate: "2026-02-05", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&h=400&fit=crop", description: "Sweet Queen variety pineapples from tropical plantations.", pricingTiers: [{ minQty: 100, price: 40 }, { minQty: 500, price: 36 }, { minQty: 1000, price: 32 }] },
  { id: "p30", name: "Chana Dal", category: "Pulses", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 75, unit: "kg", availableQty: 5000, minOrder: 100, grade: "A", harvestDate: "2025-12-05", image: "https://images.unsplash.com/photo-1585996754577-76d3f7e73e3c?w=600&h=400&fit=crop", description: "Premium quality chana dal. Clean, uniform grains with nutty flavor.", pricingTiers: [{ minQty: 100, price: 75 }, { minQty: 500, price: 70 }, { minQty: 1000, price: 65 }] },
  { id: "p31", name: "Broccoli", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 60, unit: "kg", availableQty: 1200, minOrder: 25, grade: "A", harvestDate: "2026-02-06", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop", description: "Fresh organic broccoli with tight green florets. Rich in nutrients.", pricingTiers: [{ minQty: 25, price: 60 }, { minQty: 100, price: 55 }, { minQty: 300, price: 50 }] },
  { id: "p32", name: "Papaya", category: "Fruits", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 25, unit: "kg", availableQty: 6000, minOrder: 100, grade: "A", harvestDate: "2026-02-10", image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=600&h=400&fit=crop", description: "Red Lady papayas, sweet and juicy. Uniform size for retail.", pricingTiers: [{ minQty: 100, price: 25 }, { minQty: 500, price: 22 }, { minQty: 1000, price: 19 }] },
  { id: "p33", name: "Cumin Seeds", category: "Spices", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 300, unit: "kg", availableQty: 700, minOrder: 10, grade: "A", harvestDate: "2025-11-25", image: "https://images.unsplash.com/photo-1607178589219-e694ad1b4cbe?w=600&h=400&fit=crop", description: "Whole cumin seeds with strong earthy flavor. Gujarat's finest.", pricingTiers: [{ minQty: 10, price: 300 }, { minQty: 50, price: 280 }, { minQty: 100, price: 260 }] },
  { id: "p34", name: "Curd (Yogurt)", category: "Dairy", farmerId: "f7", farmerName: "Harpreet Singh", farmerLocation: "Punjab", price: 50, unit: "kg", availableQty: 800, minOrder: 20, grade: "A", harvestDate: "2026-02-12", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop", description: "Thick, creamy set curd made from full-fat A2 cow milk.", pricingTiers: [{ minQty: 20, price: 50 }, { minQty: 100, price: 45 }, { minQty: 300, price: 42 }] },
  { id: "p35", name: "Carrots", category: "Vegetables", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 30, unit: "kg", availableQty: 5000, minOrder: 100, grade: "A", harvestDate: "2026-01-22", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop", description: "Bright orange carrots, sweet and crunchy. Washed and sorted.", pricingTiers: [{ minQty: 100, price: 30 }, { minQty: 500, price: 27 }, { minQty: 1000, price: 24 }] },
  { id: "p36", name: "Guava", category: "Fruits", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 45, unit: "kg", availableQty: 3000, minOrder: 50, grade: "A", harvestDate: "2026-01-18", image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=600&h=400&fit=crop", description: "Allahabad safeda guavas. White flesh, sweet and aromatic.", pricingTiers: [{ minQty: 50, price: 45 }, { minQty: 200, price: 40 }, { minQty: 500, price: 36 }] },
  { id: "p37", name: "Masoor Dal (Red Lentils)", category: "Pulses", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 78, unit: "kg", availableQty: 4500, minOrder: 100, grade: "A", harvestDate: "2025-12-15", image: "https://images.unsplash.com/photo-1613758947307-f3b8f5d80711?w=600&h=400&fit=crop", description: "Premium red masoor dal. Quick-cooking with rich earthy flavor.", pricingTiers: [{ minQty: 100, price: 78 }, { minQty: 500, price: 73 }, { minQty: 1000, price: 68 }] },
  { id: "p38", name: "Drumsticks (Moringa)", category: "Vegetables", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 50, unit: "kg", availableQty: 2000, minOrder: 25, grade: "A", harvestDate: "2026-02-03", image: "https://images.unsplash.com/photo-1611105136667-2f13662a4080?w=600&h=400&fit=crop", description: "Fresh moringa pods, tender and long. Packed with nutrients.", pricingTiers: [{ minQty: 25, price: 50 }, { minQty: 100, price: 45 }, { minQty: 300, price: 40 }] },
  { id: "p39", name: "Groundnuts (Peanuts)", category: "Pulses", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 90, unit: "kg", availableQty: 6000, minOrder: 100, grade: "A", harvestDate: "2025-12-20", image: "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=600&h=400&fit=crop", description: "Bold variety groundnuts, crunchy and flavorful. Ideal for oil and snacks.", pricingTiers: [{ minQty: 100, price: 90 }, { minQty: 500, price: 85 }, { minQty: 1000, price: 78 }] },
  { id: "p40", name: "Grapes - Thompson Seedless", category: "Fruits", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 70, unit: "kg", availableQty: 4000, minOrder: 50, grade: "A", harvestDate: "2026-02-01", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&h=400&fit=crop", description: "Seedless green grapes, sweet and crisp. Export quality.", pricingTiers: [{ minQty: 50, price: 70 }, { minQty: 200, price: 65 }, { minQty: 500, price: 58 }] },
  { id: "p41", name: "Mustard Seeds", category: "Spices", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 120, unit: "kg", availableQty: 2000, minOrder: 25, grade: "A", harvestDate: "2025-11-30", image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=600&h=400&fit=crop", description: "Black and yellow mustard seeds. Sharp flavor for pickles and cooking.", pricingTiers: [{ minQty: 25, price: 120 }, { minQty: 100, price: 110 }, { minQty: 500, price: 100 }] },
  { id: "p42", name: "Butter", category: "Dairy", farmerId: "f7", farmerName: "Harpreet Singh", farmerLocation: "Punjab", price: 450, unit: "kg", availableQty: 300, minOrder: 5, grade: "A", harvestDate: "2026-02-10", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=400&fit=crop", description: "Fresh farm butter made from cultured cream. Rich yellow color.", pricingTiers: [{ minQty: 5, price: 450 }, { minQty: 25, price: 420 }, { minQty: 50, price: 400 }] },
  { id: "p43", name: "Bitter Gourd", category: "Vegetables", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 35, unit: "kg", availableQty: 1500, minOrder: 25, grade: "B", harvestDate: "2026-02-04", image: "https://images.unsplash.com/photo-1606585535778-64a4a6e09a49?w=600&h=400&fit=crop", description: "Fresh karela, medium-sized and tender. Popular in Indian cuisine.", pricingTiers: [{ minQty: 25, price: 35 }, { minQty: 100, price: 31 }, { minQty: 300, price: 28 }] },
  { id: "p44", name: "Oranges - Nagpur", category: "Fruits", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 55, unit: "kg", availableQty: 5000, minOrder: 100, grade: "A", harvestDate: "2026-01-25", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=400&fit=crop", description: "Famous Nagpur oranges. Sweet, juicy and vitamin C rich.", pricingTiers: [{ minQty: 100, price: 55 }, { minQty: 500, price: 50 }, { minQty: 1000, price: 45 }] },
  { id: "p45", name: "Urad Dal (Black Gram)", category: "Pulses", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 100, unit: "kg", availableQty: 3000, minOrder: 100, grade: "A", harvestDate: "2025-12-10", image: "https://images.unsplash.com/photo-1612257416648-ee7a6c5b16eb?w=600&h=400&fit=crop", description: "Premium split urad dal. Essential for dosa batter and dal makhani.", pricingTiers: [{ minQty: 100, price: 100 }, { minQty: 500, price: 94 }, { minQty: 1000, price: 88 }] },
  { id: "p46", name: "Pearl Millet (Bajra)", category: "Grains", farmerId: "f1", farmerName: "Rajesh Patel", farmerLocation: "Gujarat", price: 28, unit: "kg", availableQty: 7000, minOrder: 200, grade: "B", harvestDate: "2025-11-20", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop", description: "Nutritious bajra grains. High in iron and fiber. Perfect for flour.", pricingTiers: [{ minQty: 200, price: 28 }, { minQty: 1000, price: 25 }, { minQty: 3000, price: 22 }] },
  { id: "p47", name: "Cucumber", category: "Vegetables", farmerId: "f2", farmerName: "Sunita Devi", farmerLocation: "Punjab", price: 20, unit: "kg", availableQty: 4000, minOrder: 50, grade: "A", harvestDate: "2026-02-07", image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&h=400&fit=crop", description: "Fresh, crunchy cucumbers. Uniform size, perfect for salads and pickles.", pricingTiers: [{ minQty: 50, price: 20 }, { minQty: 200, price: 18 }, { minQty: 500, price: 15 }] },
  { id: "p48", name: "Coffee Beans - Arabica", category: "Spices", farmerId: "f8", farmerName: "Kavitha Nair", farmerLocation: "Karnataka", price: 400, unit: "kg", availableQty: 500, minOrder: 10, grade: "A", harvestDate: "2025-12-01", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop", description: "Shade-grown Arabica coffee beans from Coorg. Medium roast profile.", pricingTiers: [{ minQty: 10, price: 400 }, { minQty: 50, price: 370 }, { minQty: 100, price: 340 }] },
  { id: "p49", name: "Lemon", category: "Fruits", farmerId: "f6", farmerName: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", price: 45, unit: "kg", availableQty: 5000, minOrder: 50, grade: "A", harvestDate: "2026-02-09", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=400&fit=crop", description: "Fresh, juicy lemons with high citric acid content. Bright yellow.", pricingTiers: [{ minQty: 50, price: 45 }, { minQty: 200, price: 40 }, { minQty: 500, price: 35 }] },
  { id: "p50", name: "Sorghum (Jowar)", category: "Grains", farmerId: "f3", farmerName: "Arun Kumar", farmerLocation: "Maharashtra", price: 32, unit: "kg", availableQty: 6000, minOrder: 200, grade: "A", harvestDate: "2025-12-20", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop", description: "White sorghum grains for flour, porridge, and animal feed.", pricingTiers: [{ minQty: 200, price: 32 }, { minQty: 1000, price: 29 }, { minQty: 3000, price: 26 }] },
  { id: "p51", name: "Lady Finger (Okra)", category: "Vegetables", farmerId: "f5", farmerName: "Deepak Yadav", farmerLocation: "Uttar Pradesh", price: 38, unit: "kg", availableQty: 2500, minOrder: 50, grade: "A", harvestDate: "2026-02-06", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&h=400&fit=crop", description: "Tender, young okra pods. No fiber, perfect for cooking.", pricingTiers: [{ minQty: 50, price: 38 }, { minQty: 200, price: 34 }, { minQty: 500, price: 30 }] },
  { id: "p52", name: "Sapota (Chikoo)", category: "Fruits", farmerId: "f8", farmerName: "Kavitha Nair", farmerLocation: "Karnataka", price: 50, unit: "kg", availableQty: 2000, minOrder: 50, grade: "A", harvestDate: "2026-01-28", image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=600&h=400&fit=crop", description: "Sweet, malty-flavored chikoo fruits. Uniform ripening.", pricingTiers: [{ minQty: 50, price: 50 }, { minQty: 200, price: 45 }, { minQty: 500, price: 40 }] },
];

export const orders: Order[] = [
  { id: "o1", produceId: "p1", produceName: "Premium Basmati Rice", farmerName: "Rajesh Patel", buyerName: "Metro Mart", quantity: 500, total: 30000, status: "Delivered", orderDate: "2026-01-10", deliveryDate: "2026-01-15" },
  { id: "o2", produceId: "p2", produceName: "Organic Tomatoes", farmerName: "Sunita Devi", buyerName: "FreshBasket Hotels", quantity: 200, total: 7200, status: "In Transit", orderDate: "2026-02-01", deliveryDate: "2026-02-05" },
  { id: "o3", produceId: "p3", produceName: "Fresh Alphonso Mangoes", farmerName: "Arun Kumar", buyerName: "Metro Mart", quantity: 100, total: 12000, status: "Confirmed", orderDate: "2026-02-08", deliveryDate: "2026-02-12" },
  { id: "o4", produceId: "p5", produceName: "Farm-Fresh Potatoes", farmerName: "Rajesh Patel", buyerName: "QuickBite Restaurants", quantity: 1000, total: 20000, status: "Pending", orderDate: "2026-02-10", deliveryDate: "2026-02-16" },
  { id: "o5", produceId: "p4", produceName: "Malabar Black Pepper", farmerName: "Meena Sharma", buyerName: "SpiceWorld Exports", quantity: 50, total: 21000, status: "Delivered", orderDate: "2025-12-20", deliveryDate: "2025-12-28" },
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
