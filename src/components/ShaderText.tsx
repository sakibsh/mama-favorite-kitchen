import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShaderTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  text: string;
  animate?: boolean;
}

export function ShaderText({ 
  as: Component = "h1", 
  text, 
  className, 
  animate = true,
  ...props 
}: ShaderTextProps) {
  return (
    <Component 
      className={cn(
        "font-display font-bold tracking-tight relative inline-block", 
        animate ? "text-shader" : "",
        className
      )}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        {text}
      </motion.span>
    </Component>
  );
}




