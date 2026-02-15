import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Truck, Search, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { categories, stats, testimonials, produce } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const steps = [
  { icon: TrendingUp, title: "List Produce", desc: "Farmers list their crops with pricing and quality details" },
  { icon: Search, title: "Discover & Connect", desc: "Buyers browse and find verified farmers nearby" },
  { icon: ShieldCheck, title: "Order with Trust", desc: "Place bulk orders with transparent pricing tiers" },
  { icon: Truck, title: "Farm-to-Door Delivery", desc: "Coordinated logistics get produce delivered fresh" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-farm-green-light via-background to-farm-yellow-light py-20 md:py-28">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-farm-orange text-secondary-foreground font-semibold px-4 py-1 text-sm rounded-full">
              🌾 B2B Fresh Produce Marketplace
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-tight text-foreground">
              Farm Fresh,{" "}
              <span className="text-primary">Directly</span> to Your Business
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Skip the middlemen. Connect with verified farmers for bulk produce at fair prices. Quality assured, delivery coordinated.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/marketplace">
                <Button size="lg" className="rounded-full font-semibold text-base px-8 gap-2">
                  Browse Produce <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/farmer-onboarding">
                <Button size="lg" variant="outline" className="rounded-full font-semibold text-base px-8">
                  List Your Produce
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 grid grid-cols-2 gap-4 max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {produce.slice(0, 4).map((p, i) => (
              <Link key={p.id} to={`/produce/${p.id}`}>
                <Card className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${i === 0 ? "animate-float" : ""}`}>
                  <div className="h-24 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-display font-bold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">₹{p.price}/{p.unit}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-display font-black">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              From farm to your business in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-secondary mb-1">Step {i + 1}</div>
                  <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/marketplace?category=${cat.name}`}>
                  <Card className="text-center overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <div className="h-28 overflow-hidden">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                    <h3 className="font-display font-bold text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} listings</p>
                    <ChevronRight className="h-4 w-4 mx-auto mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-farm-yellow text-farm-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic flex-1">"{t.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-display font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-farm-green">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join hundreds of farmers and buyers already trading smarter on Farm2Market
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/farmer-onboarding">
              <Button size="lg" variant="secondary" className="rounded-full font-semibold text-base px-8">
                Register as Farmer
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Start Buying
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
