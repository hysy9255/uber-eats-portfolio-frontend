import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";
import {
  CLOSE_TIME_OPTIONS,
  OPEN_TIME_OPTIONS,
  type TimeOption,
} from "../utils/timeOptions";
import { toMinutes } from "../utils/toMinutes";
import type { OperatingHours } from "../pages/RestaurantPage";
import TimeSelectComp from "./TimeSelects/TimeSelectComp";
import { useFormContext } from "react-hook-form";
import type { LocationAndOperatingHoursEditForm } from "./LocationAndOperatingHoursEditor";

interface DayHoursRow3Props {
  day: Day;
  activeField: string | null;
  setActiveField: (option: string | null) => void;
  operatingHours?: OperatingHours;
  isEditing?: boolean;
}

enum Status {
  OPEN24 = "open24",
  CLOSED = "closed",
  NORMAL = "normal",
}

type StatusType = Status.OPEN24 | Status.CLOSED | Status.NORMAL;

export const DayHoursRow3: React.FC<DayHoursRow3Props> = ({
  day,
  activeField,
  setActiveField,
  operatingHours,
  isEditing,
}) => {
  const { setValue } = useFormContext<LocationAndOperatingHoursEditForm>();

  const openHourFieldId = `hours.${day}.open`;
  const closeHourFieldId = `hours.${day}.close`;

  // const [prevOpenTime, prevCloseTime] = useMemo(() => {
  //   return [
  //     OPEN_TIME_OPTIONS.find((opt) => opt.value === operatingHours?.openTime) ??
  //       null,
  //     CLOSE_TIME_OPTIONS.find(
  //       (opt) => opt.value === operatingHours?.closeTime
  //     ) ?? null,
  //   ];
  // }, [operatingHours]);

  const [prevOpenTime, setPrevOpenTime] = useState<TimeOption | null>(null);
  const [prevCloseTime, setPrevCloseTime] = useState<TimeOption | null>(null);

  useEffect(() => {
    setPrevOpenTime(
      OPEN_TIME_OPTIONS.find((opt) => opt.value === operatingHours?.openTime) ??
        null
    );

    setPrevCloseTime(
      CLOSE_TIME_OPTIONS.find(
        (opt) => opt.value === operatingHours?.closeTime
      ) ?? null
    );
  }, [operatingHours]);

  // const [prevOpenTime, prevCloseTime] = useMemo(() => {
  //   return [
  //     OPEN_TIME_OPTIONS.find((opt) => opt.value === operatingHours?.openTime) ??
  //       null,
  //     CLOSE_TIME_OPTIONS.find(
  //       (opt) => opt.value === operatingHours?.closeTime
  //     ) ?? null,
  //   ];
  // }, [operatingHours]);

  const [status, setStatus] = useState<StatusType>(() => {
    if (operatingHours?.closed) return Status.CLOSED;
    if (operatingHours?.open24Hours) return Status.OPEN24;
    return Status.NORMAL;
  });

  const closed = status === Status.CLOSED;
  const open24 = status === Status.OPEN24;

  const [openTime, setOpenTime] = useState<TimeOption | null>(prevOpenTime);
  const [closeTime, setCloseTime] = useState<TimeOption | null>(prevCloseTime);

  useEffect(() => {
    setOpenTime(prevOpenTime);
    setCloseTime(prevCloseTime);
  }, [prevOpenTime, prevCloseTime]);

  const handleOnClickDropdown = (fieldId: string) => {
    if (!isEditing) return;
    if (closed || open24) return; // disable dropdown
    if (!activeField) {
      setActiveField(fieldId); // open dropdown
    } else {
      setActiveField(null); // close dropdown
    }
  };

  const closeDropdown = useCallback(() => {
    setActiveField(null);
  }, [setActiveField]);

  const onSelectOpenTimeOption = (ot: TimeOption) => {
    setOpenTime(ot);
    closeDropdown();
  };

  const onSelectCloseTimeOption = (ct: TimeOption) => {
    setCloseTime(ct);
    closeDropdown();
  };

  const prevClosedRef = useRef(closed);
  const prevOpen24Ref = useRef(open24);

  useEffect(() => {
    const prevClosed = prevClosedRef.current;
    const prevOpen24 = prevOpen24Ref.current;

    if (closed) {
      setOpenTime({ value: "closed", label: "Closed" });
      setCloseTime({ value: "closed", label: "Closed" });
      closeDropdown();
    } else if (open24) {
      setOpenTime({ value: "00:00", label: "12:00 AM" });
      setCloseTime({ value: "24:00", label: "12:00 AM (next day)" });
      closeDropdown();
    } else if (prevClosed || prevOpen24) {
      setOpenTime(prevOpenTime);
      setCloseTime(prevCloseTime);
    }

    setValue(`hours.${day}`, {
      open: openTime?.value ?? "",
      close: closeTime?.value ?? "",
      open24,
      closed,
    });

    // ref 업데이트
    prevClosedRef.current = closed;
    prevOpen24Ref.current = open24;
  }, [
    closed,
    open24,
    prevOpenTime,
    prevCloseTime,
    setOpenTime,
    closeDropdown,
    setValue,
    day,
    openTime?.value,
    closeTime?.value,
  ]);

  return (
    <div className="grid grid-cols-[30px_1fr_190px] gap-x-2">
      <div className="text-slate-600 flex items-center text-xs">{day}</div>

      {/* Open */}
      <div className="gap-3 grid grid-cols-2 items-center">
        <TimeSelectComp
          timeOptions={useMemo(() => {
            return closeTime
              ? OPEN_TIME_OPTIONS.filter(
                  (option) =>
                    toMinutes(option.value) < toMinutes(closeTime.value)
                )
              : OPEN_TIME_OPTIONS;
          }, [closeTime])}
          time={openTime}
          open24={open24}
          closed={closed}
          dropdownOpen={activeField === openHourFieldId}
          handleOnClickDropdown={() => handleOnClickDropdown(openHourFieldId)}
          onSelectTimeOption={onSelectOpenTimeOption}
          isEditing={isEditing}
        />
        <TimeSelectComp
          timeOptions={useMemo(() => {
            return openTime
              ? CLOSE_TIME_OPTIONS.filter(
                  (option) =>
                    toMinutes(option.value) > toMinutes(openTime.value)
                )
              : CLOSE_TIME_OPTIONS;
          }, [openTime])}
          time={closeTime}
          open24={open24}
          closed={closed}
          dropdownOpen={activeField === closeHourFieldId}
          handleOnClickDropdown={() => handleOnClickDropdown(closeHourFieldId)}
          onSelectTimeOption={onSelectCloseTimeOption}
          isEditing={isEditing}
        />
      </div>

      <div className="flex items-center gap-3 justify-center text-xs">
        <label className="inline-flex items-center gap-2">
          <input
            className=""
            type="checkbox"
            onChange={() => {
              if (!isEditing) return;
              setStatus(open24 ? Status.NORMAL : Status.OPEN24);
            }}
            checked={open24}
          />
          Open 24 hours
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => {
              if (!isEditing) return;
              setStatus(closed ? Status.NORMAL : Status.CLOSED);
            }}
            checked={closed}
          />
          Closed
        </label>
      </div>
    </div>
  );
};
