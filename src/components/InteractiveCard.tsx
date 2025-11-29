import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function InteractiveCard({ 
  className, 
  title,
  description,
  children,
  ...props 
}: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card 
        className={cn(
          "overflow-hidden border-2 border-transparent hover:border-brand-gold/50 transition-colors duration-300 bg-white/90 dark:bg-black/80 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle className="font-display text-xl">{title}</CardTitle>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </CardHeader>
        )}
        <CardContent className={title ? "" : "p-6"}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}


