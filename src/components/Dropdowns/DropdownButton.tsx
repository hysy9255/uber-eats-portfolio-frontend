import { useState, type ReactNode } from "react";
import DownChevron from "../Icons/DownChevron";

// export type DropdownOptionsType<T> = T[];

interface DropdownButtonProps<T> {
  options: T[];
  width: string;
  filter: T;
  setFilter: (filter: T) => void;
}

const DropdownButton = <T extends ReactNode>({
  options,
  width,
  filter,
  setFilter,
}: DropdownButtonProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleClickButton = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClickOption = (option: T) => {
    setFilter(option);
    setDropdownOpen(false);
  };
  return (
    <button className={`hover:cursor-pointer ${width}`}>
      <div
        onClick={handleClickButton}
        className="border border-gray-300 rounded-md gap-1 grid grid-cols-[4fr_1fr] items-center"
      >
        <div className=" flex items-start py-1 pl-2 text-xs">{filter}</div>
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
              {elem}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default DropdownButton;
