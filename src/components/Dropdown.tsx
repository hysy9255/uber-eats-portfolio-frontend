import { useState } from "react";
import DownChevron from "./DownChevron";

interface DropdownProps<T> {
  options: T[];
  option: T;
  setOption: (option: T) => void;
}

const Dropdown = <T extends string>({
  options,
  option,
  setOption,
}: DropdownProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="border-1 border-gray-300 
        w-50 p-2 
        flex items-center justify-between 
        rounded-md 
        hover:cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-200"
      >
        <span>{option}</span>
        <DownChevron />
      </div>
      {dropdownOpen && (
        <div className="mt-1 border-1 border-gray-300 rounded-md absolute z-40 w-50">
          {options.map((option, index) => (
            <div
              onClick={() => {
                setOption(option);
                setDropdownOpen(false);
              }}
              className={`${options.length === index + 1 && "rounded-b-md"} ${
                index === 0 && "rounded-t-md"
              } flex items-baseline px-2 py-1 hover:cursor-pointer bg-white hover:bg-gray-100 border-2 border-white`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
