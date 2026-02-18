import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Landmark, Banknote, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { produce } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: Landmark, description: "All major banks supported" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
];

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const item = produce.find((p) => p.id === id);

  const [qty, setQty] = useState(item?.minOrder ?? 1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [confirmed, setConfirmed] = useState(false);

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  // find best tier price
  const applicableTier = [...item.pricingTiers].reverse().find((t) => qty >= t.minQty);
  const unitPrice = applicableTier?.price ?? item.price;
  const subtotal = unitPrice * qty;
  const deliveryFee = subtotal > 5000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  const handleConfirm = () => {
    setConfirmed(true);
    toast({
      title: "Order placed successfully! 🎉",
      description: `₹${total.toLocaleString()} payment via ${paymentMethods.find((m) => m.id === paymentMethod)?.label}`,
    });
  };

  if (confirmed) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full p-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
            <h1 className="font-display text-2xl font-black">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Your order for <span className="font-semibold text-foreground">{qty} {item.unit}</span> of{" "}
              <span className="font-semibold text-foreground">{item.name}</span> has been placed.
            </p>
            <p className="text-sm text-muted-foreground">
              Payment: {paymentMethods.find((m) => m.id === paymentMethod)?.label} &bull; Total: ₹{total.toLocaleString()}
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button className="rounded-full" onClick={() => navigate("/marketplace")}>Continue Shopping</Button>
              <Button variant="outline" className="rounded-full" onClick={() => navigate("/buyer-dashboard")}>My Orders</Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to={`/produce/${id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Product
        </Link>

        <h1 className="font-display text-3xl font-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quantity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Order Quantity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">by {item.farmerName}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="qty">Quantity ({item.unit})</Label>
                  <Input
                    id="qty"
                    type="number"
                    min={item.minOrder}
                    max={item.availableQty}
                    value={qty}
                    onChange={(e) => setQty(Math.max(item.minOrder, Number(e.target.value)))}
                    className="mt-1 max-w-[180px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Min: {item.minOrder} {item.unit} &bull; Available: {item.availableQty.toLocaleString()} {item.unit}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      htmlFor={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-display font-bold text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>

                {/* Conditional fields */}
                {paymentMethod === "upi" && (
                  <div className="mt-4">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@upi" className="mt-1" />
                  </div>
                )}
                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "netbanking" && (
                  <div className="mt-4">
                    <Label htmlFor="bank">Bank Name</Label>
                    <Input id="bank" placeholder="e.g. State Bank of India" className="mt-1" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address, building, area" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="Pincode" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-2 border-primary/20 sticky top-24 space-y-4">
              <h3 className="font-display font-bold text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{item.name} × {qty} {item.unit}</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unit price</span>
                  <span>₹{unitPrice}/{item.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-xs text-primary">🎉 Free delivery on orders above ₹5,000</p>
                )}
              </div>
              <div className="border-t pt-3 flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString()}</span>
              </div>
              <Button className="w-full rounded-full font-semibold text-base" size="lg" onClick={handleConfirm}>
                Pay ₹{total.toLocaleString()}
              </Button>
              <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure & encrypted payment</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
