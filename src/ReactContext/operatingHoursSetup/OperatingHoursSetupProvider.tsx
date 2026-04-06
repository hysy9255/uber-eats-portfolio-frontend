import { useState, type ReactNode } from "react";
import { type Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { type TimeOption } from "../../utils/timeOptions";
import { useFormContext, useWatch } from "react-hook-form";
import { OperatingHoursSetupContext } from "./OperatingHoursSetupContext";
import type { OwnerOnBoardingForm } from "../../components/Layout/OwnerOnBoardLayout";

interface OperatingHoursSetupProviderProps {
  children: ReactNode;
}

export const OperatingHoursSetupProvider: React.FC<
  OperatingHoursSetupProviderProps
> = ({ children }) => {
  const { setValue, control, getValues } =
    useFormContext<OwnerOnBoardingForm>();
  const hours = useWatch({ control, name: "step3.hours" });

  const [activeField, setActiveField] = useState<string | null>(null);

  const setOpenTime = (day: Day, timeOption: TimeOption) => {
    setValue(`step3.hours.${day}.open`, timeOption.value);
    setValue(`step3.hours.${day}.open24`, false);
    setValue(`step3.hours.${day}.closed`, false);
    setActiveField(null);
  };

  const setCloseTime = (day: Day, timeOption: TimeOption) => {
    setValue(`step3.hours.${day}.close`, timeOption.value);
    setValue(`step3.hours.${day}.open24`, false);
    setValue(`step3.hours.${day}.closed`, false);
    setActiveField(null);
  };

  const handleClickCheckBox = (day: Day, type: "closed" | "open24") => {
    if (type === "closed") {
      const isClosed = getValues(`step3.hours.${day}.closed`);
      if (isClosed) {
        setValue(`step3.hours.${day}`, {
          open: null,
          close: null,
          open24: false,
          closed: false,
        });
      } else {
        setValue(`step3.hours.${day}`, {
          open: "closed",
          close: "closed",
          open24: false,
          closed: true,
        });
      }
    } else if (type === "open24") {
      const isOpen24 = getValues(`step3.hours.${day}.open24`);
      if (isOpen24) {
        setValue(`step3.hours.${day}`, {
          open: null,
          close: null,
          open24: false,
          closed: false,
        });
      } else {
        setValue(`step3.hours.${day}`, {
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
