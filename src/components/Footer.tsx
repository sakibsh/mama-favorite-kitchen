import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <img src={logo} alt="Mama Favourite Kitchen" className="h-20 w-20 object-contain" />
            <h3 className="text-xl font-display font-bold">Mama Favourite Kitchen</h3>
            <p className="text-sm opacity-90">Food that nurtures souls</p>
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
                <a href="tel:2263325741" className="hover:text-accent transition-smooth">
                  (226) 332-5741
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
                <span>12 PM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Tue - Wed</span>
                <span>10 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Thu - Sat</span>
                <span>10 AM - 2 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>1 PM - 10 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mama Favourite Kitchen. All rights reserved.</p>
          <p className="mt-2 opacity-80">Serving authentic African & Caribbean cuisine since 2000</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;