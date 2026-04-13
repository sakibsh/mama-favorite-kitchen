import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MenuItemAvailability {
  name: string;
  is_available: boolean;
}

export function useMenuAvailability() {
  const [unavailableItems, setUnavailableItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("name, is_available");

      if (error) {
        console.error("Error fetching menu availability:", error);
        return;
      }

      if (data) {
        const unavailable = new Set(
          data
            .filter((item: MenuItemAvailability) => !item.is_available)
            .map((item: MenuItemAvailability) => item.name.toLowerCase().trim())
        );
        setUnavailableItems(unavailable);
      }
    } catch (error) {
      console.error("Error fetching menu availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("menu-items-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "menu_items",
        },
        () => {
          fetchAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isItemAvailable = (itemName: string): boolean => {
    return !unavailableItems.has(itemName.toLowerCase().trim());
  };

  return { isItemAvailable, isLoading };
}
