import { type TimeOption } from "../utils/timeOptions";
import DownChevron from "./DownChevron";

interface CloseTimeSelectProps {
  field: string;
  options: TimeOption[];
  selectedOption: TimeOption | null;
  handleOnClickDropdown: () => void;
  onSelectCloseOption: (opt: TimeOption) => void;
  selectedHoursOption: string | null;
  open24: boolean;
  closed: boolean;
}

const CloseTimeSelect: React.FC<CloseTimeSelectProps> = ({
  field,
  options,
  selectedOption,
  handleOnClickDropdown,
  onSelectCloseOption,
  selectedHoursOption,
  open24,
  closed,
}) => {
  const dropdownOpen = selectedHoursOption === field;
  const label = selectedOption?.label ?? "Close time";
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
          handleOnClickDropdown();
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
              onClick={() => onSelectCloseOption(opt)}
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

export default CloseTimeSelect;
