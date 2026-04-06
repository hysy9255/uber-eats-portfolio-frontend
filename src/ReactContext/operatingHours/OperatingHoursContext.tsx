import { createContext } from "react";
import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import type { TimeOption } from "../../utils/timeOptions";
import type { OperatingHoursDTO } from "../../dtos/restaurant/OperatingHours.dto";

export type OperatingHoursContextValue = {
  hours: OperatingHoursDTO;
  setHours: React.Dispatch<React.SetStateAction<OperatingHoursDTO>>;
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
