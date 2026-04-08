import type { OperatingHoursDTO } from "../dtos/restaurant/OperatingHours.dto";

export const sortArrayByDays = (
  operatingHours?: OperatingHoursDTO
): { day: string; open?: string | null; close?: string | null }[] => {
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return order.map((day) => ({
    day,
    open: operatingHours?.[day as keyof OperatingHoursDTO].open,
    close: operatingHours?.[day as keyof OperatingHoursDTO].close,
  }));
};
