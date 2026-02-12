import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, ShieldCheck, Star, Calendar, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { farmers, produce, reviews } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";


export default function FarmerProfile() {
  const { id } = useParams();
  const { toast } = useToast();
  const farmer = farmers.find((f) => f.id === id);
  const farmerProduce = produce.filter((p) => p.farmerId === id);
  const farmerReviews = reviews.filter((r) => r.farmerId === id);

  if (!farmer) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Farmer not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </Link>

        {/* Profile header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-display font-bold text-primary shrink-0">
              {farmer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-black">{farmer.name}</h1>
                {farmer.verified && (
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground font-display font-semibold">{farmer.farmName}</p>
              <p className="text-sm text-muted-foreground mt-2">{farmer.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{farmer.location}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-farm-yellow text-farm-yellow" />{farmer.rating} ({farmer.reviewCount} reviews)</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Joined {new Date(farmer.joinedDate).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Leaf className="h-4 w-4" />{farmer.capacity}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {farmer.crops.map((c) => (
                  <Badge key={c} variant="secondary" className="rounded-full">{c}</Badge>
                ))}
              </div>
            </div>
            <Button
              className="rounded-full shrink-0"
              onClick={() => toast({ title: "Inquiry sent!", description: `Your message has been sent to ${farmer.name}.` })}
            >
              Contact Farmer
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold mb-4">Active Listings ({farmerProduce.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {farmerProduce.map((p) => (
                <Link key={p.id} to={`/produce/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                    <div className="h-28 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-display font-bold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.category} • Grade {p.grade}</p>
                      <p className="font-display font-black text-lg text-primary mt-1">₹{p.price}/{p.unit}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {farmerReviews.length === 0 ? (
                <p className="text-muted-foreground text-sm">No reviews yet</p>
              ) : (
                farmerReviews.map((r) => (
                  <Card key={r.id} className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-farm-yellow text-farm-yellow" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{r.comment}"</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{r.buyerName}</span> • {new Date(r.date).toLocaleDateString()}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
