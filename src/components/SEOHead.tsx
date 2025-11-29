import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export const SEOHead = ({
  title,
  description,
  canonicalPath = "",
  ogImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/K1nB1yZrFqgW62lWkU6rq9x76sk1/social-images/social-1760969631342-1000028687.jpg",
  type = "website",
  publishedTime,
}: SEOHeadProps) => {
  const baseUrl = "https://mamafavouriteskitchen.com";
  const fullUrl = `${baseUrl}${canonicalPath}`;
  const fullTitle = title.includes("Mama Favourite") ? title : `${title} | Mama Favourite Kitchen`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMeta("description", description);

    // Open Graph tags
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", fullUrl, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:type", type, true);

    // Twitter tags
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    // Article specific
    if (type === "article" && publishedTime) {
      updateMeta("article:published_time", publishedTime, true);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    return () => {
      // Reset to default on unmount
      document.title = "Mama Favourite Kitchen | Authentic African & Caribbean Cuisine in Guelph";
    };
  }, [fullTitle, description, fullUrl, ogImage, type, publishedTime]);

  return null;
};
