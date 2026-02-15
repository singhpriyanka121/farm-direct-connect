import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sprout, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Browse Produce", to: "/marketplace" },
  { label: "How It Works", to: "/about" },
  { label: "Farmer Sign Up", to: "/farmer-onboarding" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary">
          <Sprout className="h-7 w-7" />
          Farm2Market
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login">
            <Button size="sm" className="gap-1.5 rounded-full">
              <LogIn className="h-4 w-4" /> Login
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button size="sm" className="w-full gap-1.5 rounded-full">
              <LogIn className="h-4 w-4" /> Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
