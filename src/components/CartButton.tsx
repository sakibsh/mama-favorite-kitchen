import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function CartButton() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className="h-5 w-5" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}



