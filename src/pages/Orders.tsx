import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  produce_name: string;
  farmer_name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string | null;
}

interface Order {
  id: string;
  total: number;
  delivery_fee: number;
  payment_method: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  Pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  Confirmed: { icon: Package, color: "bg-blue-100 text-blue-800 border-blue-200" },
  "In Transit": { icon: Truck, color: "bg-purple-100 text-purple-800 border-purple-200" },
  Delivered: { icon: CheckCircle2, color: "bg-green-100 text-green-800 border-green-200" },
  Cancelled: { icon: XCircle, color: "bg-red-100 text-red-800 border-red-200" },
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersData) { setLoading(false); return; }

      const ordersWithItems: Order[] = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);
          return { ...order, items: items || [] };
        })
      );
      setOrders(ordersWithItems);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
          <Package className="h-16 w-16 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Please log in to view your orders</p>
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
        <h1 className="font-display text-3xl font-bold mb-6 flex items-center gap-2">
          <Package className="h-8 w-8 text-primary" /> My Orders
        </h1>

        {loading ? (
          <p className="text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground">No orders yet</p>
            <Link to="/marketplace"><Button>Start Shopping</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.Pending;
              const StatusIcon = cfg.icon;
              return (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-mono">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge variant="outline" className={`gap-1.5 ${cfg.color}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.produce_name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-xl">🥬</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.produce_name}</p>
                            <p className="text-xs text-muted-foreground">by {item.farmer_name}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.quantity} {item.unit}</p>
                          <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Payment: {order.payment_method.toUpperCase()}
                        {order.delivery_fee === 0 ? " • Free delivery" : ` • Delivery: ₹${order.delivery_fee}`}
                      </p>
                      <p className="font-bold text-primary text-lg">₹{Number(order.total).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
