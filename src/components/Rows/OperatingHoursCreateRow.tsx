import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import OperatingHoursCheckbox3 from "../CheckBoxes/OperatingHoursCheckbox3";
import CloseTimeSelectComp3 from "../TimeSelects/CloseTimeSelectComp3";
import OpenTimeSelectComp3 from "../TimeSelects/OpenTimeSelectComp3";

interface OperatingHoursCreateRowProps {
  day: Day;
}

const OperatingHoursCreateRow: React.FC<OperatingHoursCreateRowProps> = ({
  day,
}) => {
  return (
    <div className="grid grid-cols-[30px_1fr_190px] gap-x-2">
      <div className="text-slate-600 flex items-center text-xs">{day}</div>

      <div className="gap-3 grid grid-cols-2 items-center">
        <OpenTimeSelectComp3 day={day} />
        <CloseTimeSelectComp3 day={day} />
      </div>

      <div className="flex items-center gap-3 justify-center text-xs">
        <OperatingHoursCheckbox3 day={day} />
      </div>
    </div>
  );
};

export default OperatingHoursCreateRow;
