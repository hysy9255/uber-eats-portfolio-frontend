import { type TimeOption } from "../utils/timeOptions";
import DownChevron from "./DownChevron";

interface OpenTimeSelectProps {
  field: string;
  options: TimeOption[];
  selectedOption: TimeOption | null;
  handleOnClickDropdown: () => void;
  onSelectOpenOption: (opt: TimeOption) => void;
  selectedHoursOption: string | null;
  // setSelectedHoursOption: (option: string | null) => void;
  open24: boolean;
  closed: boolean;
  // setOpenTime: (time: string | null) => void;
  // operatingHours?: OperatingHours;
}

const OpenTimeSelect: React.FC<OpenTimeSelectProps> = ({
  field,
  options,
  selectedOption,
  handleOnClickDropdown,
  onSelectOpenOption,
  selectedHoursOption,
  // setSelectedHoursOption,
  open24,
  closed,
  // setOpenTime,
  // operatingHours,
}) => {
  // const initialOption = useMemo(() => {
  //   return (
  //     options.find((opt) => opt.value === operatingHours?.openTime) ?? null
  //   );
  // }, [options, operatingHours]);
  // const [option, setOption] = useState<TimeOption | null>(initialOption);
  const dropdownOpen = selectedHoursOption === field;
  const label = selectedOption?.label ?? "Open time";
  // const label = option?.label ?? "Open time";

  // const closeDropdown = useCallback(() => {
  //   setSelectedHoursOption(null);
  // }, [setSelectedHoursOption]);

  // const openDropdown = (field: string) => {
  //   setSelectedHoursOption(field);
  // };

  // const disableDropdown = () => {
  //   return;
  // };

  // const handleOnClick = () => {
  //   if (closed || open24) return disableDropdown();
  //   if (selectedHoursOption === null) {
  //     openDropdown(field);
  //   } else {
  //     closeDropdown();
  //   }
  // };

  // const onSelectOption = (opt: TimeOption) => {
  //   setOption(opt);
  //   closeDropdown();
  //   setOpenTime(opt.value);
  // };

  // useEffect(() => {
  //   if (closed) {
  //     setOption({ value: "closed", label: "Closed" });
  //     closeDropdown();
  //   }
  //   if (open24) {
  //     setOption({ value: "00:00", label: "12:00 AM" });
  //     closeDropdown();
  //   }
  // }, [closed, open24, closeDropdown]);

  // useEffect(() => {
  //   if (closed || open24) return;
  //   setOption(initialOption);
  // }, [closed, open24, initialOption]);

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
              onClick={() => onSelectOpenOption(opt)}
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

export default OpenTimeSelect;
