import { useState } from "react";
import DownChevron from "./DownChevron";

export type DropdownOptionsType = {
  label: string;
  isDefault?: boolean;
};

interface DropdownButtonProps {
  options: DropdownOptionsType[];
  width: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, width }) => {
  const [defaultOption] = options.filter((option) => option.isDefault === true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultOption.label
  );
  const handleClickButton = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClickOption = (option: string) => {
    setSelectedValue(option);
    setDropdownOpen(false);
  };
  return (
    <button className={`hover:cursor-pointer ${width}`}>
      <div
        onClick={handleClickButton}
        className="border border-gray-300 rounded-md gap-1 grid grid-cols-[4fr_1fr]"
      >
        <div className=" flex items-start py-1 pl-2">{selectedValue}</div>
        <div className=" flex items-center justify-center">
          <DownChevron />
        </div>
      </div>
      {dropdownOpen && (
        <div
          className={`border border-gray-300 rounded-md grid grid-cols-1 absolute z-40 bg-white ${width}`}
        >
          {options.map((elem) => (
            <div
              onClick={() => handleClickOption(elem.label)}
              className="hover:bg-gray-100 flex items-start py-1 pl-2"
            >
              {elem.label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default DropdownButton;
