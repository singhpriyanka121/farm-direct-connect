

# Farm2Market — Frontend MVP Plan

## Overview
A colorful, friendly, and approachable B2B marketplace website connecting farmers directly to bulk buyers (marts, retailers, hotels). This version focuses on the frontend with mock data — no backend yet — so all pages are interactive and visually complete, ready for backend integration later.

---

## Pages & Features

### 1. Landing / Home Page
- Hero section with bold headline, illustration/imagery of farm-to-market flow, and CTA buttons ("Browse Produce" / "List Your Produce")
- How It Works section (3-4 steps: List → Discover → Order → Deliver)
- Featured produce categories (Grains, Vegetables, Fruits, Dairy, etc.)
- Trust signals: stats (e.g., "500+ Farmers", "1000+ Orders"), testimonials
- Footer with navigation links, contact info, and social links

### 2. Marketplace / Browse Produce
- Grid of produce cards showing: product image, name, farmer name, location, price per unit, available quantity, quality grade
- Filter sidebar: category, location/region, price range, quality grade
- Search bar with auto-suggestions
- Sort options (price, newest, rating)

### 3. Produce Detail Page
- Large product images
- Detailed info: harvest date, grade, volume available, pricing tiers for bulk
- Farmer profile card (name, location, rating, verified badge)
- "Request Quote" or "Place Order" button (mocked action with toast notification)
- Related produce suggestions

### 4. Farmer Profile Page
- Farmer details: name, farm location, crops grown, capacity, verification status
- List of active produce listings
- Ratings & reviews from buyers (mock data)
- Contact / inquiry button

### 5. Farmer Onboarding Page (Form UI)
- Multi-step form: Personal Info → Farm Details (location, size, crops) → Upload documents for verification
- Progress indicator
- Preview/summary step before submission
- Success confirmation screen

### 6. Buyer Dashboard (Mock)
- Overview cards: active orders, favorite farmers, recent purchases
- Order history table with status badges (Pending, In Transit, Delivered)
- Quick reorder button

### 7. Farmer Dashboard (Mock)
- Overview cards: active listings, total orders, earnings summary
- Manage listings table (edit, pause, delete actions)
- Recent orders with status tracking

### 8. About / How It Works Page
- Platform mission and story
- Visual step-by-step explanation of the marketplace flow
- Team section (optional)

---

## Design Direction
- **Color palette**: Vibrant greens, warm oranges/yellows, with white and light gray backgrounds — feels fresh, agricultural, and approachable
- **Typography**: Rounded, friendly fonts — large headings, clear body text for non-tech users
- **UI elements**: Rounded cards, colorful badges for quality grades, friendly icons (Lucide), subtle animations on hover
- **Mobile responsive**: All pages fully responsive for phone and tablet use

---

## Navigation
- Top navbar with: Logo, Browse Produce, How It Works, Farmer Sign Up, Buyer Sign Up (both link to respective forms/dashboards)
- Mobile hamburger menu

---

## Data
- All data is mocked (hardcoded sample farmers, produce, orders) and structured so it can be easily replaced with real API/database calls later

