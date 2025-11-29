import { Link } from "react-router-dom";
import { ExternalLink, Newspaper, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ShaderText } from "@/components/ShaderText";
import { motion } from "framer-motion";
import pressImage from "@/assets/press/guelph-today-feature.png";

const pressFeatures = [
  {
    source: "Guelph Today",
    title: "New African and Caribbean restaurant spices up Downtown Guelph",
    quote: "We offer a unique combination of African and Caribbean cuisine... We're introducing a new kind of food to Guelph.",
    author: "Jenny Idahosa",
    url: "https://www.guelphtoday.com/lets-eat/new-african-and-caribbean-restaurant-spices-up-downtown-guelph-11096784",
    date: "August 2025",
    image: pressImage,
  },
];

export const PressSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-gold/5 to-transparent z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4"
          >
            As Featured In
          </motion.p>
          <ShaderText as="h2" text="In The News" className="text-4xl md:text-6xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {pressFeatures.map((press, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InteractiveCard className="bg-white dark:bg-black border-2 border-brand-gold/20 hover:border-brand-gold/40 transition-colors overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img 
                      src={press.image} 
                      alt="Mama Favourite Kitchen featured in Guelph Today" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
                        <Newspaper className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-foreground">{press.source}</p>
                        <p className="text-sm text-muted-foreground">{press.date}</p>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-5 leading-tight">
                      {press.title}
                    </h3>

                    <div className="relative pl-5 border-l-4 border-brand-orange/30 mb-6">
                      <Quote className="absolute -left-3 -top-1 w-5 h-5 text-brand-orange/50" />
                      <blockquote className="text-base md:text-lg italic text-muted-foreground leading-relaxed">
                        "{press.quote}"
                      </blockquote>
                      <cite className="block mt-3 text-sm font-semibold text-foreground not-italic">
                        — {press.author}, Owner
                      </cite>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        asChild
                        className="bg-brand-gold hover:bg-brand-gold/90 text-white rounded-full"
                      >
                        <a href={press.url} target="_blank" rel="noopener noreferrer">
                          Read Full Article
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full border-2"
                      >
                        <Link to="/blog">View All Stories</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
