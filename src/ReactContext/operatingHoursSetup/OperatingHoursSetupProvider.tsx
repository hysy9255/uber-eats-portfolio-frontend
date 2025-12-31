import { useState, type ReactNode } from "react";
import {
  type Day,
  type IOwnerOnBoardingStep3Form,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";

import { type TimeOption } from "../../utils/timeOptions";
import { OperatingHoursSetupContext } from "./operatingHoursSetupContext";
import { useFormContext, useWatch } from "react-hook-form";

interface OperatingHoursSetupProviderProps {
  children: ReactNode;
}

export const OperatingHoursSetupProvider: React.FC<
  OperatingHoursSetupProviderProps
> = ({ children }) => {
  const { setValue, control, getValues } =
    useFormContext<IOwnerOnBoardingStep3Form>();
  const hours = useWatch({ control, name: "hours" });

  const [activeField, setActiveField] = useState<string | null>(null);

  const setOpenTime = (day: Day, timeOption: TimeOption) => {
    setValue(`hours.${day}.open`, timeOption.value);
    setValue(`hours.${day}.open24`, false);
    setValue(`hours.${day}.closed`, false);
    setActiveField(null);
  };

  const setCloseTime = (day: Day, timeOption: TimeOption) => {
    setValue(`hours.${day}.close`, timeOption.value);
    setValue(`hours.${day}.open24`, false);
    setValue(`hours.${day}.closed`, false);
    setActiveField(null);
  };

  const handleClickCheckBox = (day: Day, type: "closed" | "open24") => {
    if (type === "closed") {
      const isClosed = getValues(`hours.${day}.closed`);
      if (isClosed) {
        setValue(`hours.${day}`, {
          open: null,
          close: null,
          open24: false,
          closed: false,
        });
      } else {
        setValue(`hours.${day}`, {
          open: "closed",
          close: "closed",
          open24: false,
          closed: true,
        });
      }
    } else if (type === "open24") {
      const isOpen24 = getValues(`hours.${day}.open24`);
      if (isOpen24) {
        setValue(`hours.${day}`, {
          open: null,
          close: null,
          open24: false,
          closed: false,
        });
      } else {
        setValue(`hours.${day}`, {
          open: "00:00",
          close: "24:00",
          open24: true,
          closed: false,
        });
      }
    }
  };

  const handleClickDropdown = (purpose: string, day: Day) => {
    if (hours[day].closed || hours[day].open24) return; // disable dropdown

    const fieldId =
      purpose === "openTime"
        ? getOpenHourFieldId(day)
        : getCloseHourFieldId(day);

    if (!activeField) {
      setActiveField(fieldId); // open dropdown
    } else {
      setActiveField(null); // close dropdown
    }
  };

  const getOpenHourFieldId = (day: Day) => `hours.${day}.open`;
  const getCloseHourFieldId = (day: Day) => `hours.${day}.close`;

  const closeDropdown = () => {
    setActiveField(null);
  };

  const isDropdownOpen = (purpose: string, day: Day) => {
    const hourFieldId =
      purpose === "openTime"
        ? getOpenHourFieldId(day)
        : getCloseHourFieldId(day);
    return activeField === hourFieldId;
  };

  return (
    <OperatingHoursSetupContext.Provider
      value={{
        hours,
        handleClickCheckBox,
        activeField,
        setActiveField,
        handleClickDropdown,
        closeDropdown,
        setOpenTime,
        setCloseTime,
        isDropdownOpen,
      }}
    >
      {children}
    </OperatingHoursSetupContext.Provider>
  );
};
