import type { OperatingHours } from "../pages/RestaurantPage";

export const sortArrayByDays = (arr?: OperatingHours[]): OperatingHours[] => {
  if (!arr) return [];
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const indexOf = (d: string) => order.indexOf(d);
  return arr.sort((a, b) => indexOf(a.dayOfWeek) - indexOf(b.dayOfWeek));
};
