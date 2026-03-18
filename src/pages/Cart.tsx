import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  produce_id: string;
  produce_name: string;
  farmer_name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string | null;
}

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const updateQuantity = async (id: string, newQty: number) => {
    if (newQty < 1) return;
    await supabase.from("cart_items").update({ quantity: newQty }).eq("id", id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
  };

  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Item removed from cart" });
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total,
        delivery_fee: deliveryFee,
        payment_method: "cod",
        status: "Pending",
      })
      .select()
      .single();

    if (orderErr || !order) {
      toast({ title: "Failed to place order", variant: "destructive" });
      return;
    }

    const orderItems = items.map((i) => ({
      order_id: order.id,
      produce_id: i.produce_id,
      produce_name: i.produce_name,
      farmer_name: i.farmer_name,
      price: i.price,
      quantity: i.quantity,
      unit: i.unit,
      image: i.image,
    }));

    await supabase.from("order_items").insert(orderItems);
    await supabase.from("cart_items").delete().in("id", items.map((i) => i.id));

    toast({ title: "Order placed successfully! 🎉" });
    navigate("/orders");
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Please log in to view your cart</p>
          <Link to="/login"><Button>Login</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="font-display text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8 text-primary" /> Your Cart
        </h1>

        {loading ? (
          <p className="text-muted-foreground">Loading cart...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/marketplace"><Button>Browse Produce</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="h-20 w-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.produce_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-3xl">🥬</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.produce_name}</h3>
                      <p className="text-sm text-muted-foreground">by {item.farmer_name}</p>
                      <p className="text-sm font-medium text-primary">₹{item.price}/{item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-semibold text-foreground w-20 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-primary font-medium" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">Free delivery on orders above ₹5,000</p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full rounded-full mt-4" size="lg" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
