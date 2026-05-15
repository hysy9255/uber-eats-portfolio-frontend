import type { DayHoursDTO } from "./DayHours.dto";

export class UpdateOperatingHoursDTO {
  Mon?: DayHoursDTO;
  Tue?: DayHoursDTO;
  Wed?: DayHoursDTO;
  Thu?: DayHoursDTO;
  Fri?: DayHoursDTO;
  Sat?: DayHoursDTO;
  Sun?: DayHoursDTO;

  constructor(init: {
    Mon?: DayHoursDTO;
    Tue?: DayHoursDTO;
    Wed?: DayHoursDTO;
    Thu?: DayHoursDTO;
    Fri?: DayHoursDTO;
    Sat?: DayHoursDTO;
    Sun?: DayHoursDTO;
  }) {
    this.Mon = init.Mon;
    this.Tue = init.Tue;
    this.Wed = init.Wed;
    this.Thu = init.Thu;
    this.Fri = init.Fri;
    this.Sat = init.Sat;
    this.Sun = init.Sun;
  }
}
