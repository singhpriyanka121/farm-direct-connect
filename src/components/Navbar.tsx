import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sprout, LogIn, User, LogOut, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Browse Produce", to: "/marketplace" },
  { label: "How It Works", to: "/about" },
  { label: "Farmer Sign Up", to: "/farmer-onboarding" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                  {displayName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(profile?.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard")}>
                  <User className="h-4 w-4 mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  <ShoppingCart className="h-4 w-4 mr-2" /> Cart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <Package className="h-4 w-4 mr-2" /> Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm" className="gap-1.5 rounded-full">
                <LogIn className="h-4 w-4" /> Login
              </Button>
            </Link>
          )}
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
          {user ? (
            <>
              <Link
                to="/profile"
                className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Link
                to={profile?.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard"}
                className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Button size="sm" variant="outline" className="w-full gap-1.5 rounded-full" onClick={() => { handleSignOut(); setOpen(false); }}>
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full gap-1.5 rounded-full">
                <LogIn className="h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
