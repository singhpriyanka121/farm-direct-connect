import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, Pause, Pencil, Trash2, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { produce, orders } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const statusColors: Record<string, string> = {
  Pending: "bg-farm-yellow text-accent-foreground",
  Confirmed: "bg-primary/20 text-primary",
  "In Transit": "bg-farm-orange text-secondary-foreground",
  Delivered: "bg-primary text-primary-foreground",
  Cancelled: "bg-destructive text-destructive-foreground",
};

const marketTicker = [
  { name: "Wheat", price: 28, change: +2.1 },
  { name: "Rice", price: 42, change: -0.8 },
  { name: "Tomato", price: 35, change: +12.5 },
  { name: "Onion", price: 22, change: -3.2 },
  { name: "Potato", price: 18, change: +1.5 },
  { name: "Cotton", price: 65, change: +4.3 },
  { name: "Soybean", price: 48, change: -1.1 },
  { name: "Chilli", price: 180, change: +8.7 },
];

const farmerProduce = produce.filter((p) => p.farmerId === "f1");
const farmerOrders = orders.filter((o) => o.farmerName === "Rajesh Patel");

export default function FarmerDashboard() {
  const { toast } = useToast();
  const { profile } = useAuth();
  const displayName = profile?.full_name || "Farmer";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Market Price Ticker */}
        <div className="mb-6 overflow-hidden rounded-xl bg-card border border-border">
          <div className="flex items-center gap-1 px-3 py-2 bg-primary/5 border-b border-border">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary">Live Market Prices (₹/kg)</span>
          </div>
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {marketTicker.map((item) => (
              <div key={item.name} className="flex items-center gap-2 px-4 py-3 border-r border-border last:border-r-0 shrink-0">
                <span className="text-sm font-semibold whitespace-nowrap">{item.name}</span>
                <span className="font-display font-black text-sm">₹{item.price}</span>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${item.change > 0 ? "text-primary" : "text-destructive"}`}>
                  {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.change > 0 ? "+" : ""}{item.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-black">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {displayName} 🌾</p>
          </div>
          <Link to="/add-produce">
            <Button className="rounded-full gap-1.5">
              <Plus className="h-4 w-4" /> Add Produce
            </Button>
          </Link>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Listings", value: String(farmerProduce.length), icon: Package, color: "text-primary" },
            { label: "Orders", value: String(farmerOrders.length), icon: ShoppingCart, color: "text-farm-orange" },
            { label: "Earnings", value: `₹${(farmerOrders.reduce((s, o) => s + o.total, 0) / 1000).toFixed(0)}k`, icon: DollarSign, color: "text-farm-yellow" },
          ].map((c) => (
            <Card key={c.label} className="p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <c.icon className={`h-6 w-6 ${c.color}`} />
                <p className="font-display font-black text-xl">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Incoming Orders */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">Incoming Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {farmerOrders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{o.produceName}</p>
                    <p className="text-xs text-muted-foreground">{o.buyerName} · {o.quantity} units</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm">₹{o.total.toLocaleString()}</span>
                    <Badge className={`${statusColors[o.status]} text-xs`}>{o.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Listings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produce</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerProduce.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold text-sm">{p.name}</TableCell>
                    <TableCell className="font-display font-bold text-sm">₹{p.price}/{p.unit}</TableCell>
                    <TableCell className="text-sm">{p.availableQty.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-0.5">
                        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Edit mode", description: `Editing ${p.name}` })}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Paused", description: `${p.name} hidden` })}>
                          <Pause className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => toast({ title: "Deleted", description: `${p.name} removed` })}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
