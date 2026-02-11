import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, Pause, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { produce, orders } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  Pending: "bg-farm-yellow text-accent-foreground",
  Confirmed: "bg-primary/20 text-primary",
  "In Transit": "bg-farm-orange text-secondary-foreground",
  Delivered: "bg-primary text-primary-foreground",
  Cancelled: "bg-destructive text-destructive-foreground",
};

const farmerProduce = produce.filter((p) => p.farmerId === "f1");
const farmerOrders = orders.filter((o) => o.farmerName === "Rajesh Patel");

export default function FarmerDashboard() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-black">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Rajesh Patel 🌾</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Active Listings", value: String(farmerProduce.length), icon: Package, color: "text-primary" },
            { label: "Total Orders", value: String(farmerOrders.length), icon: ShoppingCart, color: "text-farm-orange" },
            { label: "Total Earnings", value: `₹${farmerOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, color: "text-farm-yellow" },
          ].map((c) => (
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

        {/* Listings */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">My Listings</CardTitle>
            <Link to="/farmer-onboarding">
              <Button size="sm" className="rounded-full">+ Add Listing</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produce</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerProduce.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell className="font-display font-bold">₹{p.price}/{p.unit}</TableCell>
                    <TableCell>{p.availableQty.toLocaleString()} {p.unit}</TableCell>
                    <TableCell><Badge variant="secondary">Grade {p.grade}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Edit mode", description: `Editing ${p.name}` })}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Listing paused", description: `${p.name} is now hidden from buyers` })}>
                          <Pause className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => toast({ title: "Listing deleted", description: `${p.name} has been removed` })}>
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

        {/* Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Produce</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmerOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.id.toUpperCase()}</TableCell>
                    <TableCell>{o.buyerName}</TableCell>
                    <TableCell className="font-semibold">{o.produceName}</TableCell>
                    <TableCell>{o.quantity}</TableCell>
                    <TableCell className="font-display font-bold">₹{o.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[o.status]} text-xs`}>{o.status}</Badge>
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
