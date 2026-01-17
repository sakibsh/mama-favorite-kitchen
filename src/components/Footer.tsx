import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logonotext.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Mama Favourite Kitchen" 
                className="h-16 w-auto object-contain drop-shadow-lg brightness-110" 
              />
              <div className="leading-none tracking-tight text-left">
                <span className="block font-script text-2xl text-secondary-foreground -mb-1 relative z-10 transform -rotate-2 origin-bottom-left">Mama Favourite</span>
                <span className="block font-display font-bold text-4xl text-shader tracking-normal uppercase">KITCHEN</span>
              </div>
            </div>
            <p className="text-sm opacity-90 italic">Food that nurtures souls</p>
            <Button asChild size="sm" variant="outline" className="mt-2 bg-white text-secondary hover:bg-white/90">
              <Link to="/menu">
                Order Pickup
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-accent transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm hover:text-accent transition-smooth">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-accent transition-smooth">
                  Blog & Press
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-accent transition-smooth">
                  Contact & Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>45 Cork St E, Guelph, ON N1H 2W7</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:5198245741" className="hover:text-accent transition-smooth">
                  (519) 824-5741
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:egcguelph@gmail.com" className="hover:text-accent transition-smooth">
                  egcguelph@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Monday</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Tue - Thu</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>1 PM - 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left text-sm">
            <p>&copy; {new Date().getFullYear()} Mama Favourite Kitchen. All rights reserved.</p>
            <p className="mt-1 opacity-80">Serving authentic African & Caribbean cuisine since 2000</p>
          </div>

          <a 
            href="https://vortio.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 px-5 py-3 rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:border-brand-gold/50 hover:shadow-[0_0_40px_-10px_hsl(var(--brand-gold)/0.3)]"
          >
            {/* Icon Container */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-xl group-hover:bg-brand-gold/40 transition-all duration-500" />
              
              {/* Spinning Rings (Vortex Effect) */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-gold border-r-brand-orange animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-white/80 border-l-white/50 animate-[spin_2s_linear_infinite_reverse]" />
              
              {/* The V */}
              <span className="relative z-10 font-black text-lg text-white italic tracking-tighter">V</span>
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-start leading-none">
              <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest mb-1 group-hover:text-brand-gold transition-colors">Designed by</span>
              <span className="text-lg font-black tracking-widest text-white group-hover:tracking-[0.2em] transition-all duration-500">
                VORTIO
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;