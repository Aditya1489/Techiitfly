export const configuredNextStartDate = "October 6, 2026";

/**
 * Returns the configured start date if it is in the future.
 * If past or invalid, computes and auto-shows the upcoming Monday.
 */
export function getNextStartDate(): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (configuredNextStartDate) {
    const configuredDate = new Date(configuredNextStartDate);
    if (!isNaN(configuredDate.getTime()) && configuredDate >= today) {
      return configuredNextStartDate;
    }
  }

  // Calculate upcoming Monday
  const nextMonday = new Date(today);
  const day = today.getDay(); // 0 is Sunday, 1 is Monday, ...
  const daysUntilMonday = (8 - day) % 7 || 7;
  nextMonday.setDate(today.getDate() + daysUntilMonday);

  return nextMonday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const nextStartDate = getNextStartDate();

export function isStartDateValid(): boolean {
  return true;
}
