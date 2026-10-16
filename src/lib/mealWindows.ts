import { getTorontoNow } from "./timezone";

export type MealWindow = { start: number; end: number; label: string }; // minutes since midnight, end exclusive

export const MEAL_WINDOWS: Record<string, MealWindow> = {
  "Chicken Special": { start: 11 * 60, end: 14 * 60 + 30, label: "Available 11am–2:30pm" },
  "Chicken Lunch": { start: 14 * 60 + 30, end: 17 * 60, label: "Available 2:30pm–5pm" },
};

export function isInWindow(window: MealWindow, date: Date): boolean {
  const m = date.getHours() * 60 + date.getMinutes();
  return m >= window.start && m < window.end;
}

export function isMealTimeAvailable(name: string, date: Date = getTorontoNow()): boolean {
  const w = MEAL_WINDOWS[name];
  return w ? isInWindow(w, date) : true;
}
