import { motion } from "framer-motion";
import { TrendingUp, Search, ShieldCheck, Truck, Users, Leaf, HandshakeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  {
    icon: TrendingUp,
    title: "1. Farmers List Produce",
    desc: "Farmers onboard, get verified, and list their produce with details like quality grade, volume, and bulk pricing tiers.",
  },
  {
    icon: Search,
    title: "2. Buyers Discover & Filter",
    desc: "Marts, hotels, and retailers search by category, location, and price to find the best suppliers.",
  },
  {
    icon: HandshakeIcon,
    title: "3. Direct Negotiation",
    desc: "Buyers place bulk orders or request quotes directly — no middlemen, no hidden fees.",
  },
  {
    icon: Truck,
    title: "4. Farm-to-Door Delivery",
    desc: "Coordinated logistics ensure fresh produce reaches buyers on time, with tracking at every step.",
  },
];

const values = [
  { icon: Users, title: "Empowering Farmers", desc: "We put fair pricing and direct market access in every farmer's hands." },
  { icon: ShieldCheck, title: "Trust & Verification", desc: "Every farmer is verified. Quality grades and buyer ratings build transparency." },
  { icon: Leaf, title: "Sustainability First", desc: "Shorter supply chains mean less waste, fresher produce, and lower carbon footprint." },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-farm-green-light via-background to-farm-orange-light py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-black text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Bridging Farms & Businesses
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Farm2Market is a B2B marketplace that eliminates middlemen, connecting farmers directly to bulk buyers for fair prices, consistent quality, and reliable supply.
          </motion.p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-black text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-black text-center mb-12">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
