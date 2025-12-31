import { useMemo } from "react";
import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";
import { OPEN_TIME_OPTIONS, type TimeOption } from "../utils/timeOptions";
import { toMinutes } from "../utils/toMinutes";
import DownChevron from "./Icons/DownChevron";
import { useOperatingHoursSetup } from "../ReactContext/operatingHoursSetup/UseOperatingHoursSetup";

interface OpenTimeSelectComp2Props {
  day: Day;
  renderValue?: string;
}

const OpenTimeSelectComp2: React.FC<OpenTimeSelectComp2Props> = ({
  day,
  renderValue = "Choose Time",
}) => {
  const { hours, handleClickDropdown, setOpenTime, isDropdownOpen } =
    useOperatingHoursSetup();

  const openValue = hours[day].open;
  const closeValue = hours[day].close;

  const time =
    OPEN_TIME_OPTIONS.find((option) => option.value === openValue) ?? null;

  const open24 = hours[day].open24;
  const closed = hours[day].closed;

  const dropdownOpen = isDropdownOpen("openTime", day);

  const timeOptions = useMemo(() => {
    if (closeValue === null && openValue === null) {
      return OPEN_TIME_OPTIONS.filter((option) => option.value !== "closed");
    } else if (closeValue === null) {
      return OPEN_TIME_OPTIONS.filter((option) => option.value !== "closed");
    } else {
      return OPEN_TIME_OPTIONS.filter(
        (option) => toMinutes(option.value) < toMinutes(closeValue)
      );
    }
  }, [openValue, closeValue]);

  const handleSelectTimeOption = (ct: TimeOption) => {
    setOpenTime(day, ct);
  };

  return (
    <div className="relative">
      <div
        className={`h-7 rounded-md 
          border border-slate-300 
          px-3 text-sm outline-none
                         flex items-center justify-between
                         ${
                           closed || open24
                             ? "bg-slate-100 text-slate-500"
                             : "bg-white hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                         }
                         
                         `}
        onClick={() => handleClickDropdown("openTime", day)}
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

export default OpenTimeSelectComp2;
