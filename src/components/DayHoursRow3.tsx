import { useCallback, useEffect, useMemo, useState } from "react";
import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";
import {
  CLOSE_TIME_OPTIONS,
  OPEN_TIME_OPTIONS,
  type TimeOption,
} from "../utils/timeOptions";
import { toMinutes } from "../utils/toMinutes";
import OpenTimeSelect from "./OpenTimeSelect";
import CloseTimeSelect from "./CloseTimeSelect";
import type { OperatingHours } from "../pages/RestaurantPage";

interface DayHoursRow3Props {
  day: Day;
  selectedHoursOption: string | null;
  setSelectedHoursOption: (option: string | null) => void;
  operatingHours?: OperatingHours;
}

export const DayHoursRow3: React.FC<DayHoursRow3Props> = ({
  day,
  selectedHoursOption,
  setSelectedHoursOption,
  operatingHours,
}) => {
  const [closed, setClosed] = useState<boolean>(
    operatingHours?.closed ?? false
  );
  const [open24, setOpen24] = useState<boolean>(
    operatingHours?.open24Hours ?? false
  );
  const [openTime, setOpenTime] = useState<string | null>(
    operatingHours?.openTime ?? null
  );
  const [closeTime, setCloseTime] = useState<string | null>(
    operatingHours?.closeTime ?? null
  );
  const [closeTimeOptions, setCloseTimeOptions] =
    useState<TimeOption[]>(CLOSE_TIME_OPTIONS);

  const [openTimeOptions, setOpenTimeOptions] =
    useState<TimeOption[]>(OPEN_TIME_OPTIONS);

  const initialCloseOption = useMemo(() => {
    return (
      closeTimeOptions.find((opt) => opt.value === operatingHours?.closeTime) ??
      null
    );
  }, [closeTimeOptions, operatingHours]);

  const [selectedCloseOption, setSelectedCloseOption] =
    useState<TimeOption | null>(initialCloseOption);

  const initialOpenOption = useMemo(() => {
    return (
      openTimeOptions.find((opt) => opt.value === operatingHours?.openTime) ??
      null
    );
  }, [openTimeOptions, operatingHours]);

  const [selectedOpenOption, setSelectedOpenOption] =
    useState<TimeOption | null>(initialOpenOption);

  const closeDropdown = useCallback(() => {
    setSelectedHoursOption(null);
  }, [setSelectedHoursOption]);

  const openDropdown = (field: string) => {
    setSelectedHoursOption(field);
  };

  const disableDropdown = () => {
    return;
  };

  const handleOnClickDropdown = (field: string) => {
    if (closed || open24) return disableDropdown();
    if (selectedHoursOption === null) {
      openDropdown(field);
    } else {
      closeDropdown();
    }
  };

  const onSelectOpenOption = (opt: TimeOption) => {
    setSelectedOpenOption(opt);
    closeDropdown();
    setOpenTime(opt.value);
  };

  const onSelectCloseOption = (opt: TimeOption) => {
    setSelectedCloseOption(opt);
    closeDropdown();
    setCloseTime(opt.value);
  };

  const handleOnChangeOpen24Checkbox = () => {
    if (closed) {
      setClosed(false);
    }
    setOpen24(!open24);
  };

  const handleOnChangeClosedCheckbox = () => {
    if (open24) {
      setOpen24(false);
    }
    setClosed(!closed);
  };

  useEffect(() => {
    if (openTime) {
      setCloseTimeOptions(
        CLOSE_TIME_OPTIONS.filter((option) => {
          return toMinutes(option.value) > toMinutes(openTime);
        })
      );
    } else {
      setCloseTimeOptions(CLOSE_TIME_OPTIONS);
    }
    if (closeTime) {
      setOpenTimeOptions(
        OPEN_TIME_OPTIONS.filter((option) => {
          return toMinutes(option.value) < toMinutes(closeTime);
        })
      );
    } else {
      setOpenTimeOptions(OPEN_TIME_OPTIONS);
    }
  }, [openTime, closeTime]);

  useEffect(() => {
    if (closed) {
      setSelectedOpenOption({ value: "closed", label: "Closed" });
      setSelectedCloseOption({ value: "closed", label: "Closed" });
      closeDropdown();
    }
    if (open24) {
      setSelectedOpenOption({ value: "00:00", label: "12:00 AM" });
      setSelectedCloseOption({ value: "24:00", label: "12:00 AM (next day)" });
      closeDropdown();
    }
  }, [closed, open24, closeDropdown]);

  useEffect(() => {
    if (closed || open24) return;
    setSelectedOpenOption(initialOpenOption);
    setSelectedCloseOption(initialCloseOption);
  }, [closed, open24, initialOpenOption, initialCloseOption]);

  return (
    <div className="grid grid-cols-20">
      <div className="col-span-1 text-slate-600 flex items-center">{day}</div>

      {/* Open */}
      <div className="col-span-12 gap-3 flex ">
        <OpenTimeSelect
          field={`hours.${day}.open`}
          options={openTimeOptions}
          selectedOption={selectedOpenOption}
          handleOnClickDropdown={() =>
            handleOnClickDropdown(`hours.${day}.open`)
          }
          onSelectOpenOption={onSelectOpenOption}
          selectedHoursOption={selectedHoursOption}
          // setSelectedHoursOption={setSelectedHoursOption}
          open24={open24}
          closed={closed}
          // setOpenTime={setOpenTime}
          // operatingHours={operatingHours}
        />
        <CloseTimeSelect
          field={`hours.${day}.close`}
          options={closeTimeOptions}
          selectedOption={selectedCloseOption}
          handleOnClickDropdown={() =>
            handleOnClickDropdown(`hours.${day}.close`)
          }
          onSelectCloseOption={onSelectCloseOption}
          selectedHoursOption={selectedHoursOption}
          open24={open24}
          closed={closed}
          // operatingHours={operatingHours}
        />
      </div>

      <div className="col-span-3 flex items-center gap-3 justify-center ">
        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            onChange={handleOnChangeOpen24Checkbox}
            checked={open24}
          />
          Open 24 hours
        </label>

        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            onChange={handleOnChangeClosedCheckbox}
            checked={closed}
          />
          Closed
        </label>
      </div>
    </div>
  );
};
