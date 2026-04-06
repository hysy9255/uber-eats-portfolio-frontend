import { useEffect, useState } from "react";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";
import type { OperatingHoursDTO } from "../dtos/restaurant/OperatingHours.dto";
import OperatingHoursPopUp from "./OperatingHoursPopUp";

interface OperatingHoursCompProps {
  operatingHours?: OperatingHoursDTO;
}

const OperatingHoursComp: React.FC<OperatingHoursCompProps> = ({
  operatingHours,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<string>();
  const [closeTime, setCloseTime] = useState<string>();
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  useEffect(() => {
    const { day: today, time: currentTime } = getCurrentDateTime();
    const todayOphrs = operatingHours?.[today as keyof OperatingHoursDTO];

    setOpenTime(todayOphrs?.open);
    setCloseTime(todayOphrs?.close);

    if (
      todayOphrs &&
      currentTime >= todayOphrs.open! &&
      currentTime <= todayOphrs.close!
    ) {
      setIsOpen(true);
    }
  }, [operatingHours]);

  useEffect(() => {
    if (!popUpOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [popUpOpen]);

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
        <OperatingHoursPopUp
          setPopUpOpen={setPopUpOpen}
          operatingHours={operatingHours}
        />
        // <div className="fixed z-400 bg-black/50 inset-0 flex items-center justify-center">
        //   <div className=" bg-white w-100 rounded-xl overflow-hidden">
        //     <div className="flex flex-col items-center justify-center">
        //       <h3 className="text-xl font-medium py-5">
        //         Store Operating Hours
        //       </h3>
        //       <div className="mb-3 w-full px-5 space-y-1">
        //         {sortArrayByDays(operatingHours)?.map((elem) => {
        //           return (
        //             <div className="flex gap-x-13 hover:bg-gray-200/30 justify-center">
        //               <div className={`flex justify-end font-semibold w-8`}>
        //                 {elem.day}
        //               </div>
        //               <div className={"grid grid-cols-[1fr_auto_1fr] gap-x-2"}>
        //                 <div className={`flex justify-start`}>{elem.open}</div>
        //                 <div className={`flex items-center justify-center`}>
        //                   -
        //                 </div>
        //                 <div className={`flex justify-end`}>{elem.close}</div>
        //               </div>
        //             </div>
        //           );
        //         })}
        //       </div>
        //     </div>
        //     <div className="border-t border-gray-300 p-5">
        //       <button
        //         onClick={() => setPopUpOpen(false)}
        //         className="
        //         w-full
        //         border border-black/30
        //         hover:cursor-pointer p-1 flex items-center
        //         justify-center mx-auto rounded-sm
        //         font-semibold
        //         text-black/70 bg-gray-300/20 hover:bg-gray-300/30 active:bg-gray-300/40"
        //       >
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default OperatingHoursComp;
