import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ExternalLink, Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const categoryColors = {
  press: "bg-brand-gold/10 text-brand-gold",
  culture: "bg-brand-green/10 text-brand-green",
  recipes: "bg-brand-orange/10 text-brand-orange",
  news: "bg-blue-500/10 text-blue-600",
  community: "bg-purple-500/10 text-purple-600",
};

const categoryLabels = {
  press: "Press Coverage",
  culture: "Food & Culture",
  recipes: "Recipes",
  news: "News",
  community: "Community",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const [copied, setCopied] = useState(false);

  // If it's an external press article, redirect
  if (post?.externalUrl) {
    window.location.href = post.externalUrl;
    return null;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    // Try native share first (works on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or error - fall through to clipboard
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.publishedAt}
      />

      <article className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <header className="max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-muted-foreground"
          >
            <span className="font-medium">{post.author}</span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12
              prose-headings:font-display prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ul:space-y-2
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-em:text-foreground/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 py-8 border-t border-border">
            <Button onClick={handleShare} variant="outline" className="rounded-full">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </>
              )}
            </Button>
            <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full">
              <Link to="/menu">View Our Menu</Link>
            </Button>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-display font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={relatedPost.externalUrl || `/blog/${relatedPost.slug}`}
                  target={relatedPost.externalUrl ? "_blank" : undefined}
                  className="group"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-brand-orange transition-colors line-clamp-2">
                    {relatedPost.title}
                    {relatedPost.externalUrl && (
                      <ExternalLink className="inline ml-2 h-4 w-4" />
                    )}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
