import { useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const produceCategories = [
  { name: "Grains", icon: "🌾", color: "bg-farm-yellow-light" },
  { name: "Vegetables", icon: "🥬", color: "bg-farm-green-light" },
  { name: "Fruits", icon: "🍎", color: "bg-destructive/10" },
  { name: "Dairy", icon: "🥛", color: "bg-accent" },
  { name: "Pulses", icon: "🫘", color: "bg-farm-orange-light" },
  { name: "Spices", icon: "🌶️", color: "bg-destructive/10" },
  { name: "Oil Seeds", icon: "🌻", color: "bg-farm-yellow-light" },
  { name: "Flowers", icon: "🌸", color: "bg-accent" },
  { name: "Herbs", icon: "🌿", color: "bg-farm-green-light" },
  { name: "Dry Fruits", icon: "🥜", color: "bg-farm-orange-light" },
  { name: "Sugarcane", icon: "🎋", color: "bg-farm-green-light" },
  { name: "Other", icon: "📦", color: "bg-muted" },
];

export default function AddProduce() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Sprout className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-black">Add Produce</h1>
        </div>
        <p className="text-muted-foreground mb-8">Select a category to get started</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {produceCategories.map((cat) => (
            <Card
              key={cat.name}
              className={`${cat.color} border-2 border-transparent hover:border-primary cursor-pointer transition-all active:scale-95 p-0`}
              onClick={() => navigate(`/enter-details?category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="flex flex-col items-center justify-center p-5 gap-2">
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-xs font-bold text-center leading-tight">{cat.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
