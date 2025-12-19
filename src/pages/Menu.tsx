import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Phone, Plus, Minus, ShoppingCart, Clock, AlertTriangle } from "lucide-react";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { isLunchSpecialAvailable, getNextLunchSpecialTime } from "@/lib/timezone";
import { usePickupSettings } from "@/hooks/usePickupSettings";

// Helper to generate unique ID from item name
const generateId = (name: string, category: string) => {
  return `${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
};

// Helper to parse price string to number
const parsePrice = (priceStr: string) => {
  return parseFloat(priceStr.replace("$", ""));
};

const Menu = () => {
  const { addItem, getItemQuantity, updateQuantity, setIsOpen } = useCart();
  const [lunchAvailable, setLunchAvailable] = useState(isLunchSpecialAvailable());
  const { pickupEnabled, isLoading: pickupLoading } = usePickupSettings();

  // Check lunch special availability periodically
  useEffect(() => {
    const checkAvailability = () => {
      setLunchAvailable(isLunchSpecialAvailable());
    };

    // Check every minute
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const menuSections = [
    {
      title: "Lunch Special",
      subtitle: lunchAvailable 
        ? "Available Mon-Fri until 2:30 PM" 
        : "Currently unavailable • Lunch Specials Monday to Friday (11 am - 2.30 pm)",
      orderable: true,
      isLunchSpecial: true,
      items: [
        { name: "Jerk Chicken, Rice & Peas", price: "$8.25", description: "Perfectly seasoned grilled chicken", badge: "Popular" },
        { name: "Doubles", price: "$4.40", description: "Curried chickpea flatbread" },
        { name: "Doubles: Make it Exclusive add Any Meat", price: "$12.65" },
      ],
    },
    {
      title: "ROTI WRAPS",
      orderable: true,
      items: [
        { name: "Curry Chicken", price: "$16.49" },
        { name: "Vegetarian ROTI", price: "$16.49", badge: "Vegetarian" },
      ],
    },
    {
      title: "Dinner",
      description: "Served with coleslaw/Rice and Peas or Jollof rice",
      orderable: true,
      items: [
        { name: "Oxtail Dinner", price: "$24.75", badge: "Chef's Choice" },
        { name: "Curry Goat Dinner", price: "$24.75" },
        { name: "Suya Dinner (grilled beef tenderloin)", price: "$24.75" },
        { name: "Jerk Chicken Dinner", price: "$20.35", badge: "Popular" },
        { name: "Curry Chicken Dinner", price: "$20.35" },
        { name: "Pounded Yam (Fufu)", price: "$20.35", description: "Served with any soup" },
        { name: "Fish Dinner", price: "$27.49" },
        { name: "Pasta Dinner", price: "$20.35", description: "With meat, fish or veggies" },
        { name: "Shrimp Dinner", price: "$20.35" },
        { name: "Yam Porridge Dinner", price: "$20.35" },
        { name: "ROTI Dinner", price: "$20.35", description: "Curry-Chicken, Jerk Chicken or Vegetable", badge: "Vegetarian Option" },
        { name: "Plantain Poutine with Any Meat", price: "$20.35" },
      ],
    },
    {
      title: "Salad",
      orderable: true,
      items: [
        { name: "Coleslaw (Small)", price: "$5.49" },
        { name: "Coleslaw (Large)", price: "$6.59" },
      ],
    },
    {
      title: "Soups of the Day (NO MEAT)",
      orderable: true,
      items: [
        { name: "Egusi Soup", price: "$8.79" },
        { name: "Chicken Curry", price: "$8.79" },
        { name: "Okro Soup", price: "$8.79" },
        { name: "Vegetable Soup (No Meat)", price: "$8.79", badge: "Vegetarian" },
        { name: "Goat Pepper Soup", price: "$27.49" },
      ],
    },
    {
      title: "Side Orders",
      orderable: true,
      items: [
        { name: "Plantain chips", price: "$4.95" },
        { name: "Small Pie", price: "$4.95" },
        { name: "Large Pie", price: "$6.60" },
        { name: "Rice", price: "$4.95" },
        { name: "Curry Chicken", price: "$10.99" },
        { name: "Jerk Chicken", price: "$8.25" },
        { name: "(Festival)Fried dumplings", price: "$4.95" },
        { name: "Fried Plantain", price: "$4.95", badge: "Popular" },
        { name: "Plantain fries", price: "$5.50" },
        { name: "Roti Skins", price: "$7.14" },
        { name: "Moi-moi (Steamed Black Eye Bean Pudding)", price: "$5.50" },
        { name: "Assorted Meat", price: "$27.49" },
        { name: "Plantain Poutine", price: "$16.49" },
        { name: "Fufu (1 wrap)", price: "$6.59" },
      ],
    },
    {
      title: "Sauces",
      orderable: true,
      items: [
        { name: "Hot sauce (2 oz)", price: "$2.20", badge: "Spicy" },
      ],
    },
    {
      title: "Vegetarian",
      orderable: true,
      items: [
        { name: "Peas & Fried Plantain", price: "$16.49", description: "Roti, Wrap, or full meal", badge: "Vegetarian" },
        { name: "Doubles with Rice & Grilled Vegetables", price: "$16.49", badge: "Vegetarian" },
        { name: "Yam Porridge", price: "$16.49", badge: "Vegetarian" },
      ],
    },
    {
      title: "Desserts",
      orderable: true,
      items: [
        { name: "Assorted", price: "$5.49" },
      ],
    },
    {
      title: "Beverages",
      orderable: true,
      items: [
        { name: "Pop", price: "$1.93" },
        { name: "Bottle water", price: "$1.65" },
        { name: "Bottle Soda drink", price: "$3.30" },
        { name: "Tea", price: "$2.15" },
        { name: "Coffee", price: "$2.15" },
        { name: "Sugar Cane Juice Freshly pressed", price: "$9.89", badge: "Fresh" },
        { name: "Smoothie (Small)", price: "$6.59" },
        { name: "Smoothie (Large)", price: "$10.99" },
      ],
    },
    {
      title: "Catering Platters & Party Trays",
      description: "Perfect for events, parties, and gatherings",
      orderable: false, // Catering requires phone call
      items: [
        { name: "Full Tray of Jerk Chicken", price: "Call for price", description: "Serves a crowd", badge: "Popular" },
        { name: "Jollof Rice Pans", price: "Call for price", description: "Authentic West African rice" },
        { name: "Rice and Peas Pans", price: "Call for price", description: "Traditional Caribbean side" },
        { name: "Assorted Meat Trays", price: "Call for price", description: "Mix of our best meats" },
        { name: "Stew (Various Sizes)", price: "Call for price", description: "Available in multiple portions" },
        { name: "Goat Pepper Soup", price: "Call for price", description: "Available in multiple portions", badge: "Chef's Choice" },
      ],
    },
  ];

  const handleAddToCart = (item: { name: string; price: string }, category: string) => {
    const id = generateId(item.name, category);
    addItem({
      id,
      name: item.name,
      price: parsePrice(item.price),
      category,
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 overflow-x-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Pickup Closed Banner */}
        {!pickupLoading && !pickupEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Online Ordering Temporarily Closed</h2>
            </div>
            <p className="text-muted-foreground">
              We're not accepting online pickup orders right now. Please call us at{" "}
              <a href="tel:5198245741" className="font-bold text-brand-orange hover:underline">(519) 824-5741</a>{" "}
              to place your order.
            </p>
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <ShaderText as="h1" text="Our Menu" className="text-5xl md:text-7xl mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our authentic African & Caribbean dishes, made fresh daily with traditional recipes
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`border-2 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm ${
              pickupEnabled 
                ? "bg-brand-green/10 border-brand-green/20" 
                : "bg-muted border-border"
            }`}
          >
            <p className={`font-bold text-lg flex items-center justify-center gap-2 ${
              pickupEnabled ? "text-brand-green" : "text-muted-foreground"
            }`}>
              {pickupEnabled ? (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Order online for pickup! Add items to your cart below.
                </>
              ) : (
                <>
                  <Phone className="h-5 w-5" />
                  Call (519) 824-5741 to place your order
                </>
              )}
            </p>
          </motion.div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {menuSections.map((section, index) => (
            <motion.div
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <InteractiveCard 
                id={section.title === "Catering Platters & Party Trays" ? "catering" : undefined}
                title={section.title}
                description={section.description}
                className="bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl"
              >
                {/* Lunch special availability notice */}
                {section.isLunchSpecial && (
                  <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                    lunchAvailable 
                      ? "bg-brand-green/10 text-brand-green" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{section.subtitle}</span>
                  </div>
                )}
                <div className="grid gap-4">
                  {section.items.map((item, itemIndex) => {
                    const itemId = generateId(item.name, section.title);
                    const quantity = getItemQuantity(itemId);
                    
                    return (
                    <div
                      key={itemIndex}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-transparent hover:border-brand-orange/20 hover:bg-muted/50 transition-all"
                    >
                        <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "Vegetarian" || item.badge === "Vegetarian Option"
                                  ? "secondary"
                                  : "default"
                              }
                                className={`text-xs ${
                                  item.badge === "Popular" ? "bg-brand-orange hover:bg-brand-orange/90" : 
                                  item.badge === "Chef's Choice" ? "bg-brand-gold hover:bg-brand-gold/90 text-black" :
                                  item.badge === "Vegetarian" || item.badge === "Vegetarian Option" ? "bg-brand-green hover:bg-brand-green/90" :
                                  item.badge === "Spicy" ? "bg-red-500 hover:bg-red-500/90" :
                                  item.badge === "Fresh" ? "bg-green-500 hover:bg-green-500/90" : ""
                                }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                            <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                        )}
                      </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-brand-orange text-xl whitespace-nowrap">
                        {item.price}
                      </span>
                          
                          {section.orderable ? (
                            // Check if pickup is disabled
                            !pickupEnabled ? (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <a href="tel:5198245741">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call
                                </a>
                              </Button>
                            ) : section.isLunchSpecial && !lunchAvailable ? (
                              <Button
                                size="sm"
                                disabled
                                className="bg-muted text-muted-foreground cursor-not-allowed"
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Unavailable
                              </Button>
                            ) : quantity > 0 ? (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(itemId, quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">{quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(itemId, quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleAddToCart(item, section.title)}
                                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </Button>
                            )
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <a href="tel:5198245741">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                        </div>
                    </div>
                    );
                  })}
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <InteractiveCard className="max-w-3xl mx-auto bg-muted/50">
            <div className="p-8">
              <ShaderText as="h2" text="Ready to Order?" className="text-3xl font-bold mb-4" />
              <p className="text-muted-foreground text-lg mb-8">
                Review your cart and proceed to checkout, or call us for catering services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full h-12 px-8"
                  onClick={() => setIsOpen(true)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart & Checkout
                </Button>
                <Button asChild variant="secondary" size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-12 px-8">
                  <a href="tel:5198245741">
                    <Phone className="h-4 w-4 mr-2" />
              Call (519) 824-5741
            </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8">
                  <Link to="/contact">
              Contact Us
                  </Link>
                </Button>
              </div>
          </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
};

export default Menu;
