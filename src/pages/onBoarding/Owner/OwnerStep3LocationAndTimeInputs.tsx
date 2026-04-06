import { Fragment } from "react/jsx-runtime";
import LocationInputs from "../../../components/LocationInputs";
import HoursInputs from "../../../components/HoursInputs";
import LocationExtraInfoInputs from "../../../components/LocationExtraInfoInputs";

const OwnerStep3LocationAndTimeInputs = () => {
  return (
    <Fragment>
      <div className="col-span-2 grid grid-cols-3 gap-4">
        <LocationInputs />
      </div>

      <div className="col-span-2">
        <HoursInputs />
      </div>

      <div className="col-span-2 grid grid-cols-3 gap-4">
        <LocationExtraInfoInputs />
      </div>
    </Fragment>
  );
};

export default OwnerStep3LocationAndTimeInputs;
