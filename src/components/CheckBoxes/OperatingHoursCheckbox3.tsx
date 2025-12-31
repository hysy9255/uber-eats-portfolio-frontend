import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { useOperatingHoursSetup } from "../../ReactContext/operatingHoursSetup/UseOperatingHoursSetup";

interface OperatingHoursCheckbox3Props {
  day: Day;
}

const OperatingHoursCheckbox3: React.FC<OperatingHoursCheckbox3Props> = ({
  day,
}) => {
  const { handleClickCheckBox, closeDropdown, hours } =
    useOperatingHoursSetup();

  return (
    <>
      <label className="inline-flex items-center gap-2">
        <input
          className=""
          type="checkbox"
          onChange={() => {
            handleClickCheckBox(day, "open24");
            closeDropdown();
          }}
          checked={hours[day].open24}
        />
        Open 24 hours
      </label>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => {
            handleClickCheckBox(day, "closed");
            closeDropdown();
          }}
          checked={hours[day].closed}
        />
        Closed
      </label>
    </>
  );
};

export default OperatingHoursCheckbox3;
