import { useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  Day,
  DayHours,
} from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { DEFAULT_INITIAL_HOURS } from "../../constants/DefaultInitialHours";
import { OperatingHoursContext } from "./OperatingHoursContext";
import type { OwnerDashboardContext } from "../../components/Shells/OwnerDashboardShell";
import { useOutletContext } from "react-router-dom";
import type { TimeOption } from "../../utils/timeOptions";

interface OperatingHoursProviderProps {
  children: ReactNode;
}

export const OperatingHoursProvider: React.FC<OperatingHoursProviderProps> = ({
  children,
}) => {
  const { restaurant } = useOutletContext<OwnerDashboardContext>();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const initialHours = useMemo(() => {
    if (!restaurant?.operatingHours) return DEFAULT_INITIAL_HOURS;

    return restaurant.operatingHours.reduce(
      (acc, { dayOfWeek, openTime, closeTime, open24Hours, closed }) => {
        acc[dayOfWeek] = {
          open: openTime,
          close: closeTime,
          open24: open24Hours,
          closed,
        };
        return acc;
      },
      {} as Record<Day, DayHours>
    );
  }, [restaurant?.operatingHours]);
  const [hours, setHours] = useState<Record<Day, DayHours>>(() => initialHours);

  useEffect(() => {
    setHours(initialHours);
  }, [initialHours]);

  useEffect(() => {
    if (!isEditing) setActiveField(null);
  }, [isEditing]);

  const handleClickDropdown = (purpose: string, day: Day) => {
    if (!isEditing) return;
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

  const setOpenTime = (day: Day, timeOption: TimeOption) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: timeOption.value },
    }));
    closeDropdown();
  };

  const setCloseTime = (day: Day, timeOption: TimeOption) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], close: timeOption.value },
    }));
    closeDropdown();
  };

  const isDropdownOpen = (purpose: string, day: Day) => {
    const hourFieldId =
      purpose === "openTime"
        ? getOpenHourFieldId(day)
        : getCloseHourFieldId(day);
    return activeField === hourFieldId;
  };

  return (
    <OperatingHoursContext.Provider
      value={{
        hours,
        setHours,
        initialHours,
        activeField,
        setActiveField,
        isEditing,
        setIsEditing,
        handleClickDropdown,
        closeDropdown,
        setOpenTime,
        setCloseTime,
        isDropdownOpen,
      }}
    >
      {children}
    </OperatingHoursContext.Provider>
  );
};
