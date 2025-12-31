import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import OperatingHoursCheckbox from "../CheckBoxes/OperatingHoursCheckbox";
import CloseTimeSelectComp from "../TimeSelects/CloseTimeSelectComp";
import OpenTimeSelectComp from "../TimeSelects/OpenTimeSelectComp";

interface DayHoursRow5Props {
  day: Day;
}

export const DayHoursRow5: React.FC<DayHoursRow5Props> = ({ day }) => {
  return (
    <div className="grid grid-cols-[30px_1fr_190px] gap-x-2">
      <div className="text-slate-600 flex items-center text-xs">{day}</div>

      <div className="gap-3 grid grid-cols-2 items-center">
        <OpenTimeSelectComp day={day} />
        <CloseTimeSelectComp day={day} />
      </div>

      <div className="flex items-center gap-3 justify-center text-xs">
        <OperatingHoursCheckbox day={day} />
      </div>
    </div>
  );
};
