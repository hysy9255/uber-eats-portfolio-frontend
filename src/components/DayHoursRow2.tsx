import { useEffect, useState } from "react";
import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";
import {
  CLOSE_TIME_OPTIONS,
  OPEN_TIME_OPTIONS,
  type TimeOption,
} from "../utils/timeOptions";
import TimeSelect2 from "./TimeSelect2";
import { toMinutes } from "../utils/toMinutes";

interface DayHoursRow2Props {
  day: Day;
  selectedHoursOption: string | null;
  setSelectedHoursOption: (option: string | null) => void;
}

export const DayHoursRow2: React.FC<DayHoursRow2Props> = ({
  day,
  selectedHoursOption,
  setSelectedHoursOption,
}) => {
  const [open24, setOpen24] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<string | null>(null);
  const [closeTimeOptions, setCloseTimeOptions] =
    useState<TimeOption[]>(CLOSE_TIME_OPTIONS);
  const [closeTime, setCloseTime] = useState<string | null>(null);
  const [openTimeOptions, setOpenTimeOptions] =
    useState<TimeOption[]>(OPEN_TIME_OPTIONS);

  const handleOnChangeOpen24Checkbox = () => {
    if (closed) {
      setClosed(false);
    }
    setOpen24(!open24);
    setOpenTime(null);
  };

  const handleOnChangeClosedCheckbox = () => {
    if (open24) {
      setOpen24(false);
    }
    setClosed(!closed);
    setOpenTime(null);
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

  return (
    <div className="grid grid-cols-20 ">
      <div className="col-span-1 text-slate-600 ">{day}</div>

      {/* Open */}
      <div className="col-span-12 gap-3 flex ">
        <TimeSelect2
          field={`hours.${day}.open`}
          placeholder="Open time"
          options={openTimeOptions}
          selectedHoursOption={selectedHoursOption}
          setSelectedHoursOption={setSelectedHoursOption}
          open24={open24}
          closed={closed}
          setOpenTime={setOpenTime}
        />
        <TimeSelect2
          field={`hours.${day}.close`}
          placeholder="Close time"
          options={closeTimeOptions}
          selectedHoursOption={selectedHoursOption}
          setSelectedHoursOption={setSelectedHoursOption}
          open24={open24}
          closed={closed}
          setCloseTime={setCloseTime}
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
