// Toronto timezone utilities for Mama Favourite Kitchen

const TORONTO_TIMEZONE = "America/Toronto";

/**
 * Get current date/time in Toronto timezone
 */
export function getTorontoNow(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: TORONTO_TIMEZONE })
  );
}

/**
 * Check if lunch specials are currently available
 * Available: Monday to Friday, before 2:30 PM Toronto time
 */
export function isLunchSpecialAvailable(): boolean {
  const now = getTorontoNow();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Check if it's a weekday (Monday = 1 to Friday = 5)
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

  // Check if it's before 2:30 PM (14:30)
  const isBeforeCutoff = hours < 14 || (hours === 14 && minutes < 30);

  return isWeekday && isBeforeCutoff;
}

/**
 * Get the next time lunch specials will be available
 */
export function getNextLunchSpecialTime(): string {
  const now = getTorontoNow();
  const dayOfWeek = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // If it's a weekday and before 2:30 PM, it's available now
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && (hours < 14 || (hours === 14 && minutes < 30))) {
    return "Available now";
  }

  // Calculate days until next Monday
  let daysUntilMonday: number;
  if (dayOfWeek === 0) {
    // Sunday - next Monday is tomorrow
    daysUntilMonday = 1;
  } else if (dayOfWeek === 6) {
    // Saturday - next Monday is 2 days away
    daysUntilMonday = 2;
  } else {
    // It's a weekday but after 2:30 PM - next availability is tomorrow if weekday, else Monday
    if (dayOfWeek === 5) {
      // Friday after 2:30 PM - wait until Monday
      daysUntilMonday = 3;
    } else {
      // Mon-Thu after 2:30 PM - available tomorrow
      return "Tomorrow at opening";
    }
  }

  return `Monday at opening`;
}

/**
 * Get start of today in Toronto timezone as ISO string (for DB queries)
 */
export function getTodayStartInToronto(): string {
  const now = new Date();
  const torontoDate = new Date(
    now.toLocaleString("en-US", { timeZone: TORONTO_TIMEZONE })
  );

  // Get the date components in Toronto time
  const year = torontoDate.getFullYear();
  const month = torontoDate.getMonth();
  const day = torontoDate.getDate();

  // Create midnight in Toronto
  const torontoMidnight = new Date(year, month, day, 0, 0, 0, 0);

  // Get the offset between local and Toronto time
  const torontoOffset = getTorontoOffsetMinutes(now);
  const localOffset = now.getTimezoneOffset();

  // Adjust to get UTC time that corresponds to Toronto midnight
  const utcMidnight = new Date(
    torontoMidnight.getTime() + (torontoOffset + localOffset) * 60 * 1000
  );

  return utcMidnight.toISOString();
}

/**
 * Get end of today in Toronto timezone as ISO string (for DB queries)
 */
export function getTodayEndInToronto(): string {
  const now = new Date();
  const torontoDate = new Date(
    now.toLocaleString("en-US", { timeZone: TORONTO_TIMEZONE })
  );

  // Get the date components in Toronto time
  const year = torontoDate.getFullYear();
  const month = torontoDate.getMonth();
  const day = torontoDate.getDate();

  // Create 23:59:59.999 in Toronto
  const torontoEndOfDay = new Date(year, month, day, 23, 59, 59, 999);

  // Get the offset between local and Toronto time
  const torontoOffset = getTorontoOffsetMinutes(now);
  const localOffset = now.getTimezoneOffset();

  // Adjust to get UTC time that corresponds to Toronto end of day
  const utcEndOfDay = new Date(
    torontoEndOfDay.getTime() + (torontoOffset + localOffset) * 60 * 1000
  );

  return utcEndOfDay.toISOString();
}

/**
 * Get Toronto timezone offset in minutes
 */
function getTorontoOffsetMinutes(date: Date): number {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const torontoDate = new Date(
    date.toLocaleString("en-US", { timeZone: TORONTO_TIMEZONE })
  );
  return (utcDate.getTime() - torontoDate.getTime()) / (60 * 1000);
}

/**
 * Format a date in Toronto timezone for display
 */
export function formatTorontoTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    timeZone: TORONTO_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format a date in Toronto timezone with full date for display
 */
export function formatTorontoDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    timeZone: TORONTO_TIMEZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format time for "Today at X:XX PM" style
 */
export function formatTodayTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const time = d.toLocaleString("en-US", {
    timeZone: TORONTO_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `Today at ${time}`;
}
