import { format } from "date-fns";

export const timeToFormattedString = (value: Date | string): string => {
  if (!value) return "";

  return format(value, "HH:mm");
};
