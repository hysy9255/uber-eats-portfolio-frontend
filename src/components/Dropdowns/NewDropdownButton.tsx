import { useState } from "react";
import DownChevron from "../Icons/DownChevron";

export type DayFilter = "7" | "14" | "30";

export type DayFilterOption = {
  label: string;
  value: DayFilter;
};

const options: DayFilterOption[] = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 14 days", value: "14" },
  { label: "Last 30 days", value: "30" },
];

interface NewDropdownButtonProps {
  width: string;
  filter: DayFilter;
  setFilter: (filter: DayFilter) => void;
}

const NewDropdownButton: React.FC<NewDropdownButtonProps> = ({
  width,
  filter,
  setFilter,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectedOption = options.find((option) => option.value === filter);

  const handleClickButton = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClickOption = (option: DayFilterOption) => {
    setFilter(option.value);
    setDropdownOpen(false);
  };
  return (
    <button className={`hover:cursor-pointer ${width}`}>
      <div
        onClick={handleClickButton}
        className="border border-gray-300 rounded-md gap-1 grid grid-cols-[4fr_1fr] items-center"
      >
        <div className=" flex items-start py-1 pl-2 text-xs">
          {selectedOption?.label}
        </div>
        <div className=" flex items-center justify-center">
          <DownChevron w="w-3" h="h-3" />
        </div>
      </div>
      {dropdownOpen && (
        <div
          className={`mt-[1px] border border-gray-300 rounded-md grid grid-cols-1 absolute z-40 bg-white ${width}`}
        >
          {options.map((elem, index) => (
            <div
              onClick={() => handleClickOption(elem)}
              className={`hover:bg-gray-100 flex items-start py-1 pl-2 text-xs ${
                index === 0 && "hover:rounded-t-md"
              } ${index + 1 === options.length && "hover:rounded-b-md"}`}
            >
              {elem.label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default NewDropdownButton;
