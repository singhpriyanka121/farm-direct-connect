import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Scale, Tag, Star, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function ReviewPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const listing = location.state as {
    name: string;
    category: string;
    quantity: string;
    price: string;
    unit: string;
    grade: string;
    description: string;
  } | null;

  if (!listing) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">No listing data found.</p>
          <Button className="mt-4" onClick={() => navigate("/add-produce")}>Start Over</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const total = (Number(listing.quantity) * Number(listing.price)).toLocaleString("en-IN");

  const handlePost = () => {
    toast({ title: "Produce Listed! 🎉", description: `${listing.name} is now live on the marketplace.` });
    navigate("/farmer-dashboard");
  };

  const details = [
    { icon: Leaf, label: "Category", value: listing.category },
    { icon: Scale, label: "Quantity", value: `${listing.quantity} ${listing.unit}` },
    { icon: Tag, label: "Price", value: `₹${listing.price}/${listing.unit}` },
    { icon: Star, label: "Grade", value: `Grade ${listing.grade}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-lg flex-1">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" /> Edit Details
        </button>

        <h1 className="font-display text-2xl font-black mb-1">Review Your Listing</h1>
        <p className="text-sm text-muted-foreground mb-6">Make sure everything looks right before posting.</p>

        {/* Summary Card */}
        <Card className="mb-6 overflow-hidden border-primary/20">
          <div className="bg-primary/10 px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Produce</p>
              <h2 className="font-display text-xl font-black text-foreground">{listing.name}</h2>
            </div>
            <Badge variant="secondary" className="text-xs font-bold">{listing.category}</Badge>
          </div>

          <CardContent className="p-5 space-y-4">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              </div>
            ))}

            {listing.description && (
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm">{listing.description}</p>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between pt-1">
              <p className="text-sm text-muted-foreground font-medium">Estimated Value</p>
              <p className="font-display text-2xl font-black text-primary">₹{total}</p>
            </div>
          </CardContent>
        </Card>

        {/* CTAs */}
        <Button onClick={handlePost} className="w-full h-14 rounded-xl text-lg font-bold mb-3">
          Post Now
        </Button>
        <Button variant="outline" className="w-full rounded-xl" onClick={() => navigate(-1)}>
          Go Back & Edit
        </Button>
      </div>
      <Footer />
    </div>
  );
}
