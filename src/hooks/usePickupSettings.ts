import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePickupSettings() {
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPickupSetting = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "pickup_enabled")
        .maybeSingle();

      if (error) {
        console.error("Error fetching pickup setting:", error);
        return;
      }

      if (data) {
        setPickupEnabled(data.value === true || data.value === "true");
      }
    } catch (error) {
      console.error("Error fetching pickup setting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePickup = async (enabled: boolean) => {
    try {
      const { error } = await supabase
        .from("settings")
        .update({ value: enabled, updated_at: new Date().toISOString() })
        .eq("key", "pickup_enabled");

      if (error) throw error;

      setPickupEnabled(enabled);
      return true;
    } catch (error) {
      console.error("Error updating pickup setting:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchPickupSetting();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("settings-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "settings",
          filter: "key=eq.pickup_enabled",
        },
        (payload) => {
          const newValue = payload.new.value;
          setPickupEnabled(newValue === true || newValue === "true");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    pickupEnabled,
    isLoading,
    togglePickup,
    refetch: fetchPickupSetting,
  };
}
