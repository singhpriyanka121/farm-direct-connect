import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Star, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { produce, categories, farmers } from "@/data/mockData";

const gradeColors: Record<string, string> = {
  A: "bg-primary text-primary-foreground",
  B: "bg-farm-orange text-secondary-foreground",
  C: "bg-muted text-muted-foreground",
};

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let items = [...produce];
    if (category !== "All") items = items.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.farmerName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    return items;
  }, [search, category, sort]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground">Browse Fresh Produce</h1>
          <p className="text-muted-foreground mt-1">Discover quality produce from verified farmers across India</p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search produce, farmers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-44 rounded-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.icon} {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-40 rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={category === "All" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setCategory("All")}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.name}
              variant={category === c.name ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setCategory(c.name)}
            >
              {c.icon} {c.name}
            </Button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-display font-bold">No produce found</p>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => {
              const farmer = farmers.find((f) => f.id === p.farmerId);
              return (
                <Link key={p.id} to={`/produce/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group h-full">
                    <div className="h-40 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-bold text-base leading-tight group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                        <Badge className={`${gradeColors[p.grade]} text-xs shrink-0`}>
                          Grade {p.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {p.farmerName} • {p.farmerLocation}
                        {farmer?.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary ml-1" />}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="font-display font-black text-xl text-primary">₹{p.price}</span>
                          <span className="text-sm text-muted-foreground">/{p.unit}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{p.availableQty.toLocaleString()} {p.unit} avail.</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
