import { useEffect, useState } from "react";
import type { OperatingHours } from "../pages/RestaurantPage";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";
import { sortArrayByDays } from "../utils/sortArrayByDays";
import RoundBorderXMarkButton from "./Buttons/IconBased/RoundBorderXMarkButton/RoundBorderXMarkButton";

interface OperatingHoursComp2Props {
  operatingHours?: OperatingHours[];
}

const OperatingHoursComp2: React.FC<OperatingHoursComp2Props> = ({
  operatingHours,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<string | undefined>("");
  const [closeTime, setCloseTime] = useState<string | undefined>("");
  //   const [today, setToday] = useState<string>("");
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  useEffect(() => {
    const { day: today, time: currentTime } = getCurrentDateTime();
    // setToday(today);
    const todayOphrs = operatingHours?.filter(
      (elem: OperatingHours) => elem.dayOfWeek === today
    )[0];

    setOpenTime(todayOphrs?.openTime);
    setCloseTime(todayOphrs?.closeTime);

    if (
      todayOphrs &&
      currentTime >= todayOphrs.openTime! &&
      currentTime <= todayOphrs.closeTime!
    ) {
      setIsOpen(true);
    }
  }, [operatingHours]);

  return (
    <div className="text-sm">
      <div className="flex gap-x-2">
        {isOpen ? (
          <div className="text-green-600 font-semibold">Open now</div>
        ) : (
          <div className="text-gray-600 font-semibold">Closed now</div>
        )}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-1">
          <div className={`flex justify-start`}>{openTime}</div>
          <div className={`flex items-center justify-center`}>-</div>
          <div className={`flex justify-end`}>{closeTime}</div>
        </div>
        <div
          onClick={() => setPopUpOpen(true)}
          className="hover:underline hover:cursor-pointer font-semibold"
        >
          ...more
        </div>
      </div>
      {popUpOpen && (
        <div className="absolute z-40 bg-gray-500/50 inset-0 flex items-center justify-center">
          <div
            className="
          shadow-2xl bg-white w-70 h-70 rounded-xl relative"
          >
            <RoundBorderXMarkButton
              onClick={() => setPopUpOpen(false)}
              className="absolute right-4 top-4 
              border-gray-300 hover:bg-gray-100 active:bg-gray-200"
            />

            {/* contents */}
            <div className="">
              <h3 className="text-2xl font-semibold p-4">Operating Hours</h3>
              {sortArrayByDays(operatingHours)?.map((elem) => {
                return (
                  <div className="flex gap-x-6  pl-4">
                    <div className={`flex justify-end font-semibold w-10`}>
                      {elem.dayOfWeek}
                    </div>
                    <div className={"grid grid-cols-[1fr_auto_1fr] gap-x-2"}>
                      <div className={`flex justify-start`}>
                        {elem.openTime}
                      </div>
                      <div className={`flex items-center justify-center`}>
                        -
                      </div>
                      <div className={`flex justify-end`}>{elem.closeTime}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatingHoursComp2;
