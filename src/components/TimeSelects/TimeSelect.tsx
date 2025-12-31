import type { IOwnerOnBoardingStep2Form } from "../../pages/types/OwnerOnBoardingStep2Business.type";
import { TIME_OPTIONS, type TimeOption } from "../../utils/timeOptions";
import {
  useFormContext,
  type FieldPath,
  type RegisterOptions,
} from "react-hook-form";

const TimeSelect: React.FC<{
  name: FieldPath<IOwnerOnBoardingStep2Form>;
  placeholder?: string;
  options?: TimeOption[]; // NEW: allow custom option lists
  disabled?: boolean; // NEW: disable when 24h/closed
  selectKey?: string;
  rules?: RegisterOptions<
    IOwnerOnBoardingStep2Form,
    FieldPath<IOwnerOnBoardingStep2Form>
  >;
  closeTime?: boolean; // NEW: whether this is a "close time" select (for custom options)
}> = ({
  name,
  placeholder = "Select time",
  options,
  disabled,
  selectKey,
  rules,
}) => {
  const { register } = useFormContext<IOwnerOnBoardingStep2Form>();
  const opts = options ?? TIME_OPTIONS;

  return (
    <div className="relative">
      <select
        key={selectKey}
        {...register(name, rules)}
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
        {opts.map((t) => (
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
