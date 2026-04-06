import { useMemo } from "react";
import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { CLOSE_TIME_OPTIONS, type TimeOption } from "../../utils/timeOptions";
import { toMinutes } from "../../utils/toMinutes";
import DownChevron from "../Icons/DownChevron";
import { useOperatingHours } from "../../ReactContext/operatingHours/UseOperatingHours";

interface CloseTimeSelectCompProps {
  day: Day;
  renderValue?: string;
}

const CloseTimeSelectComp: React.FC<CloseTimeSelectCompProps> = ({
  day,
  renderValue = "Choose Time",
}) => {
  const {
    hours,
    isEditing,
    handleClickDropdown,
    setCloseTime,
    isDropdownOpen,
  } = useOperatingHours();

  const openValue = hours[day].open;
  const closeValue = hours[day].close;

  const time =
    CLOSE_TIME_OPTIONS.find((option) => option.value === closeValue) ?? null;

  const open24 = hours[day].open24;
  const closed = hours[day].closed;

  const dropdownOpen = isDropdownOpen("closeTime", day);

  const timeOptions = useMemo(() => {
    if (closeValue === null && openValue === null) {
      return CLOSE_TIME_OPTIONS.filter((option) => option.value !== "closed");
    } else if (openValue === null) {
      return CLOSE_TIME_OPTIONS.filter((option) => option.value !== "closed");
    } else {
      return CLOSE_TIME_OPTIONS.filter(
        (option) => toMinutes(option.value) > toMinutes(openValue)
      );
    }
  }, [openValue, closeValue]);

  const handleSelectTimeOption = (ct: TimeOption) => {
    setCloseTime(day, ct);
  };

  return (
    <div className="relative">
      <div
        className={`h-7 rounded-md border-1  ${
          isEditing
            ? "border-blue-300 text-gray-900"
            : "border-slate-300 text-gray-500"
        }  px-3 text-sm outline-none
                         flex items-center justify-between
                         ${
                           closed || open24
                             ? "bg-slate-100 text-slate-500"
                             : isEditing &&
                               "bg-white hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                         }
                         `}
        onClick={() => handleClickDropdown("closeTime", day)}
      >
        <div className="text-xs line-clamp-1">{time?.label ?? renderValue}</div>
        <div>
          <DownChevron />
        </div>
      </div>
      {dropdownOpen && (
        <div
          className="border-1 border-slate-300 
            rounded-md flex flex-col z-50 bg-white overflow-y-auto 
            max-h-[224px] absolute mt-0.4 w-full shadow-lg
            "
        >
          {timeOptions.map((ct, index) => (
            <div
              key={index}
              onClick={() => handleSelectTimeOption(ct)}
              className="px-3 py-1 text-xs hover:bg-gray-100 active:bg-gray-200 "
            >
              {ct.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CloseTimeSelectComp;
