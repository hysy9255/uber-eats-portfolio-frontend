import { useEffect, useState } from "react";
import DownChevron from "../Icons/DownChevron";
import { customEditInputCss } from "../../constants/CustomInputCss";

interface DropdownProps<T> {
  options: T[];
  option?: T;
  setOption: (option: T) => void;
  isEditing: boolean;
  widthCss?: string;
  isRegular?: boolean;
}

const Dropdown = <T extends string>({
  options,
  option,
  setOption,
  isEditing,
  widthCss,
  isRegular = false,
}: DropdownProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isEditing) {
      setDropdownOpen(false);
    }
  }, [isEditing]);

  const borderCss = isRegular ? "border-gray-300" : "border-blue-300";

  return (
    <div className={`relative text-sm ${widthCss}`}>
      <div
        onClick={() => {
          if (!isEditing) return;
          setDropdownOpen(!dropdownOpen);
        }}
        className={`
        ${customEditInputCss}
        ${
          isEditing
            ? `${borderCss} hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 text-gray-900`
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
              key={index}
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
