import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTorontoNow } from "@/lib/timezone";

interface DayHours {
  open: string; // "HH:MM" in 24h format
  close: string;
}

interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

const DAY_KEYS: Record<number, keyof OperatingHours> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return { hours, minutes };
}

function formatTimeDisplay(timeStr: string): string {
  const { hours, minutes } = parseTime(timeStr);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return minutes === 0 ? `${displayHour} ${period}` : `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getNextOpenTime(hours: OperatingHours): string {
  const now = getTorontoNow();
  const currentDay = now.getDay();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentDayKey = DAY_KEYS[currentDay];
  const todayHours = hours[currentDayKey];

  // Check if we're before today's opening
  const todayOpen = parseTime(todayHours.open);
  if (currentHours < todayOpen.hours || (currentHours === todayOpen.hours && currentMinutes < todayOpen.minutes)) {
    return `Today at ${formatTimeDisplay(todayHours.open)}`;
  }

  // Otherwise find the next day
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDay + i) % 7;
    const nextDayKey = DAY_KEYS[nextDayIndex];
    const nextDayHours = hours[nextDayKey];
    if (nextDayHours) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = i === 1 ? "Tomorrow" : dayNames[nextDayIndex];
      return `${dayName} at ${formatTimeDisplay(nextDayHours.open)}`;
    }
  }

  return "Check back soon";
}

export function useOperatingHours() {
  const [hours, setHours] = useState<OperatingHours | null>(null);
  const [isOpen, setIsOpen] = useState(true); // Default open to avoid flash
  const [nextOpenTime, setNextOpenTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const checkIfOpen = (operatingHours: OperatingHours) => {
    const now = getTorontoNow();
    const dayKey = DAY_KEYS[now.getDay()];
    const todayHours = operatingHours[dayKey];

    if (!todayHours) {
      setIsOpen(false);
      setNextOpenTime(getNextOpenTime(operatingHours));
      return;
    }

    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const open = parseTime(todayHours.open);
    const close = parseTime(todayHours.close);

    const afterOpen = currentHours > open.hours || (currentHours === open.hours && currentMinutes >= open.minutes);
    const beforeClose = currentHours < close.hours || (currentHours === close.hours && currentMinutes < close.minutes);

    const currentlyOpen = afterOpen && beforeClose;
    setIsOpen(currentlyOpen);

    if (!currentlyOpen) {
      setNextOpenTime(getNextOpenTime(operatingHours));
    }
  };

  const fetchHours = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "operating_hours")
        .maybeSingle();

      if (error) {
        console.error("Error fetching operating hours:", error);
        return;
      }

      if (data?.value) {
        const operatingHours = data.value as unknown as OperatingHours;
        setHours(operatingHours);
        checkIfOpen(operatingHours);
      }
    } catch (error) {
      console.error("Error fetching operating hours:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHours();

    // Re-check every minute
    const interval = setInterval(() => {
      if (hours) {
        checkIfOpen(hours);
      }
    }, 60000);

    // Subscribe to realtime changes
    const channel = supabase
      .channel("operating-hours-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "settings",
          filter: "key=eq.operating_hours",
        },
        (payload) => {
          const newHours = payload.new.value as unknown as OperatingHours;
          setHours(newHours);
          checkIfOpen(newHours);
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  // Re-run check when hours change
  useEffect(() => {
    if (hours) {
      checkIfOpen(hours);
    }
  }, [hours]);

  return {
    hours,
    isOpen,
    nextOpenTime,
    isLoading,
    refetch: fetchHours,
  };
}
