import React, { useState } from "react";
import TimeSelect from "./TimeSelect";
import { CLOSE_TIME_OPTIONS } from "../utils/timeOptions";
import { useFormContext, useWatch, type FieldPath } from "react-hook-form";
import type { IOwnerOnBoardingStep2Form } from "../pages/OwnerOnboardingStep3Location";

export const DayHoursRow = ({ day }: { day: string }) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<IOwnerOnBoardingStep2Form>();

  const [open24, setOpen24] = useState(false);
  const [closed, setClosed] = useState(false);

  const disabled = open24 || closed;

  return (
    <>
      <div className="md:col-span-1 text-slate-600">{day}</div>

      <div className="md:col-span-3">
        <TimeSelect
          name={`hours.${day}.open`}
          placeholder="Open time"
          disabled={disabled}
          closed={closed}
          open24={open24}
          //   defaultValue="09:00"
        />
      </div>
      <div className="md:col-span-3">
        <TimeSelect
          name={`hours.${day}.close`}
          placeholder="Close time"
          disabled={disabled}
          options={CLOSE_TIME_OPTIONS}
          closed={closed}
          open24={open24}
          closeTime={true}
          //   defaultValue="21:00"
        />
      </div>

      <div className="md:col-span-2 flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={open24}
            onChange={(e) => {
              setOpen24(e.target.checked);
              if (e.target.checked) setClosed(false);
            }}
          />
          Open 24 hours
        </label>

        <label className="inline-flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={closed}
            onChange={(e) => {
              setClosed(e.target.checked);
              if (e.target.checked) setOpen24(false);
            }}
          />
          Closed
        </label>
      </div>
    </>
  );
};
