import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ShieldCheck, Star, Calendar, Package, TrendingDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { produce, farmers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const gradeColors: Record<string, string> = {
  A: "bg-primary text-primary-foreground",
  B: "bg-farm-orange text-secondary-foreground",
  C: "bg-muted text-muted-foreground",
};

export default function ProduceDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const item = produce.find((p) => p.id === id);
  const farmer = item ? farmers.find((f) => f.id === item.farmerId) : null;
  const related = produce.filter((p) => p.category === item?.category && p.id !== id).slice(0, 3);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Produce not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleOrder = () => {
    navigate(`/checkout/${item.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden h-64 md:h-80">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-start gap-3 flex-wrap">
                <h1 className="font-display text-3xl font-black">{item.name}</h1>
                <Badge className={`${gradeColors[item.grade]} text-sm`}>Grade {item.grade}</Badge>
              </div>
              <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: "Harvest", value: new Date(item.harvestDate).toLocaleDateString() },
                { icon: Package, label: "Available", value: `${item.availableQty.toLocaleString()} ${item.unit}` },
                { icon: TrendingDown, label: "Min Order", value: `${item.minOrder} ${item.unit}` },
                { icon: MapPin, label: "Origin", value: item.farmerLocation },
              ].map((d) => (
                <Card key={d.label} className="p-4 text-center">
                  <d.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="font-display font-bold text-sm">{d.value}</p>
                </Card>
              ))}
            </div>

            {/* Pricing tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Bulk Pricing Tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {item.pricingTiers.map((tier, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 text-center border-2 ${
                        i === item.pricingTiers.length - 1
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      {i === item.pricingTiers.length - 1 && (
                        <Badge className="mb-2 bg-farm-orange text-secondary-foreground text-xs">Best Value</Badge>
                      )}
                      <p className="font-display font-black text-2xl text-primary">₹{tier.price}</p>
                      <p className="text-sm text-muted-foreground">per {item.unit}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tier.minQty}+ {item.unit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <Card className="p-6 border-2 border-primary/20">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Starting at</p>
                <p className="font-display font-black text-4xl text-primary">₹{item.price}</p>
                <p className="text-muted-foreground">per {item.unit}</p>
              </div>
              <Button className="w-full rounded-full font-semibold text-base" size="lg" onClick={handleOrder}>
                Place Order
              </Button>
              <Button variant="outline" className="w-full rounded-full mt-3" onClick={() => toast({ title: "Quote requested!", description: "The farmer will send you a custom quote." })}>
                Request Quote
              </Button>
            </Card>

            {/* Farmer card */}
            {farmer && (
              <Link to={`/farmer/${farmer.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-display font-bold text-primary">
                      {farmer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-display font-bold">{farmer.name}</h3>
                        {farmer.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{farmer.farmName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-farm-yellow text-farm-yellow" />
                      {farmer.rating}
                    </span>
                    <span>{farmer.reviewCount} reviews</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {farmer.location}
                    </span>
                  </div>
                </Card>
              </Link>
            )}

            {/* Related */}
            {related.length > 0 && (
              <Card className="p-6">
                <h3 className="font-display font-bold mb-4">Related Produce</h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} to={`/produce/${r.id}`} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm truncate">{r.name}</p>
                        <p className="text-xs text-muted-foreground">₹{r.price}/{r.unit}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
