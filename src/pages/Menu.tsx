import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Phone, Plus, Minus, ShoppingCart, Clock } from "lucide-react";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { isLunchSpecialAvailable, getNextLunchSpecialTime } from "@/lib/timezone";

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
        : `Currently unavailable • ${getNextLunchSpecialTime()}`,
      orderable: true,
      isLunchSpecial: true,
      items: [
        { name: "Jerk Chicken, Rice & Peas", price: "$7.50", description: "Perfectly seasoned grilled chicken", badge: "Popular" },
        { name: "Doubles", price: "$4.00", description: "Curried chickpea flatbread" },
        { name: "Doubles: Make it Exclusive add Any Meat", price: "$11.50" },
      ],
    },
    {
      title: "ROTI WRAPS",
      orderable: true,
      items: [
        { name: "Curry Chicken", price: "$14.99" },
        { name: "Vegetarian ROTI", price: "$14.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Dinner",
      description: "Served with coleslaw/Rice and Peas or Jollof rice",
      orderable: true,
      items: [
        { name: "Oxtail Dinner", price: "$22.50", badge: "Chef's Choice" },
        { name: "Curry Goat Dinner", price: "$22.50" },
        { name: "Suya Dinner (grilled beef tenderloin)", price: "$22.50" },
        { name: "Jerk Chicken Dinner", price: "$18.50", badge: "Popular" },
        { name: "Curry Chicken Dinner", price: "$18.50" },
        { name: "Pounded Yam (Fufu)", price: "$18.50", description: "Served with any soup" },
        { name: "Fish Dinner", price: "$24.99" },
        { name: "Pasta Dinner", price: "$18.50", description: "With meat, fish or veggies" },
        { name: "Shrimp Dinner", price: "$18.50" },
        { name: "Yam Porridge Dinner", price: "$18.50" },
        { name: "ROTI Dinner", price: "$18.50", description: "Curry-Chicken, Jerk Chicken or Vegetable", badge: "Vegetarian Option" },
        { name: "Plantain Poutine with Any Meat", price: "$18.50" },
      ],
    },
    {
      title: "Salad",
      orderable: true,
      items: [
        { name: "Coleslaw (Small)", price: "$4.99" },
        { name: "Coleslaw (Large)", price: "$5.99" },
      ],
    },
    {
      title: "Soups of the Day (NO MEAT)",
      orderable: true,
      items: [
        { name: "Egusi Soup", price: "$7.99" },
        { name: "Chicken Curry", price: "$7.99" },
        { name: "Okro Soup", price: "$7.99" },
        { name: "Vegetable Soup (No Meat)", price: "$7.99", badge: "Vegetarian" },
        { name: "Goat Pepper Soup", price: "$24.99" },
      ],
    },
    {
      title: "Side Orders",
      orderable: true,
      items: [
        { name: "Plantain chips", price: "$4.50" },
        { name: "Small Pie", price: "$4.50" },
        { name: "Large Pie", price: "$6.00" },
        { name: "Rice", price: "$4.50" },
        { name: "Curry Chicken", price: "$9.99" },
        { name: "Jerk Chicken", price: "$7.50" },
        { name: "(Festival)Fried dumplings", price: "$4.50" },
        { name: "Fried Plantain", price: "$4.50", badge: "Popular" },
        { name: "Plantain fries", price: "$5.00" },
        { name: "Roti Skins", price: "$6.49" },
        { name: "Moi-moi (Steamed Black Eye Bean Pudding)", price: "$5.00" },
        { name: "Assorted Meat", price: "$24.99" },
        { name: "Plantain Poutine", price: "$14.99" },
        { name: "Fufu (1 wrap)", price: "$5.99" },
      ],
    },
    {
      title: "Sauces",
      orderable: true,
      items: [
        { name: "Hot sauce (2 oz)", price: "$2.00", badge: "Spicy" },
      ],
    },
    {
      title: "Vegetarian",
      orderable: true,
      items: [
        { name: "Peas & Fried Plantain", price: "$14.99", description: "Roti, Wrap, or full meal", badge: "Vegetarian" },
        { name: "Doubles with Rice & Grilled Vegetables", price: "$14.99", badge: "Vegetarian" },
        { name: "Yam Porridge", price: "$14.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Desserts",
      orderable: true,
      items: [
        { name: "Assorted", price: "$4.99" },
      ],
    },
    {
      title: "Beverages",
      orderable: true,
      items: [
        { name: "Pop", price: "$1.75" },
        { name: "Bottle water", price: "$1.50" },
        { name: "Bottle Soda drink", price: "$3.00" },
        { name: "Tea", price: "$1.95" },
        { name: "Coffee", price: "$1.95" },
        { name: "Sugar Cane Juice Freshly pressed", price: "$8.99", badge: "Fresh" },
        { name: "Smoothie (Small)", price: "$5.99" },
        { name: "Smoothie (Large)", price: "$9.99" },
      ],
    },
    {
      title: "Catering Platters & Party Trays",
      description: "Perfect for events, parties, and gatherings - Call (519) 824-5741 to order",
      orderable: false, // Catering requires phone call
      items: [
        { name: "Full Tray of Jerk Chicken", price: "$150.00", description: "Serves a crowd", badge: "Popular" },
        { name: "1 Pan of Jollof Rice", price: "$120.00", description: "Authentic West African rice" },
        { name: "1 Pan of Rice and Peas", price: "$150.00", description: "Traditional Caribbean side" },
        { name: "1/2 Pan Assorted Meat", price: "$150.00", description: "Mix of our best meats" },
        { name: "Stew", price: "$50.00", description: "2 liters" },
        { name: "Goat Pepper Soup", price: "$25.00", description: "30 Oz", badge: "Chef's Choice" },
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
            className="bg-brand-green/10 border-2 border-brand-green/20 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm"
          >
            <p className="font-bold text-brand-green text-lg flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order online for pickup! Add items to your cart below.
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
                            // Check if it's lunch special and not available
                            section.isLunchSpecial && !lunchAvailable ? (
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
