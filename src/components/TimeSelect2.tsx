import { useCallback, useEffect, useState } from "react";
import { type TimeOption } from "../utils/timeOptions";
import DownChevron from "./DownChevron";

interface TimeSelect2Props {
  field: string;
  placeholder?: string;
  options: TimeOption[];
  selectedHoursOption: string | null;
  setSelectedHoursOption: (option: string | null) => void;
  open24: boolean;
  closed: boolean;
  setOpenTime?: (time: string | null) => void;
  setCloseTime?: (time: string | null) => void;
  //   openTime?: string | null;
}

const TimeSelect2: React.FC<TimeSelect2Props> = ({
  field,
  placeholder,
  options,
  selectedHoursOption,
  setSelectedHoursOption,
  open24,
  closed,
  setOpenTime,
  setCloseTime,
}) => {
  const [option, setOption] = useState<TimeOption | null>(null);
  const dropdownOpen = selectedHoursOption === field;
  const label = option?.label ?? placeholder;

  const closeDropdown = useCallback(() => {
    setSelectedHoursOption(null);
  }, [setSelectedHoursOption]);

  const openDropdown = (field: string) => {
    setSelectedHoursOption(field);
  };

  const disableDropdown = () => {
    return;
  };

  const handleOnClick = () => {
    if (closed || open24) return disableDropdown();
    if (selectedHoursOption === null) {
      openDropdown(field);
    } else {
      closeDropdown();
    }
  };

  const onSelectOption = (opt: TimeOption) => {
    setOption(opt);
    closeDropdown();
    if (setOpenTime) {
      setOpenTime(opt.value);
    }
    if (setCloseTime) {
      setCloseTime(opt.value);
    }
  };

  useEffect(() => {
    if (closed) {
      setOption({ value: "closed", label: "Closed" });
      closeDropdown();
      if (setOpenTime) {
        setOpenTime(null);
      }
      if (setCloseTime) {
        setCloseTime(null);
      }
    } else {
      setOption(null);
    }
    if (open24) {
      const state = field.split(".").pop();
      if (state === "open") {
        setOption({ value: "00:00", label: "12:00 AM" });
      } else if (state === "close") {
        setOption({ value: "24:00", label: "12:00 AM (next day)" });
      }
      closeDropdown();
      if (setOpenTime) {
        setOpenTime(null);
      }
      if (setCloseTime) {
        setCloseTime(null);
      }
    }
  }, [closed, open24, field, closeDropdown, setOpenTime, setCloseTime]);

  return (
    <div className="relative w-full">
      <div
        className={`h-10 rounded-md ring-1 ring-slate-300 px-3  text-sm outline-none
                     flex items-center justify-between
                     ${
                       closed || open24
                         ? "bg-slate-100 text-slate-500"
                         : "bg-white hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                     }
                     `}
        onClick={() => {
          handleOnClick();
        }}
      >
        <div>{label}</div>
        <div>
          <DownChevron />
        </div>
      </div>
      {dropdownOpen && (
        <div
          className="ring-1 ring-slate-300 
        rounded-md flex flex-col z-50 bg-white overflow-y-auto 
        max-h-[224px] absolute top-11 left-0 w-full shadow-lg
        "
        >
          {options.map((opt) => (
            <div
              onClick={() => onSelectOption(opt)}
              className="px-3 py-1 text-sm hover:bg-gray-100 active:bg-gray-200"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSelect2;
