import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, ExternalLink, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ShaderText } from "@/components/ShaderText";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";

const categoryColors = {
  press: "bg-brand-gold/10 text-brand-gold",
  culture: "bg-brand-green/10 text-brand-green",
  recipes: "bg-brand-orange/10 text-brand-orange",
  news: "bg-blue-500/10 text-blue-600",
};

const categoryLabels = {
  press: "Press Coverage",
  culture: "Food & Culture",
  recipes: "Recipes",
  news: "News",
};

const Blog = () => {
  const pressArticles = blogPosts.filter((post) => post.category === "press");
  const otherPosts = blogPosts.filter((post) => post.category !== "press");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEOHead
        title="Blog & Press | Stories About African & Caribbean Cuisine"
        description="Read about Mama Favourite Kitchen in the press and explore our stories about African and Caribbean food culture, recipes, and culinary traditions."
        canonicalPath="/blog"
      />

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-widest text-brand-orange mb-4"
            >
              Stories & Press
            </motion.p>
            <ShaderText
              as="h1"
              text="Our Kitchen, Our Stories"
              className="text-4xl md:text-6xl mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Discover the rich culture behind African & Caribbean cuisine, read about
              us in the press, and learn about our culinary traditions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Press Coverage Section */}
      {pressArticles.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="w-6 h-6 text-brand-gold" />
              <h2 className="text-2xl font-display font-bold">Press Coverage</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {pressArticles.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InteractiveCard className="h-full bg-gradient-to-br from-brand-gold/5 to-transparent border-2 border-brand-gold/20">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                          {categoryLabels[post.category]}
                        </span>
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold mb-3 text-foreground line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      {post.externalUrl ? (
                        <Button asChild className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white rounded-full">
                          <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                            Read on {post.author}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button asChild className="w-full rounded-full">
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Posts Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-8">Food & Culture</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCard className="h-full">
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold mb-3 text-foreground line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <Button asChild variant="outline" className="w-full rounded-full border-2">
                      <Link to={`/blog/${post.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <InteractiveCard className="bg-gradient-to-r from-brand-green to-brand-green/80 text-white">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Try Our Cuisine?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Experience the authentic flavors you've been reading about. Visit us in
                downtown Guelph or order online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-brand-green hover:bg-white/90 rounded-full">
                  <Link to="/menu">View Our Menu</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-full"
                >
                  <Link to="/menu">
                    Order Pickup
                  </Link>
                </Button>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>
    </div>
  );
};

export default Blog;
