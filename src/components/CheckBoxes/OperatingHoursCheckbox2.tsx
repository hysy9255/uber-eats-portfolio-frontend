import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { useOperatingHoursSetup } from "../../ReactContext/operatingHoursSetup/UseOperatingHoursSetup";

interface OperatingHoursCheckbox2Props {
  day: Day;
}

const OperatingHoursCheckbox2: React.FC<OperatingHoursCheckbox2Props> = ({
  day,
}) => {
  const { closeDropdown, setHours, hours } = useOperatingHoursSetup();

  const isOpen24 = hours[day].open24;
  const isClosed = hours[day].closed;
  return (
    <>
      <label className="inline-flex items-center gap-2">
        <input
          className=""
          type="checkbox"
          onChange={() => {
            closeDropdown();
            setHours(
              isOpen24
                ? {
                    ...hours,
                    [day]: {
                      open: null,
                      close: null,
                      open24: false,
                      closed: false,
                    },
                  }
                : {
                    ...hours,
                    [day]: {
                      open: "00:00",
                      close: "24:00",
                      open24: true,
                      closed: false,
                    },
                  }
            );
          }}
          checked={hours[day].open24}
        />
        Open 24 hours
      </label>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          onChange={() => {
            // if (!isEditing) return;
            closeDropdown();
            setHours(
              isClosed
                ? {
                    ...hours,
                    [day]: {
                      open: null,
                      close: null,
                      closed: false,
                      open24: false,
                    },
                  }
                : {
                    ...hours,
                    [day]: {
                      open: "closed",
                      close: "closed",
                      closed: true,
                      open24: false,
                    },
                  }
            );
          }}
          checked={hours[day].closed}
        />
        Closed
      </label>
    </>
  );
};

export default OperatingHoursCheckbox2;
