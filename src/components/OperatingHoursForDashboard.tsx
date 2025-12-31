import { useEffect, useState } from "react";
import type { OperatingHours } from "../pages/RestaurantPage";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";
import { sortArrayByDays } from "../utils/sortArrayByDays";

interface OperatingHoursForDashboard {
  operatingHours?: OperatingHours[];
}

const OperatingHoursForDashboard: React.FC<OperatingHoursForDashboard> = ({
  operatingHours,
}) => {
  const [timeStr, setTimeStr] = useState(() => new Date().toLocaleTimeString());
  const [today, setToday] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const border = "";

  useEffect(() => {
    const { day: today, time: currentTime } = getCurrentDateTime();
    setToday(today);
    const todayOphrs = operatingHours?.filter(
      (elem: OperatingHours) => elem.dayOfWeek === today
    )[0];

    if (
      todayOphrs &&
      currentTime >= todayOphrs.openTime! &&
      currentTime <= todayOphrs.closeTime!
    ) {
      setIsOpen(true);
    }

    const id = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(id);
  }, [operatingHours]);

  return (
    <div className="border border-gray-300 rounded-md">
      <header
        className={`px-4 py-2 flex justify-between items-center  border-b border-gray-300 ${border}`}
      >
        <h1 className="font-semibold text-lg">Operating Hours</h1>
        <p className="text-gray-500">{timeStr}</p>
        {isOpen ? (
          <p className="text-green-600 font-semibold">Open now</p>
        ) : (
          <p className="text-gray-600 font-semibold">Closed now</p>
        )}
      </header>

      <section className="py-2">
        {sortArrayByDays(operatingHours)?.map((ophrs, index) => {
          const styleToday = ophrs.dayOfWeek === today && "font-semibold";
          return (
            <article
              key={index}
              className={`${styleToday} text-sm group grid grid-cols-[100px_auto_auto_1fr] gap-5 hover:bg-gray-100`}
            >
              <div className={`${border} flex justify-end`}>
                {ophrs.dayOfWeek}
              </div>
              <div className="grid grid-cols-[45px_30px_45px]">
                <div className={`${border}`}>{ophrs.openTime}</div>
                <div className={`${border} flex items-center justify-center`}>
                  -
                </div>
                <div className={`${border}`}>{ophrs.closeTime}</div>
              </div>
              <div
                className={`
                  ${border}
                  text-sm font-normal 
                text-gray-500 
                  flex items-center
                  opacity-0 
                  group-hover:opacity-100
                  hover:underline 
                  hover:cursor-pointer
                  `}
              >
                Edit hours
              </div>
              <div></div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default OperatingHoursForDashboard;
