export const nextStartDate = "October 6, 2026";

export function isStartDateValid(): boolean {
  if (!nextStartDate) return false;
  const d = new Date(nextStartDate);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
}
