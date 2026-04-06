import { useEffect, useState, type ReactNode } from "react";
import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { OperatingHoursContext } from "./OperatingHoursContext";
import type { TimeOption } from "../../utils/timeOptions";
import type { OperatingHoursDTO } from "../../dtos/restaurant/OperatingHours.dto";
import { useMyRestaurant } from "../myRestaurant/UseMyRestaurant";

interface OperatingHoursProviderProps {
  children: ReactNode;
}

export const OperatingHoursProvider: React.FC<OperatingHoursProviderProps> = ({
  children,
}) => {
  const { restaurant } = useMyRestaurant();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [hours, setHours] = useState<OperatingHoursDTO>(
    () => restaurant.restaurantSummary.operatingHours
  );

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
