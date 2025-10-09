import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Utensils } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bringing the authentic flavors of Africa and the Caribbean to downtown Guelph since 2000
          </p>
        </div>

        {/* Main Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-card">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  <span className="font-display text-2xl text-primary">Mama Favourite Kitchen</span> opened
                  its doors in 2000 with a simple mission: to serve food that nurtures souls. What started
                  as a small family kitchen has grown into a beloved community gathering place where the
                  rich culinary traditions of Africa and the Caribbean come alive.
                </p>
                <p>
                  Our roots trace back to Nigeria, where cooking has been a cherished family tradition for
                  generations. Our grandmother ran her own restaurant, passing down recipes, techniques,
                  and most importantly, the love that goes into every dish. Today, we honor that legacy
                  by bringing those same authentic flavors to Guelph.
                </p>
                <p>
                  Every plate that leaves our kitchen tells a story—whether it's our perfectly balanced
                  curry goat, our flavorful jollof rice, our tender oxtail, or our signature jerk chicken.
                  We take pride in using traditional recipes and cooking methods, ensuring that each bite
                  transports you to the heart of African and Caribbean home cooking.
                </p>
                <p>
                  Under the management of Favour J. Idahosa, we continue to serve generous portions with
                  excellent service and genuine hospitality. Our customers often say they feel like family
                  here—and that's exactly how we want you to feel.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Made with Love</h3>
                <p className="text-muted-foreground">
                  Every dish is prepared with care, attention, and the warmth of family tradition
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Authentic Recipes</h3>
                <p className="text-muted-foreground">
                  Traditional cooking methods and recipes passed down through generations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Community Focus</h3>
                <p className="text-muted-foreground">
                  Building connections and serving our Guelph community with warmth and hospitality
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  Only the freshest ingredients and finest spices make it into our kitchen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cuisine Highlights */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary mb-12">
            Our Cuisine
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                  African Specialties
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Jollof Rice:</strong> West African one-pot rice dish with rich tomato and spice flavors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Fufu (Pounded Yam):</strong> Traditional Nigerian staple served with authentic soups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Egusi & Okro Soup:</strong> Classic Nigerian soups bursting with flavor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Suya:</strong> Grilled seasoned beef with aromatic West African spices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                  Caribbean Favorites
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Jerk Chicken:</strong> Marinated and grilled with authentic Jamaican jerk seasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Curry Goat:</strong> Tender goat meat in perfectly balanced curry sauce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Oxtail:</strong> Slow-cooked until fall-off-the-bone tender</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Doubles & Dhalpuri:</strong> Trinidad street food favorites done right</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-secondary mb-4">
            Experience Our Hospitality
          </h2>
          <p className="text-muted-foreground mb-6">
            Visit us at 45 Cork St E in downtown Guelph and taste the difference that tradition and love make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              View Menu
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 rounded-md px-8 font-medium transition-smooth"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;