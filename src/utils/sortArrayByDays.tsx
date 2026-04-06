import type { OperatingHoursDTO } from "../dtos/restaurant/OperatingHours.dto";

export const sortArrayByDays = (
  operatingHours?: OperatingHoursDTO
): { day?: string; open?: string; close?: string }[] => {
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return order.map((day) => {
    return {
      day,
      open: operatingHours?.[day as keyof OperatingHoursDTO].open,
      close: operatingHours?.[day as keyof OperatingHoursDTO].close,
    };
  });
};
