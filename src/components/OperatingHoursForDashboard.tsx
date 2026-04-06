import { useEffect, useState } from "react";
import { getCurrentDateTime } from "../utils/getCurrentDateTime";
import type { OperatingHoursDTO } from "../dtos/restaurant/OperatingHours.dto";

interface OperatingHoursForDashboard {
  operatingHours: OperatingHoursDTO;
}

const OperatingHoursForDashboard: React.FC<OperatingHoursForDashboard> = ({
  operatingHours,
}) => {
  const [timeStr, setTimeStr] = useState(() => new Date().toLocaleTimeString());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const days = Object.keys(operatingHours);

  useEffect(() => {
    const { day: today, time: currentTime } = getCurrentDateTime();
    const todayOphrs = operatingHours[today as keyof OperatingHoursDTO];

    if (
      todayOphrs &&
      currentTime >= todayOphrs.open! &&
      currentTime <= todayOphrs.close!
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
        className={`px-4 py-2 flex justify-between items-center  border-b border-gray-300`}
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
        {days.map((day, index) => {
          return (
            <article
              key={index}
              className={`text-sm group grid grid-cols-[100px_auto_auto_1fr] gap-5 hover:bg-gray-100`}
            >
              <div className={`flex justify-end`}>{day}</div>
              <div className="grid grid-cols-[45px_30px_45px]">
                <div>{operatingHours[day as keyof OperatingHoursDTO].open}</div>
                <div className={`flex items-center justify-center`}>-</div>
                <div>
                  {operatingHours[day as keyof OperatingHoursDTO].close}
                </div>
              </div>
              <div
                className={`
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
