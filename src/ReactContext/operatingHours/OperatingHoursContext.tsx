import { createContext } from "react";
import type {
  Day,
  DayHours,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";
import type { TimeOption } from "../../utils/timeOptions";

export type OperatingHoursContextValue = {
  hours: Record<Day, DayHours>;
  setHours: React.Dispatch<React.SetStateAction<Record<Day, DayHours>>>;
  initialHours: Record<Day, DayHours>;
  activeField: string | null;
  setActiveField: React.Dispatch<React.SetStateAction<string | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDropdown: (purpose: string, day: Day) => void;
  closeDropdown: () => void;
  setOpenTime: (day: Day, timeOption: TimeOption) => void;
  setCloseTime: (day: Day, timeOption: TimeOption) => void;
  isDropdownOpen: (purpose: string, day: Day) => boolean;
};

export const OperatingHoursContext =
  createContext<OperatingHoursContextValue | null>(null);
