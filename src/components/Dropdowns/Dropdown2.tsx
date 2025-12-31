import { useState } from "react";
import DownChevron from "../Icons/DownChevron";
import { customInputCss } from "../../constants/CustomInputCss";

interface DropdownProps2<T> {
  options: T[];
  option: T;
  setOption: (option: T) => void;
}

const Dropdown2 = <T extends string>({
  options,
  option,
  setOption,
}: DropdownProps2<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="relative text-sm">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`
        ${customInputCss}
        hover:cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-200
        `}
      >
        <span>{option}</span>
        <DownChevron />
      </div>
      {dropdownOpen && (
        <div className="mt-0.4 border-1 border-gray-300 rounded-md absolute z-40 w-full">
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

export default Dropdown2;
