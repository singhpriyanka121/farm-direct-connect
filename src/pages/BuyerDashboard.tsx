import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Clock, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { orders } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  Pending: "bg-farm-yellow text-accent-foreground",
  Confirmed: "bg-primary/20 text-primary",
  "In Transit": "bg-farm-orange text-secondary-foreground",
  Delivered: "bg-primary text-primary-foreground",
  Cancelled: "bg-destructive text-destructive-foreground",
};

const overviewCards = [
  { label: "Active Orders", value: "3", icon: ShoppingCart, color: "text-primary" },
  { label: "Favorite Farmers", value: "5", icon: Heart, color: "text-farm-orange" },
  { label: "Recent Purchases", value: "12", icon: Clock, color: "text-farm-yellow" },
];

export default function BuyerDashboard() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Metro Mart 👋</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {overviewCards.map((c) => (
            <Card key={c.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${c.color}`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="font-display font-black text-2xl">{c.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Orders table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Produce</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.id.toUpperCase()}</TableCell>
                    <TableCell className="font-semibold">{o.produceName}</TableCell>
                    <TableCell>{o.farmerName}</TableCell>
                    <TableCell>{o.quantity}</TableCell>
                    <TableCell className="font-display font-bold">₹{o.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[o.status]} text-xs`}>{o.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Reorder placed!", description: `Reordering ${o.produceName}` })}>
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                        <Link to={`/produce/${o.produceId}`}>
                          <Button size="sm" variant="ghost"><Eye className="h-3.5 w-3.5" /></Button>
                        </Link>
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
