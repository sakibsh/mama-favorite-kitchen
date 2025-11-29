import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/CartButton";
import logo from "@/assets/logonotext.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 transition-smooth hover:scale-105">
            <img 
              src={logo} 
              alt="Mama Favourite Kitchen" 
              className="h-10 sm:h-14 w-auto object-contain drop-shadow-md" 
            />
            <div className="leading-none tracking-tight text-left">
              <span className="block font-script text-base sm:text-3xl text-foreground -mb-0.5 sm:-mb-2 relative z-10 transform -rotate-2 origin-bottom-left">Mama Favourite</span>
              <span className="block font-display font-bold text-lg sm:text-5xl text-shader tracking-normal uppercase">KITCHEN</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-smooth relative group ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <CartButton />
            <Button asChild variant="default" size="default" className="gap-2 bg-brand-orange hover:bg-brand-orange/90">
              <Link to="/menu">
                Order Pickup
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="gap-2">
              <a href="tel:5198245741">
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-smooth"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-smooth ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild variant="default" size="default" className="gap-2 w-full bg-brand-orange hover:bg-brand-orange/90">
                <Link to="/menu" onClick={() => setIsOpen(false)}>
                  Order Pickup
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="gap-2 w-full">
                <a href="tel:5198245741">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
