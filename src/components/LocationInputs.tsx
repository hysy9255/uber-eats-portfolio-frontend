import { Fragment } from "react/jsx-runtime";
import OnBoardInput from "./Inputs/OnBoardInput";

const LocationInputs = () => {
  return (
    <Fragment>
      <OnBoardInput
        css="col-span-1"
        title="Street address"
        field="step3.streetAddress"
        placeholder="123 Main St"
      />
      <OnBoardInput
        css="col-span-1"
        title="City"
        field="step3.city"
        placeholder="San Francisco"
      />
      <OnBoardInput
        css="col-span-1"
        title="Suite / Unit"
        field="step3.unit"
        placeholder="Suite 2"
      />
      <OnBoardInput
        css="col-span-1"
        title="State"
        field="step3.state"
        placeholder="NY"
      />
      <OnBoardInput
        css="col-span-1"
        title="ZIP"
        field="step3.zip"
        placeholder="10002"
      />
    </Fragment>
  );
};

export default LocationInputs;
