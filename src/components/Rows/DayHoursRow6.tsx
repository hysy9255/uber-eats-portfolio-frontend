import type { Day } from "../pages/types/OwnerOnBoardingStep3Location.type";
import CloseTimeSelectComp2 from "./TimeSelects/CloseTimeSelectComp2";
import OpenTimeSelectComp2 from "./OpenTimeSelectComp2";
import OperatingHoursCheckbox2 from "./CheckBoxes/OperatingHoursCheckbox2";

interface DayHoursRow6Props {
  day: Day;
}

const DayHoursRow6: React.FC<DayHoursRow6Props> = ({ day }) => {
  return (
    <div className="grid grid-cols-[30px_1fr_190px] gap-x-2">
      <div className="text-slate-600 flex items-center text-xs">{day}</div>

      <div className="gap-3 grid grid-cols-2 items-center">
        <OpenTimeSelectComp2 day={day} />
        <CloseTimeSelectComp2 day={day} />
      </div>

      <div className="flex items-center gap-3 justify-center text-xs">
        <OperatingHoursCheckbox2 day={day} />
      </div>
    </div>
  );
};

export default DayHoursRow6;
