import jollofRice from "@/assets/gallery/jollof-rice.webp";
import jerkChicken from "@/assets/gallery/jerk-chicken.webp";
import curryGoat from "@/assets/gallery/curry-goat.webp";
import fufuEgusi from "@/assets/gallery/fufu-egusi.webp";
import pressImage from "@/assets/press/guelph-today-feature.png";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "press" | "culture" | "recipes" | "news";
  featuredImage: string;
  author: string;
  publishedAt: string;
  readTime: string;
  externalUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "guelph-today-feature",
    title: "New African and Caribbean Restaurant Spices Up Downtown Guelph",
    excerpt: "Mama Favourite Kitchen brings authentic African and Caribbean flavors to downtown Guelph, offering a unique combination of jerk chicken, jollof rice, and traditional dishes.",
    content: `
      <p>Mama Favourite Kitchen has opened its doors in downtown Guelph, bringing a unique combination of African and Caribbean cuisine to the city.</p>
      
      <p>Owner Jenny Idahosa shares her passion for authentic cooking: "We offer a unique combination of African and Caribbean cuisine... We're introducing a new kind of food to Guelph."</p>
      
      <p>The restaurant specializes in traditional dishes including jerk chicken, jollof rice, curry goat, and Nigerian classics like egusi soup with fufu.</p>
      
      <p>Located at 45 Cork St E, Mama Favourite Kitchen serves lunch specials starting at just $7.50 and is quickly becoming a local favorite for those seeking authentic, flavorful cuisine.</p>
    `,
    category: "press",
    featuredImage: pressImage,
    author: "Guelph Today",
    publishedAt: "2025-08-20",
    readTime: "3 min read",
    externalUrl: "https://www.guelphtoday.com/lets-eat/new-african-and-caribbean-restaurant-spices-up-downtown-guelph-11096784",
  },
  {
    id: "2",
    slug: "history-of-jollof-rice",
    title: "The History of Jollof Rice: West Africa's Most Beloved Dish",
    excerpt: "Discover the rich history and cultural significance of jollof rice, the iconic West African dish that has sparked friendly rivalries between nations.",
    content: `
      <p>Jollof rice is more than just a dish—it's a cultural icon that represents the heart of West African cuisine. At Mama Favourite Kitchen, we take pride in serving authentic jollof that honors this rich tradition.</p>
      
      <h2>Origins of Jollof Rice</h2>
      <p>The dish originated from the Wolof people of Senegal and Gambia, with the name "jollof" derived from the Wolof ethnic group. Over centuries, it spread across West Africa, with each country developing its own unique version.</p>
      
      <h2>The Great Jollof Debate</h2>
      <p>Nigerians and Ghanaians have a friendly rivalry over who makes the best jollof rice. Nigerian jollof tends to be more tomato-forward with a distinctive smoky flavor (party jollof), while Ghanaian jollof often incorporates more spices.</p>
      
      <h2>Our Jollof at Mama Favourite Kitchen</h2>
      <p>Our jollof rice recipe has been perfected over generations, featuring long-grain rice cooked in a rich tomato base with traditional spices. We serve it with perfectly grilled chicken and fresh coleslaw—a true taste of West Africa right here in Guelph.</p>
    `,
    category: "culture",
    featuredImage: jollofRice,
    author: "Mama Favourite Kitchen",
    publishedAt: "2024-02-01",
    readTime: "5 min read",
  },
  {
    id: "3",
    slug: "jerk-chicken-jamaican-tradition",
    title: "Jerk Chicken: A Jamaican Tradition of Bold Flavors",
    excerpt: "Learn about the origins of jerk chicken and what makes this Caribbean classic so irresistibly flavorful.",
    content: `
      <p>Jerk chicken is the crown jewel of Jamaican cuisine, known for its bold, spicy, and aromatic flavors that have captivated food lovers worldwide.</p>
      
      <h2>The Origins of Jerk</h2>
      <p>Jerk cooking originated with the Taino people of Jamaica and was later refined by the Maroons—escaped African slaves who settled in Jamaica's mountains. They developed the technique of slow-cooking meat over pimento wood, creating the distinctive smoky flavor.</p>
      
      <h2>The Secret is in the Seasoning</h2>
      <p>Authentic jerk seasoning combines scotch bonnet peppers, allspice (pimento), thyme, garlic, ginger, and scallions. The meat is marinated for hours, allowing the flavors to penetrate deeply.</p>
      
      <h2>Our Jerk Chicken</h2>
      <p>At Mama Favourite Kitchen, we honor this tradition with our perfectly seasoned jerk chicken, served with rice and peas and sweet fried plantains. Our lunch special at $7.50 is the best deal in town for authentic Caribbean flavors.</p>
    `,
    category: "culture",
    featuredImage: jerkChicken,
    author: "Mama Favourite Kitchen",
    publishedAt: "2024-02-15",
    readTime: "4 min read",
  },
  {
    id: "4",
    slug: "what-makes-nigerian-egusi-special",
    title: "What Makes Nigerian Egusi Soup So Special?",
    excerpt: "Explore the unique ingredients and cultural significance of egusi soup, one of Nigeria's most treasured dishes.",
    content: `
      <p>Egusi soup is a cornerstone of Nigerian cuisine, beloved for its rich, nutty flavor and hearty texture. At Mama Favourite Kitchen, we serve this traditional dish the way it's meant to be enjoyed—with hand-pounded fufu.</p>
      
      <h2>What is Egusi?</h2>
      <p>Egusi refers to the seeds of melon plants, which are dried and ground into a powder. When cooked, these seeds create a thick, protein-rich base for the soup.</p>
      
      <h2>The Art of Egusi Soup</h2>
      <p>Our egusi soup features melon seeds cooked with palm oil, assorted meats, stockfish, and leafy vegetables. The soup is seasoned with traditional spices and slow-cooked to develop deep, complex flavors.</p>
      
      <h2>Perfect Pairings</h2>
      <p>Egusi soup is traditionally served with fufu, pounded yam, or eba (garri). At Mama Favourite Kitchen, we serve it with freshly made fufu that's perfectly smooth and stretchy—the ideal vessel for scooping up every delicious bit of soup.</p>
    `,
    category: "culture",
    featuredImage: fufuEgusi,
    author: "Mama Favourite Kitchen",
    publishedAt: "2024-03-01",
    readTime: "4 min read",
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};
