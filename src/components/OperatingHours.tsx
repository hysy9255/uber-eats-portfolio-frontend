import React, { useEffect, useState } from "react";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";
import type { OperatingHours } from "../pages/RestaurantPage";
import { convertToAMPM } from "../utils/convertToAMPM";
import RightChevron from "./Icons/RightChevron";
import DownChevron from "./Icons/DownChevron";
import { sortArrayByDays } from "../utils/sortArrayByDays";

const borderOn = "";

type OperatingHoursCompProps = {
  operatingHours?: OperatingHours[];
  gridCols: string;
};

type RestaurantHoursRowProps = {
  firstCol: string;
  secondCol: string;
  thirdCol: string;
  fourthCol: string;
  fifthCol: string;
  todayStyle: string | boolean;
  innerColGrid: string;
};

const RestaurantHoursRow: React.FC<RestaurantHoursRowProps> = ({
  firstCol,
  secondCol,
  thirdCol,
  fourthCol,
  fifthCol,
  todayStyle,
  innerColGrid,
}) => {
  return (
    <>
      <div className={`flex justify-end ${borderOn} ${todayStyle}`}>
        {firstCol}
      </div>
      <div className={innerColGrid}>
        <div className={`flex justify-start ${borderOn} ${todayStyle}`}>
          {convertToAMPM(secondCol)}
        </div>
        <div className={`flex items-center justify-center ${borderOn}`}>
          {thirdCol}
        </div>
        <div className={`flex justify-end ${borderOn} ${todayStyle}`}>
          {convertToAMPM(fourthCol)}
        </div>
        <div>{fifthCol}</div>
      </div>
    </>
  );
};

type RestaurantHoursRowHeaderProps = {
  secondCol: string | undefined;
  thirdCol: string;
  fourthCol: string | undefined;
  hoursOpen: boolean;
  isOpen: boolean;
  setHoursOpen: (value: boolean) => void;
  innerColGrid: string;
};

const RestaurantHoursRowHeader: React.FC<RestaurantHoursRowHeaderProps> = ({
  secondCol,
  thirdCol,
  fourthCol,
  hoursOpen,
  isOpen,
  setHoursOpen,
  innerColGrid,
}) => {
  return (
    <>
      <div className={`flex justify-end ${borderOn}`}>
        {isOpen ? (
          <div className="text-green-600 font-semibold">Open now</div>
        ) : (
          <div className="text-gray-600 font-semibold">Closed now</div>
        )}
      </div>
      <div className={innerColGrid}>
        <div className={`flex justify-start ${borderOn}`}>
          {convertToAMPM(secondCol)}
        </div>
        <div className={`flex items-center justify-center ${borderOn}`}>
          {thirdCol}
        </div>
        <div className={`flex justify-end ${borderOn}`}>
          {convertToAMPM(fourthCol)}
        </div>
        {hoursOpen ? (
          <div
            className={`px-2 ${borderOn} flex items-center justify-center`}
            onClick={() => setHoursOpen(false)}
          >
            <DownChevron />
          </div>
        ) : (
          <div
            className={`px-2 ${borderOn} flex items-center justify-center`}
            onClick={() => setHoursOpen(true)}
          >
            <RightChevron />
          </div>
        )}
      </div>
    </>
  );
};

const OperatingHoursComp: React.FC<OperatingHoursCompProps> = ({
  operatingHours,
  gridCols,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<string | undefined>("");
  const [closeTime, setCloseTime] = useState<string | undefined>("");
  const [hoursOpen, setHoursOpen] = useState<boolean>(false);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    const { day: today, time: currentTime } = getCurrentDateTime();
    setToday(today);
    const todayOphrs = operatingHours?.filter(
      (elem: OperatingHours) => elem.dayOfWeek === today
    )[0];

    setOpenTime(convertToAMPM(todayOphrs?.openTime));
    setCloseTime(convertToAMPM(todayOphrs?.closeTime));

    if (
      todayOphrs &&
      currentTime >= todayOphrs.openTime! &&
      currentTime <= todayOphrs.closeTime!
    ) {
      setIsOpen(true);
    }
  }, [operatingHours]);

  return (
    <div
      className={`grid grid-cols-[auto_auto] gap-x-4 select-none ${borderOn}`}
    >
      <RestaurantHoursRowHeader
        secondCol={openTime}
        thirdCol="-"
        fourthCol={closeTime}
        hoursOpen={hoursOpen}
        isOpen={isOpen}
        setHoursOpen={setHoursOpen}
        innerColGrid={`grid ${gridCols} gap-x-2 ${borderOn} border-red-700`}
      />

      {hoursOpen && (
        <>
          {sortArrayByDays(operatingHours)?.map((elem) => {
            const styleToday = elem.dayOfWeek === today && "font-semibold";
            return (
              <RestaurantHoursRow
                firstCol={elem.dayOfWeek}
                secondCol={elem.openTime}
                thirdCol="-"
                fourthCol={elem.closeTime}
                fifthCol=""
                todayStyle={styleToday}
                innerColGrid={`grid ${gridCols} gap-x-2 ${borderOn} border-red-700`}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default OperatingHoursComp;
