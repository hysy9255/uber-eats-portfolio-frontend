import { useEffect, useState } from "react";
import DownChevron from "../Icons/DownChevron";
import { customEditInputCss } from "../../constants/CustomInputCss";

interface DropdownProps3<T> {
  options: T[];
  option: T;
  setOption: (option: T) => void;
  isEditing: boolean;
}

const Dropdown3 = <T extends string>({
  options,
  option,
  setOption,
  isEditing,
}: DropdownProps3<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isEditing) {
      setDropdownOpen(false);
    }
  }, [isEditing]);

  return (
    <div className="relative text-sm">
      <div
        onClick={() => {
          if (!isEditing) return;
          setDropdownOpen(!dropdownOpen);
        }}
        className={`
        ${customEditInputCss}
        ${
          isEditing
            ? "border-blue-300 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 text-gray-900"
            : "border-gray-300 bg-white text-gray-500"
        }
        
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

export default Dropdown3;
