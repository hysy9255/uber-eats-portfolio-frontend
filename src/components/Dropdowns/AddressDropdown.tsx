import DownChevron from "../Icons/DownChevron";

interface AddressDropdownProps {
  onClick: () => void;
  isDropdownOpen: boolean;
}

const AddressDropdown: React.FC<AddressDropdownProps> = ({
  onClick,
  isDropdownOpen,
}) => {
  return (
    <div
      onClick={onClick}
      className="
                 bg-white grid grid-cols-[6fr_1fr]
                 text-sm font-medium relative"
    >
      <div className="px-4 py-2">Mokdong dong-ro 257 </div>
      <div className="flex items-center justify-center hover:cursor-pointer">
        <DownChevron />
      </div>
      {isDropdownOpen && (
        <div
          onClick={onClick}
          className="
                absolute
                px-4 py-2
                top-10
                bg-white
                hover:bg-gray-100
                 w-full
                "
        >
          Mokdong dong-ro 257
        </div>
      )}
    </div>
  );
};

export default AddressDropdown;
