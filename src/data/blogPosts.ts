import jollofRice from "@/assets/gallery/jollof-rice.webp";
import jerkChicken from "@/assets/gallery/jerk-chicken.webp";
import curryGoat from "@/assets/gallery/curry-goat.webp";
import fufuEgusi from "@/assets/gallery/fufu-egusi.webp";
import pressImage from "@/assets/press/guelph-today-feature.png";
import vortioPartnership from "@/assets/blog/vortio-partnership.webp";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "press" | "culture" | "recipes" | "news" | "community";
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
      <p>Jollof rice is more than just a dish. It is a cultural icon that represents the heart of West African cuisine. At Mama Favourite Kitchen, we take pride in serving authentic jollof that honors this rich tradition.</p>
      
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
  {
    id: "5",
    slug: "behind-our-new-website",
    title: "Behind Our New Website: How Vortio Helped Mama Favourite Go Online Properly",
    excerpt: "We share the story behind our website redesign and thank Vortio, the local Guelph digital studio that helped us build a better online home—completely free of charge.",
    content: `
      <p>If you have visited Mama Favourite Kitchen recently, you might have noticed that our website looks a little different. The colours feel warmer, the photos feel more like real life, and it is much easier to order your jollof or curry goat for pickup.</p>
      
      <p>This did not happen by accident. It came from finally deciding to treat our online home with the same care that we bring to the food on your plate. We thought it would be nice to share the story behind the new site and to thank the local team that helped us build it: <strong><a href="https://vortio.ca/" target="_blank" rel="noopener noreferrer">Vortio</a></strong>, a digital studio and consultancy based in Guelph.</p>
      
      <h2>Why We Needed a New Website</h2>
      <p>Like many small restaurants, we did not want our website to be put together quickly just to do the basics. We foresaw some common problems:</p>
      <ul>
        <li>On phones it was hard to read and even harder to use</li>
        <li>It did not really show the warmth and culture of Mama Favourite Kitchen</li>
        <li>Simple changes like updating hours or prices took more effort than they should</li>
        <li>Online ordering and pickup did not feel smooth for guests</li>
      </ul>
      <p>Meanwhile more people were finding us through Google and social media. We realized that our digital front door needed to match the experience you get when you walk into the restaurant.</p>
      
      <h2>Working with a Local Team</h2>
      <p>We wanted to work with people who live where we live and understand what it is like to run a busy kitchen. That is how we connected with <strong><a href="https://vortio.ca/" target="_blank" rel="noopener noreferrer">Vortio</a></strong>, a Guelph-based digital consultancy that helps small businesses with practical websites and light automation.</p>
      <p>What stood out right away was how much they genuinely care about helping local businesses grow. And honestly, the best part? They did it all for free. No fees, no surprise costs, just real help.</p>
      <p>Our brief to them was very simple: <em>"Make it easy for people to find us, see what we serve, and place an order without getting lost."</em></p>
      
      <h2>What Changed on the New Site</h2>
      <p>Together with Vortio, we focused on a few key improvements:</p>
      
      <h3>1. Built for Phones First</h3>
      <p>Most of our guests browse on their phones, so the new site is designed with that in mind. Menus are easy to scroll, buttons are big enough to tap, and important details like hours, address, and contact are always close by.</p>
      
      <h3>2. Clear and Simple Actions</h3>
      <p>We did not want a busy or confusing homepage. When you arrive on the site you mainly see three choices: Order pickup, View the menu, or Get directions. If you are hungry, you know where to go.</p>
      
      <h3>3. A Look That Feels Like Mama Favourite</h3>
      <p>The colours, typography, and photos were picked to match who we are: a warm, welcoming African and Caribbean kitchen in the heart of Guelph. We wanted the website to feel like an extension of our dining room rather than a generic template.</p>
      
      <h3>4. Easier Updates Behind the Scenes</h3>
      <p>On our side, it is now much easier to update menu items and prices, adjust hours for holidays or special events, and highlight limited-time dishes or catering options. This means the information you see online is more accurate and fresh.</p>
      
      <h2>Keeping More from Every Order</h2>
      <p>Before this redesign, a large share of our online orders went through third-party delivery apps. These platforms can be useful for discovery, but the commissions are often very high—many restaurants see fees in the range of 25 to 30 percent on each order.</p>
      <p>As part of the new website, Vortio built a <strong>simple in-house ordering system</strong> for pickup directly on our site. When guests place an order through our website, that money stays with our team instead of going to commission fees, and the ordering experience is still easy and mobile-friendly.</p>
      
      <h2>Thank You for Being Part of Our Story</h2>
      <p>Since 2000, Mama Favourite Kitchen has been about more than food. It has always been about comfort, culture, and a sense of home. Our new website is one more way to stay connected with you, whether you are discovering us for the first time or coming back for your usual order.</p>
      <p>Thank you for reading, and thank you for supporting local businesses in Guelph.</p>
      <p>If you like what you see on our site and are looking for someone to help with your own, you can visit <strong><a href="https://vortio.ca/" target="_blank" rel="noopener noreferrer">Vortio</a></strong> to learn more about the team that designed and built our new home online.</p>
    `,
    category: "community",
    featuredImage: vortioPartnership,
    author: "Mama Favourite Kitchen",
    publishedAt: "2025-11-20",
    readTime: "6 min read",
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};
