import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Menu = () => {
  const menuSections = [
    {
      title: "Daily Specials",
      items: [
        { name: "Jerk Chicken with Rice & Peas", price: "$7.50", description: "Perfectly seasoned grilled chicken" },
        { name: "Doubles", price: "$3.50", description: "Curried chickpea flatbread" },
        { name: "Exclusive Doubles", price: "$4.50", description: "Add meat or veggies", badge: "Popular" },
      ],
    },
    {
      title: "Sandwiches & Wraps",
      description: "Served with canned pop or bottled water",
      items: [
        { name: "Curry Goat Sandwich", price: "$11.99" },
        { name: "Oxtail Sandwich", price: "$11.99" },
        { name: "Curry Chicken Sandwich", price: "$11.99" },
        { name: "Oven-Roast Beef Sandwich", price: "$11.99" },
        { name: "Jerk Chicken Wrap", price: "$11.99", badge: "Spicy" },
      ],
    },
    {
      title: "Rice & Pea or Jollof Platters",
      description: "Served with canned pop or bottled water",
      items: [
        { name: "Jerk Chicken Platter", price: "$14.99", badge: "Popular" },
        { name: "Curry Goat Platter", price: "$14.99" },
        { name: "Oxtail Platter", price: "$14.99" },
        { name: "Fried Chicken with Plantain Fries", price: "$14.99" },
        { name: "Curry Chicken Platter", price: "$14.99" },
        { name: "Roti (Meat/Veggie)", price: "$14.99", badge: "Vegetarian Option" },
        { name: "Roti Skins", price: "$6.49" },
      ],
    },
    {
      title: "Dinner Plates",
      description: "Served with coleslaw",
      items: [
        { name: "Oxtail Dinner", price: "$18.50" },
        { name: "Curry Goat Dinner", price: "$18.50", badge: "Chef's Choice" },
        { name: "Jerk Chicken Dinner", price: "$18.50" },
        { name: "Curry Chicken Dinner", price: "$18.50" },
        { name: "Pounded Yam (Fufu) with Soup", price: "$18.50" },
        { name: "Yam & Vegetables", price: "$18.50", badge: "Vegetarian" },
        { name: "Fish Dinner", price: "$18.50", description: "With rice & peas or jollof" },
        { name: "Pasta Dinner", price: "$18.50", description: "Meat, fish, or veggies" },
        { name: "Shrimp Dinner", price: "$18.50" },
        { name: "Fried Rice Dinner", price: "$18.50" },
        { name: "Suya Dinner", price: "$18.50", description: "Grilled seasoned beef" },
        { name: "Yam Porridge Dinner", price: "$18.50" },
        { name: "Short Rib Dinner", price: "$18.50" },
      ],
    },
    {
      title: "Soups",
      items: [
        { name: "Chicken Soup", price: "$7.99" },
        { name: "Red Pea Soup", price: "$7.99" },
        { name: "Egusi Soup", price: "$7.99" },
        { name: "Black Soup", price: "$7.99" },
        { name: "Okro Soup", price: "$7.99" },
        { name: "Vegetable Soup", price: "$7.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Nigerian Pepper Soup Delight",
      description: "By order only",
      items: [
        { name: "Goat or Goat Head", price: "$25.00" },
        { name: "Catfish", price: "$25.00" },
      ],
    },
    {
      title: "Salads",
      items: [
        { name: "Coleslaw", price: "$11.99" },
        { name: "Cucumber Salad", price: "$11.99" },
        { name: "House Salad", price: "$11.99" },
      ],
    },
    {
      title: "Side Orders",
      items: [
        { name: "Rice", price: "$4.50" },
        { name: "Curry Chicken", price: "$4.50" },
        { name: "Festival (Fried Dumplings)", price: "$4.50" },
        { name: "Fried Plantain", price: "$4.50", badge: "Popular" },
        { name: "Plantain Fries", price: "$4.50" },
        { name: "Moi Moi", price: "$4.50", description: "Steamed black-eyed bean pudding" },
      ],
    },
    {
      title: "Vegetarian Meals",
      items: [
        { name: "Beans & Fried Plantain", price: "$11.99", description: "Roti, wrap, or full meal", badge: "Vegetarian" },
        { name: "Doubles with Uncle Ben Rice & Greens", price: "$11.99", badge: "Vegetarian" },
        { name: "Yam & Fried Vegetables", price: "$11.99", badge: "Vegetarian" },
      ],
    },
    {
      title: "Beverages",
      items: [
        { name: "Pop", price: "$1.50" },
        { name: "Bottled Water", price: "$1.25" },
        { name: "Bottled Sodas", price: "$3.00" },
        { name: "Tea", price: "$1.95" },
        { name: "Coffee", price: "$1.95" },
        { name: "Sugarcane Juice", price: "$9.99", description: "Freshly pressed", badge: "Fresh" },
        { name: "Smoothies (Small)", price: "$5.99" },
        { name: "Smoothies (Large)", price: "$9.99" },
      ],
    },
    {
      title: "Desserts",
      items: [
        { name: "Assorted Desserts", price: "$4.99" },
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our authentic African & Caribbean dishes, made fresh daily with traditional recipes
          </p>
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
            Call us now for take-out or inquire about our catering services for your next event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:2263325741"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              Call (226) 332-5741
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 rounded-md px-8 font-medium transition-smooth"
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