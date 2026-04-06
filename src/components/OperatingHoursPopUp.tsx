import type { OperatingHoursDTO } from "../dtos/restaurant/OperatingHours.dto";
import { sortArrayByDays } from "../utils/sortArrayByDays";

interface OperatingHoursPopUpProps {
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  operatingHours?: OperatingHoursDTO;
}

const OperatingHoursPopUp: React.FC<OperatingHoursPopUpProps> = ({
  setPopUpOpen,
  operatingHours,
}) => {
  return (
    <div className="fixed z-400 bg-black/50 inset-0 flex items-center justify-center">
      <div className=" bg-white w-100 rounded-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium py-5">Store Operating Hours</h3>
          <div className="mb-3 w-full px-5 space-y-1">
            {sortArrayByDays(operatingHours)?.map((elem) => {
              return (
                <div className="flex gap-x-13 hover:bg-gray-200/30 justify-center">
                  <div className={`flex justify-end font-semibold w-8`}>
                    {elem.day}
                  </div>
                  <div className={"grid grid-cols-[1fr_auto_1fr] gap-x-2"}>
                    <div className={`flex justify-start`}>{elem.open}</div>
                    <div className={`flex items-center justify-center`}>-</div>
                    <div className={`flex justify-end`}>{elem.close}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t border-gray-300 p-5">
          <button
            onClick={() => setPopUpOpen(false)}
            className="
                  w-full
                  border border-black/30
                  hover:cursor-pointer p-1 flex items-center 
                  justify-center mx-auto rounded-sm 
                  font-semibold
                  text-black/70 bg-gray-300/20 hover:bg-gray-300/30 active:bg-gray-300/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperatingHoursPopUp;
