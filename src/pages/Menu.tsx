import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

const Menu = () => {
  const menuSections = [
    {
      title: "Lunch Special (Ends at 2:30PM)",
      items: [
        { name: "Jerk Chicken, Rice & Peas", price: "$7.50", description: "Perfectly seasoned grilled chicken", badge: "Popular" },
        { name: "Doubles", price: "$4.00", description: "Curried chickpea flatbread" },
        { name: "Doubles: Make it Exclusive", price: "$7.50", description: "Add any meat" },
      ],
    },
    {
      title: "Sandwiches & Roti Wraps",
      items: [
        { name: "Curry Goat", price: "$17.99" },
        { name: "Curry Chicken", price: "$14.99" },
        { name: "Suya Wrap", price: "$14.99" },
        { name: "Jerk Chicken", price: "$14.99" },
        { name: "Jerk Chicken with Rice & Peas/Jollof Rice", price: "$14.99" },
        { name: "Curry Goat with Rice & Peas/Jollof Rice", price: "$14.99" },
        { name: "Oxtail with Rice & Peas/Jollof Rice", price: "$14.99" },
        { name: "Fried Chicken with Plantain Fries", price: "$14.99" },
        { name: "Curry Chicken with Rice & Peas", price: "$14.99" },
        { name: "Plantain Poutine", price: "$14.99" },
      ],
    },
    {
      title: "Dinner",
      description: "Served with coleslaw/Rice and Peas or Jollof rice",
      items: [
        { name: "Oxtail Dinner", price: "$18.50", badge: "Chef's Choice" },
        { name: "Curry Goat Dinner", price: "$18.50" },
        { name: "Jerk Chicken Dinner", price: "$18.50", badge: "Popular" },
        { name: "Curry Chicken Dinner", price: "$18.50" },
        { name: "Pounded Yam (Fufu)", price: "$18.50", description: "Served with any soup" },
        { name: "Fish Dinner", price: "$18.50", description: "Rice & Peas/Jollof Rice" },
        { name: "Pasta Dinner", price: "$18.50", description: "With meat, fish or veggies" },
        { name: "Shrimp Dinner", price: "$18.50", description: "Rice & Peas/Jollof Rice" },
        { name: "Suya Dinner", price: "$18.50", description: "Grilled beef with Rice & Peas or Jollof Rice" },
        { name: "Yam Porridge Dinner", price: "$18.50" },
        { name: "ROTI Dinner", price: "$18.50", description: "Curry Goat, Curry Chicken, Jerk Chicken or Vegetable", badge: "Vegetarian Option" },
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
      title: "Soups of the Day",
      items: [
        { name: "Chicken Soup", price: "$7.99" },
        { name: "Egusi Soup", price: "$7.99" },
        { name: "Chicken Curry", price: "$7.99" },
        { name: "Okro Soup", price: "$7.99" },
        { name: "Vegetable Soup", price: "$7.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Nigerian Pepper Soup Delight",
      description: "By order only",
      items: [
        { name: "Red Snapper", price: "$25.00" },
      ],
    },
    {
      title: "Side Orders",
      items: [
        { name: "Rice", price: "$4.50" },
        { name: "Curry Chicken", price: "$9.99" },
        { name: "Chicken", price: "$9.50" },
        { name: "Festival (Fried Dumplings)", price: "$4.50" },
        { name: "Fried Plantain", price: "$4.50", badge: "Popular" },
        { name: "Plantain Fries", price: "$4.50" },
        { name: "Roti Skins", price: "$6.49" },
        { name: "Moi-moi", price: "$4.50", description: "Steamed black eye bean pudding" },
        { name: "Assorted Meat", price: "$25.00" },
      ],
    },
    {
      title: "Sauces & Gravy",
      items: [
        { name: "Hot Sauce (2 oz)", price: "$2.00", badge: "Spicy" },
        { name: "Jerk Sauce (2 oz)", price: "$2.00", badge: "Spicy" },
        { name: "Curry Gravy (4 oz)", price: "$3.00" },
        { name: "Brown Gravy (4 oz)", price: "$3.00" },
        { name: "Pepper Sauce (2 oz)", price: "$2.50", badge: "Spicy" },
      ],
    },
    {
      title: "Vegetarian",
      items: [
        { name: "Beans & Fried Plantain", price: "$11.99", description: "Roti, wrap, or full meal", badge: "Vegetarian" },
        { name: "Doubles with Uncle Ben Rice, Steam Spinach, Kale, or String Beans", price: "$11.99", badge: "Vegetarian" },
        { name: "Yam Porridge", price: "$11.99", badge: "Vegetarian" },
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
        { name: "Pop", price: "$1.50" },
        { name: "Bottled Water", price: "$1.25" },
        { name: "Bottle Soda Drink", price: "$3.00" },
        { name: "Tea", price: "$1.95" },
        { name: "Coffee", price: "$1.95" },
        { name: "Sugar Cane Juice", price: "$9.99", description: "Freshly pressed", badge: "Fresh" },
        { name: "Smoothie (Small)", price: "$5.99" },
        { name: "Smoothie (Large)", price: "$9.99" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Explore our authentic African & Caribbean dishes, made fresh daily with traditional recipes
          </p>
          <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary">
              🎉 Catering Available for All Occasions! Call (519) 824-5741 for custom quotes
            </p>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {menuSections.map((section, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-2xl font-display text-primary">
                  {section.title}
                </CardTitle>
                {section.description && (
                  <p className="text-sm text-muted-foreground mt-2">{section.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          {item.badge && (
                            <Badge
                              variant={
                                item.badge === "Vegetarian" || item.badge === "Vegetarian Option"
                                  ? "secondary"
                                  : "default"
                              }
                              className="text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </div>
                      <span className="font-bold text-primary text-lg whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-secondary mb-4">
            Ready to Order?
          </h2>
          <p className="text-muted-foreground mb-6">
            Order online for delivery or pickup, or call us for take-out and catering services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.ubereats.com/ca/store/mama-favourite-kitchen/ZW1oBiR1Ux60yLVvZ7Vl1Q"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              Order on Uber Eats
            </a>
            <a
              href="tel:5198245741"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              <Phone className="h-4 w-4" />
              Call (519) 824-5741
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-muted-foreground text-white hover:bg-muted-foreground/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;