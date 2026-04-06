import type { DayHoursDTO } from "./DayHours.dto";

export type OperatingHoursDTO = {
  Mon: DayHoursDTO;
  Tue: DayHoursDTO;
  Wed: DayHoursDTO;
  Thu: DayHoursDTO;
  Fri: DayHoursDTO;
  Sat: DayHoursDTO;
  Sun: DayHoursDTO;
};
