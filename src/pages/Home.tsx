import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useMemo } from "react";
import jerkChicken from "@/assets/gallery/jerk-chicken.jpg";
import jollofRice from "@/assets/gallery/jollof-rice.jpg";
import curryGoat from "@/assets/gallery/curry-goat.jpg";
import fufuEgusi from "@/assets/gallery/fufu-egusi.jpg";
import { ShaderText } from "@/components/ShaderText";
import { InteractiveCard } from "@/components/InteractiveCard";
import { OptimizedImage } from "@/components/OptimizedImage";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const Home = () => {
  // Hero slider
  const [emblaRefHero, emblaApiHero] = useEmblaCarousel(
    { loop: true, duration: 60 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [emblaRefTestimonials, emblaApiTestimonials] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

  // Simplified parallax - disabled on mobile for performance
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return; // Skip on mobile
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 20);
    mouseY.set((clientY / innerHeight - 0.5) * 20);
  }, [isMobile, mouseX, mouseY]);

  const heroTextX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const heroTextY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Hero slider images
  const heroSlides = [
    "/slider/s1.jpg",
    "/slider/s2.jpg",
    "/slider/s3.jpg",
  ];

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onSelectHero = useCallback(() => {
    if (!emblaApiHero) return;
    setHeroIndex(emblaApiHero.selectedScrollSnap());
  }, [emblaApiHero]);

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
    if (!emblaApiHero) return;
    onSelectHero();
    emblaApiHero.on("select", onSelectHero);
    emblaApiHero.on("reInit", onSelectHero);
  }, [emblaApiHero, onSelectHero]);

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
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax and Advanced Slider */}
      <section 
        className="relative h-[90vh] min-h-[700px] overflow-hidden flex items-center"
        onMouseMove={handleMouseMove}
      >
        {/* Background Slider with Ken Burns Effect */}
        <div className="absolute inset-0 z-0" ref={emblaRefHero}>
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full overflow-hidden">
                <div
                  style={{ backgroundImage: `url(${slide})` }}
                  className="absolute inset-0 bg-cover bg-center scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            style={{ x: heroTextX, y: heroTextY }}
            className="relative max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white drop-shadow-lg leading-tight">
                Food That{" "}
                <span className="text-brand-gold inline-block">
                  Nurtures
                </span>{" "}
                Souls
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-2xl mb-10 font-medium text-white drop-shadow-md"
            >
              Authentic African & Caribbean Cuisine in Downtown Guelph <span className="hidden sm:inline-block mx-2">•</span> Since 2000
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="text-lg h-12 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg border border-brand-orange/50">
                  <a href="https://www.ubereats.com/ca/store/mama-favourite-kitchen/ZW1oBiR1Ux60yLVvZ7Vl1Q" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Order Now <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8 rounded-full bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20 shadow-lg">
                  <Link to="/menu">View Menu</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-4 z-20">
           {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === heroIndex
                  ? "bg-white w-12 opacity-100"
                  : "bg-white/30 w-3 opacity-50 hover:bg-white/50"
              }`}
              onClick={() => emblaApiHero && emblaApiHero.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
          <svg className="relative block w-[calc(130%+1.3px)] h-[120px] transform -translate-x-1/2 left-1/2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background opacity-50"></path>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background transform translate-y-4"></path>
          </svg>
        </div>
      </section>

      {/* Signature Dishes Gallery */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ShaderText as="h2" text="Our Signature Dishes" className="text-4xl md:text-6xl mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most-loved African & Caribbean specialties
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="overflow-visible" ref={emblaRef}>
              <div className="flex gap-8 pl-4">
                {dishes.map((dish, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  >
                    <InteractiveCard className="h-full border-none bg-white/50 dark:bg-black/50">
                      <OptimizedImage
                        src={dish.image}
                        alt={dish.name}
                        wrapperClassName="rounded-xl mb-4 aspect-[4/3]"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="p-2">
                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                          {dish.name}
                        </h3>
                        <p className="text-muted-foreground text-lg">{dish.description}</p>
                      </div>
                    </InteractiveCard>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-12">
              {dishes.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === selectedIndex
                      ? "bg-brand-orange w-12"
                      : "bg-muted-foreground/30 w-3 hover:bg-brand-orange/50"
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-16">
              <Button asChild size="lg" className="rounded-full px-12 py-8 text-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105">
                <Link to="/menu">View Full Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Special */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-green/5 skew-y-3 scale-110 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ShaderText as="h2" text="Today's Special" className="text-5xl md:text-7xl mb-4" />
            </div>
            
            <InteractiveCard className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-2 border-brand-gold/30">
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-brand-orange rounded-full" />
                    <div className="pl-6">
                      <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                        Jerk Chicken with Rice & Peas
                      </h3>
                      <p className="text-muted-foreground text-lg mb-4">
                        Perfectly seasoned and grilled jerk chicken served with traditional rice and peas
                      </p>
                      <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-bold text-brand-orange">$7.50</span>
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange uppercase tracking-wider">Lunch Special</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 italic">Ends at 2:30PM</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold rounded-full" />
                    <div className="pl-6">
                      <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                        Doubles
                      </h3>
                      <p className="text-muted-foreground text-lg mb-4">
                        Curried chickpea flatbread, make it exclusive with any meat for $11.50
                      </p>
                      <span className="text-4xl font-bold text-brand-gold">$4.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ShaderText as="h2" text="Why Choose Us" className="text-4xl md:text-6xl" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Star, title: "Authentic Flavors", text: "Traditional recipes passed down through generations, made with love and care", color: "text-brand-gold" },
              { icon: Clock, title: "Fresh Daily", text: "All dishes prepared fresh daily with the finest ingredients and spices", color: "text-brand-green" },
              { icon: MapPin, title: "Downtown Location", text: "Conveniently located in the heart of Guelph at 45 Cork St E", color: "text-brand-orange" }
            ].map((feature, i) => (
              <InteractiveCard key={i} className="h-full bg-card/50 hover:bg-card transition-colors">
                <div className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-background shadow-soft flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ShaderText as="h2" text="Customer Love" className="text-4xl md:text-6xl" />
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="overflow-hidden px-4" ref={emblaRefTestimonials}>
              <div className="flex gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <InteractiveCard className="h-full bg-white dark:bg-black border border-border/50">
                      <div className="p-8 flex flex-col h-full">
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                          ))}
                        </div>
                        <p className="text-muted-foreground text-lg italic mb-8 flex-grow">"{testimonial.text}"</p>
                        <div className="mt-auto pt-6 border-t border-border">
                          <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === selectedTestimonialIndex
                      ? "bg-brand-green w-12"
                      : "bg-muted-foreground/30 w-3 hover:bg-brand-green/50"
                  }`}
                  onClick={() => scrollToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <InteractiveCard className="overflow-hidden border-none bg-white/90 dark:bg-black/90 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-brand-green p-12 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-noise opacity-10" />
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 relative z-10">
                    Perfect For Every Occasion
                  </h3>
                  <ul className="space-y-6 relative z-10 text-lg">
                    {[
                      "Weddings & Celebrations",
                      "Corporate Events & Meetings",
                      "Birthday Parties & Anniversaries",
                      "Community & Cultural Events",
                      "Private Parties & Gatherings"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <span className="w-2 h-2 bg-brand-gold rounded-full" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                    Catering Services
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    From intimate gatherings to large celebrations, we'll create a custom menu featuring our signature dishes including Jerk Chicken, Curry Goat, Jollof Rice, and more.
                  </p>
                  <div className="bg-muted p-6 rounded-xl mb-8 border border-border">
                    <p className="font-semibold text-foreground">
                      Catering platters & party trays starting from just $25!
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full text-lg h-14 px-8">
                      <a href="tel:5198245741">
                        <Phone className="mr-2 h-5 w-5" />
                        Call for Quote
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 border-2">
                      <Link to="/menu#catering">View Menu</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <ShaderText as="h2" text="Visit Us" className="text-4xl md:text-6xl" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <InteractiveCard className="h-full">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Location</h3>
                  </div>
                  <div className="space-y-2 text-lg text-muted-foreground pl-16">
                    <p>45 Cork St E</p>
                    <p>Guelph, ON N1H 2W7</p>
                  </div>
                  <div className="mt-8 pl-16">
                    <a href="tel:5198245741" className="inline-flex items-center gap-2 text-xl font-bold text-brand-orange hover:underline">
                      <Phone className="h-5 w-5" />
                      (519) 824-5741
                    </a>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard className="h-full">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Opening Hours</h3>
                  </div>
                  <div className="space-y-4 pl-16">
                    {[
                      { day: "Monday", time: "11 AM - 10 PM" },
                      { day: "Tuesday - Thursday", time: "11 AM - 10 PM" },
                      { day: "Friday - Saturday", time: "11 AM - 2 AM" },
                      { day: "Sunday", time: "1 PM - 8 PM" }
                    ].map((schedule, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-dashed border-border pb-2 last:border-0 last:pb-0">
                        <span className="font-medium text-foreground">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 h-[450px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.3!2d-80.2491!3d43.5448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMyJzQxLjMiTiA4MMKwMTQnNTYuOCJX!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mama Favourite Kitchen Location"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
