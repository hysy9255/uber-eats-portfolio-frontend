import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  Day,
  DayHours,
} from "../pages/types/OwnerOnBoardingStep3Location.type";
import {
  CLOSE_TIME_OPTIONS,
  OPEN_TIME_OPTIONS,
  type TimeOption,
} from "../utils/timeOptions";
import { toMinutes } from "../utils/toMinutes";
// import type { OperatingHours } from "../pages/RestaurantPage";
import TimeSelectComp from "./TimeSelects/TimeSelectComp";
import { useFormContext } from "react-hook-form";
import type { LocationAndOperatingHoursEditForm } from "./LocationAndOperatingHoursEditor";

interface DayHoursRow4Props {
  day: Day;
  activeField: string | null;
  setActiveField: (option: string | null) => void;
  //   operatingHours?: OperatingHours;
  isEditing?: boolean;
  value: DayHours;
  onChange?: (value: DayHours) => void;
}

enum Status {
  OPEN24 = "open24",
  CLOSED = "closed",
  NORMAL = "normal",
}

type StatusType = Status.OPEN24 | Status.CLOSED | Status.NORMAL;

export const DayHoursRow4: React.FC<DayHoursRow4Props> = ({
  day,
  activeField,
  setActiveField,
  isEditing,
  value,
  onChange,
}) => {
  const { reset } = useFormContext<LocationAndOperatingHoursEditForm>();

  const openHourFieldId = `hours.${day}.open`;
  const closeHourFieldId = `hours.${day}.close`;

  const [prevOpenTime, prevCloseTime] = useMemo(() => {
    return [
      OPEN_TIME_OPTIONS.find((opt) => opt.value === value?.open) ?? null,
      CLOSE_TIME_OPTIONS.find((opt) => opt.value === value?.close) ?? null,
    ];
  }, [value]);

  //   const [openTime, setOpenTime] = useState<TimeOption | null>(prevOpenTime);
  //   const [closeTime, setCloseTime] = useState<TimeOption | null>(prevCloseTime);

  const openTime = useMemo(
    () => OPEN_TIME_OPTIONS.find((opt) => opt.value === value?.open) ?? null,
    [value?.open]
  );

  const closeTime = useMemo(
    () => CLOSE_TIME_OPTIONS.find((opt) => opt.value === value?.close) ?? null,
    [value?.close]
  );

  //   const [status, setStatus] = useState<StatusType>(() => {
  //     if (value?.closed) return Status.CLOSED;
  //     if (value?.open24) return Status.OPEN24;
  //     return Status.NORMAL;
  //   });

  const status = useMemo(() => {
    if (value?.closed) return Status.CLOSED;
    if (value?.open24) return Status.OPEN24;
    return Status.NORMAL;
  }, [value]);

  const closed = status === Status.CLOSED;
  const open24 = status === Status.OPEN24;

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
    onChange?.({
      ...value,
      open: ot.value,
      open24: false,
      closed: false,
    });
    // setOpenTime(ot);
    closeDropdown();
  };

  const onSelectCloseTimeOption = (ct: TimeOption) => {
    onChange?.({ ...value, close: ct.value, open24: false, closed: false });
    // setCloseTime(ct);
    closeDropdown();
  };

  const prevClosedRef = useRef(closed);
  const prevOpen24Ref = useRef(open24);

  useEffect(() => {
    const prevClosed = prevClosedRef.current;
    const prevOpen24 = prevOpen24Ref.current;

    if (closed) {
      onChange?.({
        open: "closed",
        close: "closed",
        open24: false,
        closed: true,
      });
      //   setOpenTime({ value: "closed", label: "Closed" });
      //   setCloseTime({ value: "closed", label: "Closed" });
      closeDropdown();
    } else if (open24) {
      onChange?.({
        open: "00:00",
        close: "24:00",
        open24: false,
        closed: true,
      });
      //   setOpenTime({ value: "00:00", label: "12:00 AM" });
      //   setCloseTime({ value: "24:00", label: "12:00 AM (next day)" });
      closeDropdown();
    } else if (prevClosed || prevOpen24) {
      onChange?.({
        open: "00:00",
        close: "24:00",
        open24: false,
        closed: true,
      });
      //   setOpenTime(null);
      //   setCloseTime(null);
    }

    onChange?.({
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
    // setOpenTime,
    closeDropdown,
    day,
    openTime?.value,
    closeTime?.value,
    onChange,
    reset,
    value.open,
    value.close,
    value.open24,
    value.closed,
  ]);

  useEffect(() => {
    console.log("prevOpenTime:", prevOpenTime);
    console.log("value:", value);
  }, [prevOpenTime, value]);

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
          renderValue="Open time"
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
          renderValue="Close time"
        />
      </div>

      <div className="flex items-center gap-3 justify-center text-xs">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => {
              if (!isEditing) return;
              //   setStatus(open24 ? Status.NORMAL : Status.OPEN24);
              if (open24)
                onChange?.({
                  open: "",
                  close: "",
                  open24: false,
                  closed: false,
                });
              else if (!open24)
                onChange?.({
                  open: "00:00",
                  close: "24:00",
                  open24: true,
                  closed: false,
                });
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
              //   setStatus(closed ? Status.NORMAL : Status.CLOSED);
              if (closed)
                onChange?.({
                  open: "",
                  close: "",
                  open24: false,
                  closed: false,
                });
              else if (!closed)
                onChange?.({
                  open: "closed",
                  close: "closed",
                  open24: false,
                  closed: true,
                });
            }}
            checked={closed}
          />
          Closed
        </label>
      </div>
    </div>
  );
};
