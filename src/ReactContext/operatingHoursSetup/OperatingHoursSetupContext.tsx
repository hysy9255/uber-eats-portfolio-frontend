import { createContext } from "react";
import type {
  Day,
  DayHours,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";
import type { TimeOption } from "../../utils/timeOptions";

export type OperatingHoursSetupContextValue = {
  hours: Record<Day, DayHours>;
  activeField: string | null;
  setActiveField: React.Dispatch<React.SetStateAction<string | null>>;
  handleClickDropdown: (purpose: string, day: Day) => void;
  closeDropdown: () => void;
  // setHours: (
  //   day: Day,
  //   openTimeOption: TimeOption | null,
  //   closeTimeOption: TimeOption | null
  // ) => void;
  setOpenTime: (day: Day, timeOption: TimeOption) => void;
  setCloseTime: (day: Day, timeOption: TimeOption) => void;
  isDropdownOpen: (purpose: string, day: Day) => boolean;
  handleClickCheckBox: (day: Day, type: "closed" | "open24") => void;
};

export const OperatingHoursSetupContext =
  createContext<OperatingHoursSetupContextValue | null>(null);
