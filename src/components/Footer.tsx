import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <Sprout className="h-6 w-6" />
              Farm2Market
            </Link>
            <p className="text-sm opacity-70">
              Connecting farmers directly to bulk buyers. Fair prices, fresh produce, zero middlemen.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/marketplace" className="hover:opacity-100 transition-opacity">Browse Produce</Link></li>
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">How It Works</Link></li>
              <li><Link to="/farmer-onboarding" className="hover:opacity-100 transition-opacity">Farmer Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-3">Dashboards</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/farmer-dashboard" className="hover:opacity-100 transition-opacity">Farmer Dashboard</Link></li>
              <li><Link to="/buyer-dashboard" className="hover:opacity-100 transition-opacity">Buyer Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>support@farm2market.in</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
          © 2026 Farm2Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
