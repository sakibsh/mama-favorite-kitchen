import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-food.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import jerkChicken from "@/assets/gallery/jerk-chicken.jpg";
import jollofRice from "@/assets/gallery/jollof-rice.jpg";
import curryGoat from "@/assets/gallery/curry-goat.jpg";
import fufuEgusi from "@/assets/gallery/fufu-egusi.jpg";

const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [emblaRefTestimonials, emblaApiTestimonials] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onSelectTestimonial = useCallback(() => {
    if (!emblaApiTestimonials) return;
    setSelectedTestimonialIndex(emblaApiTestimonials.selectedScrollSnap());
  }, [emblaApiTestimonials]);

  const scrollToTestimonial = useCallback(
    (index: number) => emblaApiTestimonials && emblaApiTestimonials.scrollTo(index),
    [emblaApiTestimonials]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApiTestimonials) return;
    onSelectTestimonial();
    emblaApiTestimonials.on("select", onSelectTestimonial);
    emblaApiTestimonials.on("reInit", onSelectTestimonial);
  }, [emblaApiTestimonials, onSelectTestimonial]);

  const dishes = [
    {
      image: jerkChicken,
      name: "Jerk Chicken",
      description: "Authentic Caribbean jerk chicken with rice & peas and fried plantains",
    },
    {
      image: jollofRice,
      name: "Jollof Rice",
      description: "Vibrant West African jollof rice with grilled chicken and coleslaw",
    },
    {
      image: curryGoat,
      name: "Curry Goat",
      description: "Tender goat meat in perfectly balanced curry sauce with rice & peas",
    },
    {
      image: fufuEgusi,
      name: "Fufu & Egusi Soup",
      description: "Traditional Nigerian pounded yam with rich egusi soup",
    },
  ];

  const testimonials = [
    {
      name: "Victoria Kwong",
      rating: 5,
      text: "Wow!! We were so excited to find this new restaurant in Guelph - Incredible, savoury, delicious goat curry and fufu and egusi soup! The fufu soaks up the flavour and melts in your mouth, yummy! Mama and her partner are the jolly chefs of this delicious restaurant, it's like having a warm home cooked meal!",
    },
    {
      name: "Tiffany Chan",
      rating: 5,
      text: "Everything is a great price and the portion sizes are wonderful as well. The jerk chicken is fall off the bone and it is beautifully spiced. I think this lady makes magic or something because I literally can't express how happy I am right now. 10/10 have already recommended to my coworkers.",
    },
    {
      name: "Walid Khalil",
      rating: 5,
      text: "Just had the jerk chicken lunch special at Mama's Favourite Kitchen and wow - absolutely amazing! I've been searching for a good Caribbean spot in Guelph for a long time, and I think I've finally found my new go-to. The food is 100%, full of flavour and cooked perfectly.",
    },
    {
      name: "Elle Lee",
      rating: 5,
      text: "This is a must-visit new spot in Guelph, and I have no doubt it's going to become a local favourite. The food is fresh, authentic, and prepared right in front of you. The Jerk Chicken is outstanding. It's a small, family-owned business, and the owner/chef brings genuine warmth and care to every dish she serves.",
    },
    {
      name: "benjamin gyan",
      rating: 5,
      text: "Check out my plate - I absolutely loved it! The coleslaw was incredible. The jollof was fantastic. The suya was delicious. The real standout was the plantain; it's fried fresh when you ask for it and tasted sooooo good. All in all, I'd give this plate a solid 9.5 out of 10.",
    },
    {
      name: "Kyle Ragoonath",
      rating: 5,
      text: "The food is legit! Tried for the first time today. 1.75 chicken quarters, a lot of chicken and a lot of rice. The jollof is so good and actually - good amount of spice. The service was nice and welcoming. Definitely coming back! Good to know Guelph has a good Jamaican/African food spot.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            Food That Nurtures Souls
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up opacity-0 [animation-delay:200ms]">
            Authentic African & Caribbean Cuisine in Downtown Guelph Since 2000
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in opacity-0 [animation-delay:400ms]">
            <Button asChild size="lg" variant="default" className="text-lg">
              <Link to="/menu">View Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <a href="tel:2263325741">
                <Phone className="mr-2 h-5 w-5" />
                Call to Order
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Signature Dishes Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">
              Our Signature Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most-loved African & Caribbean specialties
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {dishes.map((dish, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <Card className="h-full shadow-card hover:shadow-soft transition-smooth group cursor-pointer">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">
                          {dish.name}
                        </h3>
                        <p className="text-muted-foreground">{dish.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {dishes.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" variant="default">
                <Link to="/menu">View Full Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Special */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">
              Today's Special
            </h2>
            <Card className="shadow-card border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left space-y-2">
                    <h3 className="text-2xl font-display font-semibold text-primary">
                      Jerk Chicken with Rice & Peas
                    </h3>
                    <p className="text-muted-foreground">
                      Perfectly seasoned and grilled jerk chicken served with traditional rice and peas
                    </p>
                    <p className="text-3xl font-bold text-secondary">$7.50</p>
                  </div>
                  <div className="text-left space-y-2">
                    <h3 className="text-2xl font-display font-semibold text-primary">
                      Doubles
                    </h3>
                    <p className="text-muted-foreground">
                      Curried chickpea flatbread, add meat or veggies for $4.50
                    </p>
                    <p className="text-3xl font-bold text-secondary">$3.50</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Authentic Flavors</h3>
                <p className="text-muted-foreground">
                  Traditional recipes passed down through generations, made with love and care
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Fresh Daily</h3>
                <p className="text-muted-foreground">
                  All dishes prepared fresh daily with the finest ingredients and spices
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-soft transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Downtown Location</h3>
                <p className="text-muted-foreground">
                  Conveniently located in the heart of Guelph at 45 Cork St E
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary mb-12">
            What Our Customers Say
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden" ref={emblaRefTestimonials}>
              <div className="flex gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <Card className="h-full shadow-card">
                      <CardContent className="p-6">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4 min-h-[120px]">{testimonial.text}</p>
                        <p className="font-semibold text-secondary">— {testimonial.name}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedTestimonialIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => scrollToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary mb-12">
              Visit Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">Location</h3>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">45 Cork St E</p>
                      <p className="text-muted-foreground">Guelph, ON N1H 2W7</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:2263325741" className="text-primary hover:underline font-medium">
                      (226) 332-5741
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday</span>
                      <span className="text-muted-foreground">12 PM - 10 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tuesday - Wednesday</span>
                      <span className="text-muted-foreground">10 AM - 10 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Thursday - Saturday</span>
                      <span className="text-muted-foreground">10 AM - 2 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span className="text-muted-foreground">1 PM - 10 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.3!2d-80.2491!3d43.5448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMyJzQxLjMiTiA4MMKwMTQnNTYuOCJX!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mama Favourite Kitchen Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;