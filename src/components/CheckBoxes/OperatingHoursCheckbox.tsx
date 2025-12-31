import type { Day } from "../../pages/types/OwnerOnBoardingStep3Location.type";
import { useOperatingHours } from "../../ReactContext/operatingHours/UseOperatingHours";

interface OperatingHoursCheckboxProps {
  day: Day;
}

const OperatingHoursCheckbox: React.FC<OperatingHoursCheckboxProps> = ({
  day,
}) => {
  const { closeDropdown, setHours, hours, isEditing } = useOperatingHours();

  const isOpen24 = hours[day].open24;
  const isClosed = hours[day].closed;
  return (
    <>
      <label className="inline-flex items-center gap-2">
        <input
          className=""
          disabled={!isEditing}
          type="checkbox"
          onChange={() => {
            if (!isEditing) return;
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
          disabled={!isEditing}
          onChange={() => {
            if (!isEditing) return;
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

export default OperatingHoursCheckbox;
