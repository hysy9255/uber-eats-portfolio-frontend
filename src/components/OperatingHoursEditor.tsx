import { useState } from "react";
import { DAYS } from "../pages/types/OwnerOnBoardingStep3Location.type";
import { DayHoursRow3 } from "./DayHoursRow3";
import type { OperatingHours } from "../pages/RestaurantPage";

interface OperatingHoursEditorProps {
  operatingHoursArray?: OperatingHours[];
}

const OperatingHoursEditor: React.FC<OperatingHoursEditorProps> = ({
  operatingHoursArray,
}) => {
  const [selectedHoursOption, setSelectedHoursOption] = useState<string | null>(
    null
  );

  return (
    <div>
      <h1 className="font-medium text-2xl">Operating Hours</h1>
      <div className="space-y-2 mt-3">
        {DAYS.map((day) => {
          return (
            <DayHoursRow3
              key={day}
              day={day}
              selectedHoursOption={selectedHoursOption}
              setSelectedHoursOption={setSelectedHoursOption}
              operatingHours={operatingHoursArray?.find(
                (oh) => oh.dayOfWeek === day
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OperatingHoursEditor;
