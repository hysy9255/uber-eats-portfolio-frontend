import BellIcon from "../Icons/BellIcon/BellIcon";

const AlarmHeader = () => {
  const number = "";
  return (
    <div className="w-[35px] h-[35px] relative">
      <BellIcon
        children={
          <div
            className={`${
              number ? "block" : "hidden"
            } text-white text-xs font-semibold`}
          >
            {number}
          </div>
        }
        className="
          absolute inset-0 bg-cover bg-center 
          flex items-center justify-center 
          hover:cursor-pointer"
      />
    </div>
  );
};

export default AlarmHeader;
