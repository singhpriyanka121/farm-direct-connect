import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Mic, MicOff, Check, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const marketPrices: Record<string, { price: number; unit: string; trend: string }> = {
  Grains: { price: 45, unit: "kg", trend: "+3%" },
  Vegetables: { price: 35, unit: "kg", trend: "+8%" },
  Fruits: { price: 60, unit: "kg", trend: "+2%" },
  Dairy: { price: 55, unit: "litre", trend: "-1%" },
  Pulses: { price: 90, unit: "kg", trend: "+5%" },
  Spices: { price: 350, unit: "kg", trend: "+12%" },
  "Oil Seeds": { price: 110, unit: "kg", trend: "+4%" },
  Flowers: { price: 80, unit: "kg", trend: "+6%" },
  Herbs: { price: 120, unit: "kg", trend: "+7%" },
  "Dry Fruits": { price: 600, unit: "kg", trend: "+1%" },
  Sugarcane: { price: 3, unit: "kg", trend: "0%" },
  Other: { price: 50, unit: "kg", trend: "0%" },
};

export default function EnterDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const category = searchParams.get("category") || "Other";
  const market = marketPrices[category] || marketPrices["Other"];

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    unit: market.unit,
    description: "",
    grade: "A",
  });
  const [isListening, setIsListening] = useState(false);

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const acceptMarketPrice = () => {
    update("price", String(market.price));
    toast({ title: "Market price accepted ✅", description: `₹${market.price}/${market.unit}` });
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({ title: "Voice input not supported", description: "Use a compatible browser like Chrome.", variant: "destructive" });
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      const num = text.replace(/[^\d]/g, "");
      if (num) {
        update("quantity", num);
        toast({ title: "Voice captured 🎙️", description: `Quantity set to ${num}` });
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    navigate("/review-post", { state: { ...form, category } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Market price banner */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Market Price • {category}</p>
                <p className="font-display text-3xl font-black text-primary">₹{market.price}<span className="text-base font-normal text-muted-foreground">/{market.unit}</span></p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" /> {market.trend}
                </Badge>
                <Button size="sm" className="rounded-full gap-1 text-xs" onClick={acceptMarketPrice}>
                  <Check className="h-3 w-3" /> Accept Price
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Enter Details — {category}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Produce Name *</Label>
                <Input
                  placeholder={`e.g. Premium ${category}`}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Quantity ({form.unit}) *</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 500"
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    className="flex-1 h-14 text-xl font-bold"
                  />
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    className="h-14 w-14 shrink-0 rounded-xl"
                    onClick={toggleVoice}
                  >
                    {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                </div>
                {isListening && (
                  <p className="text-xs text-primary animate-pulse">🎙️ Listening... speak the quantity</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Your Price (₹/{form.unit}) *</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder={`Market: ₹${market.price}`}
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="h-12 text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label>Grade</Label>
                <div className="flex gap-2">
                  {["A", "B", "C"].map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={form.grade === g ? "default" : "outline"}
                      className="flex-1 rounded-full font-bold"
                      onClick={() => update("grade", g)}
                    >
                      Grade {g}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  placeholder="Any special notes..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold">
                List Produce
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
