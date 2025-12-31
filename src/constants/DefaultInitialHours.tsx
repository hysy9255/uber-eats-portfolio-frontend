import type {
  Day,
  DayHours,
} from "../pages/types/OwnerOnBoardingStep3Location.type";

export const DEFAULT_INITIAL_HOURS: Record<Day, DayHours> = {
  Mon: { open: "", close: "", open24: false, closed: false },
  Tue: { open: "", close: "", open24: false, closed: false },
  Wed: { open: "", close: "", open24: false, closed: false },
  Thu: { open: "", close: "", open24: false, closed: false },
  Fri: { open: "", close: "", open24: false, closed: false },
  Sat: { open: "", close: "", open24: false, closed: false },
  Sun: { open: "", close: "", open24: false, closed: false },
};
