import { useMemo } from "react";
import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { useOperatingHours } from "../../ReactContext/operatingHours/UseOperatingHours";
import {
  CLOSE_TIME_OPTIONS,
  OPEN_TIME_OPTIONS,
  type TimeOption,
} from "../../utils/timeOptions";
import DownChevron from "../Icons/DownChevron";
import { toMinutes } from "../../utils/toMinutes";

interface TimeSelectCompProps {
  renderValue?: string;
  day: Day;
  purpose: "openTime" | "closeTime";
}

const TimeSelectComp: React.FC<TimeSelectCompProps> = ({
  renderValue = "Choose time",
  day,
  purpose,
}) => {
  const {
    hours,
    isEditing,
    handleClickDropdown,
    setOpenTime,
    setCloseTime,
    isDropdownOpen,
  } = useOperatingHours();

  const openValue = hours[day].open;
  const closeValue = hours[day].close;

  const time =
    purpose === "openTime"
      ? OPEN_TIME_OPTIONS.find((option) => option.value === openValue) ?? null
      : CLOSE_TIME_OPTIONS.find((option) => option.value === closeValue) ??
        null;

  const open24 = hours[day].open24;
  const closed = hours[day].closed;

  const dropdownOpen = isDropdownOpen(purpose, day);

  const timeOptions = useMemo(() => {
    if (purpose === "openTime") {
      if (closeValue === "" && openValue === "") {
        return OPEN_TIME_OPTIONS.filter((option) => option.value !== "closed");
      } else if (closeValue === "") {
        return OPEN_TIME_OPTIONS.filter((option) => option.value !== "closed");
      } else {
        return OPEN_TIME_OPTIONS.filter(
          (option) => toMinutes(option.value) < toMinutes(closeValue)
        );
      }
    } else {
      if (closeValue === "" && openValue === "") {
        return CLOSE_TIME_OPTIONS.filter((option) => option.value !== "closed");
      } else if (openValue === "") {
        return CLOSE_TIME_OPTIONS.filter((option) => option.value !== "closed");
      } else {
        return CLOSE_TIME_OPTIONS.filter(
          (option) => toMinutes(option.value) > toMinutes(openValue)
        );
      }
    }
  }, [purpose, openValue, closeValue]);

  const handleSelectTimeOption = (ct: TimeOption) => {
    if (purpose === "openTime") setOpenTime(day, ct);
    else setCloseTime(day, ct);
  };

  return (
    <div className="relative">
      <div
        className={`h-7 rounded-md  ${
          isEditing ? "border-blue-300 border-2" : "border-slate-300 border"
        }  px-3 text-sm outline-none
                         flex items-center justify-between
                         ${
                           closed || open24
                             ? "bg-slate-100 text-slate-500"
                             : isEditing &&
                               "bg-white hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                         }
                         `}
        onClick={() => handleClickDropdown(purpose, day)}
      >
        <div className="text-xs">{time?.label ?? renderValue}</div>
        <div>
          <DownChevron />
        </div>
      </div>
      {dropdownOpen && (
        <div
          className="ring-1 ring-slate-300 
            rounded-md flex flex-col z-50 bg-white overflow-y-auto 
            max-h-[224px] absolute top-8 left-0 w-full shadow-lg
            "
        >
          {timeOptions.map((ct) => (
            <div
              onClick={() => handleSelectTimeOption(ct)}
              className="px-3 py-1 text-xs hover:bg-gray-100 active:bg-gray-200"
            >
              {ct.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSelectComp;
