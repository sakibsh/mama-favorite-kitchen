import { Badge } from "@/components/ui/badge";
import { Phone, Plus, Minus, ShoppingCart, AlertTriangle, Ban, UtensilsCrossed } from "lucide-react";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { usePickupSettings } from "@/hooks/usePickupSettings";
import { useOperatingHours } from "@/hooks/useOperatingHours";
import { useMenuAvailability } from "@/hooks/useMenuAvailability";

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
  const { pickupEnabled, isLoading: pickupLoading } = usePickupSettings();
  const { isOpen: restaurantOpen, nextOpenTime, isLoading: hoursLoading } = useOperatingHours();
  const { isItemAvailable } = useMenuAvailability();

  // Combined check: ordering is available only if pickup is enabled AND restaurant is open
  const orderingAvailable = pickupEnabled && restaurantOpen;
  const isLoadingStatus = pickupLoading || hoursLoading;

  const menuSections = [
    {
      title: "Signature Stew Bowls",
      description: "Served with your choice of Jollof Rice, White Rice, Quinoa, Mixed Greens, or Fresh Baked Roti.",
      subtitle: "Every bowl includes a can of drink + 2oz quinoa salad.",
      orderable: true,
      items: [
        { name: "Garden Vegetable Stew Bowl (Vegan)", price: "$21.99", description: "Includes can of drink & 2oz quinoa salad.", badge: "Vegetarian" },
        { name: "Chicken Stew Bowl", price: "$22.99", description: "Includes can of drink & 2oz quinoa salad.", badge: "Popular" },
        { name: "Beef Stew Bowl", price: "$23.99", description: "Includes can of drink & 2oz quinoa salad." },
        { name: "Goat Stew Bowl", price: "$26.99", description: "Includes can of drink & 2oz quinoa salad." },
        { name: "Lamb Stew Bowl", price: "$27.99", description: "Includes can of drink & 2oz quinoa salad." },
        { name: "Shrimp Stew Bowl", price: "$26.99", description: "Includes can of drink & 2oz quinoa salad." },
        { name: "Salmon Stew Bowl", price: "$28.99", description: "Includes can of drink & 2oz quinoa salad." },
      ],
    },
    {
      title: "Add to Your Bowl",
      description: "Boost any Signature Stew Bowl with your favourite extras.",
      orderable: true,
      items: [
        { name: "Extra Protein", price: "$6.99" },
        { name: "Extra Stew", price: "$3.99" },
        { name: "Fried Plantain (Bowl Add-On)", price: "$4.99" },
        { name: "Extra Hot Pepper Sauce", price: "$1.99", badge: "Spicy" },
      ],
    },
    {
      title: "Traditional African Meals",
      description: "Served with your choice of swallow (Cassava Fufu, Pounded Yam, Plantain Fufu, or Oat Fufu) and one protein (Goat, Chicken, Beef, Fish, or Assorted Meat).",
      orderable: true,
      items: [
        { name: "Egusi Soup", price: "$26.99" },
        { name: "Okra Soup", price: "$25.99" },
        { name: "Bitter Leaf Soup", price: "$26.99" },
        { name: "Groundnut Soup", price: "$25.99" },
        { name: "Light Soup", price: "$24.99" },
        { name: "Goat Pepper Soup (12 oz)", price: "$15.99", badge: "Chef's Choice" },
      ],
    },
    {
      title: "Grab & Go Wraps",
      description: "All wraps are made with fresh roti.",
      orderable: true,
      items: [
        { name: "Stew Garden Vegetable Wrap", price: "$13.99", badge: "Vegetarian" },
        { name: "Stew Chicken Wrap", price: "$16.99" },
        { name: "Stew Shrimp Wrap", price: "$18.99" },
        { name: "Stew Salmon Wrap", price: "$19.99" },
      ],
    },
    {
      title: "Fresh Doubles",
      orderable: true,
      items: [
        { name: "Classic Channa Doubles", price: "$7.49" },
        { name: "Shrimp Doubles", price: "$10.99" },
        { name: "Doubles Combo", price: "$13.99", description: "2 Doubles & Drink" },
      ],
    },
    {
      title: "Fresh & Healthy",
      orderable: true,
      items: [
        { name: "Quinoa Power Bowl", price: "$16.99" },
        { name: "Mixed Green Salad", price: "$10.99", badge: "Vegetarian" },
        { name: "Fruit Cup", price: "$6.99" },
      ],
    },
    {
      title: "Add Protein",
      description: "Add to any Fresh & Healthy item.",
      orderable: true,
      items: [
        { name: "Add Chicken", price: "$5.99" },
        { name: "Add Shrimp", price: "$7.99" },
        { name: "Add Salmon", price: "$8.99" },
      ],
    },
    {
      title: "House-Made Sauces",
      orderable: true,
      items: [
        { name: "Hot Pepper Sauce", price: "$1.99", badge: "Spicy" },
        { name: "Green Herb Sauce", price: "$1.99" },
        { name: "Garlic Sauce", price: "$1.99" },
        { name: "Tamarind Sauce", price: "$1.99" },
      ],
    },
    {
      title: "Sides & Add-Ons",
      orderable: true,
      items: [
        { name: "Fried Plantain", price: "$4.99" },
        { name: "Extra Roti", price: "$2.50" },
        { name: "Extra Stew (8 oz)", price: "$3.99" },
        { name: "Extra Hot Pepper Sauce (Side)", price: "$1.99", badge: "Spicy" },
      ],
    },
    {
      title: "House-Made Drinks",
      orderable: true,
      items: [
        { name: "Ginger Drink", price: "$5.99", badge: "Fresh" },
        { name: "Fresh Lemonade", price: "$4.99", badge: "Fresh" },
        { name: "Pop", price: "$1.99" },
        { name: "Bottled Water", price: "$1.75" },
        { name: "Bottle Drinks", price: "$3.99" },
      ],
    },
    {
      title: "Catering Platters & Party Trays",
      description: "Perfect for events, parties, and gatherings",
      orderable: false, // Catering requires phone call
      items: [
        { name: "LG Tray of Jerk Chicken", price: "$160.00", description: "Feeds 20 people", badge: "Popular" },
        { name: "LG Tray of Rice (Any Kind)", price: "$140.00", description: "Feeds 20 people" },
        { name: "Half Tray of Curry Chicken", price: "$149.99", description: "Feeds 10 people" },
        { name: "Half Tray of Curry Goat", price: "$185.00", description: "Feeds 10 people" },
        { name: "Curry Goat (Full)", price: "$249.99", description: "Serves 10 people" },
        { name: "Oxtail (Full)", price: "$249.99", description: "Feeds 10 people" },
        { name: "Full Tray of Jerk Chicken", price: "Call for price", description: "Serves a crowd" },
        { name: "Jollof Rice Pans", price: "Call for price", description: "Authentic West African rice" },
        { name: "Rice and Peas Pans", price: "Call for price", description: "Traditional Caribbean side" },
        { name: "Assorted Meat Trays", price: "Call for price", description: "Mix of our best meats" },
        { name: "Stew (Various Sizes)", price: "Call for price", description: "Available in multiple portions" },
        { name: "Goat Pepper Soup (Catering)", price: "Call for price", description: "Available in multiple portions", badge: "Chef's Choice" },
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
        {/* Closed Banner */}
        {!isLoadingStatus && !orderingAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                {!pickupEnabled ? "Online Ordering Temporarily Closed" : `We're Currently Closed`}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {!pickupEnabled ? (
                <>We're not accepting online pickup orders right now. Please call us at{" "}
                <a href="tel:5198245741" className="font-bold text-brand-orange hover:underline">(519) 824-5741</a>{" "}
                to place your order.</>
              ) : (
                <>We'll be back {nextOpenTime}. You can still browse the menu or call us at{" "}
                <a href="tel:5198245741" className="font-bold text-brand-orange hover:underline">(519) 824-5741</a>.</>
              )}
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
              orderingAvailable 
                ? "bg-brand-green/10 border-brand-green/20" 
                : "bg-muted border-border"
            }`}
          >
            <p className={`font-bold text-lg flex items-center justify-center gap-2 ${
              orderingAvailable ? "text-brand-green" : "text-muted-foreground"
            }`}>
              {orderingAvailable ? (
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

          {/* Dine-in notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-brand-green"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span>Dine-in now available — come eat with us!</span>
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
                {/* Section subtitle (e.g., Signature Stew Bowls inclusion note) */}
                {"subtitle" in section && (section as { subtitle?: string }).subtitle && (
                  <div className="mb-4 p-3 rounded-lg flex items-center gap-2 bg-brand-green/10 text-brand-green">
                    <UtensilsCrossed className="h-4 w-4" />
                    <span className="text-sm font-bold">{(section as { subtitle?: string }).subtitle}</span>
                  </div>
                )}
                <div className="grid gap-4">
                  {section.items.map((item, itemIndex) => {
                    const itemId = generateId(item.name, section.title);
                    const quantity = getItemQuantity(itemId);
                    const available = isItemAvailable(item.name);
                    
                    return (
                    <div
                      key={itemIndex}
                        className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-transparent transition-all ${
                          available 
                            ? "hover:border-brand-orange/20 hover:bg-muted/50" 
                            : "opacity-50"
                        }`}
                    >
                        <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-bold text-lg ${available ? "text-foreground" : "text-muted-foreground line-through"}`}>{item.name}</h3>
                          {!available && (
                            <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                              Unavailable
                            </Badge>
                          )}
                          {available && item.badge && (
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
                          <span className={`font-bold text-xl whitespace-nowrap ${available ? "text-brand-orange" : "text-muted-foreground"}`}>
                        {item.price}
                      </span>
                          
                          {!available ? (
                            <Button
                              size="sm"
                              disabled
                              className="bg-muted text-muted-foreground cursor-not-allowed"
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Sold Out
                            </Button>
                          ) : section.orderable ? (
                            // Check if ordering is unavailable
                            !orderingAvailable ? (
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
