import { Link } from "react-router-dom";
import { ExternalLink, Newspaper, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ShaderText } from "@/components/ShaderText";
import { motion } from "framer-motion";

const pressFeatures = [
  {
    source: "Guelph Today",
    title: "New African and Caribbean restaurant spices up Downtown Guelph",
    quote: "We offer a unique combination of African and Caribbean cuisine... We're introducing a new kind of food to Guelph.",
    author: "Jenny Idahosa",
    url: "https://www.guelphtoday.com/lets-eat/new-african-and-caribbean-restaurant-spices-up-downtown-guelph-11096784",
    date: "2024",
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

        <div className="max-w-4xl mx-auto">
          {pressFeatures.map((press, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InteractiveCard className="bg-white dark:bg-black border-2 border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-foreground">{press.source}</p>
                      <p className="text-sm text-muted-foreground">{press.date}</p>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 leading-tight">
                    {press.title}
                  </h3>

                  <div className="relative pl-6 border-l-4 border-brand-orange/30 mb-8">
                    <Quote className="absolute -left-3 -top-2 w-6 h-6 text-brand-orange/50" />
                    <blockquote className="text-lg md:text-xl italic text-muted-foreground leading-relaxed">
                      "{press.quote}"
                    </blockquote>
                    <cite className="block mt-4 text-sm font-semibold text-foreground not-italic">
                      — {press.author}, Owner
                    </cite>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
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
                      <Link to="/blog">View All Press & Stories</Link>
                    </Button>
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
