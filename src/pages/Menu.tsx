import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuSections = [
    {
      title: "Lunch Special (Ends at 2:30PM Monday to Fridays Only)",
      items: [
        { name: "Jerk Chicken, Rice & Peas", price: "$7.50", description: "Perfectly seasoned grilled chicken", badge: "Popular" },
        { name: "Doubles", price: "$4.00", description: "Curried chickpea flatbread" },
        { name: "Doubles: Make it Exclusive add Any Meat", price: "$11.50" },
      ],
    },
    {
      title: "ROTI WRAPS",
      items: [
        { name: "Curry Chicken", price: "$14.99" },
        { name: "Vegetarian ROTI", price: "$14.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Dinner",
      description: "Served with coleslaw/Rice and Peas or Jollof rice",
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
      items: [
        { name: "Coleslaw (Small)", price: "$4.99" },
        { name: "Coleslaw (Large)", price: "$5.99" },
      ],
    },
    {
      title: "Soups of the Day (NO MEAT)",
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
      items: [
        { name: "Hot sauce (2 oz)", price: "$2.00", badge: "Spicy" },
      ],
    },
    {
      title: "Vegetarian",
      items: [
        { name: "Peas & Fried Plantain", price: "$14.99", description: "Roti, Wrap, or full meal", badge: "Vegetarian" },
        { name: "Doubles with Rice & Grilled Vegetables", price: "$14.99", badge: "Vegetarian" },
        { name: "Yam Porridge", price: "$14.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Desserts",
      items: [
        { name: "Assorted", price: "$4.99" },
      ],
    },
    {
      title: "Beverages",
      items: [
        { name: "Pop", price: "$1.75" },
        { name: "Bottle water", price: "$1.50" },
        { name: "Bottle Soda drink", price: "$3.00" },
        { name: "Tea", price: "$1.95" },
        { name: "coffee", price: "$1.95" },
        { name: "Sugar Cane Juice Freshly pressed", price: "$8.99", badge: "Fresh" },
        { name: "Smoothie (Small)", price: "$5.99" },
        { name: "Smoothie (Large)", price: "$9.99" },
      ],
    },
    {
      title: "Catering Platters & Party Trays",
      description: "Perfect for events, parties, and gatherings - Call (519) 824-5741 to order",
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
            className="bg-brand-orange/10 border-2 border-brand-orange/20 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm"
          >
            <p className="font-bold text-brand-orange text-lg">
              🎉 Catering Available for All Occasions! Call (519) 824-5741 for custom quotes
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
                <div className="grid gap-6">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-dashed border-border last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
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
                                item.badge === "Vegetarian" ? "bg-brand-green hover:bg-brand-green/90" : ""
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </div>
                      <span className="font-bold text-primary text-xl whitespace-nowrap font-display">
                        {item.price}
                      </span>
                    </div>
                  ))}
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
                Order online for delivery or pickup, or call us for take-out and catering services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full h-12 px-8">
                  <a
                    href="https://www.ubereats.com/ca/store/mama-favourite-kitchen/ZW1oBiR1Ux60yLVvZ7Vl1Q"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order on Uber Eats
                  </a>
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
