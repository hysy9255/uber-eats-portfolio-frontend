import { Fragment } from "react/jsx-runtime";
import { OperatingHoursSetupProvider } from "../ReactContext/operatingHoursSetup/OperatingHoursSetupProvider";
import OperatingHoursCreateRow from "./Rows/OperatingHoursCreateRow";
import { DAYS } from "../pages/types/OwnerOnBoardingStep3Location.type";
import { useFormContext } from "react-hook-form";
import type { OwnerOnBoardingForm } from "./Layout/OwnerOnBoardLayout";

const HoursInputs = () => {
  const {
    formState: { errors },
  } = useFormContext<OwnerOnBoardingForm>();
  return (
    <Fragment>
      <div className="text-sm font-medium pb-3">Hours</div>
      <OperatingHoursSetupProvider>
        <div className="space-y-2">
          {DAYS.map((day) => (
            <OperatingHoursCreateRow key={day} day={day} />
          ))}
        </div>
      </OperatingHoursSetupProvider>
      {errors.step3?.hours?.message && (
        <span className="font-medium text-red-500 text-sm">
          {errors.step3.hours.message}
        </span>
      )}
    </Fragment>
  );
};

export default HoursInputs;
