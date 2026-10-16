import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DbMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  is_available: boolean;
  created_at: string;
}

const key = (s: string) => s.toLowerCase().trim();

/** Live menu data from the database (admin-editable): prices, descriptions, availability. */
export function useMenuAvailability() {
  const [items, setItems] = useState<DbMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("id, name, price, category, description, is_available, created_at")
        .order("created_at");
      if (error) {
        console.error("Error fetching menu items:", error);
        return;
      }
      setItems((data as DbMenuItem[]) || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    const channel = supabase
      .channel("menu-items-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => fetchItems())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const byName = new Map(items.map((i) => [key(i.name), i]));
  const getItem = (name: string) => byName.get(key(name));
  const isItemAvailable = (name: string) => getItem(name)?.is_available ?? true;

  return { items, getItem, isItemAvailable, isLoading };
}
