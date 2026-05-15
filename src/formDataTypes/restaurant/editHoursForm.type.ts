import type { DayHoursDTO } from "../../dtos/restaurant/DayHours.dto";

export type EditOperatingHoursForm = {
  Mon: DayHoursDTO;
  Tue: DayHoursDTO;
  Wed: DayHoursDTO;
  Thu: DayHoursDTO;
  Fri: DayHoursDTO;
  Sat: DayHoursDTO;
  Sun: DayHoursDTO;
};
