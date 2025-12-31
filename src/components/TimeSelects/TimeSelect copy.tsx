import { useEffect, useState } from "react";
import { TIME_OPTIONS, type TimeOption } from "../../utils/timeOptions";

const TimeSelect: React.FC<{
  closed: boolean;
  open24: boolean;
  name?: string;
  defaultValue?: string; // e.g. "09:00"
  placeholder?: string;
  options?: TimeOption[]; // NEW: allow custom option lists
  disabled?: boolean; // NEW: disable when 24h/closed
  closeTime?: boolean; // NEW: whether this is a "close time" select (for custom options)
}> = ({
  closed,
  open24,
  name,
  defaultValue,
  placeholder = "Select time",
  options,
  disabled,
  closeTime,
}) => {
  const [val, setVal] = useState("");

  useEffect(() => {
    if (open24) {
      setVal(closeTime ? "24:00" : "00:00");
    }
    if (!open24 && !closed) {
      setVal("");
    }
    if (closed) {
      setVal("");
    }
  }, [open24, closeTime, closed]);

  return (
    <div className="relative">
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        key={closed ? "closed" : `open-${defaultValue ?? "none"}`}
        name={name}
        defaultValue={defaultValue ?? ""}
        disabled={disabled}
        className={`appearance-none w-full h-10 rounded-xl ring-1 ring-slate-300 px-3 pr-8 bg-white text-sm outline-none
                    focus:ring-slate-400 ${
                      disabled
                        ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                        : ""
                    }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {(options ?? TIME_OPTIONS).map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default TimeSelect;
